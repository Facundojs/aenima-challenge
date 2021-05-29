const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser());
app.use(cors());

const DB_PORT = 3010;

app.listen(DB_PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${DB_PORT}`)
});

const router = require('./router')

app.use('/api/v1/products', router)