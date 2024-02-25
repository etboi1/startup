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

    goals = this.updateGoals(goals, typeEl, titleEl, descriptionEl, completionDateEl, milestoneDateEl, milestoneTitleEl);

    localStorage.setItem('goals', JSON.stringify(goals));
   
    window.location.href = "goals.html";
}

function updateGoals(goals, type, title, description, completionDate, milestoneDate, milestoneTitle) {
    const newGoal = {"goalTitle": title.value,
        "goalDescription": description.value,
        "targetCompletionDate": completionDate.value,
        "milestoneDate": milestoneDate.value,
        "milestoneTitle": milestoneTitle.value}

    goalType = type.value;
    goals[goalType].push(newGoal);

    return goals;
}
