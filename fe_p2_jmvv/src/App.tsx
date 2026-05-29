import { useState, useEffect } from 'react';
import axios from 'axios';
import ProgramaForm from './components/ProgramaForm';
import ProgramaList from './components/ProgramaList';

const API = 'http://localhost:3000/api/v1';

const initialState = {
  idNivelAcademico: '',
  nombre: '',
  descripcion: '',
  version: 1,
  duracionMeses: 1,
  costo: 0,
  fechaInicio: '',
  modalidad: 'presencial',
  estado: 'En Planificación'
};

export default function App() {
  const [programas, setProgramas] = useState<any[]>([]);
  const [niveles, setNiveles] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(initialState);

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
      handleCancel();
      fetchData();
    } catch (error) {
      alert('Error: Revisa la consola .-.');
    }
  };

  const handleEdit = (p: any) => {
    setForm({
      ...p,
      fechaInicio: p.fechaInicio.split('T')[0]
    });
    setEditId(p.id);
  };

  const handleDelete = async (id: number) => {
    if(window.confirm('Realmente desea eliminar este registro?')) {
      await axios.delete(`${API}/programas/${id}`);
      fetchData();
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(initialState);
  };

  return (
    <div className="container">
      <h2 style={{ color: 'white' }}>Gestión de Postgrados</h2>
      
      <ProgramaForm 
        form={form} 
        setForm={setForm} 
        onSubmit={handleSubmit} 
        niveles={niveles} 
        editId={editId} 
        onCancel={handleCancel} 
      />

      <ProgramaList 
        programas={programas} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}