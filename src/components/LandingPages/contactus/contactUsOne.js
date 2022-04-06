import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from "react-router";
import axios from "axios";
import endpoints from '../../../hoc/config/endpoints';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CallIcon from '@mui/icons-material/Call';


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

export default function ContactUsOne() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    function handleHome() {
        navigate('/')
    }

    function aboutUsApi() {
        axios.get(`${endpoints.contactUs}`).then((response) => {
            if (response.status === 200) {
                setData(response.data);
            }
        })
    }

    useEffect(() => { aboutUsApi(); }, [])

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
                        <h4 className="about-top-text">ContactUs</h4>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className="aboutus-content" container spacing={3}>
                <Grid item className="about-content" md={12} xs={12}>
                    <Grid item md={3}></Grid>
                    <Grid item md={6} xs={12}>
                        <div >
                            <h5 className="about-title">{data?.Title?.replace("_", " ")}</h5>
                            <p>{data?.Description}</p>

                    
                                       <div className='row'>
                                           <div className='col-lg-5 mail-icon'>
                                           <a href="mailto:`${data?.Email}`"><MailOutlineIcon style={{color:'#fff'}}/><p style={{color:'#fff'}}>{data?.Email}</p></a>
                                         </div>
                                         <div className='col-lg-3 call-icon'>
                                         <a href="tel:+91`${data?.CallUs}`"> <CallIcon style={{color:'#fff'}}/><p style={{color:'#fff'}}>{data?.CallUs}</p></a>
                                         </div>
</div>
                        </div>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            </Grid>

        </div>
    )
}