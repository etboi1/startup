async function loginUser() {
    loginOrCreate('/api/auth/create');
}

async function createUser() {
    loginOrCreate('api/auth/create');
}

async function loginOrCreate(endpoint) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ username: username, password:password}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });

    if (response.ok) {
        localStorage.setItem('username', username);
        window.location.href = 'goals.html';
    }
    else {
        const body = await response.json();
    }
}

// async function login() {
//     const usernameEl = document.querySelector("#username");
//     const passwordEl = document.querySelector("#password");

//     try {
//         const response = await fetch(`/api/user`, {
//             method: 'POST',
//             headers: {'content-type': 'application/json'},
//             body: JSON.stringify([usernameEl.value, passwordEl.value]),
//         });
//         let usernameObject = await response.json();
//         let username = usernameObject.currentUser;
//         localStorage.setItem('currentUser', username);
//         localStorage.setItem('password', passwordEl.value);
//     }
//     catch {
//         localStorage.setItem('currentUser', usernameEl.value);
//         localStorage.setItem('password', passwordEl.value)
//     }
//     window.location.href = "goals.html";
// }