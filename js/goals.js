function onInit() {
    let allGoals = localStorage.getItem('goals');
    allGoals = JSON.parse(allGoals);
    for ([goalType, specificGoals] of Object.entries(allGoals)) {
        let id = `${goalType}Goals`
        console.log(id);
        goalOuterContainerEl = document.getElementById(id);
        if (goalOuterContainerEl.children.length < allGoals[goalType].length) {
            //Retrieve the info of the new goal
            let newGoal = allGoals[goalType][allGoals[goalType].length - 1];
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

            // actually add them to the correct parent elements
            goalOuterContainerEl.appendChild(firstChild);
            firstChild.appendChild(secondChild1);
            firstChild.appendChild(secondChild2);
            firstChild.appendChild(secondChild3);
        }
    }
    // for (let i = 0; i < goals.length - 1; i++) {
    //     let goalType = key[i];
    //     if (goals[i].length > 0) {
    //         let newGoal = goals[i][goals[i].length - 1];
    //         let goalTitle = newGoal.goalTitle;
    //         let dueDate = newGoal.targetCompletionDate;
    //         let milestoneDate = newGoal.milestoneDate;
    //         let milestoneTitle = newGoal.milestoneTitle;

    //         goalOuterContainerEl = document.getElementById(`#${goalType}Goals`);
    //         if (goalOuterContainerEl.getChildCount() < goals.at(i).length()) {
    //             // initialize all the new HTML elements
    //             let firstChild = document.createElement('div');
    //             firstChild.classList.add("inner-container");
    //             let secondChild1 = document.createElement('strong');
    //             secondChild1.innerHTML = `${goalTitle}`;
    //             let secondChild2 = document.createElement('span');
    //             secondChild2.innerHTML = 'Due Date - ' + `${dueDate}`;
    //             let secondChild3 = document.createElement('span');
    //             secondChild3.innerHTML = `${milestoneTitle}` + ' - ' `${milestoneDate}`;

    //             // actually add them to the correct parent elements
    //             goalOuterContainerEl.appendChild(firstChild);
    //             firstChild.appendChild(secondChild1);
    //             firstChild.appendChild(secondChild2);
    //             firstChild.appendChild(secondChild3);
    //         }
    //     }
    // }
}

onInit()