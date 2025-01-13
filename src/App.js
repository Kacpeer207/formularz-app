import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const Formularz = () => {
  // Stany dla pól formularza
  const [tytul, setTytul] = useState('');
  const [rodzaj, setRodzaj] = useState('');
 
  // Obsługa kliknięcia przycisku "Dodaj"
  const handleSubmit = (event) => {
    event.preventDefault(); // Zapobiega odświeżeniu strony
    console.log({ tytul, rodzaj });
  };
 
  return (
    <div className="container" style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tytul" className="form-label">Tytuł filmu</label>
          <input
            type="text"
            id="tytul"
            className="form-control"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rodzaj" className="form-label">Rodzaj</label>
          <select
            id="rodzaj"
            className="form-select"
            value={rodzaj}
            onChange={(e) => setRodzaj(e.target.value)}
          >
            <option value="">Wybierz...</option>
            <option value="1">Komedia</option>
            <option value="2">Obyczajowy</option>
            <option value="3">Sensacyjny</option>
            <option value="4">Horror</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Dodaj</button>
      </form>
    </div>
  );
};
 
export default Formularz;