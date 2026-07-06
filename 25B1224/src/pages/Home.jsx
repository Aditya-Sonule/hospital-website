import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-hero">
      <div className="home-overlay">
        <div className="home-content">
          <p className="eyebrow">24/7 Healthcare Support</p>

          <h1>Your Health, Our Priority</h1>

          <p className="hero-description">
            Book appointments with trusted doctors, explore departments, and
            access emergency contact information from one simple hospital portal.
          </p>

          <div className="hero-actions">
            <Link to="/book-appointment" className="primary-button">
              Book Appointment
            </Link>

            <Link to="/doctors" className="secondary-button">
              View Doctors
            </Link>
          </div>
        </div>

        <div className="emergency-card">
          <span className="emergency-badge">Emergency</span>
          <h3>Need urgent care?</h3>
          <p>
            For urgent medical emergencies, call your local emergency service or
            visit the nearest emergency department.
          </p>
          <strong>Emergency Number: 108</strong>
        </div>
      </div>
    </section>
  );
}

export default Home;