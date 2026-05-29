
export default function ProgramaList({ programas, onEdit, onDelete }: any) {
  return (
    <table className="table table-dark table-hover mt-4">
      <thead>
        <tr>
          <th>Nivel</th>
          <th>Programa</th>
          <th>Versión</th>
          <th>Costo</th>
          <th>Modalidad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {programas.map((p: any) => (
          <tr key={p.id}>
            <td>{p.nivelAcademico?.nombre || 'No tiene nivel academico'}</td>
            <td>{p.nombre}</td>
            <td>v{p.version}</td>
            <td>{p.costo}</td>
            <td>{p.modalidad || 'No especificada'}</td>
            <td>
              <span className={`badge ${p.estado === 'Finalizado' ? 'bg-danger' : p.estado === 'En curso' ? 'bg-primary' : 'bg-secondary'}`}>
                {p.estado}
              </span>
            </td>
            <td>
              <button style={{ marginRight: '10px', backgroundColor: 'black', color: 'white' }} onClick={() => onEdit(p)}>
                editar
              </button>
              <button style={{ marginRight: '10px', backgroundColor: 'black', color: 'white' }} onClick={() => onDelete(p.id)}>
                eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}