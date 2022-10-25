const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;



//Server listens on PORT 3001 or environment variable PORT
app.listen(PORT, ()=>{
    console.log(`listenting on port ${PORT}`)
})