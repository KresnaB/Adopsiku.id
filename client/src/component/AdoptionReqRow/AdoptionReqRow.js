import React, { useState } from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Chip,
} from "@material-ui/core";
import {
  InfoSharp,
  CheckCircle,
  Cancel,
  Chat,
  HourglassFull,
  Edit,
  Block,
  Close
} from "@material-ui/icons";
import moment from "moment";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../Modal/ConfirmationDialog";
import AdoptionReqDetail from "../AdoptionReqDetail/AdoptionReqDetail/AdoptionReqDetail";

const AdoptionReqRow = ({
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
  setDeleteOffer,
  compLoading,
}) => {
  const classes = useStyles();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  // Handle Delete Pet Offer
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    setDeleteOffer(_id);
    setOpenDeleteModal(false);
  };

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };
  console.log(status);
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
          {moment(createdAt).format("DD MMM YYYY")}
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={ status === 0 ? "Menunggu" : status === 1 ? "Dalam Diskusi" : status === 2 ? "Diterima"  : status === 3 ? "Ditolak" : "Dibatalkan" }
            style={
              status === 0 ? { backgroundColor: "#fade2a" }
              : status === 1 ? { backgroundColor: "#49b4d1" }
              : status === 2 ? { backgroundColor: "#66bb6a"}
              : status === 3 ? { backgroundColor: "#e57373" }
              : { backgroundColor: "#f58142" }
            }
            className={classes.statusLabel}
          />
          {status === 0 ? (
            <HourglassFull
              style={{ color: "#66bb6a" }}
              className={classes.statusIcon}
            />
          ) : status === 1 ?(
            <Chat
              style={{ color: "#49b4d1" }}
              className={classes.statusIcon}
            />
          ) : status === 2 ? (
            <Cancel
                  style={{ color: "#e57373" }}
                  className={classes.statusIcon}
            />
          ) :  status === 3 ? (
            <CheckCircle
              style={{ color: "#66bb6a" }}
              className={classes.statusIcon}
            />
          ) : (
              <Block
                style={{ color: "#f58142" }}
                className={classes.statusIcon}
              />
            )
          }
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
          {status === 0 ?
          <>
          <Tooltip
            id="tooltip-top"
            title="Edit"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              component={Link}
              to={`/adoption/update/${_id}`}
            >
              <Edit
                className={classes.tableActionButtonIcon + " " + classes.edit}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={handleOpenDeleteModal}
            >
              <Close
                className={classes.tableActionButtonIcon + " " + classes.close}
              />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            handleOpen={openDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleAction={handleDelete}
            title="Batalkan Pengajuan Adopsi"
            body="Apa kamu yakin untuk membatalkan pengajuan adopsi ini?"
          />
          </>
          :null}
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
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdoptionReqRow;
