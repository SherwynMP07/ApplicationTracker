import { useState } from "react";
import api from "../api/api.js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(){
    const[form, setForm] = useState({email:"", password:""})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try{
            const res = await api.post("/auth/Login",form)
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful");
            navigate("/dashboard");
        }
        catch(err){
            console.error(err);
            if (err.code === "ECONNABORTED"){
                toast.error("Server is waking up. Please try again in a few seconds.");
            } else {
                toast.error("Login failed. Please check your email and password.");
            }
        }
        finally{
            setIsSubmitting(false);
        }

    }

    return(
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="reg-loginh">Login</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input name="email" placeholder="Email" onChange={handleChange}/>
                    <input name="password" placeholder="Password" type="password" onChange={handleChange}/>
                    <button
                        className="btn primary-btn"
                        disabled={isSubmitting}
                        style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );

}