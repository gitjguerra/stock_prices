import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Registra los componentes que vas a usar
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const StockChart = ({ symbol }) => {
    const [chartData, setChartData] = useState({
        datasets: [{
            label: `${symbol} Prices`,
            data: [],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1
        }]
    });
    
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`https://api.marketstack.com/v1/eod`, {
                    params: {
                        access_key: '065846acf06f90351857195ae3beea24', // Reemplaza con tu clave API
                        symbols: symbol,
                        limit: 30,
                        sort: 'desc'
                    }
                });

                if (response.data.data && response.data.data.length > 0) {
                    const prices = response.data.data.map(item => ({
                        x: item.date,
                        y: item.close
                    }));

                    setChartData(prevData => ({
                        ...prevData,
                        datasets: [{
                            ...prevData.datasets[0],
                            data: prices
                        }]
                    }));
                } else {
                    console.error('No se encontraron datos para el símbolo:', symbol);
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
    }, [symbol]);

    return (
        <div>
            <h2>{symbol} Gráfico de Precio</h2>
            <div style={{ width: '90%', height: '200px' }}> {/* Ajusta el ancho y alto aquí */}
                <Line data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default StockChart;