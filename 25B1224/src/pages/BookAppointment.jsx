import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function BookAppointment() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [form, setForm] = useState({
    appointment_type: "doctor",
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
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      setDepartments(data);
    });

    axiosInstance.get("/doctors/").then((response) => {
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      setDoctors(data);
    });
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    if (!form.department) return false;
    return String(doctor.department) === String(form.department);
  });
  const selectedDoctor = doctors.find(
  (doctor) => String(doctor.id) === String(form.doctor)
  );

  useEffect(() => {
    if (form.appointment_type !== "doctor") {
      setAvailableSlots([
        { value: "09:00", label: "09:00 AM" },
        { value: "09:15", label: "09:15 AM" },
        { value: "09:30", label: "09:30 AM" },
        { value: "09:45", label: "09:45 AM" },
        { value: "10:00", label: "10:00 AM" },
        { value: "10:15", label: "10:15 AM" },
        { value: "10:30", label: "10:30 AM" },
        { value: "10:45", label: "10:45 AM" },
      ]);
      return;
    }

    if (!form.doctor || !form.appointment_date) {
      setAvailableSlots([]);
      return;
    }

    axiosInstance
      .get(`/available-slots/?doctor=${form.doctor}&date=${form.appointment_date}`)
      .then((response) => {
        setAvailableSlots(response.data);
      })
      .catch((error) => {
        console.error("Slots error:", error);
        setAvailableSlots([]);

        const message =
          error.response?.data?.error ||
          "No slots available for the selected date.";

        alert(message);
      });
  }, [form.doctor, form.appointment_date, form.appointment_type]);

function handleChange(event) {
  const { name, value } = event.target;

  if (name === "department") {
    setForm({
      ...form,
      department: value,
      doctor: "",
      time_slot: "",
    });
    setAvailableSlots([]);
    return;
  }

  if (name === "doctor" || name === "appointment_date") {
    setForm({
      ...form,
      value,
      time_slot: "",
    });
    return;
  }

  if (name === "appointment_type") {
    setForm({
      ...form,
      appointment_type: value,
      department: "",
      doctor: "",
      time_slot: "",
    });
    setAvailableSlots([]);
    return;
  }

  setForm({
    ...form,
    value,
  });
}

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const payload = {
        ...form,
        age: Number(form.age),
      };

      if (form.appointment_type === "doctor") {
        payload.department = Number(form.department);
        payload.doctor = Number(form.doctor);
      } else {
        payload.department = null;
        payload.doctor = null;
      }

      await axiosInstance.post("/appointments/", payload);

      alert("Booking submitted successfully.");

      setForm({
        appointment_type: "doctor",
        patient_name: "",
        age: "",
        phone: "",
        department: "",
        doctor: "",
        appointment_date: "",
        time_slot: "",
        reason: "",
      });

      setAvailableSlots([]);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      alert("Booking failed. Please check the selected details and login status.");
    }
  }

  return (
    <section className="form-page">
      <form className="form-card wide" onSubmit={handleSubmit}>
        <h1>Book a Service</h1>
        <p className="form-subtitle">
          Book doctor appointments, body checkups, blood donation, or organ donation counselling.
        </p>

        <select
          name="appointment_type"
          value={form.appointment_type}
          onChange={handleChange}
          required
        >
          <option value="doctor">Doctor Appointment</option>
          <option value="body_checkup">Body Checkup</option>
          <option value="blood_donation">Blood Donation</option>
          <option value="organ_donation">Organ Donation Counselling</option>
        </select>

        <input
          name="patient_name"
          placeholder="Full name"
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

        {form.appointment_type === "doctor" && (
          <>
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
              disabled={!form.department}
            >
              <option value="">
                {form.department ? "Select doctor" : "Select department first"}
              </option>

              {filteredDoctors.map((doctor) => (
                <option value={doctor.id} key={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
            {selectedDoctor && (
              <p className="doctor-availability-note">
                Available on: {selectedDoctor.available_days} | Time:{" "}
                {selectedDoctor.available_time}
              </p>
)}
          </>
        )}

        <input
          name="appointment_date"
          type="date"
          value={form.appointment_date}
          onChange={handleChange}
          required
        />

        <select
          name="time_slot"
          value={form.time_slot}
          onChange={handleChange}
          required
          disabled={!form.appointment_date || availableSlots.length === 0}
        >
          <option value="">
            {availableSlots.length === 0
              ? "No slots available"
              : "Select available slot"}
          </option>

          {availableSlots.map((slot) => (
            <option value={slot.value} key={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>

        <textarea
          name="reason"
          placeholder={
            form.appointment_type === "doctor"
              ? "Reason for visit"
              : "Additional details"
          }
          value={form.reason}
          onChange={handleChange}
        />

        <button className="primary-button">Submit Booking</button>
      </form>
    </section>
  );
}

export default BookAppointment;