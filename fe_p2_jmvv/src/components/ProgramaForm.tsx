export default function ProgramaForm({ form, setForm, onSubmit, niveles, editId, onCancel }: any) {
  return (
    <div className="card bg-secondary text-white mb-4">
      <div className="card-body">
        <form onSubmit={onSubmit} className="row g-3">
          <div style={{ margin: "10px"}}>
            <label className="form-label">Nivel Académico</label>
            <select 
              className="form-select" 
              required 
              value={form.idNivelAcademico} 
              onChange={e => setForm({...form, idNivelAcademico: e.target.value})}
            >
              <option value="">-- Selecciona --</option>
              {niveles.map((n: any) => <option key={n.id} value={n.id}>{n.nombre}</option>)}
            </select>
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Nombre del Programa</label>
            <input type="text" className="form-control" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Estado</label>
            <select className="form-select" value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
              <option value="En Planificación">En Planificación</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Modalidad de Clases</label>
            <select className="form-select" required value={form.modalidad} onChange={e => setForm({...form, modalidad: e.target.value})}>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="mixto">Mixto</option>
            </select>
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Descripción</label>
            <input type="text" className="form-control" required value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">version</label>
            <input type="number" className="form-control" required value={form.version} onChange={e => setForm({...form, version: +e.target.value})} />
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Duración</label>
            <input type="number" className="form-control" required value={form.duracionMeses} onChange={e => setForm({...form, duracionMeses: +e.target.value})} />
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Costo</label>
            <input type="number" step="0.01" className="form-control" required value={form.costo} onChange={e => setForm({...form, costo: +e.target.value})} />
          </div>
          <div style={{ margin: "10px"}}>
            <label className="form-label">Fecha de Inicio</label>
            <input type="date" className="form-control" required value={form.fechaInicio} onChange={e => setForm({...form, fechaInicio: e.target.value})} />
          </div>
          
          <div style={{ margin: "10px"}}>
            <button type="submit" style={{ color: 'White' , backgroundColor: 'Black'}}>
              {editId ? 'Aplicar cambios' : 'aceptar'}
            </button>
            {editId && <button type="button" style={{ color: 'red' , backgroundColor: 'yellow'}} onClick={onCancel}>Cancelar</button>}
          </div>
        </form>
      </div>
    </div>
  );
}