import React from "react" 
import { Link, useNavigate } from "react-router-dom"; 
import { use } from "../../../server/controllers";

import auth from "../../../server/utils/auth";

const Nav = () => {
    const navigate = useNavigate(); 

    const logout = (event) => {
        event.preventDefault(); 
        auth.logout(); 
        navigate("/"); 
    }; 

    return (

        
    )
}