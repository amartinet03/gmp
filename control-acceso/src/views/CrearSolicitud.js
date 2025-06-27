import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearSolicitud() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    areaSolicitante: '',
    empresa: '',
    empleados: [],
    materiales: '',
    areasAutorizadas: [],
    motivo: '',
    fechaEntrada: '',
    horaEntrada: '',
    horaSalida: '',
    vehiculo: '',
    observaciones: ''
  });

  // Datos simulados (en una aplicación real vendrían de una API)
  const empresas = [
    { id: 1, nombre: 'Proveedor A', empleados: [
      { id: 101, nombre: 'Juan Pérez' },
      { id: 102, nombre: 'María Gómez' }
    ]},
    { id: 2, nombre: 'Proveedor B', empleados: [
      { id: 201, nombre: 'Carlos López' },
      { id: 202, nombre: 'Ana Rodríguez' }
    ]}
  ];

  const areasFabrica = [
    'Almacén',
    'Línea de producción',
    'Oficinas administrativas',
    'Taller mecánico',
    'Zona de carga/descarga'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectEmpleados = (e) => {
    const options = e.target.options;
    const selectedEmpleados = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedEmpleados.push(options[i].value);
      }
    }
    setFormData(prev => ({ ...prev, empleados: selectedEmpleados }));
  };

  const handleSelectAreas = (e) => {
    const options = e.target.options;
    const selectedAreas = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedAreas.push(options[i].value);
      }
    }
    setFormData(prev => ({ ...prev, areasAutorizadas: selectedAreas }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitud enviada:', formData);
    // Aquí iría la lógica para enviar los datos al servidor
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navbar consistente */}
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: '#0D2D84' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <img src="/logo.png" alt="Logo Stellantis" height="40" className="me-4" />
            
            <div className="navbar-nav">
              <button
                className="nav-link btn btn-link text-white mx-2 fw-medium"
                onClick={() => navigate('/')} // Cambia '/dashboard' por tu ruta real
              >
                INICIO
              </button>
              <button className="nav-link btn btn-link text-white mx-2 fw-medium">REGISTROS</button>
              <button className="nav-link btn btn-link text-white mx-2 fw-medium">REPORTES</button>
              <button className="nav-link btn btn-link text-white mx-2 fw-medium">CONFIGURACIÓN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container py-4">
        <div className="card shadow-sm" style={{ borderTop: '4px solid #0D2D84' }}>
          <div className="card-body p-4">
            <h3 className="mb-4" style={{ color: '#0D2D84' }}>Solicitud de Ingreso a Planta</h3>
            
            <form onSubmit={handleSubmit}>
              {/* Sección información básica */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Área solicitante</label>
                  <input 
                    className="form-control" 
                    name="areaSolicitante"
                    value={formData.areaSolicitante}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Empresa</label>
                  <select 
                    className="form-select"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una empresa</option>
                    {empresas.map(empresa => (
                      <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Empleados autorizados */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Empleados autorizados</label>
                <select 
                  className="form-select"
                  multiple
                  size="3"
                  onChange={handleSelectEmpleados}
                  disabled={!formData.empresa}
                >
                  {formData.empresa && empresas.find(e => e.id == formData.empresa)?.empleados.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nombre}</option>
                  ))}
                </select>
                <small className="text-muted">Mantén presionado Ctrl para seleccionar múltiples empleados</small>
              </div>

              {/* Detalles de la visita */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Materiales/equipos que ingresarán</label>
                  <input 
                    className="form-control" 
                    name="materiales"
                    value={formData.materiales}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Vehículo (si aplica)</label>
                  <input 
                    className="form-control" 
                    name="vehiculo"
                    value={formData.vehiculo}
                    onChange={handleChange}
                    placeholder="Patente o modelo"
                  />
                </div>
              </div>

              {/* Áreas autorizadas */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Áreas autorizadas</label>
                <select 
                  className="form-select"
                  multiple
                  size="3"
                  onChange={handleSelectAreas}
                  required
                >
                  {areasFabrica.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
                <small className="text-muted">Mantén presionado Ctrl para seleccionar múltiples áreas</small>
              </div>

              {/* Fechas y horarios */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Fecha de entrada</label>
                  <input 
                    type="date"
                    className="form-control" 
                    name="fechaEntrada"
                    value={formData.fechaEntrada}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">Hora de entrada</label>
                  <input 
                    type="time"
                    className="form-control" 
                    name="horaEntrada"
                    value={formData.horaEntrada}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">Hora límite de salida (opcional)</label>
                  <input 
                    type="time"
                    className="form-control" 
                    name="horaSalida"
                    value={formData.horaSalida}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Motivo y observaciones */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Motivo del ingreso</label>
                <input 
                  className="form-control" 
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-semibold">Observaciones adicionales</label>
                <textarea 
                  className="form-control" 
                  rows="2"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                />
              </div>

              {/* Botón de envío */}
              <button 
                className="btn w-100 py-2" 
                type="submit"
                style={{ backgroundColor: '#0D2D84', color: 'white' }}
              >
                Generar Solicitud de Ingreso
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}