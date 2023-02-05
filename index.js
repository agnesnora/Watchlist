const inputEl = document.getElementById("searchBar");
let diaEl = document.getElementById("diapositive");
const headerEl = document.getElementById("header");
const movieList = document.getElementById("movieList");
let movieId;
let movieArray;
let currentLoadedMovies = {};
let watchlist = JSON.parse(localStorage.getItem("addedToWacthlist") || "[]");

// EVENT LISTENER

document.addEventListener("click", function (e) {
  if (e.target.dataset.addbutton) {
    movieId = e.target.dataset.addbutton;
    watchlist.push(currentLoadedMovies[movieId]);
    console.log(watchlist);
  } else if (e.target.dataset.watchlistbtn) {
    headerEl.innerHTML = `<h1>My watchlist</h1>
    <a id="navigateToWatchlist" href="index.html"><h4>Search for film</h4></a>`;
    movieList.innerHTML = ` <!-- <div id="movieDetail"></div> -->`;
    watchlist.forEach(function (item) {
      renderMyWatchList(item);
    });
    saveToLocalStorage();
  } else if (e.target.dataset.removebtn) {
    watchlist = watchlist.filter(
      (deletedMovie) => deletedMovie.imdbID !== e.target.dataset.removebtn
    );
    renderWatchlistHeader();
    movieList.innerHTML = ``;
    watchlist.forEach(function (item) {
      movieList.innerHTML += addToWatchListHTML(item);
    });

    saveToLocalStorage();
  } else if (e.target.dataset.search) {
    const movieSearched = inputEl.value;
    handleSearch();
  }
});

// FUNCTIONS

function handleSearch() {
  movieList.innerHTML = ` <!-- <div id="movieDetail"></div> -->`;

  // currentLoadedMovies = {};
  fetch(`http://www.omdbapi.com/?apikey=6e75e553&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.Search) {
        renderNotFound();
      } else {
        movieArray = data.Search;
        movieArray.forEach((item) => {
          apiCallByID(item);
        });
      }

      inputEl.value = "";
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

function saveToLocalStorage() {
  localStorage.setItem("addedToWacthlist", JSON.stringify(watchlist));
}

// FUNCTIONS FOR RENDERING

function renderMovies(item) {
  document.getElementById("message").innerHTML = ``;
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
      <i class="fa-solid fa-circle-plus" data-addbutton="${item.imdbID}"><button class="infoLine2" id="addBtn" >Add to watchlist</button></i>
    </div>
    <p id="line3">
    ${item.Plot}
    </p>
  </div>
</div>
<hr />`;
}

function renderMyWatchList(item) {
  renderWatchlistHeader();
  movieList.innerHTML += addToWatchListHTML(item);
}

function addToWatchListHTML(item) {
  return `<div id="movieDetail">
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
      <i class="fa-solid fa-circle-minus" data-removebtn="${item.imdbID}"><button class="infoLine2" id="addBtn" >Remove</button></i>
    </div>
    <p id="line3">
    ${item.Plot}
    </p>
  </div>
</div>
<hr />`;
}

function renderWatchlistHeader() {
  currentLoadedMovies = {};
  diaEl.style.display = "none";
  document.getElementById("inputField").style.display = "none";
}

function renderNotFound() {
  document.getElementById(
    "message"
  ).innerHTML = `<h3>Unable to find what you are looking for.Please try another search.</h3>`;
}
