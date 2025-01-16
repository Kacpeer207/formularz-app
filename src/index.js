import React from 'react';
import ReactDOM from 'react-dom/client';
import FilmManager from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Załadowanie Bootstrap do stylizacji

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FilmManager />
  </React.StrictMode>
);
