import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopy from "./pages/Shopy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Shopy />} />
      </Routes>
    </Router>
  );
}

export default App;
