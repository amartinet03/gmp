import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestionVisitas() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipoVisita: 'individual',
    organizacion: '',
    cantidadPersonas: 1,
    liderGrupo: {
      nombre: '',
      tipoIdentificacion: '',
      identificacion: '',
      empresa: ''
    },
    areasAutorizadas: [],
    motivo: '',
    fechaVisita: '',
    horaEntrada: '',
    horaSalida: '',
    responsableNombre: '',
    responsableIdentificacion: '',
    responsableArea: '',
    observaciones: '',
    requiereEquipoEspecial: false,
    equipoEspecialDescripcion: ''
  });

  // Datos simulados
  const areasDisponibles = [
    'Recepción',
    'Oficinas administrativas',
    'Área de producción',
    'Sala de juntas',
    'Laboratorio',
  ];

  const tiposIdentificacion = ['Cédula', 'Pasaporte', 'RUT', 'DNI', 'Otro'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLiderGrupoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      liderGrupo: {
        ...prev.liderGrupo,
        [field]: value
      }
    }));
  };

  const handleTipoVisitaChange = (e) => {
    const tipo = e.target.value;
    setFormData(prev => ({
      ...prev,
      tipoVisita: tipo,
      cantidadPersonas: tipo === 'individual' ? 1 : prev.cantidadPersonas
    }));
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
    console.log('Visita registrada:', formData);
    // Aquí iría la lógica para enviar los datos al servidor
    alert('Visita registrada exitosamente');
    // navigate('/visitas'); // Redirigir al listado de visitas
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navbar consistente */}
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: '#003c8a' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center w-100">
            <img src="/logo.png" alt="Logo Stellantis" height="40" className="me-4" />
            
            <div className="navbar-nav">
              <button
                className="nav-link btn btn-link text-white mx-2 fw-medium"
                onClick={() => navigate('/')}
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
            <h3 className="mb-4" style={{ color: '#0D2D84' }}>Gestión de Visitas</h3>
            
            <form onSubmit={handleSubmit}>
              {/* Tipo de visita */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Tipo de visita</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipoVisita"
                        id="individual"
                        value="individual"
                        checked={formData.tipoVisita === 'individual'}
                        onChange={handleTipoVisitaChange}
                      />
                      <label className="form-check-label" htmlFor="individual">
                        Individual
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipoVisita"
                        id="colectiva"
                        value="colectiva"
                        checked={formData.tipoVisita === 'colectiva'}
                        onChange={handleTipoVisitaChange}
                      />
                      <label className="form-check-label" htmlFor="colectiva">
                        Colectiva
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Organización/Compañía</label>
                  <input 
                    className="form-control" 
                    name="organizacion"
                    value={formData.organizacion}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Cantidad de personas (solo para visitas colectivas) */}
              {formData.tipoVisita === 'colectiva' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Cantidad de personas en el grupo</label>
                  <input 
                    type="number"
                    min="2"
                    max="50"
                    className="form-control" 
                    name="cantidadPersonas"
                    value={formData.cantidadPersonas}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Información del visitante o líder del grupo */}
              <div className="mb-3">
                <h5 className="mb-3" style={{ color: '#0D2D84' }}>
                  {formData.tipoVisita === 'individual' ? 'Información del visitante' : 'Información del líder del grupo'}
                </h5>
                
                <div className="card mb-3 p-3">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Nombre completo</label>
                      <input 
                        className="form-control" 
                        value={formData.liderGrupo.nombre}
                        onChange={(e) => handleLiderGrupoChange('nombre', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">Identificación</label>
                      <div className="input-group">
                        <select 
                          className="form-select flex-grow-0 w-auto"
                          value={formData.liderGrupo.tipoIdentificacion}
                          onChange={(e) => handleLiderGrupoChange('tipoIdentificacion', e.target.value)}
                          required
                        >
                          <option value="">Tipo</option>
                          {tiposIdentificacion.map((tipo, i) => (
                            <option key={i} value={tipo}>{tipo}</option>
                          ))}
                        </select>
                        <input 
                          className="form-control" 
                          value={formData.liderGrupo.identificacion}
                          onChange={(e) => handleLiderGrupoChange('identificacion', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fechas y horarios */}
              <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Fecha de visita</label>
                  <input 
                    type="date"
                    className="form-control" 
                    name="fechaVisita"
                    value={formData.fechaVisita}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-4 mb-3">
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
                
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Hora de salida estimada</label>
                  <input 
                    type="time"
                    className="form-control" 
                    name="horaSalida"
                    value={formData.horaSalida}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Áreas autorizadas */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Áreas autorizadas</label>
                <select 
                  className="form-select"
                  multiple
                  size="4"
                  onChange={handleSelectAreas}
                  required
                >
                  {areasDisponibles.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
                <small className="text-muted">Mantén presionado Ctrl para seleccionar múltiples áreas</small>
              </div>

              {/* Responsable interno */}
              <div className="mb-3">
                <h5 className="mb-3" style={{ color: '#0D2D84' }}>Responsable interno</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Nombre completo</label>
                    <input 
                      className="form-control" 
                      name="responsableNombre"
                      value={formData.responsableNombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Identificación</label>
                    <input 
                      className="form-control" 
                      name="responsableIdentificacion"
                      value={formData.responsableIdentificacion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Área/Departamento</label>
                    <input 
                      className="form-control" 
                      name="responsableArea"
                      value={formData.responsableArea}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Motivo de la visita */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Motivo de la visita</label>
                <textarea 
                  className="form-control" 
                  rows="2"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Equipo especial */}
              <div className="mb-3">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="requiereEquipoEspecial"
                    name="requiereEquipoEspecial"
                    checked={formData.requiereEquipoEspecial}
                    onChange={handleChange}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="requiereEquipoEspecial">
                    Requiere equipo especial de protección
                  </label>
                </div>
                {formData.requiereEquipoEspecial && (
                  <div className="mb-3">
                    <label className="form-label">Descripción del equipo requerido</label>
                    <input 
                      className="form-control" 
                      name="equipoEspecialDescripcion"
                      value={formData.equipoEspecialDescripcion}
                      onChange={handleChange}
                      required={formData.requiereEquipoEspecial}
                    />
                  </div>
                )}
              </div>

              {/* Observaciones */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Observaciones adicionales</label>
                <textarea 
                  className="form-control" 
                  rows="3"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                />
              </div>

              {/* Botones de acción */}
              <div className="d-flex justify-content-between">
                <button 
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/visitas')}
                >
                  Cancelar
                </button>
                <button 
                  className="btn py-2 px-4" 
                  type="submit"
                  style={{ backgroundColor: '#0D2D84', color: 'white' }}
                >
                  Registrar Visita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}