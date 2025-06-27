import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IngresarProveedor() {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({
    nombre: '',
    cuit: '',
    certificacionSustentabilidad: false
  });

  const [seguro, setSeguro] = useState({
    tipoART: ''
  });

  const [vehiculos, setVehiculos] = useState([
    { dominio: 'ABC123', marca: 'Toyota', modelo: 'C4' }
  ]);

  const [empleados, setEmpleados] = useState([
    { nombre: 'Juan Pérez', legajo: '12245', certificacionInduccion: true, vehiculoAsignado: 'ABC123', foto: '/fotohombre1.jpg' },
    { nombre: 'María Gómez', legajo: '67390', certificacionInduccion: true, vehiculoAsignado: '', foto: '/fotomujer1.jpg' },
    { nombre: 'Carlos López', legajo: '13579', certificacionInduccion: true, vehiculoAsignado: '', foto: '/fotohombre2.jpg' }
  ]);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    legajo: '',
    certificacionInduccion: false,
    vehiculoAsignado: '',
    foto: null
  });

  const tiposART = [
    "Riesgos del Trabajo Ley 24.557",
    "Seguro Obligatorio de Accidentes de Trabajo",
    "Seguro Colectivo de Vida Obligatorio",
    "Seguro de Responsabilidad Civil",
    "Otro"
  ];

  const handleFileChange = (index, e) => {
    const newEmpleados = [...empleados];
    newEmpleados[index].foto = e.target.files[0];
    setEmpleados(newEmpleados);
  };

  const handleNuevoEmpleadoFileChange = (e) => {
    setNuevoEmpleado({ ...nuevoEmpleado, foto: e.target.files[0] });
  };

  const agregarVehiculo = () => {
    setVehiculos([...vehiculos, { dominio: '', marca: '', modelo: '' }]);
  };

  const eliminarVehiculo = (index) => {
    const nuevosVehiculos = vehiculos.filter((_, i) => i !== index);
    setVehiculos(nuevosVehiculos);

    // Actualizar asignaciones de vehículos en empleados
    const dominioEliminado = vehiculos[index].dominio;
    if (dominioEliminado) {
      const nuevosEmpleados = empleados.map(empleado => {
        if (empleado.vehiculoAsignado === dominioEliminado) {
          return { ...empleado, vehiculoAsignado: '' };
        }
        return empleado;
      });
      setEmpleados(nuevosEmpleados);
    }
  };

  const agregarEmpleado = () => {
    if (nuevoEmpleado.nombre && nuevoEmpleado.legajo) {
      setEmpleados([...empleados, nuevoEmpleado]);
      setNuevoEmpleado({
        nombre: '',
        legajo: '',
        certificacionInduccion: false,
        vehiculoAsignado: '',
        foto: null
      });
    }
  };

  const eliminarEmpleado = (index) => {
    const nuevosEmpleados = empleados.filter((_, i) => i !== index);
    setEmpleados(nuevosEmpleados);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: '#0D2D84' }}>REGISTRAR NUEVO PROVEEDOR</h2>
        </div>

        {/* Sección Empresa */}
        <div className="card shadow-sm mb-4" style={{ borderTop: '4px solid #0D2D84' }}>
          <div className="card-body">
            <h4 className="card-title mb-4" style={{ color: '#0D2D84' }}>DATOS DE LA EMPRESA</h4>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre de la empresa</label>
                <input
                  className="form-control"
                  value={empresa.nombre}
                  onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">CUIT</label>
                <input
                  className="form-control"
                  value={empresa.cuit}
                  onChange={(e) => setEmpresa({ ...empresa, cuit: e.target.value })}
                  placeholder="XX-XXXXXXXX-X"
                />
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={empresa.certificacionSustentabilidad}
                onChange={(e) => setEmpresa({ ...empresa, certificacionSustentabilidad: e.target.checked })}
              />
              <label className="form-check-label">
                Posee certificación de sustentabilidad
              </label>
            </div>
          </div>
        </div>

        {/* Sección Seguro y Vehículos */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm" style={{ borderTop: '4px solid #0D2D84' }}>
              <div className="card-body">
                <h4 className="card-title mb-4" style={{ color: '#0D2D84' }}>SEGURO</h4>
                <label className="form-label">Tipo de ART contratada</label>
                <select
                  className="form-select mb-3"
                  value={seguro.tipoART}
                  onChange={(e) => setSeguro({ ...seguro, tipoART: e.target.value })}
                >
                  <option value="">Seleccione un tipo</option>
                  {tiposART.map((tipo, index) => (
                    <option key={index} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow-sm" style={{ borderTop: '4px solid #0D2D84' }}>
              <div className="card-body">
                <h4 className="card-title mb-4" style={{ color: '#0D2D84' }}>VEHÍCULOS REGISTRADOS</h4>
                {vehiculos.map((vehiculo, index) => (
                  <div key={index} className="mb-3 border-bottom pb-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Dominio</label>
                        <input
                          className="form-control"
                          value={vehiculo.dominio}
                          onChange={(e) => {
                            const newVehiculos = [...vehiculos];
                            newVehiculos[index].dominio = e.target.value;
                            setVehiculos(newVehiculos);
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <label className="form-label">Marca</label>
                        <input
                          className="form-control"
                          value={vehiculo.marca}
                          onChange={(e) => {
                            const newVehiculos = [...vehiculos];
                            newVehiculos[index].marca = e.target.value;
                            setVehiculos(newVehiculos);
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <label className="form-label">Modelo</label>
                        <input
                          className="form-control"
                          value={vehiculo.modelo}
                          onChange={(e) => {
                            const newVehiculos = [...vehiculos];
                            newVehiculos[index].modelo = e.target.value;
                            setVehiculos(newVehiculos);
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarVehiculo(index)}
                      >
                        Eliminar vehículo
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={agregarVehiculo}
                >
                  + Agregar vehículo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Empleados */}
        <div className="card shadow-sm mb-4" style={{ borderTop: '4px solid #0D2D84' }}>
          <div className="card-body">
            <h4 className="card-title mb-4" style={{ color: '#0D2D84' }}>EMPLEADOS</h4>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nombre/s</th>
                    <th>Legajo</th>
                    <th>Cert. inducción</th>
                    <th>Vehículo asignado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((empleado, index) => (
                    <tr key={index}>
                      <td className="align-middle">
                        {empleado.foto ? (
                          <div className="rounded-circle overflow-hidden" style={{ width: '40px', height: '40px' }}>
                            <img
                              src={empleado.foto} // Usamos la ruta directa desde public
                              alt={`Foto de ${empleado.nombre}`}
                              className="img-fluid"
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                          </div>
                        ) : (
                          <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                        )}
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={empleado.nombre}
                          onChange={(e) => {
                            const newEmpleados = [...empleados];
                            newEmpleados[index].nombre = e.target.value;
                            setEmpleados(newEmpleados);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control form-control-sm"
                          value={empleado.legajo}
                          onChange={(e) => {
                            const newEmpleados = [...empleados];
                            newEmpleados[index].legajo = e.target.value;
                            setEmpleados(newEmpleados);
                          }}
                        />
                      </td>
                      <td className="align-middle">
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={empleado.certificacionInduccion}
                            onChange={(e) => {
                              const newEmpleados = [...empleados];
                              newEmpleados[index].certificacionInduccion = e.target.checked;
                              setEmpleados(newEmpleados);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={empleado.vehiculoAsignado}
                          onChange={(e) => {
                            const newEmpleados = [...empleados];
                            newEmpleados[index].vehiculoAsignado = e.target.value;
                            setEmpleados(newEmpleados);
                          }}
                        >
                          <option value="">Ninguno</option>
                          {vehiculos.map((v, i) => (
                            <option key={i} value={v.dominio}>{v.dominio}</option>
                          ))}
                        </select>
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarEmpleado(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Formulario para nuevo empleado */}
            <div className="border-top pt-3 mt-3">
              <h5 className="mb-3">Agregar nuevo empleado</h5>
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label">Foto</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleNuevoEmpleadoFileChange}
                    accept="image/*"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={nuevoEmpleado.nombre}
                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Legajo</label>
                  <input
                    className="form-control"
                    value={nuevoEmpleado.legajo}
                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, legajo: e.target.value })}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={nuevoEmpleado.certificacionInduccion}
                      onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, certificacionInduccion: e.target.checked })}
                    />
                    <label className="form-check-label">Cert. inducción</label>
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-primary w-100" onClick={agregarEmpleado}>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de registro */}
        <div className="d-flex justify-content-end mb-5">
          <button className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#0D2D84', border: 'none' }}>
            REGISTRAR PROVEEDOR
          </button>
        </div>
      </div>
    </div>
  );
}