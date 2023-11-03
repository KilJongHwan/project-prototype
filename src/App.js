import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginSignupPage";
import BuyReviewPg from "./pages/BuyReviewPage";
import { UserProvider } from "./context/Context";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchase" element={<BuyReviewPg />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
