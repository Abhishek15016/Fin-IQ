import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

interface NewsItem {
  title: string;
  url: string;
  published_at: string;
  source: string;
  description?: string;
}

interface MarketData {
  timestamp: string;
  nifty: number;
  sensex: number;
}

const MarketNews: React.FC = () => {
  const { theme } = useTheme();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const maxDataPoints = 20; // max points on chart
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to generate next timestamp label
  const getNextTimestamp = (lastTimestamp: string) => {
    const [hours, minutes] = lastTimestamp.split(':').map(Number);
    let newMinutes = minutes + 15; // 15 min interval
    let newHours = hours;
    if (newMinutes >= 60) {
      newMinutes = newMinutes - 60;
      newHours = (newHours + 1) % 24;
    }
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.marketaux.com/v1/news/all', {
          params: {
            api_token: 'lrWc3YhyBWz4zeg7WneCx5gdyVdCuGfYsnu7N7WV',
            language: 'en',
            country: 'in',
            sectors: 'finance',
          },
        });

        const articles = response.data.data?.map((article: any) => ({
          title: article.title,
          url: article.url,
          published_at: article.published_at,
          source: article.source,
          description: article.description,
        })) || [];

        setNews(articles);
      } catch (error) {
        console.error('Failed to fetch financial news', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    // Initialize market data with dummy points if empty
    if (marketData.length === 0) {
      const initialData: MarketData[] = [
        { timestamp: '09:00', nifty: 18200, sensex: 61000 },
        { timestamp: '09:15', nifty: 18220, sensex: 61050 },
        { timestamp: '09:30', nifty: 18250, sensex: 61100 },
        { timestamp: '09:45', nifty: 18270, sensex: 61150 },
        { timestamp: '10:00', nifty: 18300, sensex: 61250 },
      ];
      setMarketData(initialData);
      setLoading(false);
    }

    // Simulate real-time data update every 5 seconds
    intervalRef.current = setInterval(() => {
      setMarketData((prevData) => {
        if (prevData.length === 0) return prevData;

        const lastData = prevData[prevData.length - 1];
        const newTimestamp = getNextTimestamp(lastData.timestamp);

        // Generate small random walk values for nifty and sensex
        const newNifty =
          lastData.nifty + (Math.random() > 0.5 ? 10 : -10) * Math.random();
        const newSensex =
          lastData.sensex + (Math.random() > 0.5 ? 20 : -20) * Math.random();

        const newDataPoint: MarketData = {
          timestamp: newTimestamp,
          nifty: Math.round(newNifty),
          sensex: Math.round(newSensex),
        };

        const updatedData = [...prevData, newDataPoint];

        // Keep data length within maxDataPoints
        if (updatedData.length > maxDataPoints) {
          updatedData.shift();
        }
        return updatedData;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [marketData.length]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-foreground">Loading...</div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Chart */}
        <div className="bg-card rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-card-foreground">Market Indices (Real-Time)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="niftyColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sensexColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="nifty"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#8884d8' }}
                activeDot={{ r: 6 }}
                fill="url(#niftyColor)"
                isAnimationActive={true}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="sensex"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#82ca9d' }}
                activeDot={{ r: 6 }}
                fill="url(#sensexColor)"
                isAnimationActive={true}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* News Section */}
        <div className="bg-card rounded-lg shadow-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-card-foreground">Financial News</h2>
          <div className="space-y-4 overflow-y-auto flex-1 max-h-[60vh]">
            {news.length > 0 ? (
              news.slice(0, visibleCount).map((item, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-3 cursor-pointer"
                  onClick={() => setSelectedNews(item)}
                >
                  <h3 className="font-semibold text-primary hover:text-primary/80">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.published_at).toLocaleString()} — {item.source}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No financial news available.</p>
            )}
          </div>
          {visibleCount < news.length && (
            <button
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              Show More
            </button>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-card-foreground">{selectedNews.title}</h2>
              <button
                className="text-muted-foreground hover:text-destructive text-xl font-bold"
                onClick={() => setSelectedNews(null)}
              >
                &times;
              </button>
            </div>
            <p className="text-card-foreground mb-4">
              {selectedNews.description || 'No description available.'}
            </p>
            <a
              href={selectedNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              Read full article
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketNews;
