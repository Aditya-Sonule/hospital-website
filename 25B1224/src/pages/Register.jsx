import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await register(username, password);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed.");
    }
  }

  return (
    <section className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className="primary-button">Create Account</button>
      </form>
    </section>
  );
}

export default Register;