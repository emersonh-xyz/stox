'use client';

type Stock = {
    id: number;
    symbol: string;
    name: string;
    price: number;
    change: string;
    icon: string;
}

export default function WatchList() {

    const data = [
        {
            name: 'Amazon',
            symbol: 'AMZN',
            price: 3400,
            change: '-0.10%',
            icon: 'https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png'
        },
        {
            name: 'Apple',
            symbol: 'AAPL',
            price: 1503,
            change: '-0.05%',
            icon: 'https://cdn-icons-png.flaticon.com/512/0/747.png'
        },
        {
            name: 'Tesla',
            symbol: 'TSLA',
            price: 7003,
            change: '+0.5%',
            icon: 'https://cdn.iconscout.com/icon/free/png-256/free-tesla-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-7-pack-logos-icons-3030326.png?f=webp&w=256'
        },
        {
            name: 'Google',
            symbol: 'GOOGL',
            price: 2300,
            change: '+0.5%',
            icon: 'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png'
        }
    ] as Stock[]

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Watch List</h1>

            <div className="flex flex-col gap-2">
                {data.map((stock) => (
                    <div key={stock.id} className="flex flex-row items-center justify-between p-2 gap-4 bg-base-300 rounded-full w-[300px] hover:scale-110">
                        <div className="flex gap-2 items-center px-4 ">
                            <img src={stock.icon} alt={stock.name} className="h-8 w-8" />
                            <div>
                                <h2>{stock.symbol}</h2>
                                <p className="text-xs">{stock.name}</p>
                            </div>
                        </div>
                        <div className="px-4">
                            <h2>${stock.price.toLocaleString()}</h2>
                            <p className="text-success">{stock.change}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}