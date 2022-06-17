
const apiKey = `359745d5a46518d0fc333ef89de1bad3`;

let movieData   = ``;
let searchParam = ``;
let pages       = 1;
let limit       = 10;
let offset      = pages * limit;

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
        <div>
            <div >
                <img class="movie" src="https://image.tmdb.org/t/p/w500/${movieData.results[index].poster_path}" >
            </div>
            <div class="nogrid">
                <p>${movieData.results[index].title}</p>
                <div class="text"> 
                    
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
        var response;
        if (search == true) {
            console.log("search")
            response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${pages}&include_adult=false&query=${searchParam}`)
            const results  = await response.json(); 
            console.log(results)
            movieData = results;
            renderMovies(true);
        }
        else {
            console.log("notSearch")
            response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pages}`)
            const results  = await response.json(); 
            console.log(results)
            movieData = results;
            renderMovies(false);
        }
        
    }
    catch (error) {
        console.error(error);
    }
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    searchParam = document.getElementById('search').value;
    console.log(searchParam)
    pages = 1;
    document.getElementById('results').innerHTML = ``;
    fetchMovies(true);
})

window.onload = function () {
    console.log("here")
    fetchMovies(false);
}