// import 'core-js/es/promise';
// import 'core-js/es/array';
// import 'core-js/es/string';
// import 'core-js/es/map';
// import 'core-js/es/number';
// import 'core-js/es/math';
// import 'core-js/es/array';
// import 'core-js/es/object';
import * as React from 'react';
import '../css/chart.css';
import axios from 'axios';
import { widget } from '../charting_library';
// import datafed from './datafeed'
import {
	makeApiRequest1
} from './helpers.js';
import { useSelector } from 'react-redux';
function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const defaultProps = {
	symbol: 'USD',
	containerId: 'tv_chart_container',
	datafeedUrl: 'https://demo_feed.tradingview.com',
	libraryPath: '/charting_library/',
	chartsStorageUrl: 'https://saveload.tradingview.com',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: false,
	"enable_publishing": false,
	"hide_legend": true,
	"save_image": true,
	autosize: true,
	studiesOverrides: {},
};

export const Tvcontainer=()=> {
	const counter = useSelector(state => state.Getinput.input);
	const address = counter ? counter : '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D'
	const [tokendetails, setTokenDetails] = React.useState({
        name: 'solarBeam Token',
        pair: 'USD/MOVR',
        sybmol: 'USD',
        version: 'Pancake v2',
    });

	const lastBarsCache = new Map();

 const configurationData = {
	supported_resolutions: ["1","60"],

symbols_types: [{
	name: 'crypto',
	
	// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
	value: 'crypto',
},
// ...
],
};

async function getAllSymbols() {
	// const data = await makeApiRequest('data/v3/all/exchanges');
	let allSymbols = ['solarbeam','moonswap'];
	
	// for (const exchange of configurationData.exchanges) {
	// 	const pairs = data.Data[exchange.value].pairs;
		
	// 	for (const leftPairPart of Object.keys(pairs)) {
	// 		const symbols = pairs[leftPairPart].map(rightPairPart => {
	// 			const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
	// 			return {
	// 				symbol: symbol.short,
	// 				full_name: symbol.full,
	// 				description: symbol.short,
	// 				exchange: exchange.value,
	// 				type: 'crypto',
	// 			};
	// 		});
	// 		allSymbols = [...allSymbols, ...symbols];
	// 	}
	// }
	return allSymbols;
}

// const GetCounter = async function ABC() {
// 	const counter = useSelector(state => state.Getinput.input);
// 	return counter
// }


const datafeed= {
	onReady: (callback) => {
		// console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},
	
	searchSymbols: async (
		userInput,
		exchange,
		onResultReadyCallback,
		) => {
			// console.log('[searchSymbols]: Method call');
			const symbols = await getAllSymbols();
			const newSymbols = symbols.filter(symbol => {
				const isExchangeValid = exchange === '' || symbol.exchange === exchange;
				const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
				return isExchangeValid && isFullSymbolContainsInput;
			});
			onResultReadyCallback(newSymbols);
		},
		
		resolveSymbol: async (
			symbolName,
			onSymbolResolvedCallback,
			// onResolveErrorCallback,
			) => {
				// console.log('[resolveSymbol]: Method call', symbolName);
				// const symbols = await getAllSymbols();
				// const symbolItem = symbols.find(({
				// 	full_name,
				// }) => full_name === symbolName);
				// if (!symbolItem) {
				// 	console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
				// 	onResolveErrorCallback('cannot resolve symbol');
				// 	return;
				// }
				// const response = await axios.get(`http://192.168.18.46:21000/solarbeam/tokenDetails/`+ address);
                //  setTokenDetails(response.data)
				const symbolInfo = {
					ticker: "MOVR",
					name: "MOVR",
					description: "SolarBeam",
					type: 'crypto',
					session: '24x7',
					timezone: 'Etc/UTC',
					exchange: 'SolarBeam',
					minmov: 1,
					load_last_chart:true,
					pricescale: 100,
					has_intraday: true,
					has_no_volume: true,
					has_weekly_and_monthly: true,
					supported_resolutions: configurationData.supported_resolutions,
					volume_precision: 2,
					data_status: 'streaming',
				};
				
				// console.log('[resolveSymbol]: Symbol resolved', symbolName);
				onSymbolResolvedCallback(symbolInfo);
			},
			
			getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
	
				// const counter = GetCounter()
				const {firstDataRequest } = periodParams;

		try {
		
			const data = await makeApiRequest1(address ? address: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D');
			if (!firstDataRequest) {
				// "noData" should be set if there is no data in the requested period.
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			let bars = [];
			// if(data.data.data){
				data.map((bar , i) =>{
					let d = parseInt(bar.time)
					let  de = new Date(d * 1000)
					let obj=''
					if(address== '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D'){
						obj = {
							time: (de),
							low: (bar.low /15000000) ,
							high: (bar.high  /15000000),
							open: (bar.open  /15000000),
							close: (bar.close  /15000000),
							isBarClosed : true,
							isLastBar : false,
						}
					}else{
						obj={
						time: (de),
						low: (bar.low) ,
                        high: (bar.high),
                        open: (bar.open),
                        close: (bar.close),
						isBarClosed : true,
						isLastBar : false,
					}
				}
					// if(i == data.length -1 ){
					// 	obj.isLastBar = true
					// 	obj.isBarClosed = false
					// }
					bars = [...bars, obj];
				})
			//   }
			// console.log("here==",bars)

			// if (firstDataRequest) {
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			// }
			// console.log(`[getBars]: returned ${bars.length} bar(s)`);
			onHistoryCallback(bars, {
				noData: true,
			});
		} catch (error) {
			// console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		// console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		// subscribeOnStream(
		// 	symbolInfo,
		// 	resolution,
		// 	onRealtimeCallback,
		// 	subscribeUID,
		// 	onResetCacheNeededCallback,
		// 	lastBarsCache.get(symbolInfo.full_name),
		// );
	},

	unsubscribeBars: (subscriberUID) => {
		// console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		// unsubscribeFromStream(subscriberUID);
	},
};
	
	
	// tvWidget = null;
    
     const getWidget=()=>{
		 
		const widgetOptions = {
			symbol: tokendetails.pair,
			// BEWARE: no trailing slash is expected in feed URL
			// datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			datafeed: datafeed,
			interval: defaultProps.interval,
			container_id: defaultProps.containerId,
			hideSymbolSearch:true,
			library_path: defaultProps.libraryPath,
			theme:'Dark',
			has_weekly_and_monthly: true,
			header_widget :true,		
		    save_image: false,
			locale: getLanguageFromURL() || 'en',
			enabled_features: ['use_localstorage_for_settings'],
			hide_side_toolbar : true,
			enabled_features: ["hide_left_toolbar_by_default"],
			disabled_features: ['study_templates'],
			has_intraday:true,
			client_id: defaultProps.clientId,
			load_last_chart:true,
			user_id: defaultProps.userId,
			fullscreen: defaultProps.fullscreen,
			autosize: defaultProps.autosize,
		};

		let tvWidget = new widget(widgetOptions);
		// let tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						// console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});

	 }

	React.useEffect(()=>{
		getWidget();
	},[address])
	

	// componentWillUnmount() {
	// 	if (this.tvWidget !== null) {
	// 		this.tvWidget.remove();
	// 		this.tvWidget = null;
	// 	}
	// }

	// render() {
		return (
					<div
						id={ defaultProps.containerId }
						className={ 'TVChartContainer' }
					/>
		);
	// }
}
