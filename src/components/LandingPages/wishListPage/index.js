import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import WishListA from './wishListA';
import './style.css';


export default function WishList() {
    const myRef = React.createRef()

    React.useEffect(() => {
        myRef.current.scrollTo(0, 0);
    }, [])

    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='mainContainer'>
                <p>WishList Page</p>
            </Grid>
            <div>
                <WishListA />
            </div>
        </div>
    );
}