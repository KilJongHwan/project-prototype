import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginSignupPage";
import BuyReviewPg from "./pages/BuyReviewPage";
import { UserProvider } from "./context/Context";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/PurchasePage" element={<BuyReviewPg />} />
          <Route path="/CartPage" element={<CartPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
