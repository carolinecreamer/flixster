
const apiKey = `359745d5a46518d0fc333ef89de1bad3`;

let movieData   = ``;
let searchParam = ``;
let pages       = 1;
let modalId     = "";

const clearIcon  = document.getElementById("close-search-btn");
const searchIcon = document.querySelector(".search-icon");
const searchBar  = document.getElementById("search-input");

searchBar.addEventListener("keyup", (event) => {
    if(searchBar.value == "") {
        clearIcon.style.visibility  = "hidden";
        document.getElementById('movies-grid').innerHTML = ``;
        fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`);
    } else if(searchBar.value){
        clearIcon.style.visibility   = "visible";
        searchParam = document.getElementById('search-input').value;
        pages = 1;
        document.getElementById('movies-grid').innerHTML = ``;
        fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pages}&include_adult=false&query=${searchParam}`);
    } 
});

clearIcon.addEventListener("click", () => {
    pages = 1;
    document.getElementById('movies-grid').innerHTML = ``
    searchBar.value = "";
    fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`);
    clearIcon.style.visibility = "hidden";
})


function loadResults() {
    ++pages;
    //offset = pages * limit;
    if (searchParam != "") {
        fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pages}&include_adult=false&query=${searchParam}`);
    }
    else {
        fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`)
    }
    
}



function renderMovies() {
    movieData.results.forEach((row, index) => {
        let id = movieData.results[index].id;
        modalId  = `myModal` + movieData.results[index].id;
        document.getElementById('movies-grid').innerHTML += `
        <div class="imageContainer">
            <div class="movie-card">
            
            <button id="button${modalId}" onclick="openModal(${id})">
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movieData.results[index].poster_path}" ></img>
            </button>
            </div>
            <div class="move-title">
                <p class="move-title text end bold">${movieData.results[index].title}</p>
                <div class="movie-votes text start"> 
                    <p><img class="movie-votes star" src="1200px-Gold_Star.svg.png">  ${movieData.results[index].vote_average}</p>
                </div>
            </div>
        </div>


        `
    });

    
}

async function openModal(id) {
    var response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
    var results  = await response.json(); 
    var genres   = ""
    results.genres.forEach((row, index) => {
        genres += results.genres[index].name;
        if (index < (results.genres.length - 1)) {
            genres += ", ";
        }
    })
    document.getElementById('popup-grid').innerHTML += `
        <img src="https://image.tmdb.org/t/p/w500/${results.backdrop_path}" ></img>
        <h1>${results.title}</h1>
        <p>${results.runtime} minutes | ${results.release_date} | ${genres} </p>
        <p>${results.overview}</p>
        
    `
    document.querySelector('.modal').style.display = "flex";
}

async function fetchMovies(url) {
    try {
        var response = await fetch(url)
        var results  = await response.json(); 
        movieData = results;
        renderMovies();
        
    }
    catch (error) {
        console.error(error);
    }
}

function closeModal() {
    document.querySelector('.modal').style.display = "none";
    document.getElementById('popup-grid').innerHTML = `<button id="close-btn" onclick="closeModal()">x</button>`;
}

window.onload = function () {
    fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`);
    modalBtn = document.getElementById("close-btn");
    document.getElementById("close-btn").addEventListener("click", () => {    
    })

    var load = document.getElementById("load-more-movies-btn");
    load.style.display = "flex";

    load.addEventListener('click', (event) => {
        if (searchParam != "") {
            loadResults();
        }
        else {
            loadResults();
        }
    })
}


