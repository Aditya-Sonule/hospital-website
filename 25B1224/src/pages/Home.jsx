import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-overlay">
          <div className="home-content">
            <p className="eyebrow">24/7 Healthcare Support</p>
            <h1>Compassionate Care for Every Life</h1>

            <p className="hero-description">
              Book doctor appointments, schedule body checkups, register for blood donation,
              and support treatment for patients in need through one simple hospital portal.
            </p>

            <div className="hero-actions">
              <Link to="/book-appointment" className="primary-button">
                Book a Service
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

      <section className="home-services-section">
        <div className="section-heading">
          <p className="eyebrow dark">CareBridge Services</p>
          <h2>More than appointments — complete care support</h2>
          <p>
            Explore essential hospital services designed for patients, donors, and families.
          </p>
        </div>

        <div className="service-grid">
          <div className="service-card accent-blue">
            <h3>Doctor Appointments</h3>
            <p>Consult specialists by department and book available 15-minute slots.</p>
            <Link to="/book-appointment">Book appointment</Link>
          </div>

          <div className="service-card accent-green">
            <h3>Body Checkups</h3>
            <p>Schedule preventive checkups and routine health screening visits.</p>
            <Link to="/body-checkup">Explore checkups</Link>
          </div>

          <div className="service-card accent-red">
            <h3>Blood Donation</h3>
            <p>Register for blood donation drives and help patients in need.</p>
            <Link to="/blood-donation">Become a donor</Link>
          </div>

          <div className="service-card accent-purple">
            <h3>Organ Donation Counselling</h3>
            <p>Book an awareness session for ethical organ donation registration.</p>
            <Link to="/organ-donation">Learn more</Link>
          </div>

          <div className="service-card accent-gold wide-service-card">
            <h3>Support Treatment for Poor Patients</h3>
            <p>
              Contribute to treatment support funds for patients from financially
              vulnerable backgrounds.
            </p>
            <Link to="/treatment-support">Support treatment</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;