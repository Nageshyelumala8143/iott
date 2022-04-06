import React from 'react';
import { useNavigate } from "react-router";
import Header from '../headerPage/header';
import Footer from '../footerPage/footer';


export default function Register() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate('/login');
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
                            <div className="col-lg-7 col-md-12 align-self-center">
                                <div className="sign-user_card ">
                                    <div className="sign-in-page-data">
                                        <div className="sign-in-from w-100 m-auto">
                                            <form className="" action="index.html">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Username</label>
                                                            <input type="text" className="form-control mb-0" id="exampleInputEmail2" placeholder="Enter Full Name" autocomplete="off" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>E-mail</label>
                                                            <input type="email" className="form-control mb-0" id="exampleInputEmail3" placeholder="Enter email" autocomplete="off" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>First Name</label>
                                                            <input type="text" className="form-control mb-0" id="exampleInputEmail2" placeholder="First Name" autocomplete="off" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Last Name</label>
                                                            <input type="email" className="form-control mb-0" id="exampleInputEmail3" placeholder="Last Name" autocomplete="off" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Password</label>
                                                            <input type="password" className="form-control mb-0" id="exampleInputPassword2" placeholder="Password" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Repeat Password</label>
                                                            <input type="password" className="form-control mb-0" id="exampleInputPassword2" placeholder="Password" required />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="custom-control custom-radio mt-2">
                                                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                                                    <label className="custom-control-label" for="customRadio1">Premium-$39 / 3 Months
                                                        with a 5 day free trial</label>
                                                </div>
                                                <div className="custom-control custom-radio mt-2">
                                                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                                    <label className="custom-control-label" for="customRadio2"> Basic- $19 / 1 Month</label>
                                                </div>
                                                <div className="custom-control custom-radio mt-2">
                                                    <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" />
                                                    <label className="custom-control-label" for="customRadio3">Free-Free</label>
                                                </div>

                                                <button type="submit" className="btn btn-hover my-2">Sign Up</button>

                                            </form>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center links">
                                            Already have an account? <a onClick={handleLogin} style={{ cursor: 'pointer' }} className="text-primary ml-2">Sign In</a>
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
    );
}