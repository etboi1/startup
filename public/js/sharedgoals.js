let currentUser = localStorage.getItem('currentUser');

async function onShareInit() {
    const usernameEl = document.querySelector('h8');
    usernameEl.textContent = `Welcome ${currentUser}!`;

    let sharedGoals = [];
    try {
        const response = await fetch('/api/share');
        sharedGoals = await response.json()
        localStorage.setItem('sharedGoals', sharedGoals);
    }
    catch {
        sharedGoals = localStorage.getItem('sharedGoals');
        sharedGoals = JSON.parse(sharedGoals);
    }
    
    for (let i = 0; i < sharedGoals.length; i++) {
        const goalTitle = sharedGoals[i].goalTitle;
        //Initiliaze new inner container and add the title to it
        const sharingEl = document.getElementById('sharing');
        const newSharedGoalEl = document.createElement('div');
        newSharedGoalEl.classList.add('inner-container');
        const titleEl = document.createElement('strong');
        titleEl.innerHTML = `${goalTitle}`;
        sharingEl.appendChild(newSharedGoalEl);
        newSharedGoalEl.appendChild(titleEl);
        
        const users = sharedGoals[i].users;
        for (let ind = 0; ind < users.length; ind++) {
            let newUser = document.createElement('span');
            newUser.innerHTML = `${users[ind]}`;
            newSharedGoalEl.appendChild(newUser);
        }
    }
}

async function onSharedInit() {
    let sharedWithMe = [];
    try {
        const response = await fetch(`/api/shared`);
        sharedWithMe = await response.json()
    }
    catch {
        sharedWithMe = {'goalreacher': [{'goalTitle': 'Lose 10 Pounds', 'status': 'On Track', 'targetCompletionDate': '2024-03-02'}, {'goalTitle': 'Get an A in Math', 'status': 'Hit Milestone', 'targetCompletionDate': '2024-05-10'}], 
        'jmbohee29': [{'goalTitle': 'Run a 5 Minute Mile', 'status': 'Behind', 'targetCompletionDate': '2024-06-30'}]}
    }
    for (let i = 0; i < sharedWithMe.length; i++) {
        const thisSharedGoal = sharedWithMe.at(i);
        const user = thisSharedGoal.username;

        const correctAccordion = document.getElementById('sharedWithMe');
        const innerContainerEl = document.createElement('div')
        innerContainerEl.classList.add('inner-container');
        correctAccordion.appendChild(innerContainerEl);
        const userNameEl = document.createElement('strong');
        userNameEl.innerHTML = `${user}`;
        innerContainerEl.appendChild(userNameEl);

        const goalTitle = thisSharedGoal.goalTitle;
        // const progressStatus = thisSharedGoal.status;
        const dueDate = thisSharedGoal.targetCompletionDate;
        
        const goalInfoEl = document.createElement('span');
        // goalInfoEl.innerHTML = `${goalTitle} (Due: ${dueDate}) - ${progressStatus}`;
        goalInfoEl.innerHTML = `${goalTitle} (Due: ${dueDate})`;

        innerContainerEl.appendChild(goalInfoEl);
    }
}

function logout() {
    localStorage.removeItem("username");
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

onShareInit()

onSharedInit()