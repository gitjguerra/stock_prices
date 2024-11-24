import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './image/bvcLogoGreen.png'; // Asegúrate de que la ruta sea correcta
import CryptoPrices from './components/CryptoPrices'; // Asegúrate de que la ruta sea correcta
import Pagination from './components/Pagination'; // Asegúrate de que la ruta sea correcta
import CryptoList from './components/CryptoList'; // Asegúrate de que la ruta sea correcta
import Commodities from './components/Commodities'; // Asegúrate de que la ruta sea correcta

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [apiKey, setApiKey] = useState('');

    const { coins, totalCoins } = CryptoPrices(page, pageSize, searchTerm);

    // Calcular el número total de páginas basado en el total de criptomonedas filtradas
    const totalPages = Math.ceil(totalCoins / pageSize);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setPage(1); // Reiniciar a la primera página al buscar
    };

    // Cargar la API key desde un archivo 
    useEffect(() => {
        async function loadConfig() {
            try {
                const response = await fetch('./config.json'); // Asegúrate de que este archivo exista en tu carpeta public
                const data = await response.json();
                setApiKey(data.apiKey);
            } catch (error) {
                console.error('Error al cargar el archivo de configuración:', error);
            }
        }
        loadConfig();
    }, []);

    return (
        <div className="App">
            <header>
                <img src={logo} alt="Logotipo" className="logo" />
                <h1>Dashboard de Criptomonedas y Commodities</h1>
            </header>

            <main>
                {/* Sección de Commodities */}
                <Commodities apiKey={apiKey} />

                {/* Sección de Criptomonedas */}
                <section className="coins-section">
                    <h2>Precios de Criptomonedas</h2>
                    <input
                        type="text"
                        placeholder="Buscar criptomoneda"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <h2>{' '}</h2>
                    {/* Mostrar lista de criptomonedas */}
                    <CryptoList coins={coins} />

                    {/* Navegación por páginas */}
                    <Pagination 
                        page={page} 
                        totalPages={totalPages} 
                        onPageChange={setPage} 
                    />

                    {/* Selector para tamaño de página */}
                    <div>
                        Registros por Página:
                        <select onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setPage(1); // Reiniciar a la primera página al cambiar el tamaño de página
                        }}>
                            <option value={10}>10 por página</option>
                            <option value={25}>25 por página</option>
                            <option value={50}>50 por página</option>
                        </select>
                    </div>
                </section>
            </main>

            {/* Pie de página */}
            <footer>
                  <p>&copy; 2024 BVC Cryptocurrency Dashboard</p>
            </footer>
        </div>
    );
}

export default App;