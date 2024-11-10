'use client';
import React, { useEffect, useState } from 'react';
import './NewsPage.css';

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=2adcf072307142ebae59057a12f336fd&pageSize=18`
        );
        const data = await response.json();
        if (data.articles) {
          const formattedNewsData = data.articles.map((article: any, index: number) => ({
            id: `${index}`,
            image: article.urlToImage,
            title: article.title,
            source: article.source.name,
            type: 'Headline',
            description: article.description,
            url: article.url,
          }));
          setNewsData(formattedNewsData);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <h1 className="news-title">News</h1>
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
    </div>
  );
}
