// Main starting point of the Application
const express = require('express');
const http= require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router');

const app = express();

require('./connection');

//App setup

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({urlencoded: true}));
app.use(bodyParser.json()) // parse application/json

router(app);


if (process.env.NODE_ENV === "production") {
    //js and css file
    app.use(express.static("client/build"));
  
    //index.html for all routes
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server running at port ${port}`));
