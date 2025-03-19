require("dotenv").config();

//import express
const express = require("express");

//gestion route dans fichier
const router = require("./router");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

//port listen
const port = process.env.PORT;

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);
app.listen(port, () => console.log("Listening on port " + port));