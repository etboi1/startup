function login() {
    const usernameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("username", usernameEl.value);
    localStorage.setItem("password", passwordEl.value);
    window.location.href = "goals.html";
}