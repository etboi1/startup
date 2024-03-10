async function login() {
    const usernameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    try {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'content-type': 'string'},
            body: usernameEl.value,
        });
    }
    catch {
        
    }

    localStorage.setItem("username", usernameEl.value);
    localStorage.setItem("password", passwordEl.value);
    window.location.href = "goals.html";
}