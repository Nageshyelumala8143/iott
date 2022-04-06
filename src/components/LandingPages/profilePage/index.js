import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import ProfileA from './profilePageA';
import './style.css';


export default function Profile() {
    const myRef = React.createRef() 

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='mainContainer'>
                <p>Profile Page</p>
            </Grid>

            <div>
                <ProfileA />
            </div>
        </div>
    );
}