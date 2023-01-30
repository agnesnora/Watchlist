const searchBtn = document.getElementById("searchBtn");
let inputEl = document.getElementById("searchBar");
let movieSearched;
let movieId;
let movieArray;
const movieEl = document.getElementById("movieDetail");
const movieList = document.getElementById("movieList");
searchBtn.addEventListener("click", handleSearch);

inputEl.addEventListener("keyup", function () {
  movieSearched = inputEl.value;
  console.log("movieSearched:", movieSearched);
});

function handleSearch() {
  console.log(movieSearched);
  console.log("hello click");

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
      console.log("data ami nem logol:", data);
      console.log("genre:", data.Genre);

      renderMovies(data);
    });
}

function renderMovies(item) {
  console.log(item);
  movieList.innerHTML += `<div id="movieDetail">
  <img src="${item.Poster}" />
  <div id="movieInfo">
    <div id="line1">
      <h2>${item.Title}</h2>
      <i class="fa-solid fa-star"></i>
      <p>${item.imdbRating}</p>
    </div>
    <div id="line2">
      <p>${item.Runtime}</p>
      <p>${item.Genre}</p>
      <button>Add to watchlist</button>
    </div>
    <p id="line3">
    ${item.Plot}
    </p>
  </div>
</div>
<hr />`;
}
