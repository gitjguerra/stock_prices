import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { StreamingPlugin } from 'chartjs-plugin-streaming';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, StreamingPlugin);

const MarketStackComponent = ({ tickers, data }) => {
    // TODO:SE COMENTA PARA TRABAJAR CON DATA FAKE
    /*
    const [tickers, setTickers] = useState([]);
    const [data, setData] = useState({});
    const API_KEY = 'YOUR_API_KEY_HERE';
  
    useEffect(() => {
      fetchTickers();
      tickers.forEach(fetchTickerData);
    }, []);
  
    const fetchTickers = async () => {
      try {
        const response = await fetch(`https://api.marketstack.com/v1/tickers?access_key=${API_KEY}`);
        const result = await response.json();
        setTickers(result.data);
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    };
  
    const fetchTickerData = async (symbol) => {
      try {
        const response = await fetch(`https://marketstackapi.com/v1/ticker/${symbol}/ohlc?access_key=${API_KEY}`);
        const result = await response.json();
        setData(prevData => ({ ...prevData, [symbol]: result.data }));
      } catch (error) {
        console.error(`Error fetching data for ticker ${symbol}:`, error);
      }
    };
    */

    const chartOptions = {
        responsive: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                ticks: {
                    display: false,
                },
            },
        },
    };

    const renderChart = (symbol) => {
        if (!data[symbol]) return null;

        const chartData = {
            labels: data[symbol].map(item => item.time),
            datasets: [{
                label: symbol,
                data: data[symbol].map(item => item.close),
                borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderWidth: 2,
                pointRadius: 0,
            }],
        };

        return (
            <div className="chart-container">
                <Chart
                    options={chartOptions}
                    type="line"
                    width="40"
                    height="30"
                    data={chartData}
                />
            </div>
        );
    };

    return (
        <div className="market-stack">
            <div className="coins-list">
                {tickers.map((ticker) => (
                    <div key={ticker.symbol} className={`coin-item ${ticker.symbol}`}>
                        <span className="name">{ticker.name}</span> {/* Clase aplicada aquí */}
                        <span>{ticker.symbol}</span>                    
                        <span>${data[ticker.symbol]?.[data[ticker.symbol].length - 1]?.close.toFixed(2)}</span>
                        {renderChart(ticker.symbol)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketStackComponent;
