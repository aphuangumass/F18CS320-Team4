const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const item = require('./routes/api/items');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//DB config
const db = require("./config/keys").mongoURI;
const Itemsdb = require('./config/keys').mongoItems;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected - users"))
  .catch(err => console.log(err));

mongoose.connect(Itemsdb, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
const pass =require("./config/passport");
pass.myfunc();

    
// Use Routes
app.use("/api/items", item);
app.use("/api/users", users);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));