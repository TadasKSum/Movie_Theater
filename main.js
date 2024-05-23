/* ===== Module Imports ===== */

import {showMovieList} from "./show.js";
import {showTargetMovie} from "./show.js";

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

// Target Movie Menu
const targetMovieDest = document.querySelector(".movieTargetDestination")

/* ===== Variables ===== */

// Get User Login
const currentLogin = localStorage.getItem("userLogin");

// Movie List
let moviesArray = [];

// Target Movie
let currentTargetID = "";
let target = [];
let targetIndex = -1;

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

    if(moviesArray === null) moviesArray = []; // For first load while local storage is empty

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

    // Clear inputs

    inputMovieTitle.value = ""
    inputMovieImage.value = ""
    inputMovieSeats.value = ""
}

function pageLoad() {
    moviesArray = JSON.parse(localStorage.getItem("movieList"))

    if(moviesArray === null) moviesArray = [];

    showMovieList(moviesArray, movieShowcase, currentLogin)

    if(currentLogin === "Admin") {
        seatsControlAdmin()
    } else {
        reserveSeatsControlsUser()
        hideCreateMovie()
    }
}

/* List Controls */

// Reserve Seats User
function reserveSeatsControlsUser() {
    // Get bindings from showMovieList() function

    const reserveButtons = document.querySelectorAll(".reserveMovieSeatsBtn")

    reserveButtons.forEach((button, index) => {
        button.onclick = (event) => {
            // Find out target id from the button ID. Slicing off last 4 symbols to remove _res tag from id
            currentTargetID = event.target.id.slice(0, -4)

            // Load Movie List
            moviesArray = JSON.parse(localStorage.getItem("movieList"))

            // Filter out target from movie list. Store it in variable
            target = moviesArray.filter((movie, i) => movie.movieID === currentTargetID)

            // Filter out target index inside movie list array. store it in variable
            targetIndex = moviesArray.findIndex((item, i) => item.movieID === currentTargetID)

            // Open reserve seats menu. Send target into it for editing.

            targetMovieDest.classList.remove("hide")
            showTargetMovie(target, targetMovieDest, currentLogin)

            // Exit Menu. Binding and function
            const exitTargetMovieMenuBtn = document.querySelector(".closeTargetMovieMenu")

            exitTargetMovieMenuBtn.onclick = () => {
                targetMovieDest.classList.add("hide")
            }

            seatsSelectionUser()
        }
    })
}

function seatsSelectionUser() {
    // Seats indicators binding.
    const thisMovieSeats = document.querySelectorAll(".seat")

    thisMovieSeats.forEach((seat, index) => {
        seat.onclick = (event) => {
            if(event.target.className.includes("reserved")) {

            } else {
                seat.classList.toggle("selected")
            }
        }
    })

    makeReservationUser()
}

function makeReservationUser() {
    if(currentLogin === "Admin") return
    // Bind seats.
    const seatsForReservation = document.querySelectorAll(".seat")
    // Bind button.
    const userReserveSeatsBtn = document.querySelector("#userReserveSeatsBtn")

    userReserveSeatsBtn.onclick = () => {
        // Get selected seats
        seatsForReservation.forEach((seat, index) => {
            if(seat.className.includes("selected")) {
                // Change reservation status
                target[0].reservedSeats[index].reserved = true;
                // Update movie list array
                moviesArray[targetIndex] = target[0]
                // Save to local storage
                localStorage.setItem("movieList", JSON.stringify(moviesArray))
                // Close menu
                targetMovieDest.classList.add("hide")
                // Reload
                pageLoad()
            }
        })
    }
}

/* Admin Controls */

function seatsControlAdmin() {
    // Get bindings
    const adminEditSeatsBtn = document.querySelectorAll(".editMovieSeatsBtn")
    const adminDeleteMovieBtn = document.querySelectorAll(".deleteMovieBtn")

    // Add functions
    // 1. Edit seats button
    adminEditSeatsBtn.forEach((button, index) => {
        button.onclick = (event) => {
            // Find out target id from the button ID. Slicing off last 4 symbols to remove _res tag from id
            currentTargetID = event.target.id.slice(0, -4)
            // Load Movie List
            moviesArray = JSON.parse(localStorage.getItem("movieList"))
            // Filter out target from movie list. Store it in variable
            target = moviesArray.filter((movie, i) => movie.movieID === currentTargetID)
            // Filter out target index inside movie list array. store it in variable
            targetIndex = moviesArray.findIndex((item, i) => item.movieID === currentTargetID)
            // Open reserve seats menu. Send target into it for editing.

            console.log(target[0])

            targetMovieDest.classList.remove("hide")
            showTargetMovie(target, targetMovieDest, currentLogin)

            // Exit Menu. Binding and function
            const exitTargetMovieMenuBtn = document.querySelector(".closeTargetMovieMenu")

            exitTargetMovieMenuBtn.onclick = () => {
                targetMovieDest.classList.add("hide")
            }

            // Call function for selecting seats
            reservationSelectAdmin()
        }
    })

    // 2. Delete movie button
    adminDeleteMovieBtn.forEach((button, index) => {
        button.onclick = (event) => {
            // Get target
            currentTargetID = event.target.id.slice(0, -4)
            // Load movie list
            moviesArray = JSON.parse(localStorage.getItem("movieList"))

            if(window.confirm("Do you really want to delete this movie?")) {
                console.log("Movie Deleted")
                // Filter out the selected movie
                moviesArray = moviesArray.filter((movie, i) => movie.movieID !== currentTargetID)
                // Save movie list in local storage
                localStorage.setItem("movieList", JSON.stringify(moviesArray))
                pageLoad()
            } else {
                console.log("Deletion canceled")
            }
        }
    })
}

function reservationSelectAdmin() {
    // Bind Seats
    const thisMovieSeats = document.querySelectorAll(".seat")

    // Seats selection
    thisMovieSeats.forEach((seat, index) => {
        seat.onclick = (event) => {
            if(event.target.className.includes("reserved")) {
                seat.classList.toggle("selected")
            }
        }
    })
    // Call remove function
    reservationRemoveAdmin()
}

function reservationRemoveAdmin() {
    // Bind seats
    const reservedSeatsSelectionAdmin = document.querySelectorAll(".seat")
    // Bind button
    const adminRemoveReservationBtn = document.querySelector("#adminReserveSeatsBtn")

    adminRemoveReservationBtn.onclick = () => {
        reservedSeatsSelectionAdmin.forEach((seat, index) => {
            if(seat.className.includes("selected")) {
                // Change reservation status
                target[0].reservedSeats[index].reserved = false;
                // Update movie list array
                moviesArray[targetIndex] = target[0]
                // Save to local storage
                localStorage.setItem("movieList", JSON.stringify(moviesArray))
                // Close menu
                targetMovieDest.classList.add("hide")
                // Reload
                pageLoad()
            }
        })
    }
}

/* ===== Actions ===== */

currentUser.innerHTML = `<b>${currentLogin}</b>`

pageLoad()

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

    showMovieList(moviesArray, movieShowcase, currentLogin)
    console.log(moviesArray)
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