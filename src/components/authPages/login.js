import React from 'react';
import Header from '../headerPage/header';
import Footer from '../footerPage/footer';
import { useNavigate } from "react-router";


export default function Login() {

    const navigate = useNavigate();

    function signUp() {
        navigate('/sign-up');
    }

    function handleForgotPassword() {
        navigate('/reset-password');
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <section className="sign-in-page">
                    <div className="container">
                        <div className="row justify-content-center align-items-center height-self-center">
                            <div className="col-lg-5 col-md-12 align-self-center">
                                <div className="sign-user_card ">
                                    <div className="sign-in-page-data">
                                        <div className="sign-in-from w-100 m-auto">
                                            <h3 className="mb-3 text-center">Sign in</h3>
                                            <form className="mt-4" action="https://templates.iqonic.design/streamit/frontend/html/index.html">
                                                <div className="form-group">
                                                    <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" autocomplete="off" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control mb-0" id="exampleInputPassword2" placeholder="Password" required />
                                                </div>

                                                <div className="sign-info">
                                                    <button type="submit" className="btn btn-hover">Sign in</button>
                                                    <div className="custom-control custom-checkbox d-inline-block">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" for="customCheck">Remember Me</label>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center links">
                                            Don't have an account? <a onClick={signUp} style={{ cursor: 'pointer' }} className="text-primary ml-2">Sign Up</a>
                                        </div>
                                        <div className="d-flex justify-content-center links">
                                            <a onClick={handleForgotPassword} style={{ cursor: 'pointer' }} className="f-link">Forgot your password?</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}