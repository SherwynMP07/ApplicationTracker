import { Link } from "react-router-dom";

export default function Navbar(){
    return(
    <nav className="navbar">
        <h2>Job Application Tracker</h2>
        <Link to="/dashboard">Dashboard</Link>
    </nav>
    );
}