export default function CasaTable({ casas, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Distrito</th>
            <th>Habitaciones</th>
            <th>Tipo</th>
            <th>Área (m²)</th>
            <th>Precio (S/)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {casas.map(casa => (
            <tr key={casa.id}>
              <td>{casa.id}</td>
              <td>{casa.direccion}</td>
              <td>{casa.distrito}</td>
              <td>{casa.numeroHabitaciones}</td>
              <td>{casa.tipoCasa}</td>
              <td>{casa.areaMetrosCuadrados}</td>
              <td>{casa.precio.toFixed(2)}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(casa)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(casa.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}