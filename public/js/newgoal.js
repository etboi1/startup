function saveGoal() {
    let goals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};
    const goalsText = localStorage.getItem('goals');
    if (goalsText) {
        goals = JSON.parse(goalsText);
    }

    const titleEl = document.querySelector("#goalTitle");
    const typeEl = document.querySelector("#goalType");
    const descriptionEl = document.querySelector("#goalDescription");
    const completionDateEl = document.querySelector("#targetCompletionDate");
    const milestoneDateEl = document.querySelector("#milestoneDate");
    const milestoneTitleEl = document.querySelector("#milestoneTitle");

    const newGoal = {"goalTitle": titleEl.value,
        "goalDescription": descriptionEl.value,
        "targetCompletionDate": completionDateEl.value,
        "milestoneDate": milestoneDateEl.value,
        "milestoneTitle": milestoneTitleEl.value}

    goals = this.updateGoals(goals, typeEl.value, newGoal);

    localStorage.setItem('goals', JSON.stringify(goals));
   
    window.location.href = "goals.html";
}

function updateGoals(goals, goalType, newGoal) {

    goals[goalType].push(newGoal);

    return goals;
}
