import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/departments/")
      .then((response) => setDepartments(response.data))
      .catch(() => alert("Could not load departments"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="page-padding">Loading departments...</p>;
  }

  return (
    <section className="page-padding">
      <h1>Departments</h1>
      <p>Explore our hospital departments and available care areas.</p>

      <div className="grid">
        {departments.map((department) => (
          <div className="card" key={department.id}>
            <h3>{department.name}</h3>
            <p>{department.description}</p>
            <span>{department.doctors_count} doctors available</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Departments;