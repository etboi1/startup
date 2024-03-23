async function saveGoal() {
    const currentUser = localStorage.getItem("username");
    const titleEl = document.querySelector("#goalTitle");
    const typeEl = document.querySelector("#goalType");
    const descriptionEl = document.querySelector("#goalDescription");
    const completionDateEl = document.querySelector("#targetCompletionDate");
    const milestoneDateEl = document.querySelector("#milestoneDate");
    const milestoneTitleEl = document.querySelector("#milestoneTitle");

    const newGoalData = {
        "username": currentUser,
        "goalType": typeEl.value,
        "goalTitle": titleEl.value,
        "goalDescription": descriptionEl.value,
        "targetCompletionDate": completionDateEl.value,
        "milestoneDate": milestoneDateEl.value,
        "milestoneTitle": milestoneTitleEl.value}

    try {
        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newGoalData),
        });

        const goals = await response.json();
        localStorage.setItem('goals', JSON.stringify(goals));
    }
    catch {
        const goals = this.updateGoals(newGoalData);
        localStorage.setItem('goals', JSON.stringify(goals));
    }
   
    //might need to remove this
    window.location.href = "goals.html";
}

function updateGoals(newGoal) {
    let goals = [];
    const goalsText = localStorage.getItem('goals');
    if (goalsText) {
        goals = JSON.parse(goalsText);
    }

    goals.push(newGoal);

    return goals;
}
