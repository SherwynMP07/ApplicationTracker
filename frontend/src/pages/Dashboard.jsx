import { useState,useEffect ,useMemo} from "react";
import api from "../api/api.js";
import ApplicationCard from "../components/ApplicationCard.jsx";
import ApplicationModal from "../components/ApplicationModal.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard(){
    const[applications,setApplications] = useState([]);
    const [loading,setLoading]= useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editApp, setEditApp] = useState(null);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Newest");
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };
    const confirmDelete = async () => {
        try {
            await api.delete(`/applications/${deleteId}`);
            setDeleteId(null);
            fetchApplications();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete application");
        }
    };
    const filteredAndSortedApps = useMemo(() => {
        const statusFiltered = applications.filter(app => {
            if (filter === "All") return true;
            return app.status === filter;
        });
        const searched = statusFiltered.filter(app =>
            app.company.toLowerCase().includes(search.toLowerCase()) ||
            app.role.toLowerCase().includes(search.toLowerCase())
        );
        return [...searched].sort((a, b) => {
            if (sort === "Newest") {
            return new Date(b.applied_date) - new Date(a.applied_date);
            }
            if (sort === "Oldest") {
            return new Date(a.applied_date) - new Date(b.applied_date);
            }
            if (sort === "Status") {
            return a.status.localeCompare(b.status);
            }
            return 0;
        });
        }, [applications, filter, search, sort]);

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
            const result = await api.get("/applications");
            setApplications(result.data);
        }
        catch(err){
            console.error("error fetching applications",err)
            toast.error("Failed to load applications");
        }
        finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        fetchApplications();
    },[]);
    
    if (loading) {
        return <div className="loading">Loading applications...</div>;
    }
    return(
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>My Applications</h1>
                    <p className="dashboard-subtitle">Track your job search progress at a glance.</p>
                </div>
                <button className="btn secondary-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            {showModal && <ApplicationModal
                closeModal={() => {
                    setShowModal(false);
                    setEditApp(null);
                }}
                refreshApps={fetchApplications}
                editApp={editApp}
                />
            }
            <div className="dashboard-filters">
                <div className="filters-left">
                <input
                type="text"
                placeholder="Search by company or role"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className="search-bar"
                />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Status</option>
                </select>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                </select>
                </div>

                <button
                    className="btn primary-btn"
                    onClick={() => setShowModal(true)}
                >
                + Add Application
                </button>
            </div>

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
            {/* <div className="chart-container">
                <div className="chart-card">
                    <h3>Applications by Status</h3>
                    <StatusChart applications={applications}/>
                </div>
            </div> */}
            <div className="applications-grid">
                {filteredAndSortedApps.length === 0 && (
                    <p>No applications found. Add one to get started.</p>
                )}
                {filteredAndSortedApps.map((app)=>{
                   return <ApplicationCard key={app.id} app={app} openEdit={openEdit} deleteApp={handleDeleteClick}/>
                })}
            </div>
            {deleteId && (
                <ConfirmModal
                    message="Delete this application?"
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </div>
    )
}