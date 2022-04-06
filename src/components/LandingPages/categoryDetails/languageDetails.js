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


export default function LanguageCateory() {

    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    const { categoryName } = useParams();
    let detailsByCategory = atob(categoryName);


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

    function handleAllData(detailsByCategory) {
        axios.get(`${endpoints.getByCategory}?category=${detailsByCategory}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    useEffect(() => {
        handleAllData(detailsByCategory);
    }, [detailsByCategory])

    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }

    function handleViewAll() {
        let detailsName = btoa(detailsByCategory);
        navigate(`/viewall-details/${detailsName}`);
    }

    return (
        <div className='highlyRatedDiv'>
            <div className="iq-main-header d-flex align-items-center justify-content-between">
                <h4 className='main-title'>{detailsByCategory}</h4>
                <a className="iq-view-all" onClick={() => handleViewAll()}>View All</a>
            </div>
            <Slider {...settings}>
                {dataList.map((data, index) => (
                    <div className='highlyRatedslider'
                        onClick={() => handleDetailsPage(data?.Id)}
                        key={index + 1}
                    >
                        <img className='highlyRatedMovies' src={detailsByCategory === "Genere" ? data?.MoviePoster : data?.CategoryUrl} />
                    </div>
                )
                )
                }
            </Slider>
        </div>

    );
}