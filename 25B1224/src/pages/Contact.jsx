function Contact() {
  return (
    <section className="page-padding">
      <h1>Contact & Emergency</h1>

      <div className="grid">
        <div className="card">
          <h3>Emergency</h3>
          <p>
            For urgent medical emergencies, call your local emergency service or
            visit the nearest emergency department.
          </p>
          <strong>Emergency Number: 108</strong>
        </div>

        <div className="card">
          <h3>Hospital Contact</h3>
          <p>Phone: +91 98765 43210</p>
          <p>Email: contact@carebridge.example</p>
          <p>Address: Mumbai, Maharashtra, India</p>
        </div>

        <div className="card">
          <h3>Working Hours</h3>
          <p>OPD: 9:00 AM - 6:00 PM</p>
          <p>Emergency: 24/7</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;