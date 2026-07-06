import { Link } from "react-router-dom";

function BloodDonation() {
  return (
    <section className="info-page">
      <div className="info-hero blood-hero">
        <div>
          <p className="eyebrow dark">Donate Blood, Save Lives</p>
          <h1>Blood Donation Registration</h1>
          <p>
            Register for blood donation drives and help patients who may need
            timely blood support during treatment or emergencies.
          </p>

          <Link
            to="/book-appointment?type=blood_donation"
            className="primary-button"
          >
            Register for Blood Donation
          </Link>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Safe Registration</h3>
          <p>Book a donation slot and hospital staff can guide the next steps.</p>
        </div>

        <div className="info-card">
          <h3>Community Support</h3>
          <p>Your participation can support patients in urgent need.</p>
        </div>

        <div className="info-card">
          <h3>Scheduled Slots</h3>
          <p>Select a convenient date and time for donation registration.</p>
        </div>
      </div>
    </section>
  );
}

export default BloodDonation;