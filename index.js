const express = require('express');
const app = express();

//sets default service port to 3000 unless another one is provided
const port = process.argv.length > 2 ? process.argv[2] : 3000;

//include the JSON body parsing middleware - goal data is passed in using JSON
app.use(express.json());

//just like simon, serve up front-end static content from public directory
app.use(express.static('public'));

//I'm gonna use apiRouter for service endpoints, just like simon
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Get currentUser
apiRouter.get(`/user`, (req, res) => {
    res.send(currentUser);
})

//save usernames
apiRouter.post(`/user`, (req, res) => {
    currentUser = req.body.at(0);
    currentPassword = req.body.at(1);
    allUsers = addUser(currentUser, currentPassword, loginInfo, allGoals);
    res.send({'currentUser': `${currentUser}`});
})

//Get Goals
apiRouter.get(`/goals`, (req, res) => {
    res.send(allGoals[currentUser].personalGoals);
});

//Submit New Goals
apiRouter.post(`/goals`, (req, res) => {
    personalGoals = updateGoals(req.body);
    res.send(personalGoals);
});

//Get Goals Shared With You By Other People
apiRouter.get(`/shared`, (req, res) => {
    res.send(sharedWithMe);
})

//Get Goals Shared by You
apiRouter.get(`/sharing`, (req, res) => {
    res.send(sharedGoals);
});

//Share New Goal
apiRouter.post(`/share`, (req, res) => {
    sharedGoals = updateSharedGoals(req.body, sharedGoals);
    res.send(sharedGoals);
})

//send index.html as the default file
app.use((req, res) => {
    res.sendFile('index.html', {root: 'public'});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

//The Goals of all the Users
let allGoals = {};

//Function for adding the current user to the list of users
let loginInfo = {}
let currentUser = '';
function addUser(username, password, userPassList, allUserGoals) {
    if (!(username in userPassList)) {
        userPassList[username] = password;
    }
    currentUser = username;
    if (!(currentUser in allGoals)) {
        allUserGoals[currentUser] = {'personalGoals': {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]}, 'sharedGoals': []}
    }
    return userPassList;
}

//Function for adding a new goal
function updateGoals(newData) {
    goals = allGoals[currentUser].personalGoals
    //add the new goal
    goalType = newData.at(0);
    newGoal = newData.at(1);
    goals[goalType].push(newGoal);
    //return the newly updated personal goals object
    return goals;
}

//Function for adding sharing a new goal
let sharedGoals = []
function updateSharedGoals(newShare, goalsCurrentlySharing) {
    goalsCurrentlySharing.push(newShare);
    
    return goalsCurrentlySharing;
}