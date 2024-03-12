async function onSendInit() {
    let allGoals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};
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
    for ([goalType, specificGoals] of Object.entries(allGoals)) {
        const typeOptionGrpEl = document.getElementById(`${goalType}Goals`);

        if (specificGoals.length > 0) {
            for (let i = 0; i < specificGoals.length; i++) {
                const goalTitle = specificGoals[i].goalTitle;

                let newOption = document.createElement('option');
                newOption.innerHTML = `${goalTitle}`;

                typeOptionGrpEl.appendChild(newOption);
            }
        }
        else {
            typeOptionGrpEl.remove()
        }
    }
}

async function shareGoal() {
    const goalTypeEl = document.querySelector('#goalname option:checked').parentElement.label;
    const goalTitleEl = document.getElementById("goalname");
    const usersEl = document.getElementById("users");

    let goalType = goalTypeEl.split(' ').at(0)

    const newShare = {"goalType": goalType, "goalTitle": goalTitleEl.value, "users": usersEl.value}

    try {
        const response = await fetch(`/api/share`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newShare),
        })
        const sharedGoals = await response.json()
        localStorage.setItem('sharedGoals', JSON.stringify(sharedGoals));
    }
    catch {
        const sharedGoals = this.updateSharedGoals(newShare);
        localStorage.setItem('sharedGoals', JSON.stringify(sharedGoals));
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