document.addEventListener("DOMContentLoaded", function() {
const searchButton = document.getElementById('searchButton');
const movieSearch = document.getElementById('movieSearch');
const movieResults = document.getElementById('movieResults');

searchButton.addEventListener("click", function() {
    const searchTerm = movieSearch.value.trim();

    if (searchTerm !== "") {
        searchMovies(searchTerm);
    }
});

function searchMovies(searchTerm) {
    const apiKey = '5a16e48d9e2649efb202253111f64687';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&language=es`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayResults(data.results);
    })
    .catch(error => {
        console.error("Error al buscar película: ", error);
        movieResults.innerHTML = "<p>No se encontraron películas.</p>";
    });
}

function displayResults(movies) {
    if(!movies || movies.length === 0) {
        movieResults.innerHTML = "<p>No se encontraron películas.</p>";
        return;
    }

    movieResults.innerHTML = "";

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const title = document.createElement("h2");
        title.textContent = movie.title;


        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const overview = document.createElement("p");
        overview.textContent = movie.overview;

        const br = document.createElement("br");

        movieDiv.appendChild(title);
        movieDiv.appendChild(overview);
        movieDiv.appendChild(img);
        movieDiv.appendChild(br);
        

        movieResults.appendChild(movieDiv);
      });
}

});