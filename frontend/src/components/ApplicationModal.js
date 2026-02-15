import { useState } from "react";
import api from "../api/api.js";

export default function ApplicationModal({closeModal, resfreshApps, editApp}){
    const [form, setForm] = useState(editApp || {
        company: "",
        role: "",
        location: "",
        status: "Applied",
        applied_date: "",
        followup_date: "",
        notes: ""
    });

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            if (editApp) {
            await api.put(`/applications/${editApp.id}`, form);
            } else {
            await api.post("/applications", form);
            }
        }
        catch(err){
            console.error(err);
        }
    }
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Application</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="company"
                        placeholder="Company"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="role"
                        placeholder="Role"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                    />

                    <select name="status" onChange={handleChange}>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    <input
                        type="date"
                        name="applied_date"
                        onChange={handleChange}
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        onChange={handleChange}
                    />

                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );

}