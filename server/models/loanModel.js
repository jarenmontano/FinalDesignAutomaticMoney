const mongoose = require("mongoose");

const LoanModel = new mongoose.Schema({
  LoanAmatorized: {
    type: String,
    required: true,
  },
  
 
});

const AppLoan = mongoose.model("LoanInfo", LoanModel);

module.exports = AppLoan;
