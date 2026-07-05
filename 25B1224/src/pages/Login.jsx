import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await login(username, password);
      alert("Login successful.");
      navigate("/book-appointment");
    } catch {
      alert("Login failed. Check username and password.");
    }
  }

  return (
    <section className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Login</h1>

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
      </form>
    </section>
  );
}

export default Login;