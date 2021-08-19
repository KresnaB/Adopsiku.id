import React from "react";
import {
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Switch,
  Grid,
  Typography,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FileBase from "react-file-base64";
import petBreeds from "../breeds";
import petColors from "../colors";
import useStyles from "../styles";
import { ChevronLeftRounded, Done } from "@material-ui/icons";

const CatForm = ({
  handleChange,
  petData: {
    _id,
    name,
    gender,
    breeds,
    colors,
    age,
    specialNeeds,
    description,
    media,
    source,
    adoptFee,
    size,
    furLength,
    spayedNeutered,
    vaccinated,
    trained,
  },
  error,
  colorChange,
  handleBack,
  breedChange,
  handleFileUpload,
  handleSubmit,
}) => {
  const isValid =
    name.length > 0 &&
    !error.name &&
    gender !== undefined &&
    breeds.length > 0 &&
    colors.length > 0 &&
    age > 0 &&
    !error.age &&
    specialNeeds.length > 0 &&
    !error.specialNeeds &&
    description.length > 0 &&
    !error.description &&
    media !== undefined &&
    source.length > 0 &&
    !error.source &&
    adoptFee >= 0 &&
    !error.adoptFee &&
    size >= 0 &&
    !error.size &&
    furLength.length > 0 &&
    !error.furLength;

  const classes = useStyles();

  return (
    <form
      className={classes.container}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.field}
            size="small"
            name="name"
            variant="outlined"
            label="Nama Hewan"
            value={name}
            onChange={handleChange}
            required
          />
          {error.name && <p className={classes.errorMessage}>{error.name}</p>}
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <FormControl
            className={classes.field}
            variant="outlined"
            size="small"
            required
          >
            <InputLabel>Panjang bulu</InputLabel>
            <Select
              label="Panjang bulu"
              name="furLength"
              id="furLength"
              value={furLength}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Pendek">Pendek</MenuItem>
              <MenuItem value="Sedang">Sedang</MenuItem>
              <MenuItem value="Panjang">Panjang</MenuItem>
            </Select>
          </FormControl>
          {error.furLength && (
            <p className={classes.errorMessage}>{error.furLength}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <div className={classes.flexBox}>
            <TextField
              className={classes.field}
              size="small"
              type="number"
              name="size"
              variant="outlined"
              label="Ukuran"
              value={size}
              onChange={handleChange}
              required
            />
            <Typography className={classes.textPosision} variant="body1">
              Kg
            </Typography>
          </div>
          {error.size && <p className={classes.errorMessage}>{error.size}</p>}
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <div className={classes.flexBox}>
            <TextField
              className={classes.field}
              size="small"
              type="number"
              name="age"
              variant="outlined"
              label="Umur"
              value={age}
              onChange={handleChange}
              required
            />
            <Typography className={classes.textPosision} variant="body1">
              Bulan
            </Typography>
          </div>
          {error.age && <p className={classes.errorMessage}>{error.age}</p>}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Autocomplete
            className={classes.field}
            size="small"
            multiple
            id="breeds"
            value={breeds.map((breed) => breed)}
            options={petBreeds.cat_breeds}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            onChange={(e, v) => breedChange(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Keturunan"
                placeholder="Keturunan"
                required
              />
            )}
            required
          />
          {error.breeds && (
            <p className={classes.errorMessage}>{error.breeds}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Autocomplete
            className={classes.field}
            size="small"
            multiple
            id="colors"
            value={colors.map((color) => color)}
            options={petColors.cat_colors}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            onChange={(e, v) => colorChange(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label="Warna"
                placeholder="Warna"
                required
              />
            )}
            required
          />
          {error.colors && (
            <p className={classes.errorMessage}>{error.colors}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <FormControl
            className={classes.field}
            variant="outlined"
            size="small"
            required
          >
            <InputLabel>Asal Hewan</InputLabel>
            <Select
              label="Asal Hewan"
              name="source"
              id="source"
              value={source}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Peliharaan">Peliharaan</MenuItem>
              <MenuItem value="Rescue">Rescue</MenuItem>
            </Select>
          </FormControl>
          {error.source && (
            <p className={classes.errorMessage}>{error.source}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <FormControl className={classes.radio} component="fieldset" required>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormLabel className={classes.label}>Kelamin</FormLabel>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <RadioGroup
                aria-label="gender"
                className={classes.radio}
                name="gender"
                value={
                  _id
                    ? typeof gender === "boolean"
                      ? gender
                        ? "true"
                        : "false"
                      : gender
                    : gender
                }
                onChange={handleChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" color="primary" />}
                  label="Jantan"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" color="primary" />}
                  label="Betina"
                />
              </RadioGroup>
            </Grid>
          </FormControl>
          {error.gender && (
            <p className={classes.errorMessage}>{error.gender}</p>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          className={classes.switchContainer}
        >
          <Grid className={classes.flexBoxSwitch}>
            <Grid item xs={10} sm={10} md={6} lg={6}>
              <Typography className={classes.switchLabel} variant="body1">
                Sterilisasi
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={4} lg={4}>
              <Switch
                color="primary"
                checked={spayedNeutered}
                onChange={handleChange}
                name="spayedNeutered"
                inputProps={{ "aria-label": "Sterilisasi" }}
              />
            </Grid>
          </Grid>
          <Grid className={classes.flexBoxSwitch}>
            <Grid item xs={10} sm={10} md={6} lg={6}>
              <Typography className={classes.switchLabel} variant="body1">
                Vaksinasi
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={4} lg={4}>
              <Switch
                color="primary"
                checked={vaccinated}
                onChange={handleChange}
                name="vaccinated"
                inputProps={{ "aria-label": "Vaksin" }}
              />
            </Grid>
          </Grid>
          <Grid className={classes.flexBoxSwitch}>
            <Grid item xs={10} sm={10} md={6} lg={6}>
              <Typography className={classes.switchLabel} variant="body1">
                Terlatih
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={4} lg={4}>
              <Switch
                color="primary"
                checked={trained}
                onChange={handleChange}
                name="trained"
                inputProps={{ "aria-label": "Terlatih" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <TextField
            className={classes.field}
            size="small"
            type="number"
            name="adoptFee"
            variant="outlined"
            label="Biaya Adopsi"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            value={adoptFee}
            onChange={handleChange}
          />
          {error.adoptFee && (
            <p className={classes.errorMessage}>{error.adoptFee}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            className={classes.field}
            size="small"
            name="specialNeeds"
            rows={4}
            multiline
            variant="outlined"
            label="Kebutuhan Khusus"
            value={specialNeeds}
            onChange={handleChange}
          />
          {error.specialNeeds && (
            <p className={classes.errorMessage}>{error.specialNeeds}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            className={classes.field}
            size="small"
            name="description"
            rows={4}
            multiline
            variant="outlined"
            label="Deskripsi"
            value={description}
            onChange={handleChange}
          />
          {error.description && (
            <p className={classes.errorMessage}>{error.description}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <div>
            <FileBase
              type="file"
              multiple={true}
              imagePreview
              onDone={(e) => {
                const fileName = [];
                console.log(e);
                e.forEach((element) => {
                  if (
                    element.type === "image/jpeg" ||
                    element.type === "image/jpg" ||
                    element.type === "image/png"
                  ) {
                    fileName.push(element.base64);
                  }
                });
                handleFileUpload(fileName);
              }}
            />
          </div>
          {error.media && <p className={classes.errorMessage}>{error.media}</p>}
        </Grid>
      </Grid>
      {_id ? (
        <div className={classes.submitBtn}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ marginRight: 10 }}
          >
            Kirim
          </Button>
        </div>
      ) : (
        <div className={classes.nextBtnContainer}>
          <Button
            className={classes.nextBtn}
            variant="contained"
            onClick={handleBack}
            style={{ marginRight: 10 }}
          >
            Kembali
          </Button>
          <IconButton
            className={classes.nextIcon}
            size="small"
            onClick={handleBack}
          >
            <ChevronLeftRounded />
          </IconButton>
          <Button
            className={classes.nextBtn}
            type="submit"
            variant="contained"
            disabled={!isValid}
            color="primary"
            onClick={handleSubmit}
          >
            Selesai
          </Button>
          <IconButton
            className={classes.nextIcon}
            size="small"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            <Done />
          </IconButton>
        </div>
      )}
    </form>
  );
};

export default CatForm;
