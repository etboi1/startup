async function onInit() {
    let currentUser = ''
    try {
        const response = await fetch(`/api/user`);
        const username = await response.text();
        currentUser = username;
    }
    catch {
        currentUser = localStorage.getItem('currentUser');
    }
    const usernameEl = document.querySelector('h8');
    usernameEl.textContent = `Welcome ${currentUser}!`;

    let allGoals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};

    try {
        const response = await fetch('/api/goals');
        allGoals = await response.json();
    }
    catch {
        if (localStorage.getItem('goals')) {
            allGoals = localStorage.getItem('goals');
            allGoals = JSON.parse(allGoals);
        }
    }
    
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

function sendToProgress() {
    const buttonDiv = this;
    const innerContainer = buttonDiv.parentElement;
    const outerContainer = innerContainer.parentElement;
    const accordianId = outerContainer.id;
    const goalType = accordianId.replace(/Goals$/, '')
    const strong = innerContainer.children[0];
    const goalTitle = strong.textContent;

    allGoals = localStorage.getItem('goals');
    allGoals = JSON.parse(allGoals);
    for ([type, goals] of Object.entries(allGoals)) {
        if (type === goalType) {
            for (let i = 0; i < goals.length; i++) {
                if (goals[i].goalTitle === goalTitle) {
                    localStorage.setItem('progressingType', goalType);
                    localStorage.setItem('progressingTitle', goalTitle);
                    localStorage.setItem('milestoneTitle', goals[i].milestoneTitle);
                    localStorage.setItem('milestoneDate', goals[i].milestoneDate);
                }
            }
        }
    }
    window.location.href = "progress.html";
}

function sendToSharedGoals() {
    window.location.href = "sharegoals.html";
}

onInit();

usernames = ['john17', 'alma34', 'jmbohee29', '2nephi2', '3nephi11', 'thefununcle1', 'goalreacher'];

function updateNotification() {
    const outerNotification = document.getElementById('outer-notification');
    const i = Math.floor(Math.random() * usernames.length);
    const actualNotification = document.createElement('button');
    actualNotification.classList.add('notification-inner');
    actualNotification.addEventListener('click', sendToSharedGoals);
    actualNotification.setAttribute('id', 'notification-inner');
    actualNotification.innerHTML = `${usernames[i]} has shared a goal with you!`

    outerNotification.appendChild(actualNotification);
    setTimeout(() => {
        outerNotification.innerHTML = ''; 
    }, 5000);
}

setInterval(function() {updateNotification()}, 15000)

async function thirdPartyCall() {
    response = await fetch("https://type.fit/api/quotes");
    quotes = await response.json();
    //get quote
    let index = Math.floor(Math.random() * quotes.length);
    quoteAndAuthor = quotes.at(index);
    return quoteAndAuthor;
}

//To demonstrate that this works, a different quote will be requested on init every time, later I will change it to only request a new quote once a day
async function inspirationOnInit() {
    quoteAuthor = await thirdPartyCall();
    author = quoteAuthor.author.split(',')[0];
    quoteEl = document.getElementById('inspirationalQuote');
    quoteEl.textContent = `${quoteAuthor.text} - ${author}`;
}

inspirationOnInit();