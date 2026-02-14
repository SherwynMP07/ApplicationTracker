import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const[form, setForm] = useState({email:"", password:""})
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await api.post("/auth/Login",form)
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        }
        catch(err){
            setError({message:"Server Error"});
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange}/>
                <input name="password" placeholder="Password" type="password" onChange={handleChange}/>
                <button>Login</button>
            </form>
        </div>
    );

}