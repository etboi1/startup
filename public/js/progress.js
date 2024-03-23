async function updateProgress() {
    // gather items from local storage
    const currentUser = localStorage.getItem('username');
    const progressingTitle = localStorage.getItem('progressingTitle');

    //get the input box from the page
    const inputBox = document.getElementById('status');

    //Data for the update
    const updateData = {"username": currentUser, "progressingTitle": progressingTitle, "status": inputBox.options[inputBox.selectedIndex].value};

    try {
        const response = await fetch('api/progress', {
            method: 'PUT',
            header: {'content-type': 'application/json'},
            body: JSON.stringify(updateData),
        })
        const updatedGoals = response.json();
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
    }
    catch{
        // const goals = this.reportProgressLocal(updateData);
        // localStorage.setItem('goals', JSON.stringify(goals));
        console.error('Error: unable to connect update progress at this time')
    }
    
    // find the matching goal type, then the matching goal title, then save the satus in the status key of the goal

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

// function reportProgressLocal(dataForUpdate) {
//     let allGoals = localStorage.getItem('goals');
//     allGoals = JSON.parse(allGoals);
//     const progressingType = updateData.progressingType;
//     const progressingTitle = updateData.progressingTitle;
//     const status = updateData.status;
//     for ([goalType, goals] of Object.entries(allGoals)) {
//         if (goalType === progressingType) {
//             for (let i =0; i < goals.length; i++) {
//                 if (goals[i].goalTitle === progressingTitle) {
//                     goals[i].status = status;
//                 }
//             }
//         }
//     } 
// }

onProgressInit()