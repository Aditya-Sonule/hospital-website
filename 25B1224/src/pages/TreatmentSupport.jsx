import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function TreatmentSupport() {
  const [form, setForm] = useState({
    donor_name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axiosInstance.post("/treatment-support/", {
        ...form,
        amount: Number(form.amount),
      });

      alert("Thank you for supporting patient treatment.");

      setForm({
        donor_name: "",
        email: "",
        phone: "",
        amount: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Could not submit support form.");
    }
  }

  return (
    <section className="form-page">
      <form className="form-card wide" onSubmit={handleSubmit}>
        <h1>Support Treatment for Poor Patients</h1>
        <p className="form-subtitle">
          Your contribution can help patients receive essential medical care.
        </p>

        <input
          name="donor_name"
          placeholder="Your name"
          value={form.donor_name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email optional"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Donation amount in ₹"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message optional"
          value={form.message}
          onChange={handleChange}
        />

        <button className="primary-button">Submit Support Request</button>
      </form>
    </section>
  );
}

export default TreatmentSupport;