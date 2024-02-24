function addInfo() {
    const titleEl = document.querySelector("#goalTitle");
    const typeEl = document.querySelector("#goalType");
    const descriptionEl = document.querySelector("#goalDescription");
    const completionDateEl = document.querySelector("#targetCompletionDate");
    const milestoneDateEl = document.querySelector("#milestoneDate");
    const milestoneTitleEl = document.querySelector("#milestoneTitle");
    localStorage.setItem(typeEl.value, 
        {
            "goalTitle": titleEl.value,
            "goalDescription": descriptionEl.value,
            "targetCompletionDate": completionDateEl.value,
            "milestoneDate": milestoneDateEl.value,
            "milestoneTitle": milestoneTitleEl.value,
        });
    window.location.href = "goals.html";
}
