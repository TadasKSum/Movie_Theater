
export function showMovieList(array, htmlDestination, login) {
    htmlDestination.innerHTML = ""

    if(login === "Admin") {
        array.forEach(movie => {
            // Reserved seats counter
            let filledSeats = 0;

            movie.reservedSeats.forEach(seat => {
                if(seat.reserved) filledSeats++
            })

            // Movie div creation
            // Buttons have IDs that are same as movie ids with addition of 4 symbols (so each id is unique)
            // Last four symbols are removed when clicking on button and getting target ID, so then you get movie ID to use in filtering
            const el = document.createElement("div")
            el.classList.add("movie")
            el.innerHTML = `
            <img src="${movie.image}" alt="img">
            <div class="movieTitle">"${movie.title}"</div>
            <div>Seats: ${filledSeats}/${movie.seats}</div>
            <div class="movieListingControlsDiv">
                <div class="movieListBtn editMovieSeatsBtn" id="${movie.movieID}_edi">Edit Seats</div>
                <div class="movieListBtn deleteMovieBtn" id="${movie.movieID}_del">Delete Movie</div>
            </div>
            `
            htmlDestination.append(el)
        })
    } else {
        array.forEach(movie => {
            let filledSeats = 0;

            movie.reservedSeats.forEach(seat => {
                if(seat.reserved) filledSeats++
            })

            const el = document.createElement("div")
            el.classList.add("movie")
            el.innerHTML = `
            <img src="${movie.image}" alt="img">
            <div class="movieTitle">"${movie.title}"</div>
            <div>Seats: ${filledSeats}/${movie.seats}</div>
            <div class="movieListingControlsDiv">
                <div class="movieListBtn reserveMovieSeatsBtn" id="${movie.movieID}_res">Reserve Seats</div>
            </div>
            `
            htmlDestination.append(el)
        })
    }
}

export function showTargetMovie(array, htmlDestination, login) {
    htmlDestination.innerHTML = "";

    // Append for normal user

    if(login === "User") {
        const el = document.createElement("div")
        el.classList.add("seatsMenu")
        el.innerHTML = `
        <div class="seatsMovieImg">
            <img src="${array[0].image}" alt="${array[0].title}">
        </div>
        <div class="seatsReserve">
            <h3>"${array[0].title}"</h3>
            <div class="displaySeats"></div>
            <div class="confirmReservation">
                <div class="targetMovieBtn" id="userReserveSeatsBtn">Reserve</div>
                <div class="targetMovieBtn closeTargetMovieMenu">Exit</div>
            </div>
        </div>
        `
        htmlDestination.append(el)
    } else {
        const el = document.createElement("div")
        el.classList.add("seatsMenu")
        el.innerHTML = `
        <div class="seatsMovieImg">
            <img src="${array[0].image}" alt="${array[0].title}">
        </div>
        <div class="seatsReserve">
            <h3>"${array[0].title}"</h3>
            <div class="displaySeats"></div>
            <div class="confirmReservation">
                <div class="targetMovieBtn" id="adminReserveSeatsBtn">Remove Reservation</div>
                <div class="targetMovieBtn closeTargetMovieMenu">Exit</div>
            </div>
        </div>
    `
        htmlDestination.append(el)
    }


    const displaySeats = document.querySelector(".displaySeats")

    displaySeats.innerHTML = "";

    array[0].reservedSeats.forEach(seat => {
        const el = document.createElement("div")
        el.classList.add("seat")

        if(seat.reserved) el.classList.add("reserved")

        el.innerHTML = `${seat.seatNumber}`
        displaySeats.append(el)
    })
}