// Najpierw tworzymy aplikację frontendową w React
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function FilmManager() {
  const [films, setFilms] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    tytul: '',
    rezyser: '',
    rok: '',
  });

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filmy');
      setFilms(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Aktualizacja filmu
        await axios.put(`http://localhost:5000/filmy/${formData.id}`, formData);
      } else {
        // Dodawanie nowego filmu
        await axios.post('http://localhost:5000/filmy', formData);
      }
      fetchFilms();
      setFormData({ id: '', tytul: '', rezyser: '', rok: '' });
    } catch (error) {
      console.error('Błąd podczas zapisu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/filmy/${id}`);
      fetchFilms();
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const handleEdit = (film) => {
    setFormData(film);
  };

  return (
    <div>
      <h1>Zarządzanie Filmami</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tytuł"
          value={formData.tytul}
          onChange={(e) => setFormData({ ...formData, tytul: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Reżyser"
          value={formData.rezyser}
          onChange={(e) => setFormData({ ...formData, rezyser: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Rok"
          value={formData.rok}
          onChange={(e) => setFormData({ ...formData, rok: e.target.value })}
          required
        />
        <button type="submit">{formData.id ? 'Edytuj' : 'Dodaj'}</button>
      </form>

      <h2>Lista Filmów</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Reżyser</th>
            <th>Rok</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film.id}>
              <td>{film.id}</td>
              <td>{film.tytul}</td>
              <td>{film.rezyser}</td>
              <td>{film.rok}</td>
              <td>
                <button onClick={() => handleEdit(film)}>Edytuj</button>
                <button onClick={() => handleDelete(film.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FilmManager;