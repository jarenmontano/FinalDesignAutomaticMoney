const express = require("express");
//var session = require('express-session');
//var MongoDBStore = require('connect-mongodb-session')(session);

const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const configDatabase = require("./db/db.js")
var amortization = require("amortization");



const app = express();

//need this for sessions
app.use(cors({
    origin : "http://localhost:3000", credentials: true
}));
app.use(bodyParser.json());
configDatabase();


app.get("/", (req, res) => res.send("Hello, World!"));
app.listen(4000 , () => {
    console.log("Server is running on http://localhost:4000");
});



app.post("/calculate", (req, res) => {
    SI = simpleInterest(req.body.amount, req.body.rate, req.body.term);
    amoratize = amortization.amortizationSchedule(Number(req.body.amount), Number(req.body.term), Number(req.body.rate));
    console.log(amoratize);
    returnString = {si: SI, totalCost: SI+Number(req.body.amount), amoratized: amoratize};
    console.log(returnString);
    res.json(returnString);

});

//how to do simple interest
/*
Simple interest = principal (P) x interest rate (R) x loan term in
years (T) / 100
*/

function simpleInterest(principal, rate, term){

    return Number(principal) * (Number(rate)/100) * (Number(term) /12);
}

function amoratized(principal, rate, term){
    let amoratized = Number(principal) * ((Number(rate)/100) * Math.pow((1 + (Number(rate)/100)), Number(term))/ Math.pow((1 + (Number(rate)/100)), Number(term)) - 1);

    return amoratized;
}


