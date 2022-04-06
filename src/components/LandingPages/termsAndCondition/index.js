import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';

import './style.css';
import Footer from '../../footerPage/footer';
import TermsAndConditionOne from './terms';


export default function TermsAndCondition() {
    const myRef = React.createRef() 

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='termsContainer'>
                <Grid>
                    <TermsAndConditionOne />
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