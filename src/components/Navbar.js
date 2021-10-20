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
        <section className="main-header">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">
                        <img src="river-tools-logo.svg" alt="" className="img-fluid" />
                    </a>

                    <ul className="list-inline">
                        {/* <li className="list-inline-item">
                            <a className="" type="button" onClick={ConnectionHandler}>
                                {account ? <img src="\chrtapp-assets\wallet-icon-disconnect.svg" alt="" className="img-fluid for-xs2" /> : <img src="\chrtapp-assets\wallet-icon-connect.svg" alt="" className="img-fluid for-xs2" />}
                                <img src="\chrtapp-assets\search-icon.svg" alt="" className="img-fluid for-xs" />
                            </a>
                        </li> */}
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
                                        <span className="grey">Solarbeam</span>
                                        &nbsp;&nbsp;
                                        <label class="switch">
                                            <input type="checkbox" checked={Mark} onClick={Toggles} />
                                            <span class="slider"></span>
                                        </label>
                                        &nbsp;&nbsp;
                                        <span className="grey">moonswap</span>
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
