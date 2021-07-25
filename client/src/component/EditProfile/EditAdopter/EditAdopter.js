import React, { useState, useEffect } from "react";
import {
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
  Paper,
  Grid,
  FormControl,
  Button,
  TextField,
  Avatar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "../../FileBase64/FileBase64";
import { useHistory } from "react-router-dom";
import moment from "moment";
import useStyles from "./styles";
import { updateAdopter } from "../../../store/actions/userActions";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getCityById,
  getDistricts,
  getVillage,
} from "../../../store/actions/provinceAction";
import validationEdit from "./validationEdit";

const EditProfileData = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.userLogin.userInfo);
  const role = user.role;

  // Get response data from API call
  const profile = useSelector((state) => state.userProfile.userInfo);
  const provinces = useSelector((state) => state.provinces.province);
  const cities = useSelector((state) => state.provinces.cities);
  const districts = useSelector((state) => state.provinces.districts);
  const villages = useSelector((state) => state.provinces.villages);

  // Set profile and address data to fill the edit form field
  const [profileData, setProfileData] = useState(profile);
  const [addressData, setAddressData] = useState(profile.address);
  const [addData] = useState(profile.address);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  useEffect(() => {
    // Assign province object data
    if (
      Object.keys(provinces).length !== 0 &&
      addressData.province !== "" &&
      (addData.province === addressData.province ||
        addressData.province === undefined)
    ) {
      const provinceObj = provinces.find(
        (element) => element.name === addData.province
      );
      setAddressData({ ...addressData, province: provinceObj });
      dispatch(getCityById(provinceObj.id));
    }
  }, [provinces]);

  useEffect(() => {
    if (
      Object.keys(cities).length !== 0 &&
      addData.city !== "" &&
      (addData.city === addressData.city || addData.city === undefined)
    ) {
      const city = cities.find((element) => element.name === addData.city);
      if (city !== undefined) {
        setAddressData({ ...addressData, city: city });
        dispatch(getDistricts(city.id));
      } else {
        setAddressData({ ...addressData, city: null });
      }
    }
  }, [cities]);

  useEffect(() => {
    if (
      Object.keys(districts).length !== 0 &&
      addressData.district !== "" &&
      (addData.district === addressData.district ||
        addressData.district === undefined)
    ) {
      const district = districts.find(
        (element) => element.name === addData.district
      );
      if (district !== undefined) {
        setAddressData({ ...addressData, district: district });
        dispatch(getVillage(district.id));
      } else {
        setAddressData({ ...addressData, district: null });
      }
    }
  }, [districts]);

  useEffect(() => {
    if (
      Object.keys(villages).length !== 0 &&
      addressData.village !== "" &&
      (addData.village === addressData.village ||
        addressData.village === undefined)
    ) {
      const village = villages.find(
        (element) => element.name === addData.village
      );
      if (village !== undefined) {
        setAddressData({ ...addressData, village: village });
      } else {
        setAddressData({ ...addressData, village: null });
      }
    }
  }, [villages]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      console.log("in");
      dispatch(updateAdopter(profile._id, profileData, history));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: profile._id,
          name: profileData.name,
          role: profileData.role,
          imageUrl: profileData.imageUrl,
        })
      );
    }
  }, [errors]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validationEdit(profileData));
    setDataIsCorrect(true);
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Avatar
        className={classes.photoProfile}
        variant="rounded"
        alt={profileData.name}
        src={profileData.imageUrl}
      ></Avatar>
      <Typography className={classes.join}>
        Bergabung {moment(profile.createdAt).format("DD MMM YYYY")}
      </Typography>
      <div className={classes.file}>
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setProfileData({ ...profileData, imageUrl: base64 })
          }
        />
        {errors.imageUrl && (
          <Typography className={classes.error} variant="body2">
            {errors.imageUrl}
          </Typography>
        )}
      </div>
      <form
        className={classes.container}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField
              size="small"
              name="name"
              variant="outlined"
              label="Nama Lengkap"
              fullWidth
              value={profileData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <Typography className={classes.error} variant="body2">
                {errors.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Pekerjaan Tetap</FormLabel>
              <RadioGroup
                row
                aria-label="fixedJob"
                name="fixedJob"
                value={profileData.fixedJob? "true":"false"}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Ya"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Tidak"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              size="small"
              name="phoneNumber"
              variant="outlined"
              label="Nomor Telepon"
              fullWidth
              value={profileData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <Typography className={classes.error} variant="body2">
                {errors.phoneNumber}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              size="small"
              name="identityNumber"
              variant="outlined"
              label="Nomor KTP"
              fullWidth
              value={profileData.identityNumber}
              onChange={handleChange}
              required
            />
            {errors.identityNumber && (
              <Typography className={classes.error} variant="body2">
                {errors.identityNumber}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className={classes.radioButton}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Jenis Kelamin</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Wanita"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Pria"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Lainnya"
                />
              </RadioGroup>
            </FormControl>
            {errors.gender && (
              <Typography className={classes.error} variant="body2">
                {errors.gender}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                required
                label="Tanggal Lahir"
                value={profileData.birthDate}
                onChange={(date) => {
                  setProfileData({ ...profileData, birthDate: date });
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
            {errors.birthDate && (
              <Typography className={classes.error} variant="body2">
                {errors.birthDate}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Autocomplete
              size="small"
              value={
                addressData.province && typeof addressData.province === "object"
                  ? addressData.province
                  : null
              }
              options={provinces}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                if (value) {
                  setAddressData({ ...addressData, province: value });
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, province: value.name },
                  });
                  dispatch(getCityById(value.id));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Provinsi" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Autocomplete
              disabled={addressData.province && cities ? false : true}
              size="small"
              value={
                addressData.city && typeof addressData.city === "object"
                  ? addressData.city
                  : null
              }
              options={Object.keys(cities).length !== 0 ? cities : []}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                if (value) {
                  setAddressData({ ...addressData, city: value });
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, city: value.name },
                  });
                  dispatch(getDistricts(value.id));
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kabupaten/Kota"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Autocomplete
              disabled={addressData.city && districts ? false : true}
              size="small"
              value={
                addressData.district && typeof addressData.district === "object"
                  ? addressData.district
                  : null
              }
              options={Object.keys(districts).length !== 0 ? districts : []}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                if (value) {
                  setAddressData({ ...addressData, district: value });
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, district: value.name },
                  });
                  dispatch(getVillage(value.id));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Wilayah" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Autocomplete
              disabled={addressData.district && villages ? false : true}
              size="small"
              value={
                addressData.village && typeof addressData.village === "object"
                  ? addressData.village
                  : null
              }
              options={Object.keys(villages).length !== 0 ? villages : []}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                if (value) {
                  setAddressData({ ...addressData, village: value });
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, village: value.name },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Desa" variant="outlined" />
              )}
            />
            {errors.addressData && (
              <Typography className={classes.error} variant="body2">
                {errors.addressData}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              size="small"
              name="street"
              variant="outlined"
              label="Alamat Lengkap"
              fullWidth
              value={addressData.additional}
              onChange={(event) => {
                setAddressData({
                  ...addressData,
                  additional: event.target.value,
                });
                setProfileData({
                  ...profileData,
                  address: {
                    ...profileData.address,
                    additional: event.target.value,
                  },
                });
              }}
              required
            />
            {errors.additional && (
              <Typography className={classes.error} variant="body2">
                {errors.additional}
              </Typography>
            )}
          </Grid>
        </Grid>
        <div className={classes.submitBtn}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
            >
              Kirim
            </Button>
          </Grid>
        </div>
      </form>
    </Paper>
  );
};

export default EditProfileData;
