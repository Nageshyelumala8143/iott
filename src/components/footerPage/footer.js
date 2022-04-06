import React, { useEffect } from 'react';
import './style.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from "react-router";
import axios from 'axios';
import endpoints from '../../hoc/config/endpoints';
import { useState } from 'react';

export default function Footer() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);


    function handleAbout() {
        // navigate('/about-us');
        window.open('/about-us')
    }
    function handleFaq() {
        // navigate('/faqs');
        window.open('/faqs');
    }
    function handlePrivacy() {
        // navigate('/privacy-policy');
        window.open('/privacy-policy');
    }
    function handleTermsAndCondition() {
        // navigate('/terms-and-conditions');
        window.open('/terms-and-conditions');
    }
    function handleFeedback() {
        // navigate('/feedback');
        window.open('/feedback');
    }
    function handleHome() {
        navigate("/")
    }
    function handleContact() {
        // navigate('/contact-us');
        window.open('/contact-us');
    }
    function footerApi() {
        axios.get(`${endpoints.contactUs}`).then((response) => {
            if (response.status) {
                setData(response.data);
            }
        })
    }

    useEffect(() => { footerApi(); }, []);

    return (
        <div>
            <footer id="contact" className="footer-one iq-bg-dark">

                <div className="footer-top">
                    <div className="container-fluid">
                        <div className="row footer-standard">
                            <div className="col-lg-7">
                                <div className="widget text-left">
                                    <a onClick={handleHome}><img src="/images/footer/iott.png" className='footer-iott mobile' /></a>
                                    {/* <h1 className='footer-iott mobile'>I OTT</h1> */}
                                    <div className="menu-footer-link-1-container">
                                        <ul id="menu-footer-link-1" className="menu p-0">
                                            <li id="menu-item-7314" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7314">
                                                <a onClick={handleFaq} className="faq">Help</a>
                                            </li>
                                            <li id="menu-item-7316" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7316">
                                                <a onClick={handleFeedback} className="feedback">Feedback</a>
                                            </li>
                                            <li id="menu-item-7118" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7118">
                                                <a onClick={handleTermsAndCondition} className="terms">Terms and Conditions</a>
                                            </li>
                                            <li id="menu-item-7118" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7118">
                                                <a onClick={handlePrivacy} className="privacy">Privacy and Policy</a>
                                            </li>
                                            <li id="menu-item-7118" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7118">
                                                <a onClick={handleAbout} className="about-us">About Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="widget text-left">
                                    <div className="textwidget">
                                        <h6 className="footer-link-title">
                                            Follow Us :
                                        </h6>
                                        <ul className="info-share">
                                            <li className="facebook"><a target="_blank" href="#"><img src="/images/footer/facebook.png" /></a></li>
                                            <li className="facebook" ><a target="_blank" href="#"><img src="/images/footer/instagram.jpg" /></a></li>
                                            <li className="facebook"><a target="_blank" href="#"><img src="/images/footer/telegram.png" /></a></li>
                                            <li className="facebook"><a target="_blank" href="#"><img src="/images/footer/twitter.png" /></a></li>
                                            <li className="facebook"><a target="_blank" href="#"><img src="/images/footer/youtube.png" /></a></li>
                                        </ul>
                                        {/* <p><small>© 2021 STREAMIT. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited. All rights reserved.</small></p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 mt-4 mt-lg-0">


                            </div>
                            <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                                <div className="widget text-left">
                                    <div className="textwidget">
                                        <a onClick={() => handleHome()}> <img src="/images/footer/iott.png" className='footer-iott desktop' /></a>
                                        {/* <h1 className='footer-iott desktop'>I OTT</h1> */}
                                        <div className="contact-us">
                                            <div className='footer-contact'>
                                                <h6 className="footer-link-title" onClick={handleContact}>Contact Us</h6>
                                                <HeadsetMicIcon style={{ color: '#fff', fontSize: '30px' }} />
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-5 mail-icon'>
                                                    <a href="mailto:`${data?.Email}`"><MailOutlineIcon style={{ color: '#fff' }} /><p style={{ color: '#fff' }}>mail us</p></a>
                                                </div>
                                                <div className='col-lg-3 call-icon'>
                                                    <a href="tel:+91`${data?.CallUs}`"> <CallIcon style={{ color: '#fff' }} /><p style={{ color: '#fff' }}>call us</p></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center playstore">
                                            <a className="app-image" href="#">
                                                <img src="/images/footer/01.jpg" alt="play-store" />
                                            </a><br />
                                            <a className="ml-3 app-image" href="#"><img src="/images/footer/02.jpg" alt="app-store" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className='footercopyright'>
                <p className='copyright'>Copyright @2022 All rights reserved by Nitish software solutions</p>
            </div>
        </div>

    );
}