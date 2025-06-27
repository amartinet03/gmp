import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: '#003c8a' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <img src="/logo.png" alt="Logo Stellantis" height="40" className="me-4" />
            
            <div className="navbar-nav">
              <button className="nav-link btn btn-link text-white mx-2 fw-medium" onClick={() => navigate('/')}>INICIO</button>
              <button className="nav-link btn btn-link text-white mx-2 fw-medium" onClick={() => navigate('/registros')}>REGISTROS</button>
              <button className="nav-link btn btn-link text-white mx-2 fw-medium" onClick={() => navigate('/reportes')}>REPORTES</button>
              <button className="nav-link btn btn-link text-white mx-2 fw-medium" onClick={() => navigate('/configuracion')}>CONFIGURACIÓN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container-fluid p-4" style={{ maxWidth: '1200px' }}>
        {/* Bienvenida */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#0D2D84' }}>Panel Administrativo Stellantis</h2>
        </div>

        {/* Fila superior con 2 cards principales */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div 
              className="card h-100 p-4 text-center shadow-sm cursor-pointer hover-effect-main" 
              style={{ borderTop: '5px solid #0D2D84' }}
              onClick={() => navigate('/proveedor')}
            >
              <div className="card-body">
                <div className="d-flex justify-content-center mb-3">
                  <img src="/proveedores.png" alt="Proveedores" width="90" className="img-fluid" />
                </div>
                <h3 className="fw-bold mb-3">Ingresar Proveedores</h3>
                <p className="text-muted mb-0">Registro completo de nuevos proveedores</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div 
              className="card h-100 p-4 text-center shadow-sm cursor-pointer hover-effect-main" 
              style={{ borderTop: '5px solid #0D2D84' }}
              onClick={() => navigate('/solicitud')}
            >
              <div className="card-body">
                <div className="d-flex justify-content-center mb-3">
                  <img src="/solicitud.png" alt="Solicitud" width="90" className="img-fluid" />
                </div>
                <h3 className="fw-bold mb-3">Solicitud de Ingreso</h3>
                <p className="text-muted mb-0">Generar solicitudes de acceso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fila inferior con 3 cards secundarias */}
        <div className="row g-4">
          {[
            { title: 'Gestión de Visitas', img: '/visitas.png', desc: 'Control de visitas programadas', onClick: () => navigate('/visitas') },
            { title: 'Proveedores Activos', img: '/proveedores1.png', desc: 'Listado y estado de proveedores', onClick: () => navigate('/proveedores') },
            { title: 'Capacitaciones', img: '/capacitaciones.png', desc: 'Programas de capacitación', onClick: () => navigate('/capacitaciones') }
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div 
                className="card h-100 p-3 text-center shadow-sm cursor-pointer hover-effect"
                style={{ borderTop: '4px solid #0D2D84' }}
                onClick={item.onClick}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-center mb-3">
                    <img src={item.img} alt={item.title} width="70" className="img-fluid" />
                  </div>
                  <h4 className="fw-bold mb-2">{item.title}</h4>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hover-effect-main:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
          box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important;
        }
        .hover-effect:hover {
          transform: translateY(-3px);
          transition: transform 0.2s ease;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}