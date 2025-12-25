
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/UserContext.jsx"; 


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TripEstimate from "./pages/TripEstimate";
import SafetyAlerts from "./pages/SafetyAlerts";
import PermitApplications from "./pages/PermitApplications";
import Destinations from "./pages/Destinations";
import Shop from "./pages/shop.jsx"; 
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx"; 
import ReceiptPage from "./pages/ReceiptPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <UserProvider> 
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/permits" element={<PermitApplications />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/trip-estimate" element={<TripEstimate />} />
            <Route path="/safety-alerts" element={<SafetyAlerts />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />

          </Routes>
        </Router>
        
      </CartProvider>
    </UserProvider>
  );
}

export default App;
