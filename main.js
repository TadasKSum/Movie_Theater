/* ===== Module Imports ===== */

import {showMovieList} from "./show.js";

/* ===== Bindings ===== */

// Login status, logout button
const currentUser = document.querySelector(".currentUser")
const logoutBtn = document.querySelector(".logoutBtn")

// Navbar. Movie list, Create Movie
const movieListBtn = document.querySelector("#movieListMenu")
const createMovieBtn = document.querySelector("#createMovieMenu")

// Create movie. Inputs, confirm.
const createMoviePage = document.querySelector(".createMovie")
const inputMovieTitle = document.querySelector("#inputMovieTitle")
const inputMovieImage = document.querySelector("#inputMovieImage")
const inputMovieSeats = document.querySelector("#inputMovieSeats")
const inputConfirmCreateMovie = document.querySelector("#inputConfirmCreateMovie")

// Movie list
const movieListPage = document.querySelector(".movieList")
const movieShowcase = document.querySelector(".moviesShowcase")

/* ===== Variables ===== */

// Get User Login
const currentLogin = localStorage.getItem("userLogin")

// Movie List
let moviesArray = [];

/* ===== Functions ===== */

function hideCreateMovie() {
    if (currentLogin === "User") {
        createMovieBtn.classList.toggle("hide")
    }
}

function validUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false
    }
}

function createMovie() {
    // Load movie list from local storage.
    moviesArray = JSON.parse(localStorage.getItem("movieList"))

    if(moviesArray === null) {
        moviesArray = [];
    }

    // Object creation
    let newMovie = {
        title: "",
        image: "",
        movieID: "",
        seats: 0,
        reservedSeats: []
    }

    //Admin inputs
    newMovie.title = inputMovieTitle.value;
    newMovie.image = inputMovieImage.value;
    newMovie.seats = inputMovieSeats.value;

    // Seat creation
    for (let i = 0; i < inputMovieSeats.value; i++) {
        let seat = {
            seatNumber: 0,
            reserved: false
        };
        seat.seatNumber = i+1;
        newMovie.reservedSeats.push(seat);
    }

    // Movie ID creation
    newMovie.movieID = `${moviesArray.length}${inputMovieTitle.value.slice(0, 3)}`

    // Push new movie into movie list
    moviesArray.push(newMovie)

    // Save movie list in local storage
    localStorage.setItem("movieList", JSON.stringify(moviesArray))
}

/* ===== Actions ===== */

currentUser.innerHTML = `<b>${currentLogin}</b>`

hideCreateMovie()

logoutBtn.onclick = () => {
    localStorage.removeItem("userLogin")
    window.location.replace("index.html")
}

inputConfirmCreateMovie.onclick = () => {
    if(inputMovieTitle.value === "" || inputMovieImage.value === "" || inputMovieSeats.value === "") {
        alert("Make sure to properly fill all fields.")
    } else {
        if (validUrl(inputMovieImage.value)) {
            createMovie()
            console.log(moviesArray)
        } else {
            alert("Input valid URL link.")
        }
    }
}

// Menu Nav

movieListBtn.onclick = () => {
    movieListPage.classList.remove("hide")
    createMoviePage.classList.add("hide")

    moviesArray = JSON.parse(localStorage.getItem("movieList"))

    if(moviesArray === null) {
        moviesArray = [];
    }

    showMovieList(moviesArray, movieShowcase)
}

createMovieBtn.onclick = () => {
    movieListPage.classList.add("hide")
    createMoviePage.classList.remove("hide")
}

/*let exampleMovieObject = {
    title: "", // admin input
    image: "", // admin input
    movieID: "", // created. Index of movie in all movies array + first 3 letters of movie title
    seats: 0, // admin input
    // Created. Array created depending on seats amount. On first creation all "reserved" booleans are false
    reservedSeats: [
        {
            seatNumber: 1,
            reserved: false
        },
        {
            seatNumber: 2,
            reserved: false
        }
    ]
}*/
/*let reservedByUserExample = {
    title: "",
    image: "",
    movieID: "",
    reservedSeats: [
        {
            seatNumber: 2,
            reserved: true
        }
    ]
}*/

/*
On page load:
1. load movie list array from local storage
2. load user reservations array from local storage.
3. change movie list array according to user reservations.
4. display resulting array on page
*/