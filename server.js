'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


app.get('/', (request, response) => {
    response.send('Home Page!');
    }
);

app.get('*', (request, response) => {
    throw new Error('oh nooooo!');
    }
);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

module.exports = app;