import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/maintile.scss';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils/Environment'
import axios from 'axios';
const Sidebar = () => {
    const [getallTokens, setAllTokens] = useState([])
    const [copied, setCopied] = useState(false);
    const [social, setSocial] = useState();
    const [getholders, setGetholders] = useState()
    const counter = useSelector(state => state.Getinput.input);
    const Mark = useSelector(state => state.Getmark.mark);
    const address = counter ? counter : '0x5853ccBDc428d5fC9F8C1d3599B252C88477b460'
    const Get_data1 = `
    {
        token(id: "${address.toLowerCase()}"){
          name
          symbol
          decimals
          derivedETH
          tradeVolumeUSD
          totalLiquidity
          txCount
        }
       }`


    const getdata = async () => {
        if (Mark == true) {
            // const queryResult = await axios.get('https://thegraph.com/hosted-service/subgraph/moonfarmin/moonswap-dex/', { query: Get_data1 });
            // console.log("ressss::::::::",queryResult)
            axios.get(`${API_URL}/solarbeam/tokenDetails/` + address)
                .then((response) => {
                    setAllTokens(response.data)
                    // setUserDetail(response.data.detail.user)
                    // setOpen(true)

                })
        } else {
            axios.get(`${API_URL}/moonswap/tokenDetails/` + address)
                .then((response) => {
                    setAllTokens(response.data)
                    // setUserDetail(response.data.detail.user)
                    // setOpen(true)

                })
        }
    }
    const copy = () => {
        setTimeout(
            function () {
                setCopied(false)
            },
            1000
        );

    }


    const holders = () => {
        axios.get("https://api.covalenthq.com/v1/1285/tokens/" + address + "/token_holders/?key=ckey_2c226135fcc8473d83a4916ce94")
            .then((response) => {
                setGetholders(response.data.data.pagination.total_count)
            })
    }

    const getsocial = () =>{
        axios.get(`${API_URL}/socials/` + address)
        .then((response) => {
            setSocial(response.data)

        })
    }


    useEffect(() => {
        getdata();
        holders()
        getsocial()
    }, [address, Mark])

    // const account = getallTokens.id ? getallTokens.id : '0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B'
    // const account = getallToken ? getallToken.Accounts ? getallToken.Accounts.length > 0 ? getallToken.Accounts[0]?.id : '' : '' : "";

    return (
        <div className="main">
            <div className="head-tile">
                <div className="row">
                    <div className="col-sm-12 p-0">
                        <div className="inner-wallet outer-main">
                            <div className="left">
                                <h4 className="white">{getallTokens?.name}
                                    <p>{address == "" ? "" : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
                                        <span >  <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
                                            <button id="anim" type="button" class="ssa" data-toggle="tooltip" data-placement="left" title="Copy Address">
                                                <div onClick={copy}>{copied == true ? <p className="copy">Copied</p> : <i class="far fa-clone" ></i>} </div>
                                            </button>
                                        </CopyToClipboard></span>
                                    </p>
                                </h4>
                                {/* <p>{getallToken.id}</p> */}
                             
                            </div>
                            <div className="outerss">
                                <div className="socisls">
                                    <div className="inner">
                                        <a href={social?.telegram} target="_blank"><i class="fab fa-telegram-plane"></i></a>
                                    </div>
                                    <div className="inner">
                                        <a href={social?.twitter} target="_blank"><i class="fab fa-twitter"></i></a>
                                    </div>
                                    <div className="inner">
                                        <a href={social?.website} target="_blank"> <i class="fas fa-window-maximize"></i></a>
                                    </div>
                                </div>
                                {/* <div className="yellow d-flex">
                                    <div className="inner">
                                        <i class="fas fa-share-alt"></i>
                                    </div>
                                    <div className="inner">
                                        <i class="fas fa-share-alt"></i>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="up-wallet">
                            <div className="left">
                                <h5><i class="fas fa-arrow-alt-circle-up"></i>${getallTokens.priceUSD ? new Intl.NumberFormat().format(parseFloat(getallTokens.priceUSD).toFixed(5)) : ''}</h5>
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
                                <p>Holders:</p>
                                <p>Diluted Market Cap:</p>
                            </div>
                            <div className="rights text-right">
                                <p>$ {getallTokens.totalLiquidityUSD ? new Intl.NumberFormat().format(parseFloat(getallTokens.totalLiquidityUSD).toFixed(3)) : '0'}</p>
                                <p>$ {getallTokens.dailyVolumeUSD ? new Intl.NumberFormat().format(parseFloat(getallTokens.dailyVolumeUSD).toFixed(3)) : '0'}</p>
                                <p>MOVR {getallTokens.totalLiquidityETH ? new Intl.NumberFormat().format(parseFloat(getallTokens.totalLiquidityETH).toFixed(3)) : '0'}</p>
                                <p>{getallTokens.symbol}</p>
                                <p>{getallTokens.txCount ? new Intl.NumberFormat().format(getallTokens.txCount) : '0'}</p>
                                <p>{getholders ? getholders : '0'}</p>
                                <p>${getallTokens.dailyVolumeToken ? new Intl.NumberFormat().format(parseFloat(getallTokens.dailyVolumeToken * getallTokens.priceUSD).toFixed(3)) : '0'}</p>
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
