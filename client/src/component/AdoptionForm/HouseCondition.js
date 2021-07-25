import React from 'react';
import { TextField, Button, MenuItem,  Grid, Select, InputLabel, FormControl, IconButton } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { ChevronRightRounded } from '@material-ui/icons';

const HouseCondition = ({
    _id,
    handleChange,
    outdoorChange,
    houseCondition: { 
        houseType, 
        houseSize,
        outdoors,
        housePhotos,
    },
    error, handleNext, handleFileUpload }) => {

    const isValid =
        houseType.length > 0 &&
        !error.houseType &&
        houseSize.length > 0 &&
        !error.houseSize &&
        outdoors.length > 0 &&
        !error.outdoor &&
        housePhotos.length > 0;

    const classes = useStyles();

    return(
        <form className={classes.container} autoComplete="off" noValidate onSubmit={handleNext}>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl className={classes.field} variant="outlined" size="small" required>
                        <InputLabel>Tipe rumah </InputLabel>
                        <Select label="Tipe rumah" name="houseType" id="houseType" value={houseType} onChange={(e) =>handleChange(e, 1)} >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Rumah">Rumah</MenuItem>
                            <MenuItem value="Apartemen">Apartemen</MenuItem>
                            <MenuItem value="Kos">Kos</MenuItem>
                            <MenuItem value="Sewa">Sewa</MenuItem>
                            <MenuItem value="Lainnya">Lainnya</MenuItem>
                        </Select>
                    </FormControl>
                    {error.houseType && <p className={classes.errorMessage}>{error.houseType}</p>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl className={classes.field} variant="outlined" size="small" required>
                        <InputLabel>Ukuran rumah </InputLabel>
                        <Select label="Ukuran Rumah" name="houseSize" id="houseSize" value={houseSize} onChange={(e) =>handleChange(e, 1)} >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="1">{"< 200 m2"}</MenuItem>
                            <MenuItem value="2">{"200 - 400 m2"}</MenuItem>
                            <MenuItem value="3">{"400 - 1000 m2"}</MenuItem>
                            <MenuItem value="4">{"> 1000 m2"}</MenuItem>
                        </Select>
                    </FormControl>
                    {error.houseSize && <p className={classes.errorMessage}>{error.houseSize}</p>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete className={classes.field} size="small" multiple id="outdoors" value={outdoors.map((outdoor) => outdoor)} options={["Kebun depan", "Kebun belakang", "Taman dalam", "Teras", "Balkon", "Lainnya"]} disableCloseOnSelect getOptionLabel={ (option) => option } 
                        onChange={(e, v) => outdoorChange (v)}
                        renderInput={(params) => (
                            <TextField {...params} size="small" variant="outlined" label="Tempat bermain hewan" placeholder="Tempat bermain hewan" required/>
                        )}
                    required/>
                    {error.outdoors && <p className={classes.errorMessage}>{error.outdoors}</p>}
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <FileBase type="file" multiple={true} imagePreview 
                            onDone={(e)=>{
                                const fileName = [];
                                console.log(e);
                                e.forEach(element => {
                                    if (element.type === "image/jpeg" || element.type === "image/jpg" || element.type === "image/png"){
                                        fileName.push(element.base64);
                                    }
                                });
                                handleFileUpload(fileName);
                            }
                        }/>
                        </div>
                    {error.housePhotos && <p className={classes.errorMessage}>{error.housePhotos}</p>}
                </Grid>
            </Grid>
            <Grid className={classes.nextBtnContainer}>
            <Button
                className={classes.nextBtn}
                type="submit"
                variant="contained"
                disabled={!isValid}
                color="primary"
                onClick={ handleNext }
            >
                Selanjutnya
            </Button>
            <IconButton className={classes.nextIcon} size="small" disabled={!isValid} onClick={ handleNext }>
                <ChevronRightRounded />
            </IconButton>
            </Grid> 
        </form>
    )
}

export default HouseCondition;