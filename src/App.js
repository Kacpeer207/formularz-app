const form = document.getElementById('film-form');
const filmList = document.getElementById('film-list');

// Obsługa dodawania filmów
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const director = document.getElementById('director').value;
  const year = document.getElementById('year').value;

  if (!title || !director || !year) {
    alert('Wszystkie pola muszą być wypełnione!');
    return;
  }

  const id = filmList.children.length + 1;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${id}</td>
    <td>${title}</td>
    <td>${director}</td>
    <td>${year}</td>
    <td>
      <button class="edit-btn"><i class="fas fa-edit"></i> Edytuj</button>
      <button class="delete-btn"><i class="fas fa-trash"></i> Usuń</button>
    </td>
  `;

  filmList.appendChild(row);
  form.reset();
});

// Obsługa usuwania filmów
filmList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    row.remove();
  }
});
