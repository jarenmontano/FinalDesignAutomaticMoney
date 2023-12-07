import { useState, useEffect } from "react";
import axios from "axios";

function LoanCalculator() {
    const [loanInfo, setLoanInfo] = useState({amount: "", term: "", rate: ""});
    const [simpleInterest, setSimpleInterest] = useState("");
    const [amoratized, setAmoratized] = useState([{
        paymentNumber: 39,
        payment: 637.42,
        principalBalance: 12535.94898742738,
        interestPayment: 79.11114115456493,
        principalPayment: 558.308858845435,
        accInterest: 5395.328987427386,
        interestPaymentRounded: 79.11,
        principalPaymentRounded: 558.3,
        principalBalanceRounded: 12535.94,
        accInterestRounded: 5395.32
      },
      {
        paymentNumber: 40,
        payment: 637.42,
        principalBalance: 11974.267012559754,
        interestPayment: 75.73802513237375,
        principalPayment: 561.6819748676262,
        accInterest: 5471.06701255976,
        interestPaymentRounded: 75.73,
        principalPaymentRounded: 561.68,
        principalBalanceRounded: 11974.26,
        accInterestRounded: 5471.06
      },
      {
        paymentNumber: 41,
        payment: 637.42,
        principalBalance: 11409.191542427303,
        interestPayment: 72.34452986754852,
        principalPayment: 565.0754701324514,
        accInterest: 5543.411542427309,
        interestPaymentRounded: 72.34,
        principalPaymentRounded: 565.07,
        principalBalanceRounded: 11409.19,
        accInterestRounded: 5543.41
      }]);


      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    function handleChange(e) {
        setLoanInfo({ ...loanInfo, [e.target.name]:e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        console.log(loanInfo);

        //will need to send the info to server and that will run the math.
        axios
        .post("http://localhost:4000/calculate", loanInfo)
        .then((res) => {
            setAmoratized(res.data.amoratized);
            console.log(amoratized);
            
        })
        .catch((err) => {
            console.log("Error computing interest.");
        });
        
        
    }
 
    
    return (
        <div data-bs-theme="light">
            <div class = "background">
                <h1 class="logo">Automatic Money</h1>
            </div>
        <div class="w-50 p-3 mx-auto">
            
            <h1>Loan Calculator</h1>

            <div class="mb-3">
                <label for="amount" class="form-label">Loan Amount</label>
                <input type="text" class="form-control" id="amount" name = "amount"placeholder="15000" value={loanInfo.amount} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="term" class="form-label">Loan Term</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="term" name = "term" placeholder="5" value={loanInfo.term} onChange={handleChange}/> 
                    <div class="input-group-text">Years</div>
                </div>
            </div>
            <div class="mb-3">
                <label for="rate" class="form-label">Interest Rate</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="rate" name="rate" placeholder="8.25" value={loanInfo.rate} onChange={handleChange}/>
                    <div class="input-group-text">% Percent</div>
                </div>
            </div>
            <div class = "text-center">
                <button type="button" class="btn btn-secondary btn-lg" onClick={handleSubmit}>Calculate</button>
            </div>
            <div class="h-50 d-inline-block">
                <br></br>
                <br></br>
                <br></br>
            </div>
            <div>
            <h2 class="text-center">Your Loan Amoratized</h2>
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Payment Number</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Principle Balance</th>
                                <th scope="col">Accrued Interest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {amoratized.map((amoratized, index) => (
                                <tr key={index}>
                                    <td>{amoratized.paymentNumber}</td>
                                    <td>{formatter.format(amoratized.payment)}</td>
                                    <td>{formatter.format(amoratized.principalBalanceRounded)}</td>
                                    <td>{formatter.format(amoratized.accInterestRounded)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
        </div>


    );

}


export default LoanCalculator;