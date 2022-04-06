import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../../hoc/config/endpoints';
import Slider from "react-slick";
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from '@material-ui/core/Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Grid } from '@material-ui/core';

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


export default function Drama() {
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);

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
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };

    function handleAllData() {
        axios.get(`${endpoints.getByGenere}?name=Drama`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    useEffect(() => {
        handleAllData();
    }, [])

    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }
    function handleViewAll() {
        let detailsName = btoa("Drama");
        navigate(`/viewall-details/${detailsName}`);
    }
    return (
        <>
            {dataList?.length > 4 ? (
                <div className='highlyRatedDiv'>
                    <div className="iq-main-header d-flex align-items-center justify-content-between">
                        <h4 className='main-title'>Drama</h4>
                         <a className="iq-view-all" onClick={()=>handleViewAll()}><u>View All</u></a> 
                    </div>
                    <Slider {...settings}>
                        {dataList.map((data, index) => (
                            <div className='highlyRatedslider'
                                onClick={() => handleDetailsPage(data?.Id)}
                                key={index + 1}
                            >
                                <img className='highlyRatedMovies' src={data?.MoviePoster} />
                                <div className='onhover'>
                          <div className='onhover-text'>
                              <p>{data?.Description}</p>
                             <PlayCircleFilledIcon className='playicon'/>
                          </div>
                      </div>
                            </div>
                        )
                        )
                        }
                    </Slider>
                </div>
            ) : (
                <div className='highlyRatedDiv'>
                <div className="iq-main-header d-flex align-items-center justify-content-between">
                    <h4 className='main-title'>Drama</h4>
                    <a className="iq-view-all" onClick={()=>handleViewAll()}><u>View All</u></a>
                </div>
                <Grid className="movie-card" container spacing={3} >
                    <Grid className="movie-cardone" item md={12} xs={12}>


                        {dataList.map((data, index) => (
                            <Grid item className="main-card" md={2} xs={4}>
                                <div className='highlyRatedslider'
                                    onClick={() => handleDetailsPage(data?.Id)}
                                    key={index + 1}
                                >
                                    <img className='highlyRatedMovies' src={data?.MoviePoster} />
                                    <div className='onhoverone'>
                                        <div className='onhover-textone'>
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
        </>
    );
}