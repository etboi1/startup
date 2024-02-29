function updateProgress() {
    // gather items from local storage
    let allGoals = localStorage.getItem('goals');
    allGoals = JSON.parse(allGoals);
    const progressingType = localStorage.getItem('progressingType');
    const progressingTitle = localStorage.getItem('progressingTitle');

    //get the input box from the page
    const inputBox = document.getElementById('status');
    
    // find the matching goal type, then the matching goal title, then save the satus in the status key of the goal
    for ([goalType, goals] of Object.entries(allGoals)) {
        if (goalType === progressingType) {
            for (let i =0; i < goals.length; i++) {
                if (goals[i].goalTitle === progressingTitle) {
                    goals[i].status = inputBox.options[inputBox.selectedIndex].value;
                }
            }
        }
    } 

    localStorage.setItem('goals', JSON.stringify(allGoals));

    window.location.href = "goals.html";
}

function onProgressInit() {
    const milestoneTitle = localStorage.getItem('milestoneTitle');
    const milestoneDate = localStorage.getItem('milestoneDate');

    const mainEl = document.querySelector('main');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = `Your target completion date for the milestone "${milestoneTitle}" is ${milestoneDate}. Report status below:`;
    mainEl.insertBefore(newParagraph, mainEl.firstChild);
}

onProgressInit()