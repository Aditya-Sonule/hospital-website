import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CareBridge Hospital
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/book-appointment">Book Appointment</Link>
        <Link to="/contact">Contact</Link>

        {isLoggedIn ? (
          <>
            <Link to="/my-appointments">My Appointments</Link>
            <button onClick={logout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;