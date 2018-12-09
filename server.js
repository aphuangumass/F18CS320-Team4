const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const item = require('./routes/api/items');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());
app.use(express.json());


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