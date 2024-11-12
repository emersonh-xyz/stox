export type Stock = {
    currency?: string,
    description: string,
    displaySymbol?: string,
    figi?: string,
    symbol: string,
    type?: string,
    quote?: any,
}

export async function toggleWidget(componentIndex: number) {
    const components = JSON.parse(localStorage.getItem('components') || '[]');
    components[componentIndex] = !components[componentIndex];
    localStorage.setItem('components', JSON.stringify(components));
    const event = new Event('widgetToggled');
    window.dispatchEvent(event);
}

export async function getWidgets() {
    return JSON.parse(localStorage.getItem('components') || '[]');
}


export const fetchStockQuote = async (symbol: string) => {
    const res = await fetch(`/api/finnhub/quote`, {
        method: 'POST',
        body: JSON.stringify({ symbol }),
    })
    const data = await res.json()
    return data;
}