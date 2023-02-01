const searchBtn = document.getElementById("searchBtn");
let inputEl = document.getElementById("searchBar");
let movieSearched;
let movieId;
let movieArray;
let currentLoadedMovies = {};
let watchlist = [];
const movieEl = document.getElementById("movieDetail");
const movieList = document.getElementById("movieList");

searchBtn.addEventListener("click", handleSearch);

inputEl.addEventListener("keyup", function () {
  movieSearched = inputEl.value;
});

// addToWatchlistBtn.addEventListener("click", function () {
//   console.log("add clicked");
// });

function handleSearch() {
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
  document.getElementById("diapositive").style.display = "none";
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
