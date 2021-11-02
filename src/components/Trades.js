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
    const [getallToken, setAllTokens] = useState([])


    const Get_data1 = `
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
    const fetchData1 = async () => {
        if (account) {
            const queryResult = await axios.post('https://graphql.bitquery.io/', { query: Get_data1 });
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
                                <img src="\chrtapp-assets\heart-fillde.svg" alt="" className="img-fluid img11 w40" />
                            </li>
                            <li className="list-inline-item">
                                <h6 className="white yoyo">{currency.symbol}</h6>
                                <h6 className="common yoyo">Metahero</h6>
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

    const counter = useSelector(state => state.Getinput.input);

    const someaccount = !account ? "0x000000000000000000000000000000000000dEaD" : account

    const Get_trades = `
    {
        ethereum(network: bsc) {
          dexTrades(
            options: {desc: ["block.height", "tradeIndex"], limit: 10, offset: 0}
            date: {since: "2019-03-03", till: null}
            txSender: {is: "${someaccount}"}
            baseCurrency: {is: "${counter}"}
            quoteCurrency : {is : "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
          ) {
            block {
              timestamp {
                time(format: "%Y-%m-%d %H:%M:%S")
              }
              height
            }
            tradeIndex
            baseAmount
            baseCurrency {
              address
              symbol
            }
            quoteAmount
            quoteCurrency {
              address
              symbol
            }
            buyCurrency {
              symbol
              address
              name
            }
            quotePrice
            exchange {
              fullName
            }
            sellCurrency {
              name
              address
              symbol
            }
            price
          }
        }
      }`


    const Get_data = `
    {
        ethereum(network: bsc) {
            dexTrades(
              options: {desc: ["block.height", "tradeIndex"], limit: 10, offset: 0}
              date: {since: "2021-08-03", till: null}
              baseCurrency: {is: "${counter}"}
              quoteCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
            ) {
              block {
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
                height
              }
              tradeIndex
              protocol
              exchange {
                fullName
              }
              smartContract {
                address {
                  address
                  annotation
                }
              }
              baseAmount
              baseCurrency {
                address
                symbol
                decimals
                name
              }
              quotePrice
              quoteAmount
              quoteCurrency {
                address
                symbol
              }
              transaction {
                hash
              }
              price
              buyCurrency {
                name
                symbol
              }
              sellCurrency {
                name
                symbol
                decimals
                address
              }
            }
          }
    }`

    const Get_trending = `
    {
        ethereum(network: bsc) {
          transfers(
            options: {desc: "count", limit: 15, offset: 0}
            amount: {gt: 0}
            date: {since: "${date.toISOString()}", till: "${d.toISOString()}"}
            currency: {notIn: ["BNB", "WBNB", "BTCB", "ETH", "BUSD", "USDT", "USDC", "DAI"]}
          ) {
            currency {
              symbol
              address
              name
            }
            count
            senders: count(uniq: senders)
            receivers: count(uniq: receivers)
            days: count(uniq: dates)
            from_date: minimum(of: date)
            till_date: maximum(of: date)
            amount
          }
        }
    }`

    const [alldata, setalldata] = useState({
        address: '',
        price: '',
        change: '',
        volume: '',
        liquidityV2: '',
        liquidityV2BNB: ''
    });
    const [trending, settrending] = useState([{
        currency: {
            name: '',
            symbol: ''
        },
        amount: '',
        count: ''
    }]);
    const [listing, setlisting] = useState([{
        baseLiquidity: '',
        baseTokenAddress: '',
        baseTokenName: '',
        baseTokenSymbol: '',
        quoteLiquidity: 0.0,
        quoteTokenAddress: '',
        quoteTokenName: '',
        quoteTokenSymbol: ''
    }]);
    const [promoted, setpromoted] = useState([])
    const fetchData = async () => {
        if (counter) {
            const queryResult = await axios.post('https://graphql.bitquery.io/', { query: Get_data });
            if (queryResult.data.data) {
                setData(queryResult.data.data.ethereum.dexTrades)

            }
        }
    }

    const yourtrades = async () => {
        if (counter) {
            const queryResult = await axios.post('https://graphql.bitquery.io/', { query: Get_trades });
            if (queryResult.data.data) {
                setYourTrades(queryResult.data.data.ethereum.dexTrades)

            }
        }
    }
    const getNewListing = () => {
        axios.get("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/newListed")
            .then((response) => {
                setlisting(response.data)
            });
    }

    const getTableData = () => {
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/chartStats", { address: counter || "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" })
            .then((response) => {
                setalldata(response.data)
            });
    }

    const getTrending = async () => {
        const queryResult = await axios.post('https://graphql.bitquery.io/', { query: Get_trending });
        if (queryResult.data.data) {
            settrending(queryResult.data.data.ethereum.transfers)
        }
    }

    const getPromoted = () => {
        axios.get("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/promotions")
            .then((response) => {
                setpromoted(response.data.promotions)
            });
    }

    useEffect(() => {
        fetchData();
        getTableData();
        yourtrades();
        getTrending();
        getNewListing();
        fetchData1();
        getPromoted();
    }, [counter])

    const liquidityV2decimal = alldata.liquidityV2;
    const liquidityV2BNB = alldata.liquidityV2BNB;
    // var dg=data.block.timestamp.time;
    // var dy=dg.toLocaleString()
    // console.log("dsdfassd",dy)

    const tableData = data.map(elem => {
        const t=elem.block.timestamp.time;
        const localdate= new Date(t)
        const de =  new Date(localdate.getTime()+localdate.getTimezoneOffset()*60*1000)
        const offset = localdate.getTimezoneOffset() / 60;
        const hours = localdate.getHours();
        const lcl=de.setHours(hours - offset);
        const dateNew=new Date(lcl)

        const { block, baseAmount, quoteAmount } = elem
        return (
            <tr>
                <td className="">
                    <h6 className={elem.buyCurrency.symbol === elem.baseCurrency.symbol ? 'red' : 'green'}>{dateNew.toString().split('GMT')[0]}</h6>
                </td>
                <td className="green"><h6 className="grey yoyo">{baseAmount.toFixed(3)} / {elem.baseCurrency.symbol}</h6></td>
                <td className="green"> <h6 className="grey yoyo">{quoteAmount.toFixed(3)} BNB</h6></td>
                {/* <td className="green">{elem.baseCurrency.symbol}<h6 className="grey yoyo">{quoteAmount} BNB</h6></td> */}
            </tr>
        )
    });

    const newlisting = listing.map(elem => {
        return (
            <tr>
                <td className="grey yoyo">
                    {elem.baseTokenName}</td>
                {/* <td>{elem.baseTokenSymbol} </td> */}
                <td className="grey yoyo">{elem.quoteLiquidity.toFixed(3)} BNB</td>
                <td className="grey yoyo">{elem.baseTokenSymbol} / {elem.quoteTokenSymbol}</td>
            </tr>
        )
    });
    const newtrending = trending.map(elem => {
        return (
            <tr>
                <td className="grey yoyo">{elem.currency.name}</td>
                <td className="grey yoyo">{elem.currency.symbol}</td>
                <td className="grey yoyo">{elem.count}</td>
            </tr>
        )
    });

    const PromortedTab = promoted.map(elem => {
        return (
            <tr>
            
                <td className="grey yoyo">
                <button className="X" onClick={() => dispatch(inputAction(elem.tokenAddress))} >
                    <img src={elem.tokenLogo} alt="" className="img-fluid w40" />
                </button>
                    </td>
                <td>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <span className="grey yoyo">{elem.tokenName}</span>
                        </li>
                    </ul>
                </td>
                <td className="grey yoyo">{elem.tokenSymbol}</td>
                <td className="grey yoyo">{elem.tokenAddress}</td>
            </tr>

        )
    });

    const tabletrades = YourTrades.map(elem => {
        const { block, baseAmount, quoteAmount, quotePrice } = elem
        return (
            <tr>
                <td className="grey yoyo">
                    <h6 className={elem.baseCurrency.symbol === elem.quoteCurrency.symbol ? 'green' : 'red'}>{block.timestamp.time}</h6>
                </td>
                <td className="green"><h6 className="grey yoyo">{baseAmount.toFixed(3)}    / {elem.baseCurrency.symbol}</h6></td>
                <td className="green"> <h6 className="grey yoyo">{quoteAmount.toFixed(3)} BNB</h6></td>
                {/* <td className="green">{elem.baseCurrency.symbol}<h6 className="grey yoyo">{quoteAmount} BNB</h6></td> */}
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
                                                        <th scope="col" className="grey">Price USD</th>
                                                        <th scope="col" className="grey">Price MOVR</th>
                                                        <th scope="col" className="grey">Amount TOOLS</th>
                                                        <th scope="col" className="grey">Total MOVR</th>
                                                        <th scope="col" className="grey">Maker</th>
                                                        <th scope="col" className="grey">Others</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {data[0] ? tableData: null} */}
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
                                                                </tr>
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
                                                                </tr>
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
