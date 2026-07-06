import { Link } from "react-router-dom";

function BodyCheckup() {
  return (
    <section className="info-page">
      <div className="info-hero checkup-hero">
        <div>
          <p className="eyebrow dark">Preventive Healthcare</p>
          <h1>Complete Body Checkups</h1>
          <p>
            Schedule routine health checkups and preventive screenings to monitor
            your overall health with professional hospital support.
          </p>

          <Link
            to="/book-appointment?type=body_checkup"
            className="primary-button"
          >
            Book Body Checkup
          </Link>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Basic Health Screening</h3>
          <p>General physical checkup, vitals, and basic medical review.</p>
        </div>

        <div className="info-card">
          <h3>Full Body Checkup</h3>
          <p>Comprehensive health checkup for general wellness monitoring.</p>
        </div>

        <div className="info-card">
          <h3>Senior Citizen Checkup</h3>
          <p>Health screening support designed for older patients.</p>
        </div>
      </div>
    </section>
  );
}

export default BodyCheckup;
