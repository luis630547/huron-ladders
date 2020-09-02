import React, { Fragment } from "react";
import { useUserStore, useProblemStore } from "../zustand";
import { Grid, Paper, Avatar, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
    },
	avatar: {
		width: "8rem",
        height: "8rem",
    }
}));

const ProfileLayout = () => {
    const classes = useStyles();
    const user = useUserStore((state) => state.user);
    const problems = useProblemStore(state => state.total);
    const { titlePhoto, firstName, lastName, rating, rank, country, organization } = user;
    
    return (
        <Grid container direction="row" justify="center">
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                    {(user && user.handle) ? (
                        <Fragment>
                            <Avatar src={titlePhoto} className={classes.avatar} />
                            <br />
                            <Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
                            <Typography>{organization}</Typography>
                            <Typography>{country}</Typography>
                            <br />
                            <Typography variant="h4">{rating}</Typography>
                            <Typography>{rank}</Typography>
                            <br />
                            <Typography>Total problems solved</Typography>
                            <Typography variant="h4">{problems}</Typography>
                        </Fragment>
                    ) : (
                        <Typography>Para ver tu perfil, inicia sesión.</Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ProfileLayout;