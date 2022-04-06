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


export default function Languages() {
    const navigate = useNavigate();
    const [languageList, setLanguageList] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
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

    function handleAllLanguages() {
        axios.get(`${endpoints.getAllCategory}`).then((response) => {
            if (response.status === 200) {
                setLanguageList(response.data);
            }
        })
    }

    useEffect(() => {
        handleAllLanguages();
    }, [])
    function handleHighlyRated(CategoryName) {
        let detailsByCategory = btoa(CategoryName);
        navigate(`/individual-details/${detailsByCategory}`);
    }
    function handleViewAll() {
        let detailsName = btoa("Genere");
        navigate(`/viewall-details/${detailsName}`);
    }
    return (
        <div className='highlyRatedDiv'>
            <div className="iq-main-header d-flex align-items-center justify-content-between">
                <h4 className='main-title'>Genere</h4>
                <a className="iq-view-all" onClick={()=>handleViewAll()}><u>View All</u></a>
            </div>
            <Slider {...settings}>
                {languageList.map((language, index) => (
                    <div className='highlyRatedslider'
                        onClick={()=>handleHighlyRated(language?.CategoryName)}
                        key={index + 1}
                    >
                        <img className='GenereImages' src={language?.CategoryUrl} />
                    </div>
                )
                )
                }
            </Slider>
        </div>

    );
}