import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Sidebar from "./component/Sidebar";
import { useState } from "react";

function App() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="font-poppins">
      <Router>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <Routes>
          <Route exact />
        </Routes>
      </Router>
    </div>
  )
}

export default App
