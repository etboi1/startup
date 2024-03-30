let currentUser = localStorage.getItem('username');

async function onSendInit() {
    let allGoals = [];
    try {
        const response = await fetch('/api/goals');
        allGoals = await response.json();
    }
    catch {
        if (localStorage.getItem('goals')) {
            allGoals = localStorage.getItem('goals');
            allGoals = JSON.parse(allGoals);
        }
    }
    for (let i = 0; i < allGoals.length; i++) {
        const thisGoal = allGoals.at(i);
        const goalType = thisGoal.goalType;
        const typeOptionGrpEl = document.getElementById(`${goalType}Goals`);

        const goalTitle = thisGoal.goalTitle

        let newOption = document.createElement('option');
        newOption.innerHTML = `${goalTitle}`;

        typeOptionGrpEl.appendChild(newOption);
    }
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}}://${window.location.host}/ws`, {
        headers: {
            username: currentUser,
        }
    });
    socket.onopen = (event) => {
        console.log('WebSocket connection sucessfully established');
    }
    socket.onclose = (event) => {
        console.log('WebSocket connection terminated');
    }
    socket.onmessage = async (event) => {
        const socketInfo = JSON.parse(await event.data.text());
        updateNotification(socketInfo.from);
    }
}

function broadcastEvent(from, users) {
    const event = {
        from: from,
        shareWith: users,
    }
    socket.send(JSON.stringify(event));
}

async function shareGoal() {
    const currentUser = localStorage.getItem("username");
    const goalTitleEl = document.getElementById("goalname");
    const usersEl = document.getElementById("users");

    const newShare = {"username": currentUser, "goalTitle": goalTitleEl.value, "users": usersEl.value}

    try {
        const response = await fetch(`/api/share`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newShare),
        })
        const sharedGoals = await response.json()
        configureWebSocket();
        let userList = usersEl.value.split(',');
        broadcastEvent(currentUser, userList);
    }
    catch {
        console.error('Error: unable to share goals at this time');
    }
   
    window.location.href = "sharegoals.html";
}

function updateSharedGoals(newShare) {
    let sharedGoals = [];
    const sharedGoalsText = localStorage.getItem('sharedGoals');
    if (sharedGoalsText) {
        sharedGoals = JSON.parse(sharedGoalsText);
    }

    sharedGoals.push(newShare);

    return sharedGoals;
}

onSendInit()