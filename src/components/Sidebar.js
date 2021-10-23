import React, { useEffect, useState } from 'react'
import '../css/maintile.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Sidebar = () => {
    const [getallTokens, setAllTokens] = useState([])
    const counter = useSelector(state => state.Getinput.input);
    const Mark = useSelector(state => state.Getmark.mark);
    const address= counter ? counter : '0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B'

       const getdata = () => {
        if(Mark== false){
            axios.get("http://ec2-54-213-239-106.us-west-2.compute.amazonaws.com:21000/solarbeam/tokenDetails/" + address)
            .then((response) => {
                setAllTokens(response.data)
                // setUserDetail(response.data.detail.user)
                // setOpen(true)

            })
        }else{
            axios.get("http://ec2-54-213-239-106.us-west-2.compute.amazonaws.com:21000/moonswap/tokenDetails/" + address)
            .then((response) => {
                setAllTokens(response.data)
                // setUserDetail(response.data.detail.user)
                // setOpen(true)
    
            })
        }
    }





    useEffect(() => {
        getdata();
    }, [address, Mark])

    const account = getallTokens.id ? getallTokens.id : '0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B'
    // const account = getallToken ? getallToken.Accounts ? getallToken.Accounts.length > 0 ? getallToken.Accounts[0]?.id : '' : '' : "";


    return (
        <div className="main">
            <div className="head-tile">
                <div className="row">
                    <div className="col-sm-12 p-0">
                        <div className="inner-wallet outer-main">
                            <div className="left">
                                <h4 className="white">{getallTokens?.name} <i class="far fa-clone"></i></h4>
                                {/* <p>{getallToken.id}</p> */}
                                 <p>{account == "" ? "" : `${account.substring(0, 6)}...${account.substring( account.length - 4 )}`}</p>
                            </div>
                            <div className="outerss">
                                <div className="socisls">
                                    <div className="inner">
                                        <i class="fab fa-telegram-plane"></i>
                                    </div>
                                    <div className="inner">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div className="inner">
                                        <i class="fab fa-github"></i>
                                    </div>
                                </div>
                                <div className="yellow d-flex">
                                    <div className="inner">
                                        <i class="fas fa-share-alt"></i>
                                    </div>
                                    <div className="inner">
                                        <i class="fas fa-share-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="up-wallet">
                            <div className="left">
                                <h5><i class="fas fa-arrow-alt-circle-up"></i>${getallTokens.priceUSD ? new Intl.NumberFormat().format(parseFloat(getallTokens.priceUSD).toFixed(3))  : ''}</h5>
                            </div>
                            <div className="right">
                                <button>Buy / Sell</button>
                            </div>
                        </div>
                        <div className="lower-contentt d-flex justify-content-between">
                            <div className="lefts">
                                <p>Total Liquidity($):</p>
                                <p>Daily volume:</p>
                                <p>MOVR Liquidity:</p>
                                <p>Symbol:</p>
                                <p>Total tx:</p>
                                <p>Diluted Market Cap:</p>
                            </div>
                            <div className="rights text-right">
                                <p>$ { getallTokens.totalLiquidityUSD ? new Intl.NumberFormat().format(parseFloat(getallTokens.totalLiquidityUSD).toFixed(3))  : '0'}</p>
                                <p>$ { getallTokens.dailyVolumeUSD ?  new Intl.NumberFormat().format(parseFloat(getallTokens.dailyVolumeUSD).toFixed(3))  : '0' }</p>
                                <p>MOVR { getallTokens.totalLiquidityETH ?  new Intl.NumberFormat().format(parseFloat(getallTokens.totalLiquidityETH).toFixed(3))  : '0'}</p>
                                <p>{getallTokens.symbol}</p>
                                <p>{getallTokens.txCount ? new Intl.NumberFormat().format (getallTokens.txCount) : '0'}</p>
                                <p>$ { getallTokens.dailyVolumeToken ?  new Intl.NumberFormat().format(parseFloat(getallTokens.dailyVolumeToken * getallTokens.priceUSD).toFixed(3))  : '0'}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-sm-12 col-6 p-0 text-right">
                        <div className="inner-bg">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <div className="bg">
                                        <a className="" href="">
                                            <img src="\chrtapp-assets\heart-fillde.svg" alt="" className="img-fluid w40" />
                                        </a>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="bg">
                                        <a className="" href="">
                                            <img src="\chrtapp-assets\reload-icon.svg" alt="" className="img-fluid w40" />
                                        </a>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div> */}

                </div>
                <div className="brdr"></div>
                {/* {!account ?
                    <div className="row" >
                        <div className="col-sm-12 text-center">
                            <div className="inner-wallet">
                                <p className="grey just-textp">Connect your wallet to see your tokens.</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-sm-12 p0">
                            <div className="table-responsive1">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="grey">Tokens</th>
                                            <th scope="col" className="grey">Price</th>
                                            <th scope="col" className="grey">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {token_data}

                                        <tr>
                                    <td>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <img src="\chrtapp-assets\heart-fillde.svg" alt="" className="img-fluid img11 w40" />
                                            </li>
                                            <li className="list-inline-item">
                                                <h6 className="white yoyo">HERO</h6>
                                                <h6 className="common yoyo">Metahero</h6>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="common yoyo">$0.0143828</td>
                                    <td>
                                        <h6 className="white yoyo">$143.017M</h6>
                                        <h6 className="common yoyo">$120.00</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <img src="\chrtapp-assets\heart-fillde.svg" alt="" className="img-fluid img11 w40" />
                                            </li>
                                            <li className="list-inline-item">
                                                <h6 className="white yoyo">HERO</h6>
                                                <h6 className="common yoyo">Metahero</h6>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="common yoyo">$0.0143828</td>
                                    <td>
                                        <h6 className="white yoyo">$143.017M</h6>
                                        <h6 className="common yoyo">$120.00</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <img src="\chrtapp-assets\heart-outline.svg" alt="" className="img-fluid img11 w40" />
                                            </li>
                                            <li className="list-inline-item">
                                                <h6 className="white yoyo">HERO</h6>
                                                <h6 className="common yoyo">Metahero</h6>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="common yoyo">$0.0143828</td>
                                    <td>
                                        <h6 className="white yoyo">$143.017M</h6>
                                        <h6 className="common yoyo">$120.00</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <img src="\chrtapp-assets\heart-outline.svg" alt="" className="img-fluid img11 w40" />
                                            </li>
                                            <li className="list-inline-item">
                                                <h6 className="white yoyo">HERO</h6>
                                                <h6 className="common yoyo">Metahero</h6>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="common yoyo">$0.0143828</td>
                                    <td>
                                        <h6 className="white yoyo">$143.017M</h6>
                                        <h6 className="common yoyo">$120.00</h6>
                                    </td>
                                </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default Sidebar
