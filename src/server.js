const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kino',
});

db.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
  } else {
    console.log('Połączono z bazą danych.');
  }
});

app.post('/filmy', (req, res) => {
  const { nazwa, rodzaj, dataProdukcji } = req.body;

  if (!nazwa || !rodzaj || !dataProdukcji) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane!' });
  }

  const query = 'INSERT INTO filmy (nazwa, rodzaj, data_produkcji) VALUES (?, ?, ?)';
  db.query(query, [nazwa, rodzaj, dataProdukcji], (err, result) => {
    if (err) {
      console.error('Błąd podczas dodawania filmu:', err);
      return res.status(500).json({ error: 'Błąd serwera' });
    }
    res.status(200).json({ message: 'Film dodany pomyślnie!', id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
