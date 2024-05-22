const loginButtons = document.querySelectorAll('.loginBtn');

// Regular login
loginButtons[0].onclick = () => {
    localStorage.setItem("userLogin", "User")
    window.location.replace("mainPage.html")
}

// Admin login
loginButtons[1].onclick = () => {
    localStorage.setItem("userLogin", "Admin")
    window.location.replace("mainPage.html")
}