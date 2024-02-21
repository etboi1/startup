function addGoal() {
    const titleEl = document.querySelector("#goalTitle");
    localStorage.setItem("goalTitle", titleEl.value);
    const typeEl = document.querySelector("#goalType");
    localStorage.setItem("goalTitle", typeEl.value);
    const descriptionEl = document.querySelector("#goalDescription");
    localStorage.setItem("goalDescription", descriptionEl.value);
    const completionDateEl = document.querySelector("#targetCompletionDate");
    localStorage.setItem("targetCompletionDate", completionDateEl.value);
    const milestoneDateEl = document.querySelector("#milestoneDate");
    localStorage.setItem("milestoneDate", milestoneDateEl.value);
    const milestoneTitleEl = document.querySelector("#milestoneTitle");
    localStorage.setItem("milestoneTitle", milestoneDateEl.value);
    window.location.href = "goals.html";
}