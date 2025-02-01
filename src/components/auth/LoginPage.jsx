import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EvaluasiService from "../service/EvaluasiService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EvaluasiService.login(email, password);
      if (response.token) {
        if (response.role == 'STUDENT') {
          alert('Sorry, you are not allowed to access this page');
          return;
        }
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        navigate("/exam-management");
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="login">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
