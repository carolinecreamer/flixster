
const apiKey = `359745d5a46518d0fc333ef89de1bad3`;

let movieData   = ``;
let searchParam = ``;
let pages       = 1;
let limit       = 10;
let offset      = pages * limit;
let modalId     = ""

const clearIcon  = document.getElementById("close-search-btn");
const searchIcon = document.querySelector(".search-icon");
const searchBar  = document.getElementById("search-input");

searchBar.addEventListener("keyup", (event) => {
    if(searchBar.value == "") {
        clearIcon.style.visibility  = "hidden";
        console.log("here")
        document.getElementById('movies-grid').innerHTML = ``;
        fetchMovies(false);
    } else if(searchBar.value){
        clearIcon.style.visibility   = "visible";
        searchParam = document.getElementById('search-input').value;
        pages = 1;
        document.getElementById('movies-grid').innerHTML = ``;
        fetchMovies(true);
    } 
});

clearIcon.addEventListener("click", () => {
    document.getElementById('movies-grid').innerHTML = ``
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

    var load = document.getElementById("load-more-movies-btn");
    load.style.display = "flex";

    load.addEventListener('click', (event) => {
        if (search == true) {
            loadResults(true);
        }
        else {
            loadResults(false);
        }
    })
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
   /* let val = document.getElementById(modalId);
   console.log(val);*/
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

function closeModal() {
    console.log("button clicked");
    document.querySelector('.modal').style.display = "none";
    document.getElementById('popup-grid').innerHTML = `<button id="close-btn" onclick="closeModal()">x</button>`;
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
    modalBtn = document.getElementById("close-btn");
    console.log(modalBtn)
    document.getElementById("close-btn").addEventListener("click", () => {
        
    })
}


