function shareGoal() {
    let sharedGoals = [];
    const sharedGoalsText = localStorage.getItem('sharedGoals');
    if (sharedGoalsText) {
        sharedGoals = JSON.parse(sharedGoalsText);
    }

    const goalTitleEl = document.getElementById("goalname");
    const usersEl = document.getElementById("users");

    sharedGoals = this.updateSharedGoals(goalTitleEl, usersEl, sharedGoals);

    localStorage.setItem('sharedGoals', JSON.stringify(sharedGoals));
   
    window.location.href = "sharegoals.html";
}

function updateSharedGoals(goalTitle, users, existingSharedGoals) {
    const newShare = {"goalTitle": goalTitle.value, "users": users.value}

    existingSharedGoals.push(newShare);

    return existingSharedGoals;
}