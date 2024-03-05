function onSendInit() {
    if (localStorage.getItem('goals')) {
        let allGoals = localStorage.getItem('goals');
        allGoals = JSON.parse(allGoals);
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
}

function shareGoal() {
    let sharedGoals = [];
    const sharedGoalsText = localStorage.getItem('sharedGoals');
    if (sharedGoalsText) {
        sharedGoals = JSON.parse(sharedGoalsText);
    }

    const goalTitleEl = document.getElementById("goalname");
    const usersEl = document.getElementById("users");

    sharedGoals = this.updateSharedGoals(goalTitleEl, usersEl, sharedGoals);

    localStorage.setItem('sharedGoals', JSON.stringify(sharedGoals));
   
    window.location.href = "sharegoals.html";
}

function updateSharedGoals(goalTitle, users, existingSharedGoals) {
    const newShare = {"goalTitle": goalTitle.value, "users": users.value}

    existingSharedGoals.push(newShare);

    return existingSharedGoals;
}

onSendInit()