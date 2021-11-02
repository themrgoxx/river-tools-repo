import React, { useState } from 'react'
import '../../css/login.scss'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const Login = () => {
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })
    const { username, password } = inputs;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubbmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (username && password) {
            axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/admin/Login", { username, password })
                .then((response) => {
                    const token = response.data.token
                    localStorage.setItem('mytoken', token)
                    history.push("/promoted");

                });
        }
    }

    return (
        <>
            <section className="signin ptb">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4">
                            <div className="inner-content">
                                <div className="inner-logo text-center">
                                    <a className="" >
                                        <img src="\logo.svg" alt="" className="img-fluid" />
                                    </a>
                                </div>

                                <div className="inner-tile">
                                    <h4 className="white">Sign In</h4>
                                    <h6 className="grey ptb20">Enter your credentials to access your account</h6>
                                    <div class="form-group">
                                        <label className="common" for="exampleInputEmail1">Username</label>
                                        <input type="text" name="username" value={username} onChange={handleChange} className={'form-control white' + (submitted && !username ? ' is-invalid' : '')}  placeholder="Username" />
                                        {submitted && !username &&
                                            <div className="invalid-feedback">Username is required</div>
                                        }
                                    </div>
                                    <div class="form-group">
                                        <label className="common" for="exampleInputEmail1">Password</label>
                                        <input type="password" name="password" value={password} onChange={handleChange} className={'form-control white' + (submitted && !password ? ' is-invalid' : '')}  placeholder="Enter password" />
                                        {submitted && !password &&
                                            <div className="invalid-feedback">Password is required</div>
                                        }
                                    </div>
                                    <div class="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="white form-check-label" for="exampleCheck1">Remember me</label>
                                    </div>
                                    <div className="">
                                        <a className="btn-common" onClick={handleSubbmit} href="/Promoted">Sign In</a>
                                    </div>
                                    <div className="ptb20 text-center">
                                        <a className="common">Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </section>
        </>
    )
}