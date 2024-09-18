import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopy from "./pages/Shopy";
import ErrorAlert from "./components/ErrorAlert";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <ErrorAlert />
      <Routes>
        <Route path="/*" element={<Shopy />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
