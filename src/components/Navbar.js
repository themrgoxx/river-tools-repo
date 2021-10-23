import React, { useState, useEffect } from 'react'
import '../css/navbar.scss'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import useAuth from '../hooks/useAuth'
import Trades from "./Trades";
import { inputAction } from '../redux/action/index';
import { toggler } from '../redux/action/index'
import { useDispatch, useSelector } from 'react-redux'
const Navbar = () => {
    const { account } = useWeb3React();
    const { login, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [tog, setTog] = useState(true);
    const [addressSearch, setAddressSearch] = useState('');
    localStorage.setItem('token', addressSearch);
    const data123 = localStorage.getItem('token');

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


    const Onchange = () => {
        setOpen1(true)
    }

    const oncloase = () => {
        setOpen1(false)
    }


    const searchbar = () => {
        if (open == false) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    const handleChangeCHeckbox = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        console.log("valueeeee:::", value)
    }



    const Mark = useSelector(state => state.Getmark.mark);
    console.log("mark", Mark)


    const Toggles = () => {
        if (Mark) {
            dispatch(toggler(false))
        } else {
            dispatch(toggler(true))
        }
    }


    // useEffect(() => {
    //   const getalldata=()=>{
    //     axios.post("http://192.168.18.65:8080/tokenStats",{address:addressSearch || "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"}).then((response)=>{
    //       console.log("get api",response)
    //     })
    // }
    //    getalldata();
    // },[addressSearch]);


    return (
        <>
            {open1 == true ?
                <div className={open1 == true ? 'menu-inner' : 'menu-inner1'}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <img src="\chrtapp-assets\river-tools-logo.svg" alt="" className="img-fluid" />
                        </div>
                        <div onClick={oncloase}>
                        <i class="far fa-window-close fa-2x"></i>
                        </div>
                    </div>
                    <div className="pt-5">
                        <h6 className="heading-m">RiverBoard</h6>
                        <ul>
                            <li className="fontee pt-3"><span className="mr-2"> <img src="/chrtapp-assets/home.png" alt="" className="img-fluid" /></span> HOME</li>
                            <li className="fontee"><span className="mr-2"> <img src="/chrtapp-assets/tools.png" alt="" className="img-fluid" /></span> RIVERTOOLS</li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h6 className="heading-m">OTHERS</h6>
                        <ul>
                            <li className="fontee pt-3"><span className="mr-2"> <img src="/chrtapp-assets/stats.png" alt="" className="img-fluid" /></span> STATS</li>
                            <li className="fontee"><span className="mr-2"> <img src="/chrtapp-assets/user.png" alt="" className="img-fluid" /></span> USER ACCOUNT</li>
                            <li className="fontee"><span className="mr-2"> <img src="/chrtapp-assets/settings.png" alt="" className="img-fluid" /></span> CONFIGURATIONS</li>

                        </ul>
                    </div>
                </div> : ''}

            <section className="main-header">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand" href="#">
                            <img src="\chrtapp-assets\river-tools-logo.svg" alt="" className="img-fluid" />
                        </a>
                        <div>
                            <button className="menu" onClick={Onchange}><i class="fas fa-bars" ></i></button>
                        </div>

                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a className="" type="button" onClick={ConnectionHandler}>
                                    {account ? <img src="\chrtapp-assets\wallet-icon-disconnect.svg" alt="" className="img-fluid for-xs2" /> : <img src="\chrtapp-assets\wallet-icon-connect.svg" alt="" className="img-fluid for-xs2" />}
                                    {/* <img src="\chrtapp-assets\search-icon.svg" alt="" className="img-fluid for-xs" /> */}
                                </a>
                            </li>
                            <li className="list-inline-item d-block d-sm-none">
                                {/* <div className="style-bar"></div> */}
                                <a className="" onClick={searchbar}  >
                                    <img src="\chrtapp-assets\search-icon.svg" alt="" className="img-fluid for-xs" />
                                </a>
                            </li>
                        </ul>
                        {open ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <div className="form-group">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">   <input type="text" value={addressSearch} onChange={(e) => { setAddressSearch(e.target.value) }}
                                                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Your token address" /></li>
                                            <li className="list-inline-item"><button onClick={() => dispatch(inputAction(addressSearch))} className="btn-common my-2 my-sm-0" >Search</button></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul> : <div></div>
                        }

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto d-sm-none d-md-block">
                                <li className="nav-item active">
                                    <div className="form-group">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">   <input type="email" value={addressSearch} onChange={(e) => { setAddressSearch(e.target.value) }}
                                                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Your token address" /></li>
                                            <li className=" abcs list-inline-item"><button onClick={() => dispatch(inputAction(addressSearch))} className="btn-common my-2 my-sm-0" >Search</button></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="btnn">
                            <form className="form-inline  my-2 my-lg-0">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <div>
                                            <span className="grey"><span><img src="/chrtapp-assets/solarbeam-logo.png"></img></span></span>
                                            &nbsp;&nbsp;
                                            <label class="switch">
                                                <input type="checkbox" checked={Mark} onClick={Toggles} />
                                                <span class="slider"></span>
                                            </label>
                                            &nbsp;&nbsp;
                                            <span className="grey"><img src="/chrtapp-assets/moonswap-logo.png"></img></span>
                                        </div>
                                    </li>
                                    <li className="list-inline-item ml-5  level">
                                        <button className={account ? 'btn-commons2 my-2 my-sm-0 hiiden_btn' : 'btn-commons1 my-2 my-sm-0 hiiden_btn'} onClick={ConnectionHandler}>{account ? 'DISCONNECT' : 'CONNECT WALLET'}</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </nav>
                    <div className="banner d-flex justify-content-center">
                        <img src="/chrtapp-assets/ad-banners.png"></img>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Navbar;
