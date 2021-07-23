import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const HomeDashboardScreen = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant='h5'>Ringkasan</Typography>
            <Grid container>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.text}>
                            <Typography>Pengajuan Baru</Typography>
                            <Typography>2</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.text}>
                            <Typography>Laporan Baru</Typography>
                            <Typography>3</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.text}>
                            <Typography>Chat Baru</Typography>
                            <Typography>2</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.text}>
                            <Typography>Hewan Baru</Typography>
                            <Typography>1</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.text}>
                            <Typography>Diskusi Pengajuan</Typography>
                            <Typography>5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardContent >
                            <Typography>Laporan Diterima</Typography>
                            <Typography>6</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeDashboardScreen;