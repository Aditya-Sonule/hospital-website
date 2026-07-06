import { Link } from "react-router-dom";

function OrganDonation() {
  return (
    <section className="info-page">
      <div className="info-hero organ-hero">
        <div>
          <p className="eyebrow dark">Awareness & Counselling</p>
          <h1>Organ Donation Counselling</h1>
          <p>
            Learn about ethical organ donation registration through a hospital
            counselling session. This page is for awareness and counselling
            requests only.
          </p>

          <Link
            to="/book-appointment?type=organ_donation"
            className="primary-button"
          >
            Request Counselling
          </Link>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Awareness Session</h3>
          <p>Understand the organ donation registration process responsibly.</p>
        </div>

        <div className="info-card">
          <h3>Ethical Guidance</h3>
          <p>Speak with hospital support staff for lawful and ethical guidance.</p>
        </div>

        <div className="info-card">
          <h3>Family Discussion Support</h3>
          <p>Book counselling to understand how donation registration works.</p>
        </div>
      </div>
    </section>
  );
}

export default OrganDonation;
