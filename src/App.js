import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import IngresarProveedor from './views/IngresarProveedor';
import CrearSolicitud from './views/CrearSolicitud';
import GestionVisitas from './views/GestionVisitas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/proveedor" element={<IngresarProveedor />} />
        <Route path="/solicitud" element={<CrearSolicitud />} />
        <Route path="/visitas" element={<GestionVisitas />} />
      </Routes>
    </Router>
  );
}

export default App;