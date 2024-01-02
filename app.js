const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
const app = express(); 

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOption)); 
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message : "server is running"
    })
})

const port = process.env.PORT || 3000
const host = 'localhost'

app.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
})
