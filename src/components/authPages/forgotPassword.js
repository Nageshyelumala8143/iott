import React from 'react';
import Header from '../headerPage/header';
import Footer from '../footerPage/footer';

export default function ForgotPassword() {

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
                                            <h3 className="mb-3 text-center">Reset Password</h3>
                                            <p className="text-body">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                            <form className="mt-4" action="https://templates.iqonic.design/streamit/frontend/html/index.html">
                                                <div className="form-group">
                                                    <input type="email" className="form-control mb-0" id="exampleInputEmail2" placeholder="Enter email" autocomplete="off" required />
                                                </div>
                                                <div className="sign-info">
                                                    <button type="submit" className="btn btn-hover">Reset</button>
                                                </div>
                                            </form>
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