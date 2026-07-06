import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const nextPage = searchParams.get("next") || "/book-appointment";

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await register(username, password);
      alert("Registration successful. Please login.");

      navigate(`/login?next=${encodeURIComponent(nextPage)}`);
    } catch {
      alert("Registration failed. Try another username.");
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
          required
        />

        <button className="primary-button">Create Account</button>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link to={`/login?next=${encodeURIComponent(nextPage)}`}>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;