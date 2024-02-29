function updateProgress() {
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