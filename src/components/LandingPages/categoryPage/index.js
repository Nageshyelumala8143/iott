import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../headerPage/header';
import CategoryA from './categoryA';
import './style.css';

export default function Category() {
    const myRef = React.createRef() 

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <div ref={myRef}>
            <Grid className="headerContainer">
                <Header />
            </Grid>
            <Grid className='mainContainer'>
                <p>Category Page</p>
            </Grid>

            <div>
                <CategoryA />
            </div>
        </div>
    );
}