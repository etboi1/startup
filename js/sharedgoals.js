function onShareInit() {
    let sharedGoals = localStorage.getItem('sharedGoals');
    sharedGoals = JSON.parse(sharedGoals);
    if (sharedGoals) {
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
            userList = users.split(',');
            for (let ind = 0; ind < userList.length; ind++) {
                let newUser = document.createElement('span');
                newUser.innerHTML = `${userList[ind]}`;
                newSharedGoalEl.appendChild(newUser);
            }
        }
    }
}

onShareInit()