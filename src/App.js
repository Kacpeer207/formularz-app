// Importy React i Bootstrap
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Stany dla formularza
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  // Obsługa przycisku "Dodaj"
  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony
    console.log(`tytul: ${title}; rodzaj: ${category}`);
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Formularz</h1>
      <form onSubmit={handleSubmit}>
        {/* Pole tekstowe */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Tytuł filmu</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wpisz tytuł filmu"
          />
        </div>

        {/* Lista rozwijana */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Rodzaj</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Wybierz...</option>
            <option value="1">Komedia</option>
            <option value="2">Obyczajowy</option>
            <option value="3">Sensacyjny</option>
            <option value="4">Horror</option>
          </select>
        </div>

        {/* Przycisk Dodaj */}
        <button type="submit" className="btn btn-primary">Dodaj</button>
      </form>
    </div>
  );
}

export default App;
