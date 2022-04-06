import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Button, Grid } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from '@material-ui/core/Slide';
import endpoints from '../../../hoc/config/endpoints';
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useNavigate } from "react-router";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            onClick={onClick}
        >
            <ArrowForwardIosIcon className={className} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
        >
            <ArrowBackIosNewIcon className={className} />
        </div>
    );
}




export default function Details() {
    const [dataList, setDataList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [quality360flag, setQuality360flag] = useState(false);
    const [quality480flag, setQuality480flag] = useState(false);
    const [quality720flag, setQuality720flag] = useState(false);
    const [quality1080flag, setQuality1080flag] = useState(false);
    const [quality, setQuality] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const vidRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [collectionAdded, setAddToColl] = useState(false);
    const [isTrailer, setIsTrailer] = useState(false);
    const [isMovie, setIsMovie] = useState(false);
    const [categoryA, setCategory] = useState('');
    // const [userPro, setUserPro] = useState('');
    let user = JSON.parse(localStorage.getItem("user"));
    const [loginTo, setLoginTo] = useState(false);

    useEffect(() => {
        if (user !== null) {
            window.setInterval(function () {
                user = JSON.parse(localStorage.getItem("user"));
                setLoginTo(true);
            }, 1000);
        }

    }, [user])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    function handleAllData(id) {
        let videoById = atob(id);
        axios.get(`${endpoints.getVideoByid}?id=${videoById}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
                setCategory(response?.data[0]?.Genre);
                hanldeGetCategoryList(response?.data[0]?.Genre);
            }
        })
    }

    function hanldeGetCategoryList(Genre) {
        axios.get(`${endpoints.getByGenere}?name=${Genre}`).then((response) => {
            if (response.status === 200) {
                setCategoryList(response.data);
            }
        })
    }
    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }

    function handleViewAll(categoryA) {
        let detailsName = btoa(categoryA);
        navigate(`/viewall-details/${detailsName}`);
    }

    useEffect(() => {
        handleAllData(id);
        getCollevtionId(id);

    }, [])

    function handleQuality() {
        setQuality480flag(true);
        setQuality720flag(false);
        setQuality360flag(false);
        setQuality1080flag(false);
    }
    function handle480Quality() {
        setQuality720flag(true);
        setQuality360flag(false);
        setQuality480flag(false);
        setQuality1080flag(false);
    }

    function handle720Quality() {
        setQuality1080flag(true);
        setQuality360flag(false);
        setQuality480flag(false);
        setQuality720flag(false);

    }
    function handle1080Quality() {
        setQuality360flag(true);
        setQuality480flag(false);
        setQuality720flag(false);
        setQuality1080flag(false);
    }

    function playVideo() {
        vidRef.current.play();
        setIsPlaying(!isPlaying);
    }

    function pauseVideo() {
        vidRef.current.pause();
        setIsPlaying(!isPlaying);
    }

    function farwardVideo() {
        vidRef.current.currentTime = vidRef.current.currentTime + 10;
    }
    function backwardVideo() {
        vidRef.current.currentTime = vidRef.current.currentTime - 10;

    }

    function handleStartOver() {
        vidRef.current.currentTime = 0;
    }

    const videoHandler = (control) => {
        if (control === "play") {
            vidRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
        } else if (control === "pause") {
            vidRef.current.pause();
            setPlaying(false);
        }
    };

    const fastForward = () => {
        vidRef.current.currentTime += 5;
    };

    const revert = () => {
        vidRef.current.currentTime -= 5;
    };

    window.setInterval(function () {
        if (vidRef.current) {
            setCurrentTime(vidRef?.current?.currentTime);
            setProgress((vidRef?.current?.currentTime / videoTime) * 100);
        }
    }, 1000);

    function handleProgressVideo(progress) {
    }

    function scrub(e) {
        var vid = document.getElementById("video1");
        const scrubTime = (e.nativeEvent.offsetX / vid.clientWidth) * vid.duration;
        if (!isNaN(scrubTime)) {
            vidRef.current.currentTime = scrubTime;
        }
    }

    function startMouseDown(e) {
        setIsMouseDown(true);
    }

    function endMouseDown(e) {
        setIsMouseDown(false);
    }

    function handleRangeUpdate(e) {
        const { name, value } = e.target;
        if (name === "volume") {
            setVolume(value);
            vidRef.current.volume = value;
        } else {
            setPlaybackRate(value);
            vidRef.current.playbackRate = value;
        }
        // this.setState({
        //   [name]: value,
        // });
        // Todo: Check how to update state with Immutable JS
        // instead of using refs
        // var vid = document.getElementById("video1");


    }

    function skip(e) {
        const skipValue = e.target.attributes[0].value;
        if (!isNaN(skipValue)) {
            vidRef.video.currentTime += Number(skipValue);
        }
    }

    function handleVolumeDown() {
        setVolume(0);
        vidRef.current.volume = 0;
    }

    function handleVolumeUp() {
        setVolume(1);
        vidRef.current.volume = 1;
    }

    function handleAddCollection(id) {
        const data = {
            UserId: user?.Id,
            MovieId: id
        }
        axios.post(`${endpoints.addFavorite}`, data).then((response) => {
            if (response.status === 200) {
                setAddToColl(true);
            }
        })
    }

    function getCollevtionId(id) {
        let movieId = atob(id);
        let userId = user?.Id;
        axios.get(`${endpoints.getFavoriteById}?userid=${userId}&movieid=${movieId}`).then((response) => {
            if (response.status === 200) {
                if (response?.data === 1) {
                    setAddToColl(true);
                }

            }
        })

    }



    function handleWatchTrailer(id) {
        setIsTrailer(true);
        setIsMovie(false);
        axios.get(`${endpoints.getTrailerById}?id=${id}`).then((response) => {
            if (response.status === 200) {

            }
        })

    }

    function handleWatchMovie() {
        if (user !== null) {
            setLoginTo(true);
            setIsMovie(true);
            setIsTrailer(false);
            vidRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
            localStorage.setItem("IsMovie", true);
        }
    }


    // useEffect(()=>{
    //     if(user){
    //         setUserPro(JSON.parse(localStorage.getItem("user")));
    //     }

    // },[user])

    useEffect(() => {
        localStorage.removeItem("IsMovie");
    }, [])

    return (
        <div>
            {dataList.map((item, index) =>
                <>
                    <Grid className="player" container spacing={3} key={index}>
                        <Grid className="main" item md={12} xs={12}>
                            <Grid className="image-grid" item md={12} xs={12}>
                                {/* <img src={item?.MoviePoster} alt="videoByIdImage" /> */}
                                {quality1080flag ? (
                                    <div className="video-container1">
                                        {loginTo ?
                                            <div className="controls">
                                                <img
                                                    onClick={revert}
                                                    className="controlsIcon"
                                                    alt=""
                                                    src="/images/player/backward.png"
                                                />
                                                {playing ? (
                                                    <img
                                                        onClick={() => videoHandler("pause")}
                                                        className="controlsIconsmall"
                                                        alt=""
                                                        src="/images/player/pause.png"
                                                    />
                                                ) : (
                                                    <img
                                                        onClick={() => videoHandler("play")}
                                                        className="controlsIconsmall"
                                                        alt=""
                                                        src="/images/player/play.png"
                                                    />
                                                )}
                                                <img
                                                    onClick={fastForward}
                                                    className="controlsIcon"
                                                    alt=""
                                                    src="/images/player/forward.png"
                                                />
                                            </div>
                                            : ""}
                                        <video
                                            ref={vidRef}
                                            className="vedio-palyer video"
                                            poster={item?.MoviePoster}
                                            width="100%"
                                            id="video1"
                                        >
                                            <source
                                                src={item?.Quality1080}
                                                type="video/mp4"
                                            ></source>
                                        </video>
                                        {!loginTo ?
                                            <>
                                                <span className='loginWatch'>
                                                    Login to Watch the Movie
                                                </span>
                                            </>
                                            : ""}
                                        <Button
                                            onClick={() => handle1080Quality()}
                                            className="quality"
                                        >
                                            {'HD'}
                                        </Button>
                                        {/* <div className="controlsContainer">

                                        </div> */}
                                        <div className="timecontrols">
                                            <p className="controlsTime">
                                                {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                            </p>
                                            <div className="time_progressbarContainer"
                                                onClick={() => handleProgressVideo(progress)}
                                            >
                                                <div
                                                    style={{ width: `${progress}%` }}
                                                    className="time_progressBar"

                                                ></div>
                                            </div>
                                            <p className="controlsTime">
                                                {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                            </p>
                                        </div>
                                        {volume > 0 ? (
                                            <div className="volume-progress">

                                                <input
                                                    id="player_slider"
                                                    type="range"
                                                    name="volume"
                                                    className="player__slider"
                                                    min="0" max="1" step="0.05"
                                                    value={volume}
                                                    onChange={(e) => handleRangeUpdate(e)}
                                                />
                                                <br />
                                                <VolumeUpIcon
                                                    onClick={handleVolumeDown}
                                                    className="volumeIcons"
                                                />
                                                {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                            </div>
                                        ) : (
                                            <div className="volume-progress">

                                                <input
                                                    id="player_slider"
                                                    type="range"
                                                    name="volume"
                                                    className="player__slider"
                                                    min="0" max="1" step="0.05"
                                                    value={volume}
                                                    onChange={(e) => handleRangeUpdate(e)}
                                                />
                                                <br />
                                                <VolumeOffIcon
                                                    onClick={handleVolumeUp}
                                                    className="volumeIcons"
                                                />

                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    quality720flag ? (
                                        <div className="video-container1">
                                            {loginTo ?
                                                <div className="controls">
                                                    <img
                                                        onClick={revert}
                                                        className="controlsIcon"
                                                        alt=""
                                                        src="/images/player/backward.png"
                                                    />
                                                    {playing ? (
                                                        <img
                                                            onClick={() => videoHandler("pause")}
                                                            className="controlsIconsmall"
                                                            alt=""
                                                            src="/images/player/pause.png"
                                                        />
                                                    ) : (
                                                        <img
                                                            onClick={() => videoHandler("play")}
                                                            className="controlsIconsmall"
                                                            alt=""
                                                            src="/images/player/play.png"
                                                        />
                                                    )}
                                                    <img
                                                        onClick={fastForward}
                                                        className="controlsIcon"
                                                        alt=""
                                                        src="/images/player/forward.png"
                                                    />
                                                </div>
                                                : ""}
                                            <video
                                                ref={vidRef}
                                                className="vedio-palyer video"
                                                poster={item?.MoviePoster}
                                                width="100%"
                                                id="video1"
                                            >
                                                <source
                                                    src={item?.Quality720}
                                                    type="video/mp4"
                                                ></source>
                                            </video>
                                            {!loginTo ?
                                                <>
                                                    <span className='loginWatch'>
                                                        Login to Watch the Movie
                                                    </span>
                                                </>
                                                : ""}
                                            <Button
                                                onClick={() => handle720Quality()}
                                                className="quality"
                                            >
                                                {'SD'}
                                            </Button>
                                            {/* <div className="controlsContainer">
                                                
                                            </div> */}
                                            <div className="timecontrols">
                                                <p className="controlsTime">
                                                    {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                                </p>
                                                <div className="time_progressbarContainer"
                                                    onClick={() => handleProgressVideo(progress)}
                                                >
                                                    <div
                                                        style={{ width: `${progress}%` }}
                                                        className="time_progressBar"

                                                    ></div>
                                                </div>
                                                <p className="controlsTime">
                                                    {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                                </p>
                                            </div>
                                            {volume > 0 ? (
                                                <div className="volume-progress">

                                                    <input
                                                        id="player_slider"
                                                        type="range"
                                                        name="volume"
                                                        className="player__slider"
                                                        min="0" max="1" step="0.05"
                                                        value={volume}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    />
                                                    <br />
                                                    <VolumeUpIcon
                                                        onClick={handleVolumeDown}
                                                        className="volumeIcons"
                                                    />
                                                    {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                                </div>
                                            ) : (
                                                <div className="volume-progress">

                                                    <input
                                                        id="player_slider"
                                                        type="range"
                                                        name="volume"
                                                        className="player__slider"
                                                        min="0" max="1" step="0.05"
                                                        value={volume}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    />
                                                    <br />
                                                    <VolumeOffIcon
                                                        onClick={handleVolumeUp}
                                                        className="volumeIcons"
                                                    />

                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        quality480flag ?
                                            (
                                                <div className="video-container1">
                                                    {loginTo ?
                                                        <div className="controls">
                                                            <img
                                                                onClick={revert}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/backward.png"
                                                            />
                                                            {playing ? (
                                                                <img
                                                                    onClick={() => videoHandler("pause")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/pause.png"
                                                                />
                                                            ) : (
                                                                <img
                                                                    onClick={() => videoHandler("play")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/play.png"
                                                                />
                                                            )}
                                                            <img
                                                                onClick={fastForward}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/forward.png"
                                                            />
                                                        </div>
                                                        : ""}
                                                    <video
                                                        ref={vidRef}
                                                        poster={item?.MoviePoster}
                                                        width="100%"
                                                        className="vedio-palyer video"
                                                        id="video1"
                                                    ></video>
                                                    <source
                                                        src={item?.Quality480}
                                                        type="video/mp4"
                                                    ></source>
                                                    {!loginTo ?
                                                        <>
                                                            <span className='loginWatch'>
                                                                Login to Watch the Movie
                                                            </span>
                                                        </>
                                                        : ""}
                                                    <Button
                                                        onClick={() => handle480Quality()}
                                                        className="quality"
                                                    >
                                                        {'SUB'}
                                                    </Button>
                                                    {/* <div className="controlsContainer">
                                                        
                                                    </div> */}
                                                    <div className="timecontrols">
                                                        <p className="controlsTime">
                                                            {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                                        </p>
                                                        <div className="time_progressbarContainer"
                                                            onClick={() => handleProgressVideo(progress)}
                                                        >
                                                            <div
                                                                style={{ width: `${progress}%` }}
                                                                className="time_progressBar"

                                                            ></div>
                                                        </div>
                                                        <p className="controlsTime">
                                                            {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                                        </p>
                                                    </div>
                                                    {volume > 0 ? (
                                                        <div className="volume-progress">

                                                            <input
                                                                id="player_slider"
                                                                type="range"
                                                                name="volume"
                                                                className="player__slider"
                                                                min="0" max="1" step="0.05"
                                                                value={volume}
                                                                onChange={(e) => handleRangeUpdate(e)}
                                                            />
                                                            <br />
                                                            <VolumeUpIcon
                                                                onClick={handleVolumeDown}
                                                                className="volumeIcons"
                                                            />
                                                            {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                                        </div>
                                                    ) : (
                                                        <div className="volume-progress">

                                                            <input
                                                                id="player_slider"
                                                                type="range"
                                                                name="volume"
                                                                className="player__slider"
                                                                min="0" max="1" step="0.05"
                                                                value={volume}
                                                                onChange={(e) => handleRangeUpdate(e)}
                                                            />
                                                            <br />
                                                            <VolumeOffIcon
                                                                onClick={handleVolumeUp}
                                                                className="volumeIcons"
                                                            />

                                                        </div>
                                                    )}
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="video-container1">
                                                    {loginTo ?
                                                        <div className="controls">
                                                            <img
                                                                onClick={revert}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/backward.png"
                                                            />
                                                            {playing ? (
                                                                <img
                                                                    onClick={() => videoHandler("pause")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/pause.png"
                                                                />
                                                            ) : (
                                                                <img
                                                                    onClick={() => videoHandler("play")}
                                                                    className="controlsIconsmall"
                                                                    alt=""
                                                                    src="/images/player/play.png"
                                                                />
                                                            )}
                                                            <img
                                                                onClick={fastForward}
                                                                className="controlsIcon"
                                                                alt=""
                                                                src="/images/player/forward.png"
                                                            />
                                                        </div>
                                                        : ""}
                                                    <video
                                                        ref={vidRef}
                                                        poster={item?.MoviePoster}
                                                        width="100%"
                                                        className="vedio-palyer video"
                                                        id="video1"
                                                    >
                                                        <source
                                                            src={item?.Quality360}
                                                            type="video/mp4"
                                                        ></source>
                                                    </video>
                                                    {!loginTo ?
                                                        <>
                                                            <span className='loginWatch'>
                                                                Login to Watch the Movie
                                                            </span>
                                                        </>
                                                        : ""}
                                                        {item?.IsPremium == false?
                                                        <>
                                                        <span className='freeTag-details'><img src ="/images/free-tag.png" /></span>
                                                        </>
                                                        :""}
                                                    {loginTo ?
                                                        <>
                                                            <Button
                                                                onClick={() => handleQuality()}
                                                                className="quality"
                                                            >
                                                                {'LOW'}
                                                            </Button>
                                                            <div className="timecontrols">
                                                                <p className="controlsTime">
                                                                    {Math.floor(currentTime / (60 * 60)) + ":" + ("0" + Math.floor((currentTime / 60) % 60)).slice(-2) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                                                                </p>
                                                                <div className="time_progressbarContainer"
                                                                    // onClick={() => handleProgressVideo(progress)}
                                                                    onMouseDown={startMouseDown}
                                                                    onMouseUp={endMouseDown}
                                                                    onMouseLeave={endMouseDown}
                                                                    onMouseMove={(e) => isMouseDown && scrub(e)}
                                                                    onClick={scrub}
                                                                >
                                                                    <div
                                                                        style={{ width: `${progress}%` }}
                                                                        className="time_progressBar"

                                                                    ></div>
                                                                </div>
                                                                <p className="controlsTime">
                                                                    {Math.floor(videoTime / (60 * 60)) + ":" + ("0" + Math.floor(videoTime / 60)).slice(-2) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                                                                </p>
                                                            </div>
                                                            {volume > 0 ? (
                                                                <div className="volume-progress">

                                                                    <input
                                                                        id="player_slider"
                                                                        type="range"
                                                                        name="volume"
                                                                        className="player__slider"
                                                                        min="0" max="1" step="0.05"
                                                                        value={volume}
                                                                        onChange={(e) => handleRangeUpdate(e)}
                                                                    />
                                                                    <br />
                                                                    <VolumeUpIcon
                                                                        onClick={handleVolumeDown}
                                                                        className="volumeIcons"
                                                                    />
                                                                    {/* <input
                                                        type="range"
                                                        name="playbackRate"
                                                        className="player__slider"
                                                        min="0.5" max="2" step="0.1"
                                                        value={playbackRate}
                                                        onChange={(e) => handleRangeUpdate(e)}
                                                    /> */}
                                                                </div>
                                                            ) : (
                                                                <div className="volume-progress">

                                                                    <input
                                                                        id="player_slider"
                                                                        type="range"
                                                                        name="volume"
                                                                        className="player__slider"
                                                                        min="0" max="1" step="0.05"
                                                                        value={volume}
                                                                        onChange={(e) => handleRangeUpdate(e)}
                                                                    />
                                                                    <br />
                                                                    <VolumeOffIcon
                                                                        onClick={handleVolumeUp}
                                                                        className="volumeIcons"
                                                                    />

                                                                </div>
                                                            )}
                                                        </>
                                                        : ""}
                                                </div>
                                            )
                                    )
                                )
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="description" container spacing={3} >
                        <Grid className="tile-main" item md={12} xs={12}>
                            <Grid className="icon" item md={3} xs={3} onClick={() => handleStartOver()} style={{ cursor: 'pointer' }}>
                                <ReplayIcon className="icon-replay" />
                                <h5 className="start-over" >Start Over</h5>
                            </Grid>

                            <Grid className="name icon" item md={6} xs={6}>
                                <h3>{item?.MovieName}</h3>
                                <p>{item?.Language}</p>
                                <p><span>{item?.Genre} | </span><span>{item?.IMDbRating} | </span> <span>{item?.Certificate} | </span><span>{item?.Duration.split(':')[0].substr(1, 1) + 'h ' + item?.Duration.split(':')[1] + 'min'} | </span><span>{item?.ReleasedYear.split(' ')[0].split('/')[2]}</span></p>
                                {/* <Button className='button-bg' onClick={() => handleWatchTrailer(item?.Id)}>Watch Trailer</Button> */}
                                <Button className='button-bg' onClick={() => handleWatchMovie()}>Watch Movie</Button>
                            </Grid>
                            <Grid className="last-grid" item md={3} xs={3}>
                                <img src="/images/My collection.png" className="collection" onClick={() => handleAddCollection(item?.Id)} />
                                <h5 className='addtocollection' >{collectionAdded ? "Remove from Collection" : "Add to collection"}</h5>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="description padd" container>
                        <Grid className="description-main" item md={12} xs={12}>
                            <Grid className="description-text" item md={12} xs={12}>
                                <h5>Description</h5>
                                <p className="description-para">
                                    {item?.Description}
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="crew padd" container >
                        <Grid className="crew-main" item md={12} xs={12}>
                            <Grid className="crew-text" item md={12} xs={12}>
                                <h5>Cast & Crew</h5>
                            </Grid>
                        </Grid>
                        <Grid className="crew-images" item md={12} xs={12}>

                            {item?.cast?.map((cas, index) =>
                                <Grid className="crew-images1" item md={1} xs={4}>
                                    <img src={cas?.ImageURL} alt="castAndCrew" />
                                    <p className='role'>{cas?.Role}</p>
                                    <p className='charactor'>{cas?.Charactor.substr(0, 10)}...</p>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                </>
            )}
            {categoryList.length > 4 ? (
                <Grid className="realted padd" container>
                    <Grid className="related-main" item md={12} xs={12}>
                        <div className="iq-main-header d-flex align-items-center justify-content-between">
                            <h4 className='main-title'>Related Movies</h4>
                            <a className="iq-view-all" onClick={() => handleViewAll(categoryA)}>View All</a>
                        </div>
                        <Slider {...settings}>
                            {categoryList.map((category, index) => (
                                <div className='highlyRatedslider'
                                    //  onClick={() => handleHighlyRated(language)}
                                    onClick={() => handleDetailsPage(category?.Id)}
                                >
                                    <img className='highlyRatedMovies' src={category?.MoviePoster} />
                                    <div className='onhover'>
                                        <div className='onhover-text'>
                                            <p>{category?.Description}</p>
                                            <PlayCircleFilledIcon className='playicon' />
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                            }
                        </Slider>
                    </Grid>
                </Grid>
            ) : (
                <div className='highlyRatedDiv'>
                    <div className="iq-main-header d-flex align-items-center justify-content-between">
                        <h4 className='main-title'>Free Movies</h4>
                        <a className="iq-view-all" onClick={() => handleViewAll(categoryA)}><u>View All</u></a>
                    </div>
                    <Grid className="movie-card" container spacing={3} >
                        <Grid className="movie-cardone" item md={12} xs={12}>


                            {categoryList.map((data, index) => (
                                <Grid item className="main-card" md={2} xs={4}>
                                    <div className='highlyRatedslider'
                                        onClick={() => handleDetailsPage(data?.Id)}
                                        key={index + 1}
                                    >
                                        <img className='highlyRatedMovies' src={data?.MoviePoster} />
                                        <div className='onhover'>
                                            <div className='onhover-text'>
                                                <p>{data?.Description}</p>
                                                <PlayCircleFilledIcon className='playicon' />
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            ))}

                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    )
}