import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import LoanCalculator from "./components/loanCalculator";
import ".//index.css";


function App(){
    //axios.defaults.withCredentials = true;
    return (
        <div>
            <Routes>
                <Route path = "/" element={<LoanCalculator/>}></Route>
                

            </Routes>
            
        </div>

    )
}



const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)