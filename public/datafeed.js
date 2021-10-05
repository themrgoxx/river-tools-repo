import {
	makeApiRequest,
	generateSymbol,
	parseFullSymbol,
	makeApiRequest1
} from './helpers.js';
import { useSelector } from 'react-redux';
import React from 'react';
//  function Counter(){
// 	return counter
	
// }
const lastBarsCache = new Map();

const configurationData = {
	supported_resolutions: ['1D', '1W', '1M'],
	exchanges: [{
		value: 'Pancake v2',
		name: 'Pancake v2',
		desc: 'Pancake v2',
	}
],
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
	// let allSymbols = [];
	
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
	return [];
}

// const GetCounter = async function ABC() {
// 	const counter = useSelector(state => state.Getinput.input);
// 	return counter
// }


export default {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},
	
	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
		) => {
			console.log('[searchSymbols]: Method call');
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
				console.log('[resolveSymbol]: Method call', symbolName);
				const symbols = await getAllSymbols();
				const symbolItem = symbols.find(({
					full_name,
				}) => full_name === symbolName);
				// if (!symbolItem) {
				// 	console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
				// 	onResolveErrorCallback('cannot resolve symbol');
				// 	return;
				// }
				const symbolInfo = {
					ticker:  "Pcv2 100x/BNB",
					name: "100x/BNB",
					description: "",
					type: "crypto",
					session: '24x7',
					timezone: 'Etc/UTC',
					exchange: "Pcv2",
					minmov: 1,
					theme:'Dark',
					pricescale: 100,
					has_intraday: false,
					has_no_volume: true,
					has_weekly_and_monthly: false,
					supported_resolutions: configurationData.supported_resolutions,
					volume_precision: 2,
					data_status: 'streaming',
				};
				
				console.log('[resolveSymbol]: Symbol resolved', symbolName);
				onSymbolResolvedCallback(symbolInfo);
			},
			
			getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
	
				// const counter = GetCounter()
				const { from, to, firstDataRequest } = periodParams;
				console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
		// const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
		// const urlParameters = {
			// 	e: parsedSymbol.exchange,
			// 	fsym: parsedSymbol.fromSymbol,
			// 	tsym: parsedSymbol.toSymbol,
			// 	toTs: to,
			// 	limit: 2000,
			// };
			const Get_data = `
			{
				ethereum(network: bsc) {
					dexTrades(
						options: {limit: 500, asc: "timeInterval.minute"}
						date: {since: "2021-08-11"}
						exchangeName: {in: ["Pancake v2"]}
						baseCurrency: {is: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"}
						quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
						) {
							timeInterval {
								minute(count: 10)
							}
							baseCurrency {
								symbol
				  address
				}
				baseAmount
				quoteCurrency {
				  symbol
				  address
				}
				quoteAmount
				trades: count
				quotePrice
				maximum_price: quotePrice(calculate: maximum)
				minimum_price: quotePrice(calculate: minimum)
				median_price: quotePrice(calculate: median)
				open_price: minimum(of: block, get: quote_price)
				close_price: maximum(of: block, get: quote_price)
			}
		  }
    }`
		try {
			const data = await makeApiRequest1(Get_data);
			if (!firstDataRequest) {
				// "noData" should be set if there is no data in the requested period.
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			let bars = [];
			// if(data.data.data){
				data.data.ethereum.dexTrades.map((bar , i) =>{
					let obj = {
						time: bar.timeInterval.minute,
						low: (bar.minimum_price),
						high: (bar.maximum_price),
						open: (bar.open_price),
						close: (bar.close_price),
						isBarClosed : true,
						isLastBar : false,
					}
					if(i == data.data.ethereum.dexTrades.length -1 ){
						obj.isLastBar = true
						obj.isBarClosed = false
					}
					console.log("here==",obj)
					bars = [...bars, obj];
				})
			//   }
			console.log("here==",bars)

			// if (firstDataRequest) {
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			// }
			console.log(`[getBars]: returned ${bars.length} bar(s)`);
			onHistoryCallback(bars, {
				noData: false,
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
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
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
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		// unsubscribeFromStream(subscriberUID);
	},
};
