let currentUser =  localStorage.getItem('username');

async function onInit() {
    const usernameEl = document.querySelector('h8');
    usernameEl.textContent = `Welcome ${currentUser}!`;

    let allGoals = [];
    // let allGoals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};

    try {
        const response = await fetch('/api/goals');
        allGoals = await response.json();
        localStorage.setItem('goals', JSON.stringify(allGoals));
    }
    catch {
        if (localStorage.getItem('goals')) {
            allGoals = localStorage.getItem('goals');
            allGoals = JSON.parse(allGoals);
        }
    }
    
    for (let i = 0; i < allGoals.length; i++) {
        newGoal = allGoals.at(i);
        const goalType = newGoal.goalType;
        let id = `${goalType}Goals`
        console.log(id);
        goalOuterContainerEl = document.getElementById(id);
        //Retrieve the info of the new goal
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

async function sendToProgress() {
    const buttonDiv = this;
    const innerContainer = buttonDiv.parentElement;
    const outerContainer = innerContainer.parentElement;
    const accordianId = outerContainer.id;
    const goalType = accordianId.replace(/Goals$/, '')
    const strong = innerContainer.children[0];
    const goalTitle = strong.textContent;

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
    
    for (let i = 0; i < allGoals.length; i++) {
        if (allGoals.at(i).goalTitle === goalTitle) {
            localStorage.setItem('progressingType', goalType);
            localStorage.setItem('progressingTitle', goalTitle);
            localStorage.setItem('milestoneTitle', allGoals.at(i).milestoneTitle);
            localStorage.setItem('milestoneDate', allGoals.at(i).milestoneDate);
        }
    }
    window.location.href = "progress.html";
}

function sendToSharedGoals() {
    window.location.href = "sharegoals.html";
}

onInit();

function updateNotification(sharingUser) {
    const outerNotification = document.getElementById('outer-notification');
    const actualNotification = document.createElement('button');
    actualNotification.classList.add('notification-inner');
    actualNotification.addEventListener('click', sendToSharedGoals);
    actualNotification.setAttribute('id', 'notification-inner');
    actualNotification.innerHTML = `${sharingUser} has shared a goal with you!`

    outerNotification.appendChild(actualNotification);
    setTimeout(() => {
        outerNotification.innerHTML = ''; 
    }, 8000);
}

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

function logout() {
    localStorage.removeItem("username");
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}}://${window.location.host}/ws`, {
        headers: {
            username: currentUser,
        }
    });
    socket.onopen = (event) => {
        console.log('WebSocket connection sucessfully established');
    }
    socket.onclose = (event) => {
        console.log('WebSocket connection terminated');
    }
    socket.onmessage = async (event) => {
        const socketInfo = JSON.parse(await event.data.text());
        updateNotification(socketInfo.from);
    }
}

function broadcastEvent(from, users) {
    const event = {
        from: from,
        shareWith: users,
    }
    socket.send(JSON.stringify(event));
}

//When the client is brought to their main goals page, go ahead and establish the webSocket connection
configureWebSocket();