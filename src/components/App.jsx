import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavbarNew';
import Send from './Send';
import Receive from './Receive';
import CGPA from './Cgpa';

function App() {
  return (
    <div>
    <Router>
      <div>
        <Navbar />
        <div className="content-below-navbar">
        <Routes>
          <Route path="/" element={<Send />} />
          <Route path="/SyncX" element={<Send />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/cgpa" element={<CGPA />} />
        </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
