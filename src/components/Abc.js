import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { utils } from 'ethers';
import { useSelector } from 'react-redux';
export default function Abc() {
    const counter = useSelector(state => state.Getinput.input);
    const [alldata, setalldata] = useState({
        address: '',
        price: '',
        change: '',
        volume: '',
        liquidityV2: '',
        liquidityV2BNB: ''
    });

    const [showimage, setshowimage] = useState(false)

    const [tokendata, settokendata] = useState({
        marketCap: '',
        symbol: ''
    });

    const [linkIcon, setLinkIcon] = useState('https://r.poocoin.app/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png')
    const getTokenData = () => {
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/tokenStats", { address: counter })
            .then(async (response) => {
                settokendata(response.data)
                const url = `https://r.poocoin.app/smartchain/assets/${counter ? utils.getAddress(counter) : '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'}/logo.png`
                let { data } = await axios.get(url);
                if (!data) {
                    setshowimage(false)
                } else {
                    setLinkIcon(url);
                    setshowimage(true)
                }

            });
    }

    const getTableData = () => {
        axios.post("http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/chartStats", { address: counter })
            .then((response) => {
                setalldata(response.data)
            });
    }
    const pricedecimal = parseFloat(alldata.price).toFixed(5);
    const changedecimal = parseFloat(alldata.change).toFixed(3);
    const volumedecimal = convertToInternationalCurrencySystem(alldata.volume);
    const liquidityV2decimal = convertToInternationalCurrencySystem(alldata.liquidityV2)
    function convertToInternationalCurrencySystem(labelValue) {
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

                    : Math.abs(Number(labelValue));


    }

    useEffect(() => {
        convertToInternationalCurrencySystem();
        getTableData();
        getTokenData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter])


    return (
        <div>
            <section className="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 p0">
                            <div className="head-tile">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="main-info">
                                            <div className="inner-logo">
                                                {showimage ? <img src={linkIcon} alt="" width="36px" height="36px" className="img-fluid" /> : ""}
                                            </div>
                                            <ul className="list-inline">
                                                <li className="list-inline-item ml">
                                                    <div className="inner-content11">
                                                        <h4>{tokendata.symbol}</h4>
                                                        <div className="main-red-top-cake">
                                                            <h6 className="grey">{pricedecimal} </h6>
                                                            <span className={changedecimal >= 0 ? 'green' : 'red'}>{changedecimal}%</span>
                                                        </div>

                                                        {/* <img src="\chrtapp-assets\heart-fillde.svg" alt="" className="img-fluid" /> */}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="inner-info">
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <div className="inner-content">
                                                        <h6 className="grey">24h Volume</h6>
                                                        <h6>${volumedecimal}</h6>
                                                    </div>
                                                </li>
                                                <li className="list-inline-item">
                                                    <div className="blue">
                                                        |
                                                    </div>
                                                </li>
                                                <li className="list-inline-item">
                                                    <div className="inner-content">
                                                        <h6 className="grey">Liquidity</h6>
                                                        <h6>${liquidityV2decimal}</h6>
                                                    </div>
                                                </li>
                                                <li className="list-inline-item">
                                                    <div className="blue">
                                                        |
                                                    </div>
                                                </li>
                                                <li className="list-inline-item">
                                                    <div className="inner-content">
                                                        <h6 className="grey">Marketcap</h6>
                                                        <h6>${tokendata.marketCap.split('$')[1]}</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

