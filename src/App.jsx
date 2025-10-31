// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard"; // ✅ Added import
import HomeDashboard from "./components/HomeDashboard";
import Applications from "./components/Applications";
import ProtectedRoute from "./components/ProtectedRoute"; // New component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:id/:type" element={<Dashboard />} /> {/* ✅ Public Dashboard */}

        {/* Protected routes */}
        <Route
          path="/homedashboard" // ✅ Renamed route to avoid confusion
          element={
            <ProtectedRoute>
              <HomeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
