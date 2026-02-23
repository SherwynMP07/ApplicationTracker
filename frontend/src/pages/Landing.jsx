import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Job Application Tracker</h1>
        <p className="auth-subtitle">
          Keep track of every application, interview and offer in one clean dashboard.
        </p>
        <div className="landing-actions">
          <Link to="/register" className="btn primary-btn">
            Get Started - Register
          </Link>
          <Link to="/login" className="btn secondary-btn">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
