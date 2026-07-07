import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return;
    }

    try {
      await register(username, password);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);

      const data = error.response?.data;

      let message = "Registration failed.";

      if (data?.username) {
        message = data.username[0];
      } else if (data?.password) {
        message = "Password should be at least 8 characters long.";
      } else if (data?.detail) {
        message = data.detail;
      }

      alert(message);
    }
  }

  return (
    <section className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <p className="form-subtitle">
          Create an account to book services and view your appointment history.
        </p>

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
          minLength={8}
          required
        />

        <p className="password-hint">
          Password should be at least 8 characters long.
        </p>

        <button className="primary-button">Create Account</button>

        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;