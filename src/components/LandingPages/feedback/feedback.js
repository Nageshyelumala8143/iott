import React, { useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { useNavigate } from "react-router";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import endpoints from '../../../hoc/config/endpoints';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

}));

export default function FeedbackOne() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [feedBacktext, setFeedBacktext] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));


    function handleHome() {
        navigate('/')
    }

    function handleFeedback(rating) {
        setValue(rating);
    }

    function handleFeedBackSubmit() {
        const payLoad = {
            UserId: user?.Id,
            FeedBack: feedBacktext,
            Rating: value
        }
        axios.post(`${endpoints.feedBackSubmit}`, payLoad).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setFeedBacktext("");
                setValue("");
            }
        })

    }


    return (
        <div>
            <Grid className="main-gridabout" container spacing={3}>
                <Grid className="main-about" md={12} xs={12}>
                    <Grid item xs={1} md={1}  >
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    </Grid>
                    <Grid item xs={12} md={3} >
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                        <div className="abouts-top">
                            <img className="img-fluid logo aboutus" src="images/logo.png" onClick={handleHome} alt="iottLogo" style={{ cursor: 'pointer' }} />

                        </div>
                    </Grid>
                    <Grid item xs={12} md={5} >
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                        <h4 className="feedback-top-text">Help us to improve the app</h4>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="aboutus-content" container spacing={3}>
                <Grid className="feedback-content" item md={12} xs={12}>
                    <Grid item md={2} ></Grid>
                    <Grid className="feedback-border" item md={8} xs={12}>
                        <div >
                            <img
                                src="images/feedback/Poor.gif"
                                className="emoji"
                                onClick={() => handleFeedback(1)}
                            />
                            <img
                                src="images/feedback/Bad.gif"
                                className="emoji"
                                onClick={() => handleFeedback(2)}
                            />
                            <img
                                src="images/feedback/Good.gif"
                                className="emoji"
                                onClick={() => handleFeedback(3)}
                            />
                            <img
                                src="images/feedback/Excellent.gif"
                                className="emoji"
                                onClick={() => handleFeedback(4)}
                            />
                            <img
                                src="images/feedback/Super.gif"
                                className="emoji"
                                onClick={() => handleFeedback(5)}
                            />
                        </div>

                        <div className="ratings">
                            <Box component="fieldset" mb={3} borderColor="transparent">

                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    disabled={true}
                                />
                            </Box>
                        </div>
                        <div>
                            <Grid className="main-gridfeedback" container spacing={3}>
                                <Grid item md={12} xs={12} className="feedback-center">

                                    <Grid item md={6} xs={12}>
                                        <div className="feedback-question">
                                            <div className="faq-question">
                                                <h2 className="faq-question1">your Question</h2>
                                                <TextareaAutosize
                                                    maxRows={6}
                                                    aria-label="maximum height"
                                                    placeholder="your text"
                                                    defaultValue=""
                                                    className="feedback-text"
                                                    value={feedBacktext}
                                                    onChange={(e) => setFeedBacktext(e.target.value)}
                                                />
                                            </div>
                                            <div className="faq-button">
                                                <Button
                                                    variant="contained"
                                                    className="faq-buttonsubmit"
                                                    onClick={() => handleFeedBackSubmit()}
                                                >
                                                    submit
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item md={2} ></Grid>
                </Grid>
            </Grid>

        </div>
    )
}