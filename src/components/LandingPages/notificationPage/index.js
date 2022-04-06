import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import './style.css';
import Footer from '../../footerPage/footer';
import NotificationPage from './notificationPage';


export default function Notification() {
    const myRef = React.createRef()

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='viewContainer'>
                <Grid>
                    <NotificationPage />
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