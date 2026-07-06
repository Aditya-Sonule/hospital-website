import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/departments/")
      .then((response) => {
        console.log("Departments API response:", response.data);

        const departmentsData = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setDepartments(departmentsData);
      })
      .catch((error) => {
        console.error("Departments API error:", error);
        alert("Could not load departments");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="page-padding">Loading departments...</p>;
  }

  return (
    <section className="page-padding">
      <h1>Departments</h1>
      <p>Explore our hospital departments and available care areas.</p>

      {departments.length === 0 ? (
        <p className="empty-message">No departments found.</p>
      ) : (
        <div className="grid">
          {departments.map((department) => (
            <div className="card" key={department.id}>
              <h3>{department.name}</h3>
              <p>{department.description}</p>
              <span>{department.doctors_count} doctors available</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Departments;