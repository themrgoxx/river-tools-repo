// Make requests to CryptoCompare API
import axios from "axios";

// export async function makeApiRequest(path) {
//     try {
//         const response = await fetch(`https://api.sphynxswap.finance/tokenDetails/${path}`);
//         return response.json();
//     } catch (error) {
//         throw new Error(`CryptoCompare request error: ${error.status}`);
//     }
// }



export async function makeApiRequest1(path,Mark) {
	console.log("MArk:::::::::in helper",Mark)
	if(Mark== false){
		try {
			const response=	await axios.post(`http://ec2-54-213-239-106.us-west-2.compute.amazonaws.com:21000/solarbeam/chart`,{address :path,limit :1000,period :3600,skip :0})
			const abc= response.data
					return abc;
				
				// const response = await fetch(`http://ec2-54-213-239-106.us-west-2.compute.amazonaws.com:21000/solarbeam/chart` , { 
				// 	method : "post",
				// 	body: {address :path,limit :1000,period :3600,skip :0},
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 		// 'Content-Type': 'application/x-www-form-urlencoded',
				// 	  }});
				
			} catch (error) {
				throw new Error(`CryptoCompare request error: ${error.status}`);
			}
	}else{
		try {
			const response=	await axios.post(`http://ec2-54-213-239-106.us-west-2.compute.amazonaws.com:21000/moonswap/chart`,{address :path,limit :1000,period :3600,skip :0})
			const abc= response.data
					return abc;
				
				// const response = await fetch(`http://192.168.18.46:21000/solarbeam/chart` , { 
				// 	method : "post",
				// 	body: {address :path,limit :1000,period :3600,skip :0},
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 		// 'Content-Type': 'application/x-www-form-urlencoded',
				// 	  }});
				
			} catch (error) {
				throw new Error(`CryptoCompare request error: ${error.status}`);
			}
	}

}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}

export function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}

	return {
		exchange: match[1],
		fromSymbol: match[2],
		toSymbol: match[3],
	};
}
