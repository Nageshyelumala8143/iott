import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InputIcon from '@mui/icons-material/Input';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OtpInput from "react-otp-input";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsSystemDaydreamRounded } from "@material-ui/icons";
import axios from "axios";
import endpoints from "../../hoc/config/endpoints";
import { CommentsDisabledOutlined } from "@mui/icons-material";


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
export default function Header() {

    const [mobile, setMobile] = useState("");
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [register, setRegister] = useState(false);
    const [otp, setOtp] = useState("");
    const [checked, setChecked] = useState(false);
    const [user, setUser] = useState("");
    const [userPro, setUserPro] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [loginOtp, setLoginOtp] = useState("");
    const [loginError, setLoginError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchName, setSearchName] = useState("");
    const [count, setCount] = useState('');
    const [notificationCount, setNotificationCount] = useState("");

    let auth = JSON.parse(localStorage.getItem('user'));


    function handleHome() {
        navigate('/')
    }
    function handleFaq() {
        navigate('/faqs');
    }

    // function handleLogin() {
    //     navigate('/login')
    // }


    useEffect(() => {
        window.setInterval(function () {
            auth = JSON.parse(localStorage.getItem("user"));
        }, 1000);
        if (auth) {
            handleCollection(auth?.Id);
            handleNotifications();
        }
    }, [auth]);


    const handleChange = (event) => {
        setChecked(!checked);
    };


    const handleRegisterOpen = () => {
        setOpen(false);
        setRegister(true);
    }

    const handleRegisterClose = () => {
        setRegister(false);
        setLoginError("");
        setErrorMessage("");
    }
    const handleClickOpen = () => {
        setOpen(true);
        setRegister(false);
        setLoginError("");
        setErrorMessage("");
    };
    const handleClose = () => {
        setOpen(false);
        setLoginError("");
        setErrorMessage("");
    };
    const handleterms = () => {
        navigate("/terms-and-conditions");
    }

    function handleContact() {
        navigate('/contact-us');
    }
    function handleHelp() {
        navigate("/faqs")
    }
    const handleMobileNo = (e) => {
        const re = /^[0-9]+$/g;

        if ((e.target.value === '' || re.test(e.target.value)) && (e.target.value.length <= 10)) {
            setMobile(e.target.value)

        }

    }
    const handleMobileNoLogin = (e) => {
        const re = /^[0-9]+$/g;

        if ((e.target.value === '' || re.test(e.target.value)) && (e.target.value.length <= 10)) {
            setMobileNumber(e.target.value)

        }

    }
    function handleRegisterOtp() {
        const object = {
            PhoneNo: mobile,
            Name: name

        }
        axios.post(`${endpoints.register}`, object).then((response) => {
            if (response.status === 200) {
                setOtp(response.data[0].message);
            }
            else {
                setLoginError(response.data[0].message);
            }

        }
        )
            .catch((error) => {
                setLoginError("Already Registered");
            })
    }

    function handleLoginOtp() {
        const object = {
            PhoneNo: mobileNumber
        }
        axios.post(`${endpoints.register}`, object).then((response) => {
            if (response.status === 200) {
                setLoginOtp(response?.data[0]?.message);
            } else {
                setErrorMessage(response?.data[0]?.message);
            }

        })
            .catch((error) => {
                setErrorMessage("User not found");
            })

    }

    function handleLoginUser() {
        const object = {
            PhoneNo: mobileNumber,
            OTP: loginOtp
        }
        axios.post(`${endpoints.verifyUser}`, object).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data[0]));
                setUser(response.data[0]);
                setMobileNumber("");
                setLoginOtp("");
                setLoginError("");
                setErrorMessage("");
                setOpen(false);
                setRegister(false);
                window.location.reload(false);



            }
        })

    }

    function handleChangeOtp(otp) {
        setOtp(otp);
    }

    function handleSignUp() {
        const object = {
            PhoneNo: mobile,
            OTP: otp
        }
        axios.post(`${endpoints.verifyUser}`, object).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data[0]));
                setUser(response.data[0]);
                setMobile("");
                setName("");
                setOtp("");
                setLoginError("");
                setErrorMessage("");
                setChecked(false);
                setOpen(false);
                setRegister(false);

            }
        })
    }
    function handleLogout() {
        auth = null;
        localStorage.removeItem("user");
        setUser("");
        setUserPro("");
        setLoginOtp("");
        setLoginError("");
        setErrorMessage("");
        window.location.reload(false);
    }
    useEffect(() => {
        if (user) {
            setUserPro(JSON.parse(localStorage.getItem("user")));
        }

    }, [user])

    function handleCollection(Id) {
        axios.get(`${endpoints.getCollection}?userid=${Id}`).then((response) => {
            if (response.status === 200) {
                setCount(response.data.length);
            }
        })
    }

    function handleLogin() {
        setOpen(true);
        setLoginError("");
        setErrorMessage("");
    }
    useEffect(() => {
        if (loginOtp) {
            handleLoginUser();
        }
    }, [loginOtp])

    function handleMyCollection() {
        let detailsByName = btoa('Collection');
        navigate(`/viewall-details/${detailsByName}`)

    }

    function handleAction(genereName) {
        let detailsByName = btoa(genereName);
        navigate(`/viewall-details/${detailsByName}`)
    }

    function handleSearch(event) {
        setSearchName(event.target.value);
        let detailsByName = btoa(event.target.value + '- Search');
        navigate(`/viewall-details/${detailsByName}`);
    }

    function handleMyNotifications() {
        navigate('/notification');
    }

    function handleNotifications() {
        axios.get(`${endpoints.getAllNotifications}`).then((response) => {
            if (response.status === 200) {
                setNotificationCount(response.data.length);
            }
        })
    }

    return (
        <div>
            <header id="main-header">
                <div className="main-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <nav className="navbar navbar-expand-lg navbar-light p-0">
                                    <a href="#" className="navbar-toggler c-toggler" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                        <div className="navbar-toggler-icon" data-toggle="collapse">
                                            <span className="navbar-menu-icon navbar-menu-icon--top"></span>
                                            <span className="navbar-menu-icon navbar-menu-icon--middle"></span>
                                            <span className="navbar-menu-icon navbar-menu-icon--bottom"></span>
                                        </div>
                                    </a>
                                    <a className="navbar-brand">
                                        <img
                                            className="img-fluid logo"
                                            src="/images/logo.png"
                                            onClick={handleHome}
                                            alt="iottLogo"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </a>

                                    {/* <div className="mobile-more-menu">
                                        <a className="more-toggle" id="dropdownMenuButton"
                                            data-toggle="more-toggle" aria-haspopup="true" aria-expanded="false">
                                            <i className="ri-more-line"></i>
                                        </a>
                                        <div className="more-menu" aria-labelledby="dropdownMenuButton">
                                            <div className="navbar-right position-relative">
                                                <ul className="d-flex align-items-center justify-content-end list-inline m-0">
                                                    <li>
                                                        <a href="#" className="search-toggle">
                                                            <i className="ri-search-line"></i>
                                                        </a>
                                                        <div className="search-box iq-search-bar">
                                                            <form action="#" className="searchbox">
                                                                <div className="form-group position-relative">
                                                                    <input type="text" className="text search-input font-size-12"
                                                                        placeholder="type here to search..." />
                                                                    <i className="search-link ri-search-line"></i>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </li>
                                                    <li className="nav-item nav-icon">
                                                        <a href="#" className="search-toggle position-relative">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22"
                                                                height="22" className="noti-svg">
                                                                <path fill="none" d="M0 0h24v24H0z" />
                                                                <path
                                                                    d="M18 10a6 6 0 1 0-12 0v8h12v-8zm2 8.667l.4.533a.5.5 0 0 1-.4.8H4a.5.5 0 0 1-.4-.8l.4-.533V10a8 8 0 1 1 16 0v8.667zM9.5 21h5a2.5 2.5 0 1 1-5 0z" />
                                                            </svg>
                                                            <span className="bg-danger dots"></span>
                                                        </a>
                                                        <div className="iq-sub-dropdown">
                                                            <div className="iq-card shadow-none m-0">
                                                                <div className="iq-card-body">
                                                                    <a href="#" className="iq-sub-card">
                                                                        <div className="media align-items-center">
                                                                            <img src="images/notify/thumb-1.jpg" className="img-fluid mr-3"
                                                                                alt="streamit" />
                                                                            <div className="media-body">
                                                                                <h6 className="mb-0 ">Boop Bitty</h6>
                                                                                <small className="font-size-12"> just now</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <a href="#" className="iq-sub-card">
                                                                        <div className="media align-items-center">
                                                                            <img src="images/notify/thumb-2.jpg" className="img-fluid mr-3"
                                                                                alt="streamit" />
                                                                            <div className="media-body">
                                                                                <h6 className="mb-0 ">The Last Breath</h6>
                                                                                <small className="font-size-12">15 minutes ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <a href="#" className="iq-sub-card">
                                                                        <div className="media align-items-center">
                                                                            <img src="images/notify/thumb-3.jpg" className="img-fluid mr-3"
                                                                                alt="streamit" />
                                                                            <div className="media-body">
                                                                                <h6 className="mb-0 ">The Hero Camp</h6>
                                                                                <small className="font-size-12">1 hour ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="iq-user-dropdown search-toggle d-flex align-items-center">
                                                            <img src="images/user/user.jpg" className="img-fluid avatar-40 rounded-circle"
                                                                alt="user" />
                                                        </a>
                                                        <div className="iq-sub-dropdown iq-user-dropdown">
                                                            <div className="iq-card shadow-none m-0">
                                                                <div className="iq-card-body p-0 pl-3 pr-3">
                                                                    <a href="manage-profile.html" className="iq-sub-card setting-dropdown">
                                                                        <div className="media align-items-center">
                                                                            <div className="right-icon">
                                                                                <i className="ri-file-user-line text-primary"></i>
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-0 ">Manage Profile</h6>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <a href="setting.html" className="iq-sub-card setting-dropdown">
                                                                        <div className="media align-items-center">
                                                                            <div className="right-icon">
                                                                                <i className="ri-settings-4-line text-primary"></i>
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-0 ">Settings</h6>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <a href="pricing-plan-1.html" className="iq-sub-card setting-dropdown">
                                                                        <div className="media align-items-center">
                                                                            <div className="right-icon">
                                                                                <i className="ri-settings-4-line text-primary"></i>
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-0 ">Pricing Plan</h6>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <a href="login.html" className="iq-sub-card setting-dropdown">
                                                                        <div className="media align-items-center">
                                                                            <div className="right-icon">
                                                                                <i className="ri-logout-circle-line text-primary"></i>
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-0">Logout</h6>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <div className="menu-main-menu-container">
                                            <ul id="top-menu" className="navbar-nav ml-auto">
                                                <li className="nav-item nav-icon">
                                                    <a href="#" className="search-toggle device-search">
                                                        <i className="ri-search-line"></i>
                                                    </a>
                                                    <div className="search-box iq-search-bar d-search">
                                                        <form action="#" className="searchbox">
                                                            <div className="form-group position-relative">
                                                                <input
                                                                    type="text"
                                                                    className="text search-input font-size-12"
                                                                    placeholder="type here to search..."
                                                                    value={searchName}
                                                                    onChange={(e) => handleSearch(e)}
                                                                />
                                                                <i className="search-link ri-search-line"></i>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </li>
                                                <li
                                                    className="menu-item"
                                                    onClick={handleHome}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <a className="Home">Home</a>
                                                </li>
                                                <li
                                                    className="menu-item genere"
                                                // onClick={handleHome}
                                                // style={{ cursor: 'pointer' }}
                                                >
                                                    <a>Genere</a>
                                                    <ul className="dropdown">
                                                        <li onClick={() => handleAction('Action')} style={{ cursor: 'pointer' }}>Action</li>
                                                        <li onClick={() => handleAction('Adventures')} style={{ cursor: 'pointer' }}>Adventure</li>
                                                        <li onClick={() => handleAction('Horror')} style={{ cursor: 'pointer' }}>Horror</li>
                                                        <li onClick={() => handleAction('Devotional')} style={{ cursor: 'pointer' }}>Devotional</li>
                                                        <li onClick={() => handleAction('Comedy')} style={{ cursor: 'pointer' }}>Comedy</li>
                                                        <li onClick={() => handleAction('Romance')} style={{ cursor: 'pointer' }}>Romance</li>
                                                        <li onClick={() => handleAction('Drama')} style={{ cursor: 'pointer' }}>Drama</li>
                                                        <li onClick={() => handleAction('Thriller')} style={{ cursor: 'pointer' }}>Thriller</li>
                                                    </ul>
                                                </li>
                                                <li
                                                    className="menu-item genere"
                                                // onClick={handleHome}
                                                // style={{ cursor: 'pointer' }}
                                                >
                                                    <a>More</a>
                                                    <ul className="dropdown more">
                                                        <li onClick={() => auth ? handleMyNotifications() : ""} style={{ cursor: 'pointer' }}>
                                                            Notification
                                                            {auth ? <span className="notification-count">{notificationCount ? notificationCount : ""}</span> : ""}
                                                        </li>
                                                        <li>watch History</li>
                                                        <li className="parental">parental control

                                                            <div className="toggle-switch">
                                                                <input type="checkbox" className="checkbox"
                                                                    name={"parental control"} id={"parental control"} />
                                                                <label className="label" htmlFor={"parental control"}>
                                                                    <span className="inner" />
                                                                    <span className="switch" />
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li className="system-language">System language

                                                            <ButtonGroup color="primary" aria-label="primary button group" className="btngrp">
                                                                <Button className="english">ENG</Button>
                                                                <Button className="english">TEL</Button>
                                                                <Button className="english">HIN</Button>
                                                            </ButtonGroup>
                                                        </li>
                                                        <li
                                                            className="cotanct"
                                                            onClick={handleContact}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            Contact us
                                                        </li>
                                                        <li className="help" onClick={handleHelp}>Help</li>

                                                    </ul>
                                                </li>
                                                {/* <li
                                                    className="menu-item"
                                                // onClick={handleHome}
                                                >
                                                    <a>Blog</a>
                                                    <ul className="sub-menu">
                                                        <li
                                                            className="menu-item"
                                                            onClick={handleHome}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <a>
                                                                Blog
                                                            </a>
                                                        </li>
                                                        <li
                                                            className="menu-item"
                                                            onClick={handleHome}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <a>
                                                                Blog details
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li> */}
                                                <li
                                                    className="menu-item"
                                                // onClick={handleHome}
                                                // style={{ cursor: 'pointer' }}
                                                >
                                                    <a className="profile-main">Profile</a>
                                                    <ul className="dropdown profile">
                                                        <li className="profile image" >
                                                            <a>
                                                                <img src={auth?.ProfileImg} alt="profile" className="profile-img" />
                                                            </a>
                                                            <p>{auth?.Name}</p>
                                                            <p>{auth?.PhoneNo}</p>
                                                        </li>
                                                        <li className="edit-profile">
                                                            <a>Edit Profile Picture</a>
                                                        </li>
                                                        <li className="my-collection">
                                                            <a onClick={() => auth ? handleMyCollection() : ""} style={{ cursor: 'pointer' }}>My Collection</a>
                                                            {auth ? <span className="collection-count">{count ? count : ""}</span> : ""}
                                                        </li>
                                                        <li className="logut-btn">
                                                            <a> <Button variant="contained" onClick={() => auth ? handleLogout() : handleLogin()} className="profile-btn">
                                                                {auth ? "Logout" : "Login"}
                                                            </Button></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="navbar-right menu-right">
                                        <ul className="d-flex align-items-center list-inline m-0">

                                            <a className="iq-sub-card setting-dropdown">
                                                <div
                                                    className="media align-items-center"

                                                    onClick={auth ? "" : handleClickOpen}
                                                    // disabled={userPro?true:false}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="right-icon">
                                                        < InputIcon
                                                            disabled={auth ? true : false}
                                                        />
                                                    </div>

                                                </div>
                                                <div>
                                                    <Dialog fullScreen={fullScreen} className="dialog-box" aria-labelledby="customized-dialog-title" open={open}>

                                                        <DialogContent dividers>
                                                            <Grid className="main-gridfeedback" container spacing={3}>
                                                                <Grid item md={12} xs={12} className="main-dialog" >
                                                                    <Grid item md={2} xs={12}></Grid>
                                                                    <Grid item md={4} xs={12} className="first-section">
                                                                        <div className="logo-iott">
                                                                            <img
                                                                                className="img-fluid logo1"
                                                                                src="/images/logo.png"
                                                                                onClick={handleHome}
                                                                                alt="iottLogo"
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </div>
                                                                        <h5>Hey if you are new you can register here</h5>
                                                                        <a onClick={handleRegisterOpen}><h5 className="register-redirection">Click here to Register</h5></a>
                                                                    </Grid>


                                                                    <Grid item md={4} xs={12} className="second-section">
                                                                        <CloseIcon onClick={handleClose} style={{ color: '#000', cursor: 'poiner', float: 'right', marginRight: '38px', marginTop: '15px', fontSize: '25px' }} />
                                                                        <h4 className="login-text">Login</h4>
                                                                        <Typography
                                                                            style={{ color: 'red' }}>
                                                                            {errorMessage ?
                                                                                <>
                                                                                    {errorMessage + " "}
                                                                                    <a
                                                                                        onClick={handleRegisterOpen}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                    >
                                                                                        <span style={{ color: 'rgb(0 0 0)' }}>
                                                                                            Click here to Register
                                                                                        </span>
                                                                                    </a>
                                                                                </>
                                                                                : ""}
                                                                        </Typography>
                                                                        <div className="login">
                                                                            <Typography>Phone Number</Typography>
                                                                            <TextField
                                                                                type="tel"
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                error={isError}
                                                                                className="number-text"
                                                                                value={mobileNumber}

                                                                                onChange={(e) => handleMobileNoLogin(e)}
                                                                                InputProps={{
                                                                                    startAdornment: <InputAdornment position="start">
                                                                                        +91
                                                                                    </InputAdornment>,
                                                                                    endAdornment: <ArrowRightAltIcon onClick={() => handleLoginOtp()} style={{ color: '#000', cursor: "pointer" }} />,
                                                                                }}
                                                                            >
                                                                            </TextField>
                                                                        </div>
                                                                        <div className="otp-filed">
                                                                            <span className="opt-text">OTP</span>
                                                                            <OtpInput
                                                                                className="opt"
                                                                                onChange={otp => setLoginOtp(otp)}
                                                                                numInputs={4}
                                                                                value={loginOtp}
                                                                                separator={<span>-</span>}
                                                                            />
                                                                        </div>
                                                                        <Button
                                                                            variant="contained"
                                                                            onClick={() => handleLoginUser()}
                                                                            className="login-button">
                                                                            Login
                                                                        </Button>
                                                                        <a onClick={handleFaq} className="faq"><h5>Help</h5></a>
                                                                    </Grid>
                                                                    <Grid item md={2} xs={12}></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </DialogContent>

                                                    </Dialog>
                                                </div>
                                                <div>
                                                    <Dialog fullScreen={fullScreen} className="dialog-box" aria-labelledby="customized-dialog-title" open={register}>

                                                        <DialogContent dividers>
                                                            <Grid className="main-gridfeedback" container spacing={3}>
                                                                <Grid item md={12} xs={12} className="main-dialog" >

                                                                    <Grid item md={2} xs={12}></Grid>

                                                                    <Grid item md={4} xs={12} className="register-second">
                                                                        <h4 className="login-text">Register</h4>
                                                                        <Typography
                                                                            style={{ color: 'red' }}>
                                                                            {loginError ?
                                                                                <>
                                                                                    {loginError + " "}
                                                                                    <a
                                                                                        onClick={handleClickOpen}
                                                                                        style={{ cursor: 'pointer' }}
                                                                                    >
                                                                                        <span style={{ color: 'rgb(0 0 0)' }}>
                                                                                            Click here to Login
                                                                                        </span>
                                                                                    </a>
                                                                                </>
                                                                                : ""}
                                                                        </Typography>
                                                                        <Typography>Name</Typography>
                                                                        <TextField margin="dense"
                                                                            value={name || ""}
                                                                            onChange={(e) => setName(e.target.value)}
                                                                            className="name-filed"
                                                                            variant="outlined"
                                                                        />
                                                                        <Typography>Phone Number</Typography>
                                                                        <TextField
                                                                            type="tel"
                                                                            margin="dense"
                                                                            variant="outlined"
                                                                            error={isError}
                                                                            className="number-text"
                                                                            value={mobile}

                                                                            onChange={(e) => handleMobileNo(e)}
                                                                            InputProps={{
                                                                                startAdornment: <InputAdornment position="start">
                                                                                    +91
                                                                                </InputAdornment>,
                                                                                endAdornment: <ArrowRightAltIcon onClick={() => handleRegisterOtp()} style={{ color: '#000', cursor: "pointer" }} />,
                                                                            }}
                                                                        >
                                                                        </TextField>
                                                                        <div className="otp-filed">
                                                                            <span className="opt-text">OTP</span>
                                                                            <OtpInput
                                                                                className="opt"
                                                                                onChange={handleChangeOtp}
                                                                                numInputs={4}
                                                                                value={otp}
                                                                                separator={<span>-</span>}
                                                                            />
                                                                        </div>
                                                                        <div className="check-box">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={checked}
                                                                                        onChange={handleChange}
                                                                                        name="checkedB"
                                                                                        color="primary"
                                                                                    />
                                                                                }

                                                                            /><span>TermsAndCondition <span onClick={handleterms} className="terms">click here</span></span>
                                                                        </div>
                                                                        <Button
                                                                            disabled={checked ? false : true}
                                                                            onClick={() => handleSignUp()}
                                                                            variant="contained"
                                                                            className="login-button">
                                                                            Register
                                                                        </Button>
                                                                        <a onClick={handleFaq} className="faq"><h5>Help</h5></a>
                                                                    </Grid>

                                                                    <Grid item md={4} xs={12} className="register first-section">
                                                                        <CloseIcon onClick={handleRegisterClose} style={{ color: '#fff', cursor: 'poiner', float: 'right', marginRight: '38px', marginTop: '15px', fontSize: '25px' }} />
                                                                        <div className="logo-iott">
                                                                            <img
                                                                                className="img-fluid logo1"
                                                                                src="images/logo.png"
                                                                                onClick={handleHome}
                                                                                alt="iottLogo"
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </div>
                                                                        <h5>Hey if you are new you can register here</h5>
                                                                        <a onClick={handleClickOpen}><h5 className="login-redirection">Click here to Login</h5></a>
                                                                    </Grid>
                                                                    <Grid item md={2} xs={12}></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </DialogContent>

                                                    </Dialog>
                                                </div>


                                            </a>

                                        </ul>
                                    </div>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}