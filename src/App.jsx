import Navbar from "./components/layout/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
  )
}

export default App;