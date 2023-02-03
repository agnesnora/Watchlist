const inputEl = document.getElementById("searchBar");
const diaEl = document.getElementById("diapositive");
const headerEl = document.getElementById("header");
const movieList = document.getElementById("movieList");
let movieId;
let movieArray;
let currentLoadedMovies = {};
let watchlist = [];

function handleSearch() {
  movieList.innerHTML = ` <!-- <div id="movieDetail"></div> -->`;

  currentLoadedMovies = {};
  fetch(`http://www.omdbapi.com/?apikey=6e75e553&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
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
}

function pushToMovieMyList(data) {
  currentLoadedMovies[data.imdbID] = data;
}

function renderMovies(item) {
  diaEl.style.display = "none";
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
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.addbutton) {
    movieId = e.target.dataset.addbutton;
    watchlist.push(currentLoadedMovies[movieId]);
  } else if (e.target.dataset.watchlistbtn) {
    headerEl.innerHTML = `<h1>My watchlist</h1>
    <a id="navigateToWatchlist" href="index.html"><h4>Search for film</h4></a>`;
    movieList.innerHTML = ` <!-- <div id="movieDetail"></div> -->`;
    watchlist.forEach(function (item) {
      renderMyWatchList(item);
    });
  } else if (e.target.dataset.search) {
    const movieSearched = inputEl.value;
    handleSearch();
  }
});

function renderMyWatchList(item) {
  currentLoadedMovies = {};
  diaEl.style.display = "none";
  document.getElementById("inputSection").style.display = "none";

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
