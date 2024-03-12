async function login() {
    const usernameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    try {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify([usernameEl.value, passwordEl.value]),
        });
        let usernameObject = await response.json();
        let username = usernameObject.currentUser;
        localStorage.setItem('currentUser', username);
        localStorage.setItem('password', passwordEl.value);
    }
    catch {
        localStorage.setItem('currentUser', usernameEl.value);
        localStorage.setItem('password', passwordEl.value)
    }
    window.location.href = "goals.html";
}