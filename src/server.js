const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Połączenie z bazą danych
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kino',
});

db.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
    return;
  }
  console.log('Połączono z bazą danych MySQL');
});

// Endpoint do dodawania filmów
app.post('/filmy', (req, res) => {
  const { nazwa, rodzaj, dataProdukcji } = req.body;

  const query = 'INSERT INTO filmy (nazwa, rodzaj, data_produkcji) VALUES (?, ?, ?)';
  db.query(query, [nazwa, rodzaj, dataProdukcji], (err, result) => {
    if (err) {
      console.error('Błąd podczas dodawania filmu:', err);
      res.status(500).send('Błąd serwera');
      return;
    }
    res.status(200).json({ message: 'Film dodany pomyślnie!', id: result.insertId });
  });
});

// Uruchomienie serwera
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
