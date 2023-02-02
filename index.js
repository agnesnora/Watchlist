const searchBtn = document.getElementById("searchBtn");
let inputEl = document.getElementById("searchBar");
let diaEl = document.getElementById("diapositive");
let movieSearched;
let movieId;
let movieArray;
let currentLoadedMovies = {};
let watchlist = [];
let headerEl = document.getElementById("header");
const movieEl = document.getElementById("movieDetail");
const movieList = document.getElementById("movieList");

const watchlistBtn = document.getElementById("navigateToWatchlist");

watchlistBtn.addEventListener("click", function () {
  headerEl.innerHTML = `<h1>My watchlist</h1>
  <a id="navigateToWatchlist"><h4>Search for film</h4></a>`;
  movieList.innerHTML = ` <!-- <div id="movieDetail"></div> -->`;
  watchlist.forEach(function (item) {
    console.log(renderMyWatchList(item));
  });
});

searchBtn.addEventListener("click", handleSearch);

inputEl.addEventListener("keyup", function () {
  movieSearched = inputEl.value;
});

function handleSearch() {
  movieList.innerHTML = ` <!-- <div id="movieDetail"></div> -->`;

  currentLoadedMovies = {};
  fetch(`http://www.omdbapi.com/?apikey=6e75e553&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.Search);
      movieArray = data.Search;

      movieArray.forEach((item) => {
        apiCallByID(item);
      });
    });
}

function apiCallByID(item) {
  fetch(`http://www.omdbapi.com/?apikey=6e75e553&i=${item.imdbID}`)
    .then((res) => res.json())
    .then((data) => {
      renderMovies(data);

      pushToMovieMyList(data);
    });

  // movieMylist.push(data);
  console.log(currentLoadedMovies);
}

function pushToMovieMyList(data) {
  currentLoadedMovies[data.imdbID] = data;
  // console.log(movieMylist);
}

function renderMovies(item) {
  console.log(item);
  diaEl.style.display = "none";
  // document.getElementById("diapositive").style.display = "none";
  movieList.innerHTML += `  <div id="movieDetail">
  <img src="${item.Poster}" />
  <div id="movieInfo">
    <div id="line1">
      <h2>${item.Title}</h2>
      <i class="fa-solid fa-star"></i>
      <p>${item.imdbRating}</p>
    </div>
    <div id="line2">
      <p class="infoLine2">${item.Runtime}</p>
      <p class="infoLine2">${item.Genre}</p>
        <button class="infoLine2" id="addBtn" data-addbutton="${item.imdbID}">Add to watchlist</button>
    </div>
    <p id="line3">
    ${item.Plot}
    </p>
  </div>
</div>
<hr />`;

  const addToWatchlistBtn = document.getElementById("addBtn");
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.addbutton) {
    console.log(e.target.dataset.addbutton);
    movieId = e.target.dataset.addbutton;
    watchlist.push(currentLoadedMovies[movieId]);
    console.log(watchlist);
  }
});

function renderMyWatchList(item) {
  currentLoadedMovies = {};
  diaEl.style.display = "none";
  // document.getElementById("diapositive").style.display = "none";

  movieList.innerHTML += `  <div id="movieDetail">
    <img src="${item.Poster}" />
    <div id="movieInfo">
      <div id="line1">
        <h2>${item.Title}</h2>
        <i class="fa-solid fa-star"></i>
        <p>${item.imdbRating}</p>
      </div>
      <div id="line2">
        <p class="infoLine2">${item.Runtime}</p>
        <p class="infoLine2">${item.Genre}</p>
          <button class="infoLine2" id="addBtn" data-removeBtn="${item.imdbID}">Remove</button>
      </div>
      <p id="line3">
      ${item.Plot}
      </p>
    </div>
  </div>
  <hr />`;
}
