async function saveGoal() {
    const titleEl = document.querySelector("#goalTitle");
    const typeEl = document.querySelector("#goalType");
    const descriptionEl = document.querySelector("#goalDescription");
    const completionDateEl = document.querySelector("#targetCompletionDate");
    const milestoneDateEl = document.querySelector("#milestoneDate");
    const milestoneTitleEl = document.querySelector("#milestoneTitle");

    const newGoalData = [typeEl.value, {"goalTitle": titleEl.value,
        "goalDescription": descriptionEl.value,
        "targetCompletionDate": completionDateEl.value,
        "milestoneDate": milestoneDateEl.value,
        "milestoneTitle": milestoneTitleEl.value}]

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

function updateGoals(newData) {
    let goals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};
    const goalsText = localStorage.getItem('goals');
    if (goalsText) {
        goals = JSON.parse(goalsText);
    }

    goalType = newData.at(0);
    newGoal = newData.at(1);

    goals[goalType].push(newGoal);

    return goals;
}
