import { useState, useEffect } from "react";
import axios from "axios";

function ListTacos() {
    const [items, setItems] = useState([]);


    useEffect(
        function(){
            axios.get("http://localhost:4000/tacos")
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
        []
    );
    
    return (
        <div>
            {items.map((singleItem, index) =>(
                <p>{index}: {singleItem.personName} - {singleItem.tacosNum}</p>


            ))}

        </div>



    );

}


export default ListTacos;