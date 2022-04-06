import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../../hoc/config/endpoints';
import { Grid } from '@material-ui/core';
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


export default function ViewAllCateory() {

    const [dataList, setDataList] = useState([]);
    const navigate = useNavigate();
    const { detailsName } = useParams();
    let detailsByName = atob(detailsName);
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
        axios.get(`${endpoints.getAllCategory}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    function handleAllDataCategory(detailsByName) {
        axios.get(`${endpoints.getByGenere}?name=${detailsByName}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    function handleGetByLanguage(language) {
        axios.get(`${endpoints.getByLanguage}?Language=${language}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    function handleGetCollection(collection) {
        axios.get(`${endpoints.getCollection}?userid=${user?.Id}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }
    function handleSearch(search) {
        axios.get(`${endpoints.searchCollection}?Name=${search}`).then((response) => {
            if (response.status === 200) {
                setDataList(response.data);
            }
        })
    }

    useEffect(() => {
        if (detailsByName === "Genere") {
            handleAllData();
        } else if (detailsByName.includes("Language")) {
            handleGetByLanguage(detailsByName.split('-')[0])
        }
        else if (detailsByName === "Highly Rated Movies") {
            handleAllDataCategory("Highratedmovies");
        }
        else if (detailsByName === "Recently Released") {
            handleAllDataCategory("Recentlyreleased");
        }
        else if (detailsByName === "I OTT Picks For You") {
            handleAllDataCategory("iottpicksforyou");
        }
        else if (detailsByName === "Mostly Watched") {
            handleAllDataCategory("MostlyWatched");
        }
        else if (detailsByName === "Recommended Movies") {
            handleAllDataCategory("Recommendedmovies");
        }
        else if (detailsByName === "Free Movies") {
            handleAllDataCategory("Freemovies");
        }
        else if (detailsByName === "Trending Movies") {
            handleAllDataCategory("Trendingmovies");
        }
        else if (detailsByName === "Collection") {
            handleGetCollection("Collection");
        }
        else if (detailsByName.includes("Search")) {
            let search = detailsByName.split("-")[0];
            handleSearch(search);
        }
        else {
            handleAllDataCategory(detailsByName)
        }

    }, [detailsByName])

    function handleDetailsPage(id) {
        let videoById = btoa(id);
        navigate(`/details/${videoById}`)
    }
    function handleViewAll(Category) {
        let detailsName = btoa(Category);
        navigate(`/viewall-details/${detailsName}`);
    }
    return (
        <div className='highlyRatedDiv'>
            <div className="iq-main-header d-flex align-items-center justify-content-between">
                <h4 className='main-title'>
                    {detailsByName.includes("Language")
                        ? detailsByName.split('-')[0]
                        : detailsByName.includes("Search") ?
                            "Search History" :
                            detailsByName
                    }
                </h4>
            </div>
            <div className="iq-main-header d-flex align-items-center justify-content-between">
                {detailsByName.includes("Search") ?
                    <h4 className='main-title'>
                        Suggestions
                    </h4>
                    : ""
                }
            </div>
            <Grid item className="main-gridview" container spacing={3}>
                <Grid item className="main-view" md={12} xs={12}>
                    {dataList.map((data, index) => (
                        <Grid item className="main-view" md={2} xs={12}
                            onClick={() => { detailsByName === "Genere" ? handleViewAll(data.CategoryName) : handleDetailsPage(data?.Id) }}
                            key={index + 1}
                        >
                            {detailsByName === "Genere" ?
                                <img className='highlyRatedMovies' src={data?.CategoryUrl} />
                                :
                                <img className='highlyRatedMovies' src={data?.MoviePoster} />
                            }
                        </Grid>
                    )
                    )
                    }
                </Grid>
            </Grid>
        </div>

    );
}