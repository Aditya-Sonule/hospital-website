import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const nextPage = searchParams.get("next") || "/book-appointment";

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await login(username, password);
      alert("Login successful.");
      navigate("/");
    } catch {
      alert("Login failed. Check username and password.");
    }
  }

  return (
    <section className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <p className="form-subtitle">
          Login to book appointments, checkups, blood donation slots, or organ donation counselling.
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

        <button className="primary-button">Login</button>

        <p className="auth-switch-text">
          Don&apos;t have an account?{" "}
          <Link to={`/register?next=${encodeURIComponent(nextPage)}`}>
            Create one
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;