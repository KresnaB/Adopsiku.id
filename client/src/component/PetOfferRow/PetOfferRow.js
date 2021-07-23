import React, { useState } from "react";
import {
  Box,
  CardMedia,
  Grid,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Tooltip,
  Chip,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit,
  Close,
  CheckCircle,
  Cancel, 
  Chat
} from "@material-ui/icons";
import moment from "moment";
import Detail from "./Detail";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../Modal/ConfirmationDialog";

const PetOfferRow = ({
  key,
  petOffer: {
    _id,
    name,
    gender,
    breeds,
    colors,
    age,
    specialNeeds,
    photos,
    source,
    size,
    furLength,
    spayedNeutered,
    chirping,
    vaccinated,
    trained,
    category,
    description,
    adoptFee,
    createdAt,
    status,
  },
  setDeleteOffer,
  setChangeStatus,
  compLoading,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  return (
    <>
      <TableRow key={key}>
        <TableCell>
          <IconButton
            className={classes.tableActionButton}
            aria-label="expand petOffer"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.hide}>
          <Grid item xs={8} sm={4} className={classes.grid}>
            <CardMedia>
              <CardMedia
                className={classes.media}
                image={
                  photos[0] ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
              />
            </CardMedia>
          </Grid>
        </TableCell>
        <TableCell align="center" className={classes.display}>
          {name}
        </TableCell>
        <TableCell align="center" className={classes.hide}>
          {category}
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={status === 0 ? "Dapat diadopsi" : status === 1 ? "Dalam diskusi" : "Sudah diadopsi"}
            disabled={compLoading ? true : false}
            // onClick={handleOpenStatusModal}
            style={status === 0 ? { backgroundColor: "#66bb6a" } : status === 1 ? { backgroundColor: "#49b4d1" } : { backgroundColor: "#e57373" }}
            className={classes.statusLabel}
          />
            {status === 0 ? (
              <CheckCircle
                style={{ color: "#66bb6a" }}
                className={classes.statusIcon}
              />
            ) : status === 1 ? (
              <Chat
                style={{ color: "#49b4d1" }}
                className={classes.statusIcon}
              />) : 
            (
              <Cancel
                style={{ color: "#e57373" }}
                className={classes.statusIcon}
              />
            )}
        </TableCell>
        <TableCell align="center" className={classes.hide}>
          {moment(createdAt).format("DD MMM YYYY")}
        </TableCell>
        <TableCell align="center">
          <Tooltip
            id="tooltip-top"
            title="Edit Penawaran"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              component={Link}
              to={`/dashboard/pet/edit/${_id}`}
            >
              <Edit
                className={classes.tableActionButtonIcon + " " + classes.edit}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Hapus Penawaran"
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
            title="Hapus Penawaran Adopsi"
            body="Apa kamu yakin untuk menghapus penawaran adopsi ini?"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className={classes.detailTitle}
              >
                Detail
              </Typography>
              <Grid container className={classes.detailComponent}>
                <Grid item md={4} xs={12} sm={12} className={classes.grid}>
                  {photos.map((med) => (
                    <CardMedia
                      key={med}
                      className={classes.media}
                      image={
                        med ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                    />
                  ))}
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography className={classes.label}>Keturunan</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  {breeds.map((breed) => (
                    <Typography key={breed} className={classes.value}>
                      {breed}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography className={classes.label}>Warna</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  {colors.map((color) => (
                    <Typography key={color} className={classes.value}>
                      {color}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
              <Grid container>
                <Detail label="Biaya Adopsi" value={adoptFee} />
                <Detail label="Umur" value={age} />
                <Detail
                  label="Tanggal dibuat"
                  value={moment(createdAt).format("DD MMM YYYY")}
                />
                {furLength ? (
                  <Detail label="Panjang Bulu" value={furLength} />
                ) : (
                  ""
                )}
                <Detail label="Kelamin" value={gender ? "Jantan" : "Betina"} />
                {size ? <Detail label="Ukuran" value={size + " kg"} /> : ""}
                {source ? <Detail label="Sumber" value={source} /> : ""}
                {chirping !== undefined ? (
                  <Detail label="Kicauan" value={chirping} />
                ) : (
                  ""
                )}
                {spayedNeutered !== undefined ? (
                  <Detail
                    label="Sterilisasi"
                    value={spayedNeutered ? "Ya" : "Tidak"}
                  />
                ) : (
                  ""
                )}
                {vaccinated !== undefined ? (
                  <Detail
                    label="Vaksinasi"
                    value={vaccinated ? "Ya" : "Tidak"}
                  />
                ) : (
                  ""
                )}
                {trained !== undefined ? (
                  <Detail label="Terlatih" value={trained ? "Ya" : "Tidak"} />
                ) : (
                  ""
                )}
                <Detail label="Deskripsi" value={description} />
                <Detail label="Kebutuhan Khusus" value={specialNeeds} />
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PetOfferRow;
