const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;



app.get('/products', (req, res) => {

    let rawdata = fs.readFileSync('products/data.json');
    let products = JSON.parse(rawdata);
    res.status(200).json(products);

})



app.listen(PORT, () => {
    console.log("SERVER RUNNING TIME ---->", new Date().toLocaleTimeString(), "<--- SERVER RUNNING TIME")

    console.log('Listening on port', PORT);
})




