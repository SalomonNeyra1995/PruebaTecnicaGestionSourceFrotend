import { useState, useEffect } from 'react';
import * as api from '../services/api';

export const useCasas = () => {
  const [casas, setCasas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCasas = async () => {
    setLoading(true);
    try {
      const response = await api.getCasas();
      setCasas(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCasa = async (casa) => {
    try {
      const response = await api.createCasa(casa);
      setCasas(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editCasa = async (id, casa) => {
    try {
      await api.updateCasa(id, casa);
      setCasas(prev => prev.map(c => c.id === id ? { ...c, ...casa } : c));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeCasa = async (id) => {
    try {
      await api.deleteCasa(id);
      setCasas(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCasas();
  }, []);

  return { casas, loading, error, addCasa, editCasa, removeCasa };
};