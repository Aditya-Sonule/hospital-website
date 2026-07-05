import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function BookAppointment() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient_name: "",
    age: "",
    phone: "",
    department: "",
    doctor: "",
    appointment_date: "",
    time_slot: "",
    reason: "",
  });

  useEffect(() => {
    axiosInstance.get("/departments/").then((response) => {
      setDepartments(response.data);
    });

    axiosInstance.get("/doctors/").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axiosInstance.post("/appointments/", {
        ...form,
        age: Number(form.age),
        department: Number(form.department),
        doctor: Number(form.doctor),
      });

      alert("Appointment booked successfully.");

      setForm({
        patient_name: "",
        age: "",
        phone: "",
        department: "",
        doctor: "",
        appointment_date: "",
        time_slot: "",
        reason: "",
      });
    } catch {
      alert("Appointment booking failed. Please login and check all fields.");
    }
  }

  return (
    <section className="form-page">
      <form className="form-card wide" onSubmit={handleSubmit}>
        <h1>Book Appointment</h1>

        <input
          name="patient_name"
          placeholder="Patient name"
          value={form.patient_name}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        >
          <option value="">Select department</option>
          {departments.map((department) => (
            <option value={department.id} key={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select doctor</option>
          {doctors.map((doctor) => (
            <option value={doctor.id} key={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>

        <input
          name="appointment_date"
          type="date"
          value={form.appointment_date}
          onChange={handleChange}
          required
        />

        <input
          name="time_slot"
          placeholder="Time slot, e.g. 10:00 AM"
          value={form.time_slot}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for visit"
          value={form.reason}
          onChange={handleChange}
        />

        <button className="primary-button">Book Appointment</button>
      </form>
    </section>
  );
}

export default BookAppointment;