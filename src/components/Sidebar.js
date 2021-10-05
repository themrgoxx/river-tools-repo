import React, { useEffect, useState } from 'react'
import '../css/maintile.scss';
import { useWeb3React } from '@web3-react/core'
import axios from 'axios';
const Sidebar = () => {
    const { account } = useWeb3React();
    const [getallToken, setAllTokens] = useState([])
    const Get_data = `
      {
        ethereum(network: bsc) {
          address(address: {is: "${account}" }){
            balances {
              value
              currency {
                address
                symbol
                tokenType
              }
            }
          }
        }
      }`
    const fetchData = async () => {
        if (account) {
            const queryResult = await axios.post('https://graphql.bitquery.io/', { query: Get_data });
            if (queryResult.data.data) {
                setAllTokens(queryResult.data.data.ethereum.address[0].balances)
            }
        }
    }

    const token_data = getallToken.map((elem) => {
        const { currency, value } = elem;
        return (
            <>
                <tr>
                    <td>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <h6 className="white yoyo">{currency.symbol}</h6>
                            </li>
                        </ul>
                    </td>
                    {/* <td className="common yoyo">{currency.symbol}</td> */}
                    <td>
                        <h6 className="white yoyo">{value}</h6>
                        {/* <h6 className="common yoyo">$120.00</h6> */}
                    </td>
                </tr>
            </>
        )
    })

    useEffect(() => {
        fetchData();
    }, [account])


    return (
        <div className="main">
            <div className="head-tile d-none d-sm-block">
                <div className="row">
                    <div className="col-sm-12 col-6 p-0">
                        <div className="inner-wallet">
                            <h4 className="white">My Wallet</h4>
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
                {!account ?
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
                                            {/* <th scope="col" className="grey">Price</th> */}
                                            <th scope="col" className="grey">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {token_data}

                                        {/* <tr>
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
                                </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Sidebar