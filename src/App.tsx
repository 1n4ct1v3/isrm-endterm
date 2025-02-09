import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Calculator from './pages/Calculator';
import PCIDSS from './pages/PCIDSS';
import GDPR from './pages/GDPR';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/pci-dss" element={<PCIDSS />} />
          <Route path="/gdpr" element={<GDPR />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;