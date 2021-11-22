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
import { API_URL } from '../utils/Environment'
import { useSelector } from 'react-redux';
// import datafed from './datafeed'
import {
	makeApiRequest1
} from './helpers.js';
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

export const Tvcontainer = () => {
	const counter = useSelector(state => state.Getinput.input);
	const address = counter ? counter : '0x5853ccBDc428d5fC9F8C1d3599B252C88477b460'
	const Mark = useSelector(state => state.Getmark.mark);
	const [tokendetails, setTokenDetails] = React.useState({
			name: 'Rivertool Token',
			pair: 'Tool/WMOR',
			sybmol: 'Tool',

		// version: {Mark == false ? 'SolarBeam': 'MoonSwap'},
	});

	const lastBarsCache = new Map();

	const configurationData = {
		supported_resolutions: ["60","1"],

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
		let allSymbols = ['moonswap'];

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


	const datafeed = {
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
			onResolveErrorCallback,
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
			let response=''
			if(Mark == true){
				 response = await axios.get(`${API_URL}/solarbeam/tokenDetails/${address}`);
				 setTokenDetails(response.data)
			}else{
				 response = await axios.get(`${API_URL}/moonswap/tokenDetails/${address}`);	
				 setTokenDetails(response.data)
			}
			
			
			const symbolInfo = {
				// ticker: response.data.symbol,
				name: response.data.symbol ? response.data.symbol +  '/'  + 'WMOVR' : ''   ,
				// description: '',
				type: 'crypto',
				session: '24x7',
				timezone: 'Etc/UTC',
				exchange: Mark==true ? 'SolarBeam' : 'MoonSwap',
				minmov: 1,
				load_last_chart: true,
				pricescale: 10000,
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
			const { firstDataRequest } = periodParams;

			try {

				let data = await makeApiRequest1(address ? address : '0x5853ccBDc428d5fC9F8C1d3599B252C88477b460',Mark);
				console.log("dtat:::::::", data)
				if (!firstDataRequest) {
					// "noData" should be set if there is no data in the requested period.
					onHistoryCallback([], {
						noData: true,
					});
					return;
				}
				let bars = [];
				// if(data.data.data){
					data = data.reverse()
					data.map((bar, i) => {
					let	obj = {
							time: (bar.time * 1000),
							low: parseFloat(bar.low ),
							high: parseFloat(bar.high ),
							open: parseFloat(bar.open ),
							close: parseFloat(bar.close ),
							isBarClosed: true,
							isLastBar: false,
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
				console.log('[getBars]: Get error', error);
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
	console.log("namemmem",tokendetails);
	const getWidget = () => {

		const widgetOptions = {
			symbol: tokendetails.name,
			// BEWARE: no trailing slash is expected in feed URL
			// datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			datafeed: datafeed,
			interval: defaultProps.interval,
			container_id: defaultProps.containerId,
			hideSymbolSearch: true,
			library_path: defaultProps.libraryPath,
			theme: 'Dark',
			has_weekly_and_monthly: true,
			header_widget: false,
			save_image: false,
			locale: getLanguageFromURL() || 'en',
			enabled_features: ['use_localstorage_for_settings'],
			hide_side_toolbar: true,
			// enabled_features: ["hide_left_toolbar_by_default"],
			disabled_features: ['study_templates'],
			has_intraday: true,
			client_id: defaultProps.clientId,
			load_last_chart: true,
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

	React.useEffect(() => {
		getWidget();
	}, [Mark,counter])


	// componentWillUnmount() {
	// 	if (this.tvWidget !== null) {
	// 		this.tvWidget.remove();
	// 		this.tvWidget = null;
	// 	}
	// }

	// render() {
	return (
		<div
			id={defaultProps.containerId}
			className={'TVChartContainer'}
		/>
	);
	// }
}
