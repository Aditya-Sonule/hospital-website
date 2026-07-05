import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">24/7 Healthcare Support</p>
        <h1>Your Health, Our Priority</h1>
        <p>
          Book appointments with trusted doctors, explore departments, and access
          emergency contact information from one simple hospital portal.
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

      <div className="hero-card">
        <h3>Emergency Help</h3>
        <p>For urgent medical emergencies, call your local emergency service or visit the nearest emergency department.</p>
        <strong>Emergency Number: 108</strong>
      </div>
    </section>
  );
}

export default Home;