export default function ConfirmModal({ message, onConfirm, onCancel }) {

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>{message}</h3>

        <div className="modal-actions">
          <button className="btn danger-btn" onClick={onConfirm}>Delete</button>
          <button className="btn secondary-btn" onClick={onCancel}>Cancel</button>
        </div>

      </div>
    </div>
  );
}