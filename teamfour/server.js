const express = require('express');
const mongoose = require('mongoose');

const data = require('../routes/api/data');

const app = express();

//DB config
const db = require('../config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/data', data);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));