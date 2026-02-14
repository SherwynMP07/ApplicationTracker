import { useState,useEffect } from "react";
import api from "../api/api.js";
import ApplicationCard from "../components/ApplicationCard.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard(){
    const[applications,setApplications] = useState([]);
    const [loading,setLoading]= useState(true);

    const fetchApplications = async ()=>{

        try{
            const result = await api.get("/applications");
            setApplications(result.data);
        }
        catch(err){
            console.error("error fetching applications",err)
        }
        finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        fetchApplications();
    },[]);
    

    return(
        <div className="dashboard">
            <Navbar/>
            <h1>My Application</h1>
            <div className="applications-grid">
                {applications.map((app)=>{
                   return <ApplicationCard key={app.id} app={app}/>
                })}
            </div>
        </div>
    )
}