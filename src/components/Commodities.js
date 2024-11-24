import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockChart from './StockChart';

const Commodities = ({ apiKey }) => {
    const [commodities, setCommodities] = useState({});

    useEffect(() => {
        if (!apiKey) return;

        async function fetchCommodities() {
            try {
                const goldResponse = await axios.get(`https://api.marketstack.com/v1/eod`, {
                    params: {
                        access_key: apiKey,
                        symbols: 'AU',
                        limit: 1,
                        sort: 'desc'
                    }
                });

                const oilResponse = await axios.get(`https://api.marketstack.com/v1/eod`, {
                    params: {
                        access_key: apiKey,
                        symbols: 'WTI',
                        limit: 1,
                        sort: 'desc'
                    }
                });

                const prices = {
                    gold: goldResponse.data.data[0].close,
                    oil: oilResponse.data.data[0].close,
                };

                console.log('Precios de commodities recibidos:', prices);
                setCommodities(prices);
            } catch (error) {
                console.error('Error al obtener los precios de commodities:', error);
            }
        }

        fetchCommodities();
    }, [apiKey]);

    return (
        <section className="commodities-section">
            <h2>Precios de Commodities</h2>
            <div className="commodities-list">
                <div className="commodity">
                    <h3>Oro</h3>
                    <p>Precio: ${commodities.gold ? parseFloat(commodities.gold).toFixed(2) : "N/A"}</p>
                    <StockChart symbol="AU" apiKey={apiKey} />
                </div>

                <div className="commodity">
                    <h3>Petróleo (WTI)</h3>
                    <p>Precio: ${commodities.oil ? parseFloat(commodities.oil).toFixed(2) : "N/A"}</p>
                    <StockChart symbol="WTI" apiKey={apiKey} />
                </div>
            </div>
        </section>
    );
};

export default Commodities;