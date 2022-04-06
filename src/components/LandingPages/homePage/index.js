import React from "react";
import Header from '../../headerPage/header';
import './style.css';
import HomeSlider from './carousel';
import Grid from '@material-ui/core/Grid';
import HighlyRated from './highlyRated';
import Languages from './languages';
import Action from './action';
import Footer from '../../footerPage/footer';
import Suggested from './suggested';
import Trending from './trending';
import Recommended from './recommended';
import RecentlyReleased from "./recentlyReleased";
import IottPicks from "./iottPicks";
import MostlyWatched from "./mostlyWatched";
import RecommendedMovies from "./recommendedMovies";
import FreeMovies from "./freeMovies";
import TrendingMovies from "./trendingMovies";
import Drama from "./drama";


export default function Home() {
    const myRef = React.createRef() 

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='carouselContainer'>
                <Grid>
                    <HomeSlider />
                </Grid>
            </Grid>
            <Grid className='highlyRatedContainer'>
                <Grid >
                    <HighlyRated />
                </Grid>
            </Grid>
            
            <Grid className='actionContainer'>
                <Grid >
                    <Action />
                </Grid>
            </Grid>
            <Grid className='highlyRatedContainer'>
                <Grid >
                    <RecentlyReleased />
                </Grid>
            </Grid>
            <Grid className='highlyRatedContainer'>
                <Grid >
                    <IottPicks />
                </Grid>
            </Grid>
            <Grid className='highlyRatedContainer'>
                <Grid >
                    <MostlyWatched />
                </Grid>
            </Grid>
            <Grid className='LanguageContainer'>
                <Grid >
                    <Languages />
                </Grid>
            </Grid>
            <Grid className='suggestedContainer'>
                <Grid >
                    <RecommendedMovies />
                </Grid>
            </Grid>
            <Grid className='suggestedContainer'>
                <Grid >
                    <FreeMovies />
                </Grid>
            </Grid>
            <Grid className='suggestedContainer'>
                <Grid >
                    <TrendingMovies />
                </Grid>
            </Grid>
            <Grid className='suggestedContainer'>
                <Grid >
                    <Suggested />
                </Grid>
            </Grid>
            <Grid className='suggestedContainer'>
                <Grid >
                    <Drama />
                </Grid>
            </Grid>
            
            <Grid className='recommendedContainer'>
                <Grid >
                    <Recommended />
                </Grid>
            </Grid>
            <Grid className='trendingContainer'>
                <Grid >
                    <Trending />
                </Grid>
            </Grid>
            <Grid className='footerContainer'>
                <Grid >
                    <Footer />
                </Grid>
            </Grid>
            <Grid>
                <Grid>
                    <div id="back-to-top">
                        <a className="top" href="#top" id="top"> <i className="fa fa-angle-up"></i> </a>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}