import { useState } from "react";
import api from "../api/api.js";
import { toast } from "react-toastify";

export default function ApplicationModal({closeModal, refreshApps, editApp}){
    const [form, setForm] = useState(editApp || {
        company: "",
        role: "",
        location: "",
        salary: "",
        status: "Applied",
        applied_date: "",
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
                toast.success("Application updated successfully");
            } else {
                await api.post("/applications", form);
                toast.success("Application added successfully");
            }

            await refreshApps();
            closeModal();
        }
        catch(err){
            console.error(err);
            toast.error("Failed to save application");
        }

    }
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="reg-loginh">Add Application</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="role"
                        placeholder="Role"
                        value={form.role}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                    />

                    <input
                        name="salary"
                        placeholder="Salary (optional)"
                        value={form.salary || ""}
                        onChange={handleChange}
                    />

                    <select name="status" value={form.status} onChange={handleChange}>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    <input
                        type="date"
                        name="applied_date"
                        value={form.applied_date || ""}
                        onChange={handleChange}
                        className="date-input"
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={form.notes}
                        onChange={handleChange}
                    />

                    <div className="modal-actions">
                        <button className="btn primary-btn" type="submit">Save</button>
                        <button className="btn secondary-btn" type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    );

}