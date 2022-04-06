import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import WalletA from './walletA';
import './style.css';


export default function Wallet() {
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
                <p>Wallet Page</p>
            </Grid>

            <div>
                <WalletA />
            </div>
        </div>
    );
}