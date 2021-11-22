import React, { useEffect, useState } from 'react'
import '../css/maintile.scss';
import { useWeb3React } from '@web3-react/core'
import { Link } from "react-router-dom";
import axios from 'axios';
import { inputAction } from '../redux/action/index';
import { API_URL } from '../utils/Environment'
import { useSelector, useDispatch } from 'react-redux';
const Trades = () => {
    const { account } = useWeb3React();
    const dispatch = useDispatch()
    var date = new Date;
    // const n=date.getTime()
    // console.log('sfsdf',n)
    date.setDate(date.getDate() - 13);
    const Mark = useSelector(state => state.Getmark.mark);

  
    // const inputToken = localStorage.getItem('token');

    const counter = useSelector(state => state.Getinput.input);
    const address = counter ? counter : '0x5853ccBDc428d5fC9F8C1d3599B252C88477b460'

    const [promoted, setpromoted] = useState([])
    const getdata = () => {
        if (Mark == true) {
            axios.get(`${API_URL}/solarbeam/trades/` + address)
                .then((response) => {
                        setpromoted(response.data.swaps)
                    // setUserDetail(response.data.detail.user)
                    // setOpen(true)
                })
        } else {
            axios.get(`${API_URL}/moonswap/trades/` + address)
                .then((response) => {
                    setpromoted(response.data.swaps)
                    // setUserDetail(response.data.detail.user)
                    // setOpen(true)
                })
        }

    }



    useEffect(() => {
        getdata();
    }, [counter, Mark])

  

    const PromortedTab = promoted.map(elem => {
        let d = parseInt(elem?.timestamp)
        let de = new Date(d * 1000)
        // setName(elem?.pair.token0.symbol)
        return (
            <tr className={elem.sender == elem.to ? 'green' : 'red'}>
                <td className="">
                    <h6 className="grey yoyo">{(de.toDateString())}</h6>
                </td>
                <td className=""><h6 className={elem.sender == elem.to ? 'green' : 'red'}>{elem.sender == elem.to ? 'Buy' : 'Sell'}</h6></td>
                <td className=""><h6 className="grey yoyo">$ {parseFloat(elem?.amountUSD).toFixed(4)}</h6></td>
                {!Mark ?
                <>
                <td className=""><h6 className="grey yoyo"> {parseFloat(elem.amount0In != 0 ? elem?.amount0In : elem.amount0Out).toFixed(4)} {elem?.pair.token0.symbol}</h6></td>
                <td className=""><h6 className="grey yoyo">{parseFloat(elem.amount1Out != 0 ? elem?.amount1Out : elem.amount1In).toFixed(4)} {elem?.pair.token1.symbol}</h6></td>
                </>
:
                <>
                <td className=""><h6 className="grey yoyo">{parseFloat(elem.amount1Out != 0 ? elem?.amount1Out : elem.amount1In).toFixed(4)} {elem?.pair.token1.symbol}</h6></td>
                <td className=""><h6 className="grey yoyo"> {parseFloat(elem.amount0In != 0 ? elem?.amount0In : elem.amount0Out).toFixed(4)} {elem?.pair.token0.symbol}</h6></td>
                </>
    }
                {/* <td className=""><h6 className="grey yoyo">2.00</h6></td> */}
                <td className=""><h6 className="grey yoyo"> <a href={`https://moonriver.moonscan.io/address/` + elem?.sender} target='_blank'>{elem?.sender}</a></h6></td>
                {/* + de.getDate()+" UTC "+ de.getUTCDate() */}
                {/* <td className=""><h6 className="grey yoyo">12</h6></td> */}
            </tr>

        )
    });

    

    return (
        <div className="main">
            <div className="row">
                <div className="col-sm-12">
                    <div className="head-tile">
                        <ul className="nav nav-pills nav-pills-res mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item  ">
                                <a className="btn-black active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Trade History</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn-black" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">My position</a>
                            </li>
                            <li className="nav-item">
                                <a className=" btn-black" id="pills-liquid-tab" data-toggle="pill" href="#pills-liquid" role="tab" aria-controls="pills-liquid" aria-selected="false">Price Alert</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="row">
                                    <div className="col-sm-12 p0">
                                        <div className="table-responsive12">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="grey">Date</th>
                                                        <th scope="col" className="grey">Type</th>
                                                        <th scope="col" className="grey">Amount USD</th>
                                                        <th scope="col" className="grey">Amount </th>
                                                        <th scope="col" className="grey">Amount</th>
                                                        {/* <th scope="col" className="grey">Total MOVR</th> */}
                                                        <th scope="col" className="grey">Maker</th>
                                                        {/* <th scope="col" className="grey">Others</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {data[0] ? tableData: null} */}
                                                    {PromortedTab.length > 0 ? PromortedTab : ''}
                                                    {/*                                                 
                                                                <tr>
                                                                    <td className="">
                                                                        
                                                                        <h6 className="grey yoyo">2021-03-71 12:15:36 PM</h6>
                                                                    </td>
                                                                    <td className=""><h6 className="grey yoyo">Buy</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">$0.2356485215</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">0.00038704</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">5,167,3724</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">2.00</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">0xc569dd...433e</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">12</h6></td>
                                                                </tr><tr>
                                                                    <td className="">
                                                                        
                                                                        <h6 className="grey yoyo">2021-03-71 12:15:36 PM</h6>
                                                                    </td>
                                                                    <td className=""><h6 className="grey yoyo">Buy</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">$0.2356485215</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">0.00038704</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">5,167,3724</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">2.00</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">0xc569dd...433e</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">12</h6></td>
                                                                </tr><tr>
                                                                    <td className="">
                                                                        
                                                                        <h6 className="grey yoyo">2021-03-71 12:15:36 PM</h6>
                                                                    </td>
                                                                    <td className=""><h6 className="grey yoyo">Buy</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">$0.2356485215</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">0.00038704</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">5,167,3724</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">2.00</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">0xc569dd...433e</h6></td>
                                                                    <td className=""><h6 className="grey yoyo">12</h6></td>
                                                                </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className="row">
                                    <div className="col-sm-12 p0">
                                        ....
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="pills-liquid" role="tabpanel" aria-labelledby="pills-liquid-tab">
                                <div className="row">
                                    <div className="col-sm-12 p0">
                                        ...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Trades
