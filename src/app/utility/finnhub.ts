export async function getAllStocks() {
    const apiKey = process.env.FINNHUB_API_KEY
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
}

export async function getStockQuote(symbol: string) {
    const apiKey = process.env.FINNHUB_API_KEY
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
}