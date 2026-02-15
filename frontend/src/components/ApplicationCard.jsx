export default function ApplicationCard({ app, openEdit, deleteApp }) {

  const getStatusClass = (status)=>{
    switch(status){
      case "Applied":
        return "status applied";
      case "Interview":
        return "status interview";
      case "Rejected":
        return "status rejected";
      case "Offer":
        return "status offer";
      default:
        return "status";
    }
  }
  const formatDate = (date)=>{
    if(!date){
      return "N/A";
    }
    return new Date(date).toLocaleDateString();
  }
  return (
    <div className="card">

      <h3>{app.company}</h3>

      <p>
        <strong>Role:</strong> {app.role}
      </p>

      <p>
        <span className={getStatusClass(app.status)}>
          {app.status}
        </span>

      </p>

      <p>
        <strong>Location:</strong> {app.location}
      </p>

      <p>
        <strong>Applied:</strong> {formatDate(app.applied_date)}
      </p>

      {app.followup_date && (
        <p>
          <strong>Follow Up:</strong> {formatDate(app.followup_date)}
        </p>
      )}

      {app.salary && (
        <p>
          <strong>Salary:</strong> {app.salary}
        </p>
      )}

      {app.notes && (
        <p className="notes"> 📝 {app.notes}</p>
      )}

      <div className="card-actions">
        <button className="edit-btn" onClick={() => openEdit(app)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteApp(app.id)}>Delete</button>
      </div>

    </div>
  );
}
