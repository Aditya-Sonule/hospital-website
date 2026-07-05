import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAppointments() {
    try {
      const response = await axiosInstance.get("/appointments/");
      setAppointments(response.data);
    } catch {
      alert("Please login to view appointments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function cancelAppointment(id) {
    try {
      await axiosInstance.patch(`/appointments/${id}/`, {
        status: "cancelled",
      });

      loadAppointments();
    } catch {
      alert("Could not cancel appointment.");
    }
  }

  if (loading) {
    return <p className="page-padding">Loading appointments...</p>;
  }

  return (
    <section className="page-padding">
      <h1>My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid">
          {appointments.map((appointment) => (
            <div className="card" key={appointment.id}>
              <h3>{appointment.patient_name}</h3>
              <p>Doctor: {appointment.doctor_name}</p>
              <p>Department: {appointment.department_name}</p>
              <p>Date: {appointment.appointment_date}</p>
              <p>Time: {appointment.time_slot}</p>
              <p>Status: {appointment.status}</p>

              {appointment.status !== "cancelled" && (
                <button
                  className="danger-button"
                  onClick={() => cancelAppointment(appointment.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyAppointments;