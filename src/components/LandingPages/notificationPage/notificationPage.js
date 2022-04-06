import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../../hoc/config/endpoints';
import { Grid, Typography } from '@material-ui/core';
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from '@material-ui/core/Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';

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


export default function NotificationPage() {

    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

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

    function handleAllData() {
        axios.get(`${endpoints.getAllNotifications}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    useEffect(() => {
        if (user) {
            handleAllData();
        }
    }, [])

    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }

    function handleClear() {
        setDataList([]);
    }

    function daysConvertion(apiDate) {
        let date = apiDate.split(' ')[0];
        let date1 = new Date(date);
        let date2 = new Date();
        let difference = date2.getTime() - date1.getTime();
        let days = Math.ceil(difference / (1000 * 3600 * 24));
        return days
    }


    return (
        <div className='highlyRatedDiv'>
            <div className="iq-main-header d-flex align-items-center justify-content-between">
                <h4 className='main-title'>
                    Notifications
                </h4>
                <a className="iq-view-all" onClick={() => handleClear()}>Clear Notifications</a>
            </div>
            <Grid item className="notification-main-grid" container spacing={3}>
                <Grid item className="notification-container" md={12} xs={12}>
                    {dataList.map((data, index) => (
                        <Grid item className="notification-sub-container" md={12} xs={12}
                            key={index + 1}
                        >
                            <Grid
                                item md={3} xs={12}
                                onClick={() => { handleDetailsPage(data?.Id) }}
                            >
                                <img className='highlyRatedMovies' style={{ width: '180px' }} src={data?.MoviePoster ? data?.MoviePoster : `${"/images/logo.png"}`} alt="notificationPoster" />
                            </Grid>
                            <Grid item md={7} xs={12}>
                                <Typography className="notification-text">{data?.Text}</Typography>
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <Typography className="notification-days">{daysConvertion(data?.Day)} days</Typography>
                            </Grid>
                        </Grid>
                    )
                    ).reverse()
                    }
                </Grid>
            </Grid>
        </div>

    );
}