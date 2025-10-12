import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        password,
        confirm_password: confirmPassword,
        role: "user", // default role
      }, { withCredentials: true });
      alert(res.data.success);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">🏔️ Nepal Travel</div>
        <h2>Welcome</h2>
        <p>Sign in to your account or create a new one</p>

        <div className="tabs">
          <button onClick={() => navigate("/login")}>Login</button>
          <button className="active">Sign Up</button>
        </div>

        <form onSubmit={handleSignup}>
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
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn-submit">Create Account</button>
        </form>

        <a href="/" className="back-link">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
