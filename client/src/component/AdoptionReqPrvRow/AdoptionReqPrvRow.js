import React, { useState, useEffect } from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Chip,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import {
  InfoSharp,
  CheckCircle,
  Cancel,
  Chat,
  Timer,
  HourglassFull,
  Block
} from "@material-ui/icons";
import moment from "moment";
import useStyles from "./styles";
import ConfirmationDialog from "../Modal/ConfirmationDialog";
import AdoptionReqDetail from "../AdoptionReqDetail/AdoptionReqDetail/AdoptionReqDetail";
import { useDispatch } from 'react-redux';
import { setReportDuration } from "../../store/actions/petOfferActions";
import ReviewCountdown from "../../screens/DashboardScreen/AdoptionReqScreen/ReviewCountdown";

const AdoptionReqPrvRow = ({
  key,
  adoptionReq: {
    _id,
    pet,
    adopter,
    houseCondition,
    commitment,
    experience,
    createdAt,
    status,
  },
  setChangeStatus,
  compLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDurationModal, setOpenDurationModal] = useState(false);
  const [duration, setDuration] = useState(0);

  // Handle change status pet offer
  const handleOpenStatusModal = () => {
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleOpenDurationModal = () => {
    setOpenDurationModal(true);
  };

  const handleCloseDurationModal = () => {
    setOpenDurationModal(false);
  };

  const handleDiscussionStatus = () => {
    setChangeStatus({
      id: _id,
      status: 1,
      offerId: pet._id,
      offerStatus: 1,
    });
    setOpenStatusModal(false);
  };

  const handleCancelStatus = () => {
    setChangeStatus({
      id: _id,
      status: 4,
      offerId: pet._id,
      offerStatus: 0,
    });
  };

  const handleAcceptStatus = () => {
    setChangeStatus({
      id: _id,
      status: 3,
      offerId: pet._id,
      offerStatus: 2,
    });
    setOpenStatusModal(false);
  };

  const handleRejectStatus = () => {
    setChangeStatus({
      id: _id,
      status: 2,
      offerId: pet._id,
      offerStatus: 0,
    });
    setOpenStatusModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setReportDuration(pet._id, duration));
    handleCloseDurationModal()
  };

  const total = Date.parse(moment(createdAt).add(2, 'd')) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
  const hoursMinSecs = {days: days, hours:hours, minutes: minutes, seconds: seconds}

  useEffect(() => {
    if(status === 0 && total <= 0){
      handleCancelStatus()
    }
  }, [total])

  return (
    <>
      <TableRow key={key}>
        <TableCell align="center" className={classes.display}>
          {pet.name}
        </TableCell>
        <TableCell align="center" className={classes.hide}>
          {pet.provider.name}
        </TableCell>
        <TableCell align="center" className={classes.hide}>
          {moment(createdAt).format("DD MMM YYYY HH:mm:ss")}
          {status === 0 && total > 0? 
            <ReviewCountdown hoursMinSecs={hoursMinSecs}/>
            : null
          }
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={ status === 0 ? "Menunggu" : status === 1 ? "Dalam Diskusi" : status === 2 ? "Ditolak" : status === 3 ? "Diterima" : "Dibatalkan" }
            disabled={compLoading ? true : false}
            onClick={status === 0 || status === 1 ? handleOpenStatusModal:null}
            style={
              status === 0 ? { backgroundColor: "#fade2a" }
              : status === 1 ? { backgroundColor: "#49b4d1" }
              : status === 2 ? { backgroundColor: "#e57373" }
              : status === 3 ? { backgroundColor: "#66bb6a" }
              : { backgroundColor: "#f58142" }
            }
            className={classes.statusLabel}
          />
          {status === 0 || status === 1 ?
            <IconButton
            className={classes.tableActionButton}
            aria-label="expand row"
            size="small"
            disabled={compLoading ? true : false}
            onClick={handleOpenStatusModal}
            >
            {status === 0 ? (
                <HourglassFull
                  style={{ color: "#fade2a" }}
                  className={classes.statusIcon}
                />
              ) : (
                <Chat
                  style={{ color: "#49b4d1" }}
                  className={classes.statusIcon}
                />
            )}
            </IconButton>
            : status === 2 ?
              <Cancel
                  style={{ color: "#e57373" }}
                  className={classes.statusIcon}
              />
            : status === 3 ?
              <CheckCircle
                  style={{ color: "#66bb6a" }}
                  className={classes.statusIcon}
              />
            :
              <Block
                  style={{ color: "#f58142" }}
                  className={classes.statusIcon}
              />
          }
          <ConfirmationDialog
            adopt
            handleOpen={openStatusModal}
            handleClose={handleCloseStatusModal}
            handleAccept={handleRejectStatus}
            handleAction={status === 0 ? handleDiscussionStatus : handleAcceptStatus}
            title="Ubah Status Pengajuan Adopsi"
            body={status === 0 ? "Setelah melihat data pengadopsi, terima pengajuan adopsi dan lanjutkan diskusi melalui chat?" : "Setelah melakukan diskusi, apakah anda yakin untuk menerima pengajuan dan menyerahkan hewan adopsi kepada pengadopsi?"}
          />
        </TableCell>
        <TableCell align="center">
          <Tooltip
            id="tooltip-top-start"
            title="Detail"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Detail"
              className={classes.tableActionButton}
              onClick={handleOpenDetailModal}
            >
              <InfoSharp
                className={classes.tableActionButtonIcon + " " + classes.info}
              />
            </IconButton>
          </Tooltip>
          {status === 3 ? 
            (<Tooltip
              id="tooltip-top-start"
              title="Durasi pelaporan"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
            <IconButton
              aria-label="Durasi Pelaporan"
              className={classes.tableActionButton}
              onClick={handleOpenDurationModal}
            >
              <Timer
                className={classes.tableActionButtonIcon + " " + classes.info}
              />
            </IconButton>
          </Tooltip>) : null
          }
          <ConfirmationDialog
            adopt
            noAction
            handleOpen={openDetailModal}
            handleClose={handleCloseDetailModal}
            title="Detail Pengajuan Adopsi"
            body={
              <AdoptionReqDetail
                id={_id}
                pet={pet}
                adopter={adopter}
                createdAt={createdAt}
                status={status}
                houseCondition={houseCondition}
                commitment={commitment}
                experience={experience}
              />
            }
          />
          <ConfirmationDialog
            duration
            handleOpen={openDurationModal}
            handleClose={handleCloseDurationModal}
            handleAction={handleSubmit}
            title="Atur durasi laporan kondisi hewan"
            body={
              <form className={classes.container} autoComplete="off" noValidate >
                <TextField
                  label="Durasi pelaporan"
                  type="number"
                  onChange={(e)=> setDuration(e.target.value)}
                  value={duration}
                  inputProps={{ min: "0", max: "12", step: "1" }}
                  InputProps={{ endAdornment: <InputAdornment position="end">Minggu</InputAdornment> }}
                  size="small"
                />
              </form>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdoptionReqPrvRow;