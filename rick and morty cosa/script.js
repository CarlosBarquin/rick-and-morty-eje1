const charactersContainer = document.getElementById('charactersContainer');
const searchInput = document.getElementById('searchInput');
const previousPageBtn = document.getElementById('previousPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const buscar = document.getElementById('busca');

let currentPage = 1;
let name = '';

const fetchCharacters = async (page , name ) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
  const data = await response.json();
  return data.results;
};

const displayCharacters = async (page , name) => {
  const characters = await fetchCharacters(page, name);
  let charactersHTML = '';
  characters.forEach((character) => {
    charactersHTML += `
      <div class="character">
        <img src="${character.image}">
        <h2>${character.name}</h2>
        <p>${character.species}</p>
      </div>
    `;
  });
  charactersContainer.innerHTML = charactersHTML;
};

displayCharacters(currentPage, name);

previousPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayCharacters(currentPage, searchInput.value);
  }
});

nextPageBtn.addEventListener('click', async () => {
  const characters = await fetchCharacters(currentPage, searchInput.value);
  if (characters) {
    currentPage++;
    displayCharacters(currentPage, searchInput.value);
  }
});


buscar.addEventListener('click', () => {
  displayCharacters(1, searchInput.value);
});
