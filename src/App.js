import React, { useState } from 'react';

const App = () => {
  const [nazwa, setNazwa] = useState('');
  const [rodzaj, setRodzaj] = useState('');
  const [dataProdukcji, setDataProdukcji] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nazwa || !rodzaj || !dataProdukcji) {
      setMessage('Wszystkie pola są wymagane!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/filmy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nazwa, rodzaj, dataProdukcji }),
      });

      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage('Film dodany pomyślnie!');
        setNazwa('');
        setRodzaj('');
        setDataProdukcji('');
      }
    } catch (error) {
      setMessage('Wystąpił błąd podczas dodawania filmu.');
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Dodaj Film</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nazwa" className="form-label">Tytuł filmu</label>
        <input
          type="text"
          id="nazwa"
          className="form-control"
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
        />

        <label htmlFor="rodzaj" className="form-label" style={{ marginTop: '10px' }}>Rodzaj</label>
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

        <label htmlFor="dataProdukcji" className="form-label" style={{ marginTop: '10px' }}>Data Produkcji</label>
        <input
          type="date"
          id="dataProdukcji"
          className="form-control"
          value={dataProdukcji}
          onChange={(e) => setDataProdukcji(e.target.value)}
        />

        <button type="submit" className="btn btn-primary" style={{ marginTop: '15px' }}>Dodaj</button>
      </form>
    </div>
  );
};

export default App;
