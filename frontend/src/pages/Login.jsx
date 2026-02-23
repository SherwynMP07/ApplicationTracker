import { useState } from "react";
import api from "../api/api.js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(){
    const[form, setForm] = useState({email:"", password:""})

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
            toast.success("Login successful");
            navigate("/dashboard");
        }
        catch(err){
            console.error(err);
            toast.error("Login failed. Please check your email and password.");
        }

    }
    return(
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="reg-loginh">Login</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input name="email" placeholder="Email" onChange={handleChange}/>
                    <input name="password" placeholder="Password" type="password" onChange={handleChange}/>
                    <button className="btn primary-btn">Login</button>
                </form>
                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );

}