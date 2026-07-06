import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/doctors/")
      .then((response) => {
        console.log("Doctors API response:", response.data);

        const doctorsData = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setDoctors(doctorsData);
      })
      .catch((error) => {
        console.error("Doctors API error:", error);
        alert("Could not load doctors");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const text = `${doctor.name || ""} ${doctor.specialization || ""} ${
      doctor.department_name || ""
    }`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  if (loading) {
    return <p className="page-padding">Loading doctors...</p>;
  }

  return (
    <section className="page-padding">
      <h1>Doctors</h1>
      <p>Find doctors by name, specialization, or department.</p>

      <input
        className="search-input"
        placeholder="Search doctors..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredDoctors.length === 0 ? (
        <p className="empty-message">No doctors found.</p>
      ) : (
        <div className="grid">
          {filteredDoctors.map((doctor) => (
            <div className="card" key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>{doctor.department_name}</p>
              <p>{doctor.qualification}</p>
              <p>{doctor.experience_years} years experience</p>
              <p>Fee: ₹{doctor.consultation_fee}</p>
              <p>Available: {doctor.available_days}</p>

              <Link to="/book-appointment" className="primary-button small">
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Doctors;