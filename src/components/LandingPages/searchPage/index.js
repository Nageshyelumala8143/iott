import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import SearchA from './searchA';
import './style.css';


export default function Search() {
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
                <p>Search Page</p>
            </Grid>

            <div>
                <SearchA />
            </div>
        </div>
    );
}