import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import './style.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Forward5Icon from '@material-ui/icons/Forward5';
import Replay5Icon from '@material-ui/icons/Replay5';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#151236 !important'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function HighlyRatedDetails(selectedItem) {
    const classes = useStyles();
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [mainPlay, setMainPlay] = useState(false);


    const videoHandler = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
        } else if (control === "pause") {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    const fastForward = () => {
        videoRef.current.currentTime += 5;
    };

    const revert = () => {
        videoRef.current.currentTime -= 5;
    };

    window.setInterval(function () {
        setCurrentTime(videoRef.current?.currentTime);
        setProgress((videoRef.current?.currentTime / videoTime) * 100);

    }, 1000);


    function handlePlay() {
        setMainPlay(true);
    }


    return (
        <div>
            <Dialog className='highlyRatedDetailsDialog' fullScreen open={selectedItem?.open} onClose={selectedItem?.onClose} TransitionComponent={selectedItem?.TransitionComponent}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={selectedItem?.onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {selectedItem?.selectedItem?.movieName}
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item md={12} className='highlyRatedGridContainer'>
                        <Grid item md={3}>
                            <Typography>{selectedItem?.selectedItem?.description}</Typography>
                            <Typography>{selectedItem?.selectedItem?.directors}</Typography>
                            <Typography>{selectedItem?.selectedItem?.Starring}</Typography>
                            <Typography>{selectedItem?.selectedItem?.Genres}</Typography>
                            <Typography>{selectedItem?.selectedItem?.Subtitles}</Typography>
                            <Typography>{selectedItem?.selectedItem?.audioLanguages}</Typography>
                            <Typography>{selectedItem?.selectedItem?.moreDetails?.Producers}</Typography>
                            <Typography>{selectedItem?.selectedItem?.moreDetails?.Studio}</Typography>
                            <Typography>{selectedItem?.selectedItem?.moreDetails?.contentAdvisory}</Typography>
                            <Typography>{selectedItem?.selectedItem?.moreDetails?.supportingaActors}</Typography>
                        </Grid>
                        <Grid item md={9}>
                            {!mainPlay ? (
                                <Grid item md={12}>
                                    <video
                                        id="video1"
                                        className="highlyRatedvideo"
                                        ref={videoRef}
                                        src="http://iott.co.in/MoviesData/Allaroodu 360p.mp4"
                                    ></video>
                                    <PlayArrowIcon
                                        onClick={handlePlay}
                                        className="controlsIconsmall"
                                    />
                                </Grid>
                            ) : (
                                <Grid md={12}>
                                    <video
                                        className="highlyRatedvideo"
                                        src="http://iott.co.in/MoviesData/Allaroodu 360p.mp4"
                                    >

                                    </video>
                                    <div className="controlsContainer">
                                        <div
                                        //  className="controls"
                                        >
                                            <Replay5Icon
                                                // className="controlsIcon"
                                                onClick={revert}
                                            />
                                            {playing ? (
                                                <PauseIcon onClick={() => videoHandler("pause")}
                                                // className="controlsIconsmall"
                                                />
                                            ) : (

                                                <PlayArrowIcon
                                                    onClick={() => videoHandler("play")}
                                                // className="controlsIconsmall"
                                                />
                                            )}
                                            <Forward5Icon
                                                onClick={fastForward}
                                            // className="controlsIcon"
                                            />
                                        </div>
                                    </div>
                                    <div className="timecontrols">
                                        <p className="controlsTime">
                                            {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                        </p>
                                        <div className="time_progressbarContainer">
                                            <div style={{ width: "40%" }} className="time_progressBar"></div>
                                        </div>
                                        <p className="controlsTime">
                                            {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                        </p>
                                    </div>
                                </Grid>
                            )}
                        </Grid>

                    </Grid>
                </Grid>

                {/* <List className='highlyRatedDetailsList'>
                    <ListItem>

                    </ListItem>

                </List> */}
            </Dialog>
        </div>
    );
}