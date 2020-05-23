
let tabCountries = 0;
let tabFavorites = 0;

let allCountries = [];
let favoritesContries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchContries();

})

async function fetchContries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  allCountries = json.map(country => {

    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation:formatNumber(population),
      flag,
    }
  })



  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();

  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach(country => {
    const { name, flag, id, population, formattedPopulation } = country;

    const countryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect wave-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;

    countriesHTML += countryHTML;

  });

  countriesHTML += '</div>';

  tabCountries.innerHTML = countriesHTML;


}

function renderFavorites() {
  let favoritesHTML = '<div>';

  favoritesContries.forEach(country => {
    const { name, flag, id, population,formattedPopulation } = country;

    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect wave-light btn red darken-4">-</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;

    favoritesHTML += favoriteCountryHTML;

  });

  favoritesHTML += '</div>'

  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoritesContries.length;

  const totalPopulation= allCountries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  const totalFavorites = favoritesContries.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach(button => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });
  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => removeFromFavorite(button.id));
  });

}

function addToFavorites(id) {
  const countryToAdd = allCountries.find(country => country.id === id);

  favoritesContries = [...favoritesContries, countryToAdd];

  favoritesContries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter(country => country.id !== id);
  console.log(favoritesContries.length);
  console.log(allCountries.length);
  

  render();
}

function removeFromFavorite(id) {
  const countryToRemove = favoritesContries.find(country => country.id === id);

  allCountries = [...allCountries, countryToRemove];

  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoritesContries = favoritesContries.filter(country => country.id !== id);
  
  console.log(allCountries.length);
  console.log(favoritesContries.length);
  

  render();
 }

 function formatNumber(number){
   return numberFormat.format(number);
 }