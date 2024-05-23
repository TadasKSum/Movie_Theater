const loginButtons = document.querySelectorAll('.loginBtn');

const defaultMovieList = [
    {
        title: "Avengers",
        image: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        movieID: "0Ave",
        seats: 10,
        reservedSeats: [
            {
                "seatNumber": 1,
                "reserved": false
            },
            {
                "seatNumber": 2,
                "reserved": false
            },
            {
                "seatNumber": 3,
                "reserved": false
            },
            {
                "seatNumber": 4,
                "reserved": false
            },
            {
                "seatNumber": 5,
                "reserved": false
            },
            {
                "seatNumber": 6,
                "reserved": false
            },
            {
                "seatNumber": 7,
                "reserved": false
            },
            {
                "seatNumber": 8,
                "reserved": false
            },
            {
                "seatNumber": 9,
                "reserved": false
            },
            {
                "seatNumber": 10,
                "reserved": false
            }
        ]
    },
    {
        title: "Guardians of the Galaxy Vol. 3",
        image: "https://image.tmdb.org/t/p/original/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        movieID: "1Gua",
        seats: 18,
        reservedSeats: [
            {
                "seatNumber": 1,
                "reserved": false
            },
            {
                "seatNumber": 2,
                "reserved": false
            },
            {
                "seatNumber": 3,
                "reserved": false
            },
            {
                "seatNumber": 4,
                "reserved": false
            },
            {
                "seatNumber": 5,
                "reserved": false
            },
            {
                "seatNumber": 6,
                "reserved": false
            },
            {
                "seatNumber": 7,
                "reserved": false
            },
            {
                "seatNumber": 8,
                "reserved": false
            },
            {
                "seatNumber": 9,
                "reserved": false
            },
            {
                "seatNumber": 10,
                "reserved": false
            },
            {
                "seatNumber": 11,
                "reserved": false
            },
            {
                "seatNumber": 12,
                "reserved": false
            },
            {
                "seatNumber": 13,
                "reserved": false
            },
            {
                "seatNumber": 14,
                "reserved": false
            },
            {
                "seatNumber": 15,
                "reserved": false
            },
            {
                "seatNumber": 16,
                "reserved": false
            },
            {
                "seatNumber": 17,
                "reserved": false
            },
            {
                "seatNumber": 18,
                "reserved": false
            }
        ]
    }
];

let checkFirstTime = localStorage.getItem("firstLogin")

//localStorage.setItem("movieList", JSON.stringify(defaultMovieList))

// Regular login
loginButtons[0].onclick = () => {
    localStorage.setItem("userLogin", "User")
    window.location.replace("mainPage.html")
    if(checkFirstTime === null) {
        localStorage.setItem("movieList", JSON.stringify(defaultMovieList))
        localStorage.setItem("firstLogin", "done")
    }
}

// Admin login
loginButtons[1].onclick = () => {
    localStorage.setItem("userLogin", "Admin")
    window.location.replace("mainPage.html")
    if(checkFirstTime === null) {
        localStorage.setItem("movieList", JSON.stringify(defaultMovieList))
        localStorage.setItem("firstLogin", "done")
    }
}