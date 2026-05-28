import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api/v1';

export default function App() {
  const [programas, setProgramas] = useState<any[]>([]);
  const [niveles, setNiveles] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    idNivelAcademico: '',
    nombre: '',
    descripcion: '',
    version: 1,
    duracionMeses: 1,
    costo: 0,
    fechaInicio: '',
    estado: 'En Planificación' // Valor por defecto del ENUM
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resNiveles, resProgramas] = await Promise.all([
        axios.get(`${API}/niveles-academicos`),
        axios.get(`${API}/programas`)
      ]);
      setNiveles(resNiveles.data);
      setProgramas(resProgramas.data);
    } catch (err) {
      console.error('El backend te está rechazando:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Casteo forzoso para evitar que el DTO del backend nos escupa un Bad Request 400
    const payload = {
      ...form,
      idNivelAcademico: Number(form.idNivelAcademico),
      version: Number(form.version),
      duracionMeses: Number(form.duracionMeses),
      costo: Number(form.costo)
    };

    try {
      if (editId) {
        await axios.patch(`${API}/programas/${editId}`, payload);
      } else {
        await axios.post(`${API}/programas`, payload);
      }
      
      setForm({ idNivelAcademico: '', nombre: '', descripcion: '', version: 1, duracionMeses: 1, costo: 0, fechaInicio: '', estado: 'En Planificación' });
      setEditId(null);
      fetchData();
    } catch (error) {
      alert('Error: Revisa la consola. Seguro mandaste un string donde iba un número.');
    }
  };

  const handleEdit = (p: any) => {
    setForm({
      idNivelAcademico: p.idNivelAcademico,
      nombre: p.nombre,
      descripcion: p.descripcion,
      version: p.version,
      duracionMeses: p.duracionMeses,
      costo: p.costo,
      fechaInicio: p.fechaInicio.split('T')[0], // Cortamos la hora para que el input type="date" no implosione
      estado: p.estado
    });
    setEditId(p.id);
  };

  const handleDelete = async (id: number) => {
    if(window.confirm('¿Ejecutar orden 66 en este registro?')) {
      await axios.delete(`${API}/programas/${id}`);
      fetchData();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-warning mb-4">Terminal de Gestión de Postgrados - USFX</h2>
      
      <div className="card bg-secondary text-white mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Nivel Académico (Requisito)</label>
              <select 
                className="form-select" 
                required 
                value={form.idNivelAcademico} 
                onChange={e => setForm({...form, idNivelAcademico: e.target.value})}
              >
                <option value="">-- Selecciona --</option>
                {niveles.map(n => <option key={n.id} value={n.id}>{n.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre del Programa</label>
              <input type="text" className="form-control" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Estado (ENUM Requerido)</label>
              <select className="form-select" value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
                <option value="En Planificación">En Planificación</option>
                <option value="En curso">En curso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Descripción</label>
              <input type="text" className="form-control" required value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Versión</label>
              <input type="number" className="form-control" required value={form.version} onChange={e => setForm({...form, version: +e.target.value})} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Duración (Meses)</label>
              <input type="number" className="form-control" required value={form.duracionMeses} onChange={e => setForm({...form, duracionMeses: +e.target.value})} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Costo (Bs)</label>
              <input type="number" step="0.01" className="form-control" required value={form.costo} onChange={e => setForm({...form, costo: +e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Fecha de Inicio</label>
              <input type="date" className="form-control" required value={form.fechaInicio} onChange={e => setForm({...form, fechaInicio: e.target.value})} />
            </div>
            
            <div className="col-12 mt-4">
              <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-success'}`}>
                {editId ? 'Aplicar Parche' : 'Compilar Programa'}
              </button>
              {editId && <button type="button" className="btn btn-danger ms-2" onClick={() => {setEditId(null); setForm({...form, idNivelAcademico: ''})}}>Abortar</button>}
            </div>
          </form>
        </div>
      </div>

      <table className="table table-dark table-hover mt-4">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>Programa</th>
            <th>Versión</th>
            <th>Costo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {programas.map(p => (
            <tr key={p.id}>
              {/* Gracias a tu JOIN en el backend, el objeto nivelAcademico viene anidado */}
              <td>{p.nivelAcademico?.nombre || 'Huéerfano'}</td>
              <td>{p.nombre}</td>
              <td>v{p.version}</td>
              <td>{p.costo}</td>
              <td>
                <span className={`badge ${p.estado === 'Finalizado' ? 'bg-danger' : p.estado === 'En curso' ? 'bg-primary' : 'bg-secondary'}`}>
                  {p.estado}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}