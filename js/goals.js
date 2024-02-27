function onInit() {
    if (localStorage.getItem('goals')) {
        let allGoals = localStorage.getItem('goals');
        allGoals = JSON.parse(allGoals);
        for ([goalType, specificGoals] of Object.entries(allGoals)) {
            let id = `${goalType}Goals`
            console.log(id);
            goalOuterContainerEl = document.getElementById(id);
            if (goalOuterContainerEl.children.length < allGoals[goalType].length) {
                for (let i = 0; i < allGoals[goalType].length; i++) {
                    //Retrieve the info of the new goal
                    let newGoal = allGoals[goalType][i];
                    let goalTitle = newGoal.goalTitle;
                    let dueDate = newGoal.targetCompletionDate;
                    let milestoneDate = newGoal.milestoneDate;
                    let milestoneTitle = newGoal.milestoneTitle;

                    // initialize all the new HTML elements
                    let firstChild = document.createElement('div');
                    firstChild.classList.add("inner-container");
                    let secondChild1 = document.createElement('strong');
                    secondChild1.innerHTML = `${goalTitle}`;
                    let secondChild2 = document.createElement('span');
                    secondChild2.innerHTML = `Due Date - ${dueDate}`;
                    let secondChild3 = document.createElement('span');
                    secondChild3.innerHTML = `${milestoneTitle} - ${milestoneDate}`;
                    let secondChild4 = document.createElement('div');
                    secondChild4.addEventListener('click', sendToProgress);
                    let thirdChild = document.createElement('button');
                    thirdChild.classList.add("button");
                    thirdChild.type = "submit";
                    thirdChild.innerHTML = 'Report Progress'

                    // actually add them to the correct parent elements
                    goalOuterContainerEl.appendChild(firstChild);
                    firstChild.appendChild(secondChild1);
                    firstChild.appendChild(secondChild2);
                    firstChild.appendChild(secondChild3);
                    firstChild.appendChild(secondChild4);
                    secondChild4.appendChild(thirdChild);
                }
            }
        }
    }
}

function sendToProgress() {
    window.location.href = "progress.html";
}

function sendToSharedGoals() {
    window.location.href = "sharegoals.html";
}

onInit();