import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




export function Logout() {
   
    const letsNavigate = useNavigate;
    const [items, setItems] = useState([]);
    const [accessToken, setAccessToken] = useState([]);

    useEffect(() => {
        localStorage.getItem(accessToken, "accessToken", items, "items")
        localStorage.clear("items", JSON.stringify(items))
     
        localStorage.removeItem("accessToken", accessToken )
    }, [items, accessToken]);
    
    if(localStorage === 0) {
        new alert("You are now logged out")
        letsNavigate("/")
    
    } 

    return null
   
    
};



export default Logout;