const searchBtn = document.getElementById("searchBtn");
let inputEl = document.getElementById("searchBar");
let movieSearched;
searchBtn.addEventListener("click", handleSearch);

inputEl.addEventListener("keyup", function () {
  movieSearched = inputEl.value;
  console.log("movieSearched:", movieSearched);
});

function handleSearch() {
  console.log(movieSearched);
  console.log("hello click");

  fetch(`http://www.omdbapi.com/?apikey=6e75e553&t=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) =>
      console.log(
        data.Title,
        data.Runtime,
        data.Plot,
        data.Genre,
        data.Ratings[0]
      )
    );
}
