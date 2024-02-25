function getGoalInfo() {
    const titleEl = document.querySelector("#goalTitle");
    const typeEl = document.querySelector("#goalType");
    const descriptionEl = document.querySelector("#goalDescription");
    const completionDateEl = document.querySelector("#targetCompletionDate");
    const milestoneDateEl = document.querySelector("#milestoneDate");
    const milestoneTitleEl = document.querySelector("#milestoneTitle");
    return [typeEl, titleEl, descriptionEl, completionDateEl, milestoneDateEl, milestoneTitleEl]
}

function saveGoal() {
    let goals = [[],[],[],[],[]];
    const goalsText = localStorage.getItem('goals');
    if (goalsText) {
        goals = JSON.parse(goalsText);
    }

    goalAttributes = getGoalInfo;
    goals = this.updateGoals(goalAttributes);

    localStorage.setItem('goals', JSON.stringify(goals));
    
    window.location.href = "goals.html";
}

function updateGoals(goalData) {
    const newGoal = {"goalTitle": goalData[1].value, 
        "goalDescription": goalData[2].value,
        "targetCompletionDate": goalAttributes[3].value,
        "milestoneDate": goalAttributes[4].value,
        "milestoneTitle": goalAttributes[5].value}
    let ind = 0;

    if (goalData[0].value == 'Educational') {
        ind = 1;
    }
    else if (goalData[0].value == 'Occupational') {
        ind = 2;
    }
    else if (goalData[0].value == 'Hobbies') {
        ind = 3;
    }
    else if (goalData[0].value == 'Social') {
        ind = 4;
    }

    goals[ind].push(newGoal);

    return goals;
}