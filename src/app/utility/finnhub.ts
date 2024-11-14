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

export async function getMarketStatus() {
    const apiKey = process.env.FINNHUB_API_KEY
    const url = `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${apiKey}`
    const res = await fetch(url)
    const data = await res.json();

    console.log(data)
    return data
}

export async function getCompanyNews(from: string, to: string, symbol: string) {
    const apiKey = process.env.FINNHUB_API_KEY
    const url = `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(symbol)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&token=${apiKey}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json();

    return data
}