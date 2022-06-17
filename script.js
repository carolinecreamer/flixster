
const apiKey = `359745d5a46518d0fc333ef89de1bad3`;

let movieData   = ``;
let searchParam = ``;
let pages       = 1;
let limit       = 10;
let offset      = pages * limit;


const clearIcon  = document.querySelector(".clear-icon");
const searchIcon = document.querySelector(".search-icon");
const searchBar  = document.getElementById("search");

searchBar.addEventListener("keyup", (event) => {
    if(searchBar.value == "") {
        clearIcon.style.visibility  = "hidden";
        console.log("here")
        document.getElementById('results').innerHTML = ``;
        fetchMovies(false);
    } else if(searchBar.value){
        clearIcon.style.visibility   = "visible";
        searchParam = document.getElementById('search').value;
        pages = 1;
        document.getElementById('results').innerHTML = ``;
        fetchMovies(true);
    } 
});

clearIcon.addEventListener("click", () => {
    document.getElementById('results').innerHTML = ``
    searchBar.value = "";
    clearIcon.style.visibility = "hidden";
    console.log("click")
    fetchMovies(false);
})


function loadResults(search) {
    ++pages;
    //offset = pages * limit;
    if (search == true) {
        fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pages}&include_adult=false&query=${searchParam}`);
    }
    else {
        fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`)
    }
    
}

function renderMovies(search) {
    console.log(movieData)
    movieData.results.forEach((row, index) => {
        document.getElementById('results').innerHTML += `
        <div class="imageContainer">
            <div class="movieContainer">
                <img class="movie" src="https://image.tmdb.org/t/p/w500/${movieData.results[index].poster_path}" >
            </div>
            <div class="moveTitle">
                <p class="text end bold">${movieData.results[index].title}</p>
                <div class="text start"> 
                    <p><img class="star" src="1200px-Gold_Star.svg.png">  ${movieData.results[index].vote_average}</p>
                </div>
            </div>
        </div>
        `
    });

    var load = document.getElementById("load");
    load.style.display = "flex";

    load.addEventListener('click', (event) => {
        loadResults(search);
    })
}

async function fetchMovies(search) {
    try {
        if (search == true) {
            console.log("search")
            var response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pages}&include_adult=false&query=${searchParam}`)
            var results  = await response.json(); 
            console.log(results)
            movieData = results;
            renderMovies(true);
        }
        else {
            console.log(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`)
            var response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`)
            var results  = await response.json(); 
            console.log(results)
            movieData = results;
            renderMovies(false);
        }
        
    }
    catch (error) {
        console.error(error);
    }
}

/*document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    searchParam = document.getElementById('search').value;
    console.log(searchParam)
    pages = 1;
    document.getElementById('results').innerHTML = ``;
    fetchMovies(true);
})
*/
window.onload = function () {
    console.log("here")
    fetchMovies(false);
}