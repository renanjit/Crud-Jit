require('dotenv').config();

const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const porta = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtoRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
