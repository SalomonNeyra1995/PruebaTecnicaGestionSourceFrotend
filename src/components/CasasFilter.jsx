import { useState } from 'react';

export default function CasasFilter({ onFilter }) {
  const [distrito, setDistrito] = useState('');
  const [tipoCasa, setTipoCasa] = useState('');

  const handleSearch = () => {
    onFilter({ distrito, tipoCasa });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="row py-3">
          <div className="form-group col-sm-12 col-lg-4">
            <select
              className="form-select form-select-sm"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
            >
              <option value="">Todos los distritos</option>
              <option value="Miraflores">Miraflores</option>
              <option value="San Isidro">San Isidro</option>
              <option value="Surco">Surco</option>
			  <option value="Chorrillos">Chorrillos</option>
            </select>
          </div>
          <div className="form-group col-sm-12 col-lg-4">
            <select
              className="form-select form-select-sm"
              value={tipoCasa}
              onChange={(e) => setTipoCasa(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              <option value="Chalet">Chalet</option>
              <option value="Adosada">Adosada</option>
              <option value="Pareada">Pareada</option>
			  <option value="vivienda">vivienda</option>
            </select>
          </div>
          <div className="col-sm-12 col-lg-4">
            <button className="btn btn-sm btn-primary px-4 btn-search" onClick={handleSearch}>
              <i className="bi bi-search me-2"></i> Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}