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

    // let goalTypes = ['PhysicalGoals', 'EducationalGoals', 'OccupationalGoals', 'HobbyGoals', 'SocialGoals'];
    // for (let i = 0; i < goalTypes.length; i++) {
    //     let optGroupType = goalTypes.at(i);
    //     const optionGrpEl = document.getElementById(`${optGroupType}`);

    // }
}

async function shareGoal() {
    const currentUser = localStorage.getItem("username");
    const goalTitleEl = document.getElementById("goalname");
    const usersEl = document.getElementById("users");

    const newShare = {"username": currentUser, "goalTitle": goalTitleEl.value, "users": usersEl.value}

    try {
        const response = await fetch(`/api/share`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newShare),
        })
        const sharedGoals = await response.json()
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