import React, { useState, useEffect } from 'react'
import '../css/navbar.scss'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux';
import Trades from "./Trades";

import { inputAction } from '../redux/action/index';
import { useDispatch } from 'react-redux'
const Navbar = () => {
    const { account } = useWeb3React();
    const { login, logout } = useAuth();
    const counter = useSelector(state => state.Getinput.input);
    console.log("countrttrt",counter)
    const dispatch = useDispatch()
    //   const balance = useTokenBalance();
    //   const busdBalance = new BigNumber(getBalanceNumber(balance, 9)).multipliedBy(0).toNumber();
    const ConnectionHandler = () => {
        if (account) {
            logout()
        } else {
            login("injected")
        }
    }
 

    const [open, setOpen] = useState(true);
    const [addressSearch, setAddressSearch] = useState('');
    localStorage.setItem('token', addressSearch);
    const data123 = localStorage.getItem('token');
    console.log('addresssss in navbar', data123);
    // useEffect(() => {
    //   const getalldata=()=>{
    //     axios.post("http://192.168.18.65:8080/tokenStats",{address:addressSearch || "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"}).then((response)=>{
    //       console.log("get api",response)
    //     })
    // }
    //    getalldata();
    // },[addressSearch]);


    return (
        <section className="main-header">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">
                        <img src="river-tools-logo.svg" alt="" className="img-fluid" />
                    </a>
                    
                    <ul className="list-inline">
                        <li className="list-inline-item">
                       <a className=""  type="button" onClick={ConnectionHandler}>
                                                    {account ? <img src="\chrtapp-assets\wallet-icon-disconnect.svg" alt="" className="img-fluid for-xs2" /> : <img src="\chrtapp-assets\wallet-icon-connect.svg" alt="" className="img-fluid for-xs2" />} 
                        {/* <img src="\chrtapp-assets\search-icon.svg" alt="" className="img-fluid for-xs" /> */}
                       </a>
                        </li>
                            
                            <li className="list-inline-item d-block d-sm-none">
                            <div className="style-bar" onClick={() => setOpen(false)}></div>
                                <a className="" onClick={() => setOpen(true)} >
                                    <img src="\chrtapp-assets\search-icon.svg" alt="" className="img-fluid for-xs" />
                                </a>
                            </li>
                    </ul>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {open ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <div className="form-group">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">   <input type="email" value={addressSearch} onChange={(e) => { setAddressSearch(e.target.value) }}
                                                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Your token address" /></li>
                                            <li className="list-inline-item"><button onClick={() => dispatch(inputAction(addressSearch))} className="btn-common my-2 my-sm-0" >Search</button></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul> : <div></div>
                        }


                    </div>

                    <div className="btnn">
                        <form className="form-inline  my-2 my-lg-0">
                            <ul className="list-inline">
                                {/* <li className="list-inline-item mr20">
                                    <a className="" href="/">
                                        <img src="chrtapp-nav.svg" alt="" className="img-fluid w40" />
                                        &nbsp;
                                        <span className="common">$0.789</span>
                                    </a>
                                </li> */}
                                {/* <li className="list-inline-item mr20">
                                                       <div className="bg">
                                                           <a className="" href="/">
                                                               <img src="\chrtapp-assets\settings.svg" alt="" className="img-fluid"/>    
                                                           </a>
                                                       </div>
                                                   </li> */}
                                <li className="list-inline-item">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <button className="btn-common my-2 my-sm-0" type="button" onClick={ConnectionHandler}>
                                                {account ? "Disconnect Wallet" : "Connect Wallet"} </button>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                </nav>


            </div>
        </section>
    )
}

export default Navbar;
