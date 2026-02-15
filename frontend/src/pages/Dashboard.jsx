import { useState,useEffect } from "react";
import api from "../api/api.js";
import ApplicationCard from "../components/ApplicationCard.jsx";
import Navbar from "../components/Navbar.jsx";
import ApplicationModal from "../components/ApplicationModal.js";

export default function Dashboard(){
    const[applications,setApplications] = useState([]);
    const [loading,setLoading]= useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editApp, setEditApp] = useState(null);
    const openEdit = (app) => {
        setEditApp(app);
        setShowModal(true);
        };

    const stats = {
        total: applications.length,
        interview: applications.filter(a => a.status === "Interview").length,
        offer: applications.filter(a => a.status === "Offer").length,
        rejected: applications.filter(a => a.status === "Rejected").length

    }

    const fetchApplications = async ()=>{
        try{
            console.log("Fetching applications...");
            const result = await api.get("/applications");
            console.log("API response:", result.data);
            setApplications(result.data);
        }
        catch(err){
            console.error("error fetching applications",err)
            if (err.response?.status === 401) {
                console.error("Authentication error - no valid token");
            }
        }
        finally{
            setLoading(false);
        }

    }
    const deleteApp = async (id) => {
        try {
            await api.delete(`/applications/${id}`);
            fetchApplications();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(()=>{
        fetchApplications();
    },[]);
    

    return(
        <div className="dashboard">
            <Navbar/>
            <h1>My Applications</h1>
            <button onClick={()=>setShowModal(true)}>+ Add Application</button>
            {showModal && <ApplicationModal
                closeModal={() => {
                    setShowModal(false);
                    setEditApp(null);
                }}
                refreshApps={fetchApplications}
                editApp={editApp}
                />
            }
            <div className="stats-container">
                <div className="stat-box">
                    <h3>{stats.total}</h3>
                    <p>Total Applications</p>
                </div>
                <div className="stat-box">
                    <h3>{stats.offer}</h3>
                    <p>Offers</p>
                </div>
                <div className="stat-box">
                    <h3>{stats.rejected}</h3>
                    <p>Rejected</p>
                </div>
            </div>
            <div className="applications-grid">
                {applications.map((app)=>{
                   return <ApplicationCard key={app.id} app={app} openEdit={openEdit} deleteApp={deleteApp}/>
                })}
            </div>
        </div>
    )
}