import { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCasas } from './hooks/useCasas';
import CasasTable from './components/CasasTable';
import CasaModal from './components/CasaModal';
import CasasFilter from './components/CasasFilter';
import { FaSlidersH, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

function App() {
  const { casas, loading, error, addCasa, editCasa, removeCasa } = useCasas();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCasa, setEditingCasa] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filters, setFilters] = useState({ distrito: '', tipoCasa: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Aplicar filtros
  const filteredCasas = useMemo(() => {
    let result = casas;
    if (filters.distrito) {
      result = result.filter(c => c.distrito?.toLowerCase().includes(filters.distrito.toLowerCase()));
    }
    if (filters.tipoCasa) {
      result = result.filter(c => c.tipoCasa?.toLowerCase().includes(filters.tipoCasa.toLowerCase()));
    }
    return result;
  }, [casas, filters]);

  const handleCreate = () => {
    setEditingCasa(null);
    setModalOpen(true);
  };

  const handleEdit = (casa) => {
    setEditingCasa(casa);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar casa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeCasa(id);
        Swal.fire('Eliminada', 'La casa ha sido eliminada', 'success');
      }
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    Swal.fire({
      title: `¿Eliminar ${selectedIds.length} casa(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        for (const id of selectedIds) {
          await removeCasa(id);
        }
        setSelectedIds([]);
        Swal.fire('Eliminadas', 'Las casas han sido eliminadas', 'success');
      }
    });
  };

  const handleEditSelected = () => {
    if (selectedIds.length !== 1) {
      Swal.fire('Selección', 'Selecciona una sola casa para editar', 'info');
      return;
    }
    const casa = casas.find(c => c.id === selectedIds[0]);
    if (casa) handleEdit(casa);
  };

  const handleSave = async (casaData) => {
    if (editingCasa) {
      // Enviar el id en el cuerpo (camelCase)
      await editCasa(editingCasa.id, { ...casaData, id: editingCasa.id });
    } else {
      await addCasa(casaData);
    }
    setModalOpen(false);
    setSelectedIds([]);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#">
            <img src="https://logo.clearbit.com/clearbit.com" alt="Logo" height="30" />
          </a>
        </div>
      </nav>
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h3>Listado de Casas</h3>
          </div>
          <div className="col-sm-12 col-md-6 mt-3">
            <div className="d-flex justify-content-end align-items-center">
              <button className="btn btn-sm btn-outline-primary px-4 me-2" onClick={() => setShowFilters(!showFilters)}>
                <FaSlidersH /> Filtros
              </button>
              <button className="btn btn-sm btn-primary me-2" onClick={handleCreate}>
                + Nueva Casa
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="col-sm-12 mt-4">
              <CasasFilter onFilter={handleFilter} />
            </div>
          )}

          <div className="col-sm-12 pt-4">
            <div className="card border rounded-2" style={{ background: '#f8f8f8' }}>
              <div className="card-header py-3" style={{ background: '#f8f8f8' }}>
                <div className="d-flex justify-content-start align-items-center">
                  <button className="btn btn-sm btn-outline-primary px-4 me-2" onClick={handleEditSelected}>
                    <FaEdit /> Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger px-4 me-2" onClick={handleDeleteSelected}>
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
              <div className="card-body">
                <CasasTable
                  casas={filteredCasas}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CasaModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingCasa}
      />
    </div>
  );
}

export default App;