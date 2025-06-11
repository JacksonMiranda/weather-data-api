// backend/index.js (VERSÃO FINAL, CORRIGIDA E LIMPA)

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const pool = require('./database');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// --- Configuração do Swagger ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Dados Climáticos',
            version: '1.0.0',
            description: 'API para buscar dados climáticos da OpenWeather, armazenar em um banco de dados e permitir a consulta.',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./index.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROTAS DA API ---

/**
 * @swagger
 * tags:
 *   - name: Weather
 *     description: Endpoints para manipulação de dados climáticos
 */

/**
 * @swagger
 * /weather/{city}:
 *   post:
 *     summary: Busca e armazena dados climáticos de uma cidade.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da cidade.
 *     responses:
 *       '201':
 *         description: Dados climáticos armazenados com sucesso.
 *       '400':
 *         description: Chave da API não configurada.
 *       '500':
 *         description: Erro no servidor.
 */
app.post('/weather/:city', async (req, res) => {
    const { city } = req.params;
    if (!OPENWEATHER_API_KEY) {
        return res.status(400).json({ error: 'Chave da API OpenWeather não foi configurada no arquivo .env' });
    }
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;
    try {
        const weatherResponse = await axios.get(weatherApiUrl);
        const { main, weather } = weatherResponse.data;
        const weatherData = {
            city: city.toLowerCase(),
            temperature: main.temp,
            feels_like: main.feels_like,
            humidity: main.humidity,
            description: weather[0].description,
        };
        const queryText = `
            INSERT INTO weather_data (city, temperature, feels_like, humidity, description)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [
            weatherData.city,
            weatherData.temperature,
            weatherData.feels_like,
            weatherData.humidity,
            weatherData.description,
        ];
        const { rows } = await pool.query(queryText, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ message: error.response.data.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Consulta todos os registros de dados climáticos.
 *     tags:
 *       - Weather
 *     responses:
 *       '200':
 *         description: Lista de registros climáticos.
 *       '500':
 *         description: Erro ao consultar o banco de dados.
 */
app.get('/weather', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM weather_data ORDER BY timestamp DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
    }
});

// --- CRIAÇÃO DA TABELA SE NÃO EXISTIR ---
const createTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS weather_data (
            id SERIAL PRIMARY KEY,
            city VARCHAR(100) NOT NULL,
            temperature NUMERIC(5, 2) NOT NULL,
            feels_like NUMERIC(5, 2) NOT NULL,
            humidity INTEGER NOT NULL,
            description VARCHAR(255),
            timestamp TIMESTAMPTZ DEFAULT NOW()
        );
    `;
    try {
        await pool.query(queryText);
        console.log('Tabela "weather_data" verificada/criada com sucesso.');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    }
};

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação da API disponível em http://localhost:${PORT}/api-docs`);
    createTable();
});