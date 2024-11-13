'use client';
import React, { useEffect, useState } from 'react';
import './NewsPage.css';

// Define the structure for a news item
interface NewsItem {
    id: string;
    image: string;
    title: string;
    source: string;
    type: string;
    description: string;
    url: string;
}

export default function NewsPage() {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch news data from Finnhub API
                const response = await fetch(
                    `https://finnhub.io/api/v1/news?category=general&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Limit to only the first 18 items
                if (data) {
                    const formattedNewsData = data.slice(0, 18).map((article: any, index: number) => ({
                        id: `${index}`,
                        image: article.image,
                        title: article.headline,
                        source: article.source,
                        type: 'General News',
                        description: article.summary,
                        url: article.url,
                    }));
                    setNewsData(formattedNewsData);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                setError(true);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-page">
            <h1 className="news-title">News</h1>
            {error ? (
                <p>Error loading news, please try again later.</p>
            ) : (
                <div className="news-container">
                    {newsData.map((news) => (
                        <a key={news.id} href={news.url} target="_blank" rel="noopener noreferrer" className="news-card-link">
                            <div className="news-card">
                                <img src={news.image} alt={news.title} className="news-image" />
                                <div className="news-content">
                                    <p className="news-source">
                                        <span className="source-logo">{news.source}</span> {news.type}
                                    </p>
                                    <h3>{news.title}</h3>
                                    <p>{news.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
