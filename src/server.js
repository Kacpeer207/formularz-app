
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kino',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Połączono z bazą danych MySQL');
});

// Pobieranie wszystkich filmów
app.get('/filmy', (req, res) => {
  db.query('SELECT * FROM filmy', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Dodawanie filmu
app.post('/filmy', (req, res) => {
  const { tytul, rezyser, rok } = req.body;
  db.query('INSERT INTO filmy (tytul, rezyser, rok) VALUES (?, ?, ?)', [tytul, rezyser, rok], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, tytul, rezyser, rok });
  });
});

// Aktualizacja filmu
app.put('/filmy/:id', (req, res) => {
  const { id } = req.params;
  const { tytul, rezyser, rok } = req.body;
  db.query('UPDATE filmy SET tytul = ?, rezyser = ?, rok = ? WHERE id = ?', [tytul, rezyser, rok, id], (err) => {
    if (err) throw err;
    res.json({ id, tytul, rezyser, rok });
  });
});

// Usuwanie filmu
app.delete('/filmy/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM filmy WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Film został usunięty' });
  });
});

app.listen(5000, () => {
  console.log('Serwer działa na porcie 5000');
});
