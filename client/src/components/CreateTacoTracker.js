import {useState, useEffect} from 'react';
import axios from 'axios';



function CreateTacoTracker(){
    const [tacoInfo, setTacoInfo] = useState({personName: "" , tacosNum: ""});
    function handleChange(e){
        setTacoInfo({ ...tacoInfo, [e.target.name]: e.target.value });
    }
    function handleSubmit(e){
        e.preventDefault();

        axios
        .post("http://localhost:4000/tacos", tacoInfo)
        .then((res)=>{
            console.log("The Response is: " + JSON.stringify(res.data.message));
            console.log("if it exists is 1 is true 0 is doesn't " + JSON.stringify(res.data.exists));
         })
        .catch((err) =>{
            console.log("Error, couldn't create taco entry");
            console.log(err.message);
        });
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text"
                 name="personName" 
                 id = "personName"
                 value={tacoInfo.personName}
                 onChange = {handleChange}/>
                <br/>
                <label>How many tacos did you eat:</label>
                <input type="text" 
                name='tacosNum' 
                id = "tacosNum"
                value={tacoInfo.tacosNum}
                onChange={handleChange}/>

                <br/>
                <button type='submit'>Submit Taco info</button>

            </form>
        </div>
    );
}

export default CreateTacoTracker;