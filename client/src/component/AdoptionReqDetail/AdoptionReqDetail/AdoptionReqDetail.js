import React, { useState } from "react";
import { Typography, Grid, CardMedia } from "@material-ui/core";
import moment from "moment";
import useStyles from "./styles";
import ReqDetail from "../ReqDetail/ReqDetail";
import ImageDialog from "../../Modal/ImageDialog";

const AdoptionReqDetail = ({
  id,
  pet,
  adopter,
  houseCondition,
  commitment,
  experience,
  createdAt,
  status,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Handle Delete Pet Offer
  const showPhotos = () => {
    setOpen(true);
  };

  const closePhotos = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography className={classes.title}>Biodata Pengadopsi</Typography>
        <ReqDetail label="Nama Lengkap" value={adopter.name} />
        <ReqDetail label="Email" value={adopter.email} />
        <ReqDetail label="Nomor Telepon" value={adopter.phoneNumber} />
        <ReqDetail
          label="Tanggal Lahir"
          value={
            adopter.birthDate
              ? moment(adopter.birthDate).format("DD MMM YYYY")
              : "-"
          }
        />
        <ReqDetail label="Nomor KTP" value={adopter.identityNumber} />
        <ReqDetail
          label="Jenis Kelamin"
          value={
            adopter.gender === "Female"
              ? "Perempuan"
              : adopter.gender === "Male"
              ? "Laki-laki"
              : "Lainnya"
          }
        />
        <ReqDetail
          label="Pekerjaan Tetap"
          value={adopter.fixedJob ? "Ya" : "Tidak"}
        />
        <ReqDetail
          label="Alamat"
          value={
            (adopter.address.additional
              ? adopter.address.additional + " "
              : "") +
            (adopter.address.village ? adopter.address.village + " " : "") +
            (adopter.address.district ? adopter.address.district + " " : "") +
            (adopter.address.city ? adopter.address.city + " " : "") +
            (adopter.address.province
              ? "Provinsi " + adopter.address.province + " "
              : "")
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography className={classes.title}>Komitmen</Typography>
        <ReqDetail
          label="Persetujuan Keluarga"
          value={commitment.familyApproval ? "Ya" : "Tidak"}
        />
        <ReqDetail
          label="Rencana Pernikahan"
          value={commitment.weddingPlan ? "Ya" : "Tidak"}
        />
        <ReqDetail
          label="Rencana Anak"
          value={commitment.childPlan ? "Ya" : "Tidak"}
        />
        <ReqDetail
          label="Rencana Pindah"
          value={commitment.movingPlan ? "Ya" : "Tidak"}
        />
        <ReqDetail
          label="Rencana Biaya"
          value={commitment.financialPlan ? "Ya" : "Tidak"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography className={classes.title}>Kondisi Rumah</Typography>
        <ReqDetail label="Tipe Rumah" value={houseCondition.houseType} />
        <ReqDetail
          label="Ukuran Rumah"
          value={
            houseCondition.houseSize === 1
              ? "< 200 m2"
              : houseCondition.houseSize === 2
              ? "200-400m2"
              : houseCondition.houseSize === 3
              ? "400-1000m2"
              : houseCondition.houseSize === 4
              ? ">1000m2"
              : ">1000m2"
          }
        />
        <ReqDetail
          label="Ruang Terbuka"
          value={houseCondition.outdoors.join(", ")}
        />
        <Typography className={classes.title}>Foto Rumah</Typography>
        <Grid item md={12} xs={12} sm={12} className={classes.grid}>
          {houseCondition.housePhotos.map((med) => (
            <CardMedia
              key={med}
              className={classes.media}
              onClick={showPhotos}
              image={
                med ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
            />
          ))}
          <ImageDialog
            handleOpen={open}
            handleClose={closePhotos}
            body={houseCondition.housePhotos}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography className={classes.title}>Pengalaman Mengadopsi</Typography>
        <ReqDetail
          label="Pernah Mengadopsi"
          value={experience.wasAdopting ? "Ya" : "Tidak"}
        />
        {experience.wasAdopting ? (
          <ReqDetail
            label="Deskripsi Hewan yang Diadopsi"
            value={experience.currentPet}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default AdoptionReqDetail;
