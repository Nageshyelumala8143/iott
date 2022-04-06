import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import endpoints from '../../../hoc/config/endpoints';
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
// import Slide from '@material-ui/core/Slide';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });


export default function HomeSlider() {
    const [videosList, setVideosList] = useState([]);
    const navigate = useNavigate();

    function handleGetAllVideos() {
        axios.get(`${endpoints.getAllVideos}`).then((response) => {
            if (response.status === 200) {
                setVideosList(response.data);
            }
        })
    }
    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }

    useEffect(() => {
        handleGetAllVideos();
    }, [])


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        vertical: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
       
    };

    return (
        <div>
            <Slider {...settings}>
                {videosList.map((video, index) => (
                    <div
                        onClick={() => handleDetailsPage(video?.Id)}
                        className="carouselSlider"
                        key={index}
                    >
                        {video?.IsPremium == false?
                        <>
                        <span className='freeTag'><img src ="/images/free-tag.png" /></span>
                        </>
                        :""}
                        <img
                            className="carouselImage"
                            src={video?.MoviePoster}
                            alt={'carouselImage'}
                        />
                         <PlayCircleFilledIcon className='play-icon-cursol'/> 
                    </div>
                )
                )
                }
            </Slider>
            {/* <PlayCircleFilledIcon  className='play-icon-cursol'/>  */}
        </div>
    );
}