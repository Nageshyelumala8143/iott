import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from "react-router";
import axios from "axios";
import { useState,useEffect } from "react";
import endpoints from '../../../hoc/config/endpoints';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

export default function PrivacyPolicy() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [data,setData]=useState([]);

    function privacyPolicyApi(){
        axios.get(`${endpoints.privacyPoilcy}?title=Privacy_Policy`).then((response)=>{
            if(response.status===200){
                 setData(response.data);

            }
        })

    }
    useEffect(()=>{privacyPolicyApi();},[])

    function handleHome() {
        navigate('/')
    }

    return (
        <div>
            <Grid item className="main-gridabout" container spacing={3}>
                <Grid item className="main-about" md={12} xs={12}>
                    <Grid item xs={1} md={1}  >
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    </Grid>
                    <Grid item xs={12} md={3} >
                        
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                        <div className="abouts-top">
                            <img className="img-fluid logo aboutus" src="images/logo.png" onClick={handleHome} alt="iottLogo" style={{ cursor: 'pointer' }} />

                        </div>
                    </Grid>
                    <Grid item xs={12} md={5} >
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                        {/* <h4 className="about-top-text">Wanna Know more about us? Check out here</h4> */}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="aboutus-content" container spacing={3}>
                <Grid className="about-content" item md={12} xs={12}>
                    <Grid item md={2}></Grid>
                    <Grid item md={8} xs={12}>
                    
                        <div >
                            <h5 className="about-title">{data?.Title?.replace("_"," ")}</h5>
                            <p className="privacydescription">{data?.Description}</p>
                           
                        </div>
                
                    </Grid>
                    <Grid item md={2}></Grid>
            </Grid>
            </Grid>

        </div>
    )
}