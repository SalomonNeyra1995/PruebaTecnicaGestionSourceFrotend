import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CasaModal({ show, onHide, onSave, initialData }) {
  const [form, setForm] = useState({
    direccion: '',
    distrito: '',
    numeroHabitaciones: 1,
    tipoCasa: '',
    areaMetrosCuadrados: 0,
    precio: 0
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        direccion: initialData.direccion || '',
        distrito: initialData.distrito || '',
        numeroHabitaciones: initialData.numeroHabitaciones || 1,
        tipoCasa: initialData.tipoCasa || '',
        areaMetrosCuadrados: initialData.areaMetrosCuadrados || 0,
        precio: initialData.precio || 0
      });
    } else {
      setForm({
        direccion: '',
        distrito: '',
        numeroHabitaciones: 1,
        tipoCasa: '',
        areaMetrosCuadrados: 0,
        precio: 0
      });
    }
    setErrors({});
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.direccion.trim()) newErrors.direccion = 'Dirección requerida';
    if (!form.distrito.trim()) newErrors.distrito = 'Distrito requerido';
    if (form.numeroHabitaciones < 1) newErrors.numeroHabitaciones = 'Mínimo 1';
    if (!form.tipoCasa.trim()) newErrors.tipoCasa = 'Tipo requerido';
    if (form.areaMetrosCuadrados <= 0) newErrors.areaMetrosCuadrados = 'Área positiva';
    if (form.precio <= 0) newErrors.precio = 'Precio positivo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await onSave(form);
      Swal.fire('Éxito', `Casa ${initialData ? 'actualizada' : 'creada'} correctamente`, 'success');
      onHide();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{initialData ? 'Editar Casa' : 'Nueva Casa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Dirección *</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              isInvalid={!!errors.direccion}
            />
            <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Distrito *</Form.Label>
            <Form.Control
              type="text"
              name="distrito"
              value={form.distrito}
              onChange={handleChange}
              isInvalid={!!errors.distrito}
            />
            <Form.Control.Feedback type="invalid">{errors.distrito}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>N° Habitaciones *</Form.Label>
            <Form.Control
              type="number"
              name="numeroHabitaciones"
              value={form.numeroHabitaciones}
              onChange={handleChange}
              min="1"
              isInvalid={!!errors.numeroHabitaciones}
            />
            <Form.Control.Feedback type="invalid">{errors.numeroHabitaciones}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Casa *</Form.Label>
            <Form.Control
              type="text"
              name="tipoCasa"
              value={form.tipoCasa}
              onChange={handleChange}
              isInvalid={!!errors.tipoCasa}
            />
            <Form.Control.Feedback type="invalid">{errors.tipoCasa}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Área (m²) *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="areaMetrosCuadrados"
              value={form.areaMetrosCuadrados}
              onChange={handleChange}
              min="0.01"
              isInvalid={!!errors.areaMetrosCuadrados}
            />
            <Form.Control.Feedback type="invalid">{errors.areaMetrosCuadrados}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio (S/) *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              min="0.01"
              isInvalid={!!errors.precio}
            />
            <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}