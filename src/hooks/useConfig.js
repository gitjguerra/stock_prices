import { useState, useEffect } from 'react';
import axios from 'axios';

const useConfig = () => {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        async function loadConfig() {
            try {
                const response = await axios.get('/config.json');
                setApiKey(response.data.apiKey);
            } catch (error) {
                console.error('Error al cargar el archivo de configuración:', error);
            }
        }

        loadConfig();
    }, []);

    return apiKey;
};

export default useConfig;