// Make requests to CryptoCompare API
export async function makeApiRequest(path) {
    // try {
    //     const response = await fetch(`https://api.sphynxswap.finance/tokenDetails/${path}`);
    //     return response.json();
    // } catch (error) {
    //     throw new Error(`CryptoCompare request error: ${error.status}`);
    // }
}

export async function makeApiRequest1(path) {
	try {
		const response = await fetch(`http://ec2-34-215-106-249.us-west-2.compute.amazonaws.com:9000/chart/${path}` , {
			method : "GET",
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			  }});
		return response.json();
	} catch (error) {
		throw new Error(`CryptoCompare request error: ${error.status}`);
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
