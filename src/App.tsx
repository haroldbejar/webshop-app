import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopy from "./pages/Shopy";
import ErrorAlert from "./components/ErrorAlert";

function App() {
  return (
    <Router>
      <ErrorAlert />
      <Routes>
        <Route path="/*" element={<Shopy />} />
      </Routes>
    </Router>
  );
}

export default App;
