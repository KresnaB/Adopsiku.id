import React from 'react';
import { TextField, Button, Switch,  Grid, Typography, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { ChevronLeftRounded, Done } from '@material-ui/icons';

const Experience = ({
    _id,
    handleChange,
    experience: {
        wasAdopting,
        currentPet
    },
    handleSubmit, handleBack }) => {

    const classes = useStyles();

    return(
        <form className={classes.container} autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={10} sm={10} md={11} lg={11}>
                    <Typography variant="body1">Apakah anda pernah memelihara hewan sebelumnya?</Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={1} lg={1}>
                    <Switch
                        color="primary"
                        checked={wasAdopting}
                        onChange={(e) => handleChange(e, 3)}
                        name="wasAdopting"
                        inputProps={{ 'aria-label': 'Was Aopting' }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField className={classes.field} size="small" name="currentPet" rows={4} multiline variant="outlined" label="Deskripsikan jenis, usia, dan jumlah hewan jika saat ini anda sedang memelihara." value={currentPet} onChange={(e) => handleChange(e, 3)}/>
                </Grid>
            </Grid>
            <div className={classes.nextBtnContainer}>
                    <Button
                        className={classes.nextBtn}
                        variant="contained"
                        onClick={handleBack}
                        style={{ marginRight: 10 }}
                    >
                        Kembali
                    </Button>
                    <IconButton className={classes.nextIcon} size="small" onClick={ handleBack }>
                        <ChevronLeftRounded />
                    </IconButton>
                    <Button
                        className={classes.nextBtn}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Kirim
                    </Button>
                    <IconButton className={classes.nextIcon} size="small"  onClick={ handleSubmit }>
                        <Done />
                    </IconButton>
                </div>
        </form>
    )
}

export default Experience;