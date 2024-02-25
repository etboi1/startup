function saveGoal() {

}

function saveGoalHelper(goalType) {
    let `${goalType}` = [[],[],[],[],[]];
    const goalsText = localStorage.getItem(`${goalType}`);
    if (goalsText) {
        `${goalType}` = JSON.parse(goalsText);
    }

    const titleEl = document.querySelector("#goalTitle");
    const typeEl = document.querySelector("#goalType");
    const descriptionEl = document.querySelector("#goalDescription");
    const completionDateEl = document.querySelector("#targetCompletionDate");
    const milestoneDateEl = document.querySelector("#milestoneDate");
    const milestoneTitleEl = document.querySelector("#milestoneTitle");

    `${goalType}` = this.updateGoals(goals, typeEl, titleEl, descriptionEl, completionDateEl, milestoneDateEl, milestoneTitleEl);

    localStorage.setItem('goals', JSON.stringify(`${goalType}`);
    
    window.location.href = "goals.html";
}

function updateGoals(goals, type, title, description, completionDate, milestoneDate, milestoneTitle) {
    const newGoal = {"goalTitle": title.value, 
        "goalDescription": description.value,
        "targetCompletionDate": completionDate.value,
        "milestoneDate": milestoneDate.value,
        "milestoneTitle": milestoneTitle.value}
    let ind = 0;

    if (type.value == 'Educational') {
        ind = 1;
    }
    else if (type.value == 'Occupational') {
        ind = 2;
    }
    else if (type.value == 'Hobbies') {
        ind = 3;
    }
    else if (type.value == 'Social') {
        ind = 4;
    }

    goals[ind].push(newGoal);

    return goals;
}