import React, { useEffect, useState } from 'react'
import '../css/maintile.scss';
import { useWeb3React } from '@web3-react/core'
import axios from 'axios';
import { inputAction } from '../redux/action/index';
import { useSelector,useDispatch } from 'react-redux';

const Trades = () => {
    const { account } = useWeb3React();
    const dispatch = useDispatch()
    var date = new Date;
    // const n=date.getTime()
    // console.log('sfsdf',n)
    date.setDate(date.getDate() - 13);
    const d = new Date()
    const [data, setData] = useState([]);
    const [YourTrades, setYourTrades] = useState([]);
    // const inputToken = localStorage.getItem('token');

    const counter = useSelector(state => state.Getinput.input);
    const address = counter ? counter : '0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B'

    const [promoted, setpromoted] = useState([])

    const getdata = () => {
        axios.get("http://ec2-54-213-239-106.us-west-2.compute.amazonaws.com:21000/trades/" + address)
            .then((response) => {
                setpromoted(response.data.swaps)
                // setUserDetail(response.data.detail.user)
                // setOpen(true)

            })
    }

    console.log("ssdfds",promoted)
 

    useEffect(() => {
        getdata();
    }, [counter])

    // const liquidityV2decimal = alldata.liquidityV2;
    // const liquidityV2BNB = alldata.liquidityV2BNB;
    // var dg=data.block.timestamp.time;
    // var dy=dg.toLocaleString()
    // console.log("dsdfassd",dy)

    // const tableData = data.map(elem => {
    //     const t=elem.block.timestamp.time;
    //     const localdate= new Date(t)
    //     const de =  new Date(localdate.getTime()+localdate.getTimezoneOffset()*60*1000)
    //     const offset = localdate.getTimezoneOffset() / 60;
    //     const hours = localdate.getHours();
    //     const lcl=de.setHours(hours - offset);
    //     const dateNew=new Date(lcl)

    //     const { block, baseAmount, quoteAmount } = elem
    //     return (
    //         <tr>
    //             <td className="">
    //                 <h6 className={elem.buyCurrency.symbol === elem.baseCurrency.symbol ? 'red' : 'green'}>{dateNew.toString().split('GMT')[0]}</h6>
    //             </td>
    //             <td className="green"><h6 className="grey yoyo">{baseAmount.toFixed(3)} / {elem.baseCurrency.symbol}</h6></td>
    //             <td className="green"> <h6 className="grey yoyo">{quoteAmount.toFixed(3)} BNB</h6></td>
    //             {/* <td className="green">{elem.baseCurrency.symbol}<h6 className="grey yoyo">{quoteAmount} BNB</h6></td> */}
    //         </tr>
    //     )
    // });

    // const newlisting = listing.map(elem => {
    //     return (
    //         <tr>
    //             <td className="grey yoyo">
    //                 {elem.baseTokenName}</td>
    //             {/* <td>{elem.baseTokenSymbol} </td> */}
    //             <td className="grey yoyo">{elem.quoteLiquidity.toFixed(3)} BNB</td>
    //             <td className="grey yoyo">{elem.baseTokenSymbol} / {elem.quoteTokenSymbol}</td>
    //         </tr>
    //     )
    // });
    // const newtrending = trending.map(elem => {
    //     return (
    //         <tr>
    //             <td className="grey yoyo">{elem.currency.name}</td>
    //             <td className="grey yoyo">{elem.currency.symbol}</td>
    //             <td className="grey yoyo">{elem.count}</td>
    //         </tr>
    //     )
    // });

    const PromortedTab = promoted.map(elem => {
        const d = parseInt(elem?.timestamp)
        const date= new Date(d)
        return (
            <tr>
            <td className="">
                <h6 className="grey yoyo">{(date.toString().split('GMT')[0])}</h6>
            </td>
            {/* <td className=""><h6 className="grey yoyo">Buy</h6></td> */}
            <td className=""><h6 className="grey yoyo">{elem?.amountUSD}</h6></td>
            <td className=""><h6 className="grey yoyo">{elem?.amount0In}</h6></td>
            <td className=""><h6 className="grey yoyo">{elem?.amount1Out}</h6></td>
            {/* <td className=""><h6 className="grey yoyo">2.00</h6></td> */}
            <td className=""><h6 className="grey yoyo">{elem?.sender}</h6></td>
            
            {/* <td className=""><h6 className="grey yoyo">12</h6></td> */}
        </tr>

        )
    });

    // const tabletrades = YourTrades.map(elem => {
    //     const { block, baseAmount, quoteAmount, quotePrice } = elem
    //     return (
    //         <tr>
    //             <td className="grey yoyo">
    //                 <h6 className={elem.baseCurrency.symbol === elem.quoteCurrency.symbol ? 'green' : 'red'}>{block.timestamp.time}</h6>
    //             </td>
    //             <td className="green"><h6 className="grey yoyo">{baseAmount.toFixed(3)}    / {elem.baseCurrency.symbol}</h6></td>
    //             <td className="green"> <h6 className="grey yoyo">{quoteAmount.toFixed(3)} BNB</h6></td>
    //             {/* <td className="green">{elem.baseCurrency.symbol}<h6 className="grey yoyo">{quoteAmount} BNB</h6></td> */}
    //         </tr>
    //     )
    // });


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
                                                        {/* <th scope="col" className="grey">Type</th> */}
                                                        <th scope="col" className="grey">Price USD</th>
                                                        <th scope="col" className="grey">Token Price</th>
                                                        <th scope="col" className="grey">Amount</th>
                                                        {/* <th scope="col" className="grey">Total MOVR</th> */}
                                                        <th scope="col" className="grey">Sender</th>
                                                        {/* <th scope="col" className="grey">Others</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {data[0] ? tableData: null} */}
                                                    {PromortedTab ? PromortedTab : ''}
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
