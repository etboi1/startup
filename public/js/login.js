async function login() {
    const usernameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    try {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'content-type': 'array'},
            body: [usernameEl.value, passwordEl.value]
        });
        localStorage.setItem('currentUser', response);
        localStorage.setItem('password', passwordEl);
    }
    catch {
        localStorage.setItem('currentUser', usernameEl.value);
        localStorage.setItem('password', passwordEl.value)
    }
    window.location.href = "goals.html";
}