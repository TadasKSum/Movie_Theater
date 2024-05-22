/* ===== Module Imports ===== */

/* ===== Bindings ===== */

// Login status, logout button
const currentUser = document.querySelector(".currentUser")
const logoutBtn = document.querySelector(".logoutBtn")

/* ===== Variables ===== */
// Get User Login
const currentLogin = localStorage.getItem("userLogin")
console.log(currentLogin)

/* ===== Functions ===== */


/* ===== Actions ===== */

currentUser.innerHTML = `<b>${currentLogin}</b>`

logoutBtn.onclick = () => {
    localStorage.removeItem("userLogin")
    window.location.replace("index.html")
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