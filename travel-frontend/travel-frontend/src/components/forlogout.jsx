// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { UserContext } from "../context/UserContext";

// export default function Navbar() {
//   const { loggedIn, logoutUser } = useContext(UserContext);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://127.0.0.1:8000/api/logout/", {}, { withCredentials: true });
//       logoutUser();
//       alert("Logged out successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Error logging out");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/">Home</Link>
//       <Link to="/destinations">Destinations</Link>

//       {loggedIn ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <Link to="/login">Login</Link>
//       )}
//     </nav>
//   );
// }
