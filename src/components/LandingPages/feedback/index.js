import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';

import './style.css';
import Footer from '../../footerPage/footer';
import FeedbackOne from './feedback';


export default function Feedback() {
    const myRef = React.createRef() 

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='feedbackContainer'>
                <Grid>
                    <FeedbackOne />
                </Grid>
            </Grid>
            <Grid className='footerContainer'>
                <Grid >
                    <Footer />
                </Grid>
            </Grid>
        </div>
    );
}