import React from 'react';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './NavbarNew';
import Send from './Send';
import Receive from './Receive';
import CGPA from './Cgpa';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Send />} />
          <Route path="/SyncX" element={<Send />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/cgpa" element={<CGPA />} />
      </Routes>
    </HashRouter>
    
  );
}

export default App;
