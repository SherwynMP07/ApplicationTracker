import {useState} from "react";
import  api from "../api/api.js"
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register(){
    const [form,setForm]= useState({name:"",email:"", password:""});

    const navigate = useNavigate();

    const handleChange = (e) => setForm(
        {...form ,
         [e.target.name]:e.target.value
        }
    );

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await api.post("/auth/register",form);
            toast.success("Registration successful. You can now log in.");
            navigate("/login");
        }
        catch(err){
            console.error(err);
            toast.error("Registration failed. Please verify your credentials.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="reg-loginh">Register</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input name="name" placeholder="Name" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="password" placeholder="Password" type="password" onChange={handleChange} />
                    <button className="btn primary-btn">Register</button>
                </form>
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}