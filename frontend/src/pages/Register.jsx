import {useState} from "react";
import  api from "../api/api.js"
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [form,setForm]= useState({name:"",email:"", password:""});
    const [error, setError] = useState("");
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
            navigate("/login");
        }
        catch(err){
            setError("Server Error");
        }
    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} />
                <button>Register</button>
            </form>
        </div>
    );
}