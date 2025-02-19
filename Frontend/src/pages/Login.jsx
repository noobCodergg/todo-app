import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import FormInput from "../components/FormInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("userId",response.data.data.id)
      alert(response.data.message || "Login successful!");
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  
  const inputFields = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((field, index) => (
            <FormInput
              key={index}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="mt-2 text-sm">
          Don't have an account? {" "}
          <Link to="/register" className="text-blue-500">Register Here!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;