import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tytul, setTytul] = useState('');
  const [rodzaj, setRodzaj] = useState('');
  const [wiadomosc, setWiadomosc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/filmy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nazwa: tytul,
          rodzaj,
          dataProdukcji: new Date().toISOString().split('T')[0], // Ustawienie obecnej daty
        }),
      });

      if (response.ok) {
        setWiadomosc('Film został dodany pomyślnie!');
      } else {
        setWiadomosc('Wystąpił błąd podczas dodawania filmu.');
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem:', error);
      setWiadomosc('Nie udało się połączyć z serwerem.');
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tytul" className="form-label">Tytuł filmu</label>
        <input
          type="text"
          id="tytul"
          className="form-control"
          value={tytul}
          onChange={(e) => setTytul(e.target.value)}
        />

        <label htmlFor="rodzaj" className="form-label">Rodzaj</label>
        <select
          id="rodzaj"
          className="form-select"
          value={rodzaj}
          onChange={(e) => setRodzaj(e.target.value)}
        >
          <option value="">Wybierz...</option>
          <option value="Komedia">Komedia</option>
          <option value="Obyczajowy">Obyczajowy</option>
          <option value="Sensacyjny">Sensacyjny</option>
          <option value="Horror">Horror</option>
        </select>

        <button type="submit" className="btn btn-primary mt-3">Dodaj</button>
      </form>

      {wiadomosc && <p className="mt-3">{wiadomosc}</p>}
    </div>
  );
};

export default App;
