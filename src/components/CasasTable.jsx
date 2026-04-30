import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

export default function CasasTable({ casas, onEdit, onDelete, selectedIds, setSelectedIds }) {
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === casas.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(casas.map(c => c.id));
    }
  };

  // Función segura para formatear precio
  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'S/ 0.00';
    return `S/ ${Number(price).toFixed(2)}`;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-light">
        <thead>
          <tr>
            <th scope="col">
              <FaCheck onClick={toggleSelectAll} style={{ cursor: 'pointer' }} />
            </th>
            <th></th>
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
              <th scope="row">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedIds.includes(casa.id)}
                  onChange={() => toggleSelect(casa.id)}
                />
              </th>
              <td>
                <img
                  src={`https://picsum.photos/seed/${casa.id}/50/50`}
                  alt="casa"
                  className="img-thumbnail"
                  style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                />
              </td>
              <td>{casa.direccion || ''}</td>
              <td>{casa.distrito || ''}</td>
              <td>{casa.numeroHabitaciones || 0}</td>
              <td>{casa.tipoCasa || ''}</td>
              <td>{casa.areaMetrosCuadrados || 0}</td>
              <td>{formatPrice(casa.precio)}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(casa)}>
                  <FaEdit /> Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(casa.id)}>
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}