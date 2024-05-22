
export function showMovieList(array, bindElement) {
    bindElement.innerHTML = ""

    array.forEach(movie => {
        const el = document.createElement("div")
        el.innerHTML = `
            <img src="${movie.image}" alt="img">
            <div>${movie.title}</div>
        `
        bindElement.append(el)
    })
}