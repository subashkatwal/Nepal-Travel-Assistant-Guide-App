import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",{ email, password },
        { withCredentials: true }
      );
      navigate("/"); // redirect to home after login
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo"> Nepal Travel</div>
        <h2>Welcome</h2>
        <p>Sign in to your account or create a new one</p>

        <div className="tabs">
          <button className="active">Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>

        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn-submit">Login</button>
        </form>

        <a href="/" className="back-link">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
