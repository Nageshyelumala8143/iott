import React, { useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from "react-router";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
}));

export default function FAQsOne() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);


    function handleHome() {
        navigate('/')
    }
    function handleMore() {
        setFlag(true);
    }
    function handleLess() {
        setFlag(false);
    }

    return (
        <div>
            <Grid className="main-gridabout" container spacing={3}>
                <Grid className="main-about" md={12} xs={12}>
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
                        <h4 className="faq-top-text"><span>Hey!</span> how can i help you</h4>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <Paper className={classes.paper}>xs=3</Paper> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="aboutus-content" container spacing={3}>
                <Grid className="about-content" item md={12} xs={12}>
                    <Grid className="faq-border" item md={6} xs={12}>
                        <div >
                            <h5 className="faq-title">FAQ</h5>
                            <Accordion className="faq-accordian">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading} style={{fontWeight:"bold"}}>Where Can I download I OTT?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    It's available on Android Google Play Store and Apple app Store with no charges.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="faq-accordian">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}style={{fontWeight:"bold"}}>Where can I register to I OTT?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    You can register to I OTT in register screen with required details.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="faq-accordian">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading} style={{fontWeight:"bold"}}>Where can I login to I OTT?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    You can Login to I OTT in Login screen with required registered details.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className="faq-accordian">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading} style={{fontWeight:"bold"}}>Does I OTT have content on regional languages?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    IOTT offers best content on available regional languages and with subtitles in some languages.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            {!flag ? <a onClick={handleMore} className="faq-more-less">more</a> : ""}
                            {flag ?
                                <div>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Can I download Content videos on I OTT?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            No, you cannot download the content videos to watch offline.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>


                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>How can I recharge my I OTT Wallet?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            Tap on the Wallet option, Add funds and by using Credit card, Debit card, Internet banking and UPI are accepted.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>How many days validity for a movie unlocked in IOTT?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            If the movie is once unlocked, it's absolutely free for your entire lifetime.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Can I install my IOTT account on new device?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            You can, but only one login for one account. You can your I OTT on your new phone with your settings, Watch list and movie unlocks unchanged.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>I made my transaction, but my wallet isn't recharged?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            We are sorry for that; it might be technical issues not reflecting on I OTT. If any technical failure the     amount will be credited to source within 7 business days
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Can I withdraw money from my I OTT account?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            No, once your wallet is topped up. It is non-refundable and you can use it unlock as many movies as you     can.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Issue during Register or Login on I OTT?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            We are very sorry at the first place. 
                                            Once check your internet connection and Enter Correct username and password. Remember only one login for one account.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>How can I change my registered mobile number?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            You cannot update the mobile number. If you want to login with your new mobile number you have to register with new mobile number.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Error while playing video?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            Stabilize your Internet connection and Try again. If you still haven't satisfied. Contact our Helpline service. We will resolve as soon as possible.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Any Hidden charges on I OTT?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            No Hidden charges at any Point.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="faq-accordian">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading} style={{fontWeight:"bold"}}>Can I set Personalize settings in I OTT?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                            You can personalize your watch list, your name in profile screen, Parental Controls and can track your history.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                  
                                    <a onClick={handleLess} className="faq-more-less">less</a></div> : ""}
                            <Accordion disabled>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography className={classes.heading}>Disabled Accordion</Typography>
                                </AccordionSummary>
                            </Accordion>
                        </div>

                    </Grid>
                    <Grid item md={6} xs={12}>
                        <div>
                            <div className="faq-search">
                                {/* <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                        <SearchIcon style={{color:'#000'}} />
                                        </div>
                                        <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        />
                                </div> */}
                            </div>
                            <div className="faq-question">
                                <h2 className="faq-question1">your Question</h2>
                           
                                <TextareaAutosize
                                    maxRows={6}
                                    aria-label="maximum height"
                                    placeholder="your text"
                                    defaultValue=""
                                    className="faq-text"
                                    />
                                
                               

                            </div>
                            <div className="faq-button">
                                    <Button variant="contained" className="faq-buttonsubmit">
                                            submit
                                        </Button>
                            </div>
                        </div>
                        
                    </Grid>

                </Grid>
            </Grid>

        </div>
    )
}