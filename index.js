const cookieParser = require('cookie-parser');
const bcrypt = require('bcyrpt');
const express = require('express');
const app = express();
const DB = require('./database.js');

//Call the cookie made "token" because we're using it as an authentication token
const authCookieName = 'token';

//sets default service port to 3000 unless another one is provided
const port = process.argv.length > 2 ? process.argv[2] : 3000;

//include the JSON body parsing middleware - goal data is passed in using JSON
app.use(express.json());

//like simon, use cookie parser middleware for tracking authentication tokens
app.use(cookieParser);

//Trust ip addresses from proxy - this way we can use ip addresses without req.ip
app.set('trust proxy', true);

//just like simon, serve up front-end static content from public directory
app.use(express.static('public'));

//I'm gonna use apiRouter for service endpoints, just like simon
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Create Auth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    //Check to see if the username already exists
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({msg: 'Existing user'});
    }
    else {
        const user = await DB.createUser(req.body.email, req.body.password);

        //Set the cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        })
    }
})

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

//Report progress on a goal
apiRouter.post(`/progress`, (req, res) => {
    update = req.body;
    updatedGoals = reportProgress(update);
    res.send(updatedGoals);
})

//Get Goals Shared With You By Other People
apiRouter.get(`/shared`, (req, res) => {
    const sharedWithMe = allGoals[currentUser].sharedGoals;
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

//Function for setting an authorization cookie in the http response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

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
        allUserGoals[currentUser] = {'personalGoals': {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]}, 'sharedGoals': {}}
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

//Function for reporting progress
function reportProgress(updateData) {
    const progressingType = updateData.progressingType;
    const progressingTitle = updateData.progressingTitle;
    const status = updateData.status;
    for ([goalType, goals] of Object.entries(allGoals[currentUser].personalGoals)) {
        if (goalType === progressingType) {
            for (let i =0; i < goals.length; i++) {
                if (goals[i].goalTitle === progressingTitle) {
                    goals[i].status = status;
                    return allGoals;
                }
            }
        }
    } 
}

//Function for adding sharing a new goal
let sharedGoals = []
function updateSharedGoals(newShare, goalsCurrentlySharing) {
    let goalType = newShare.goalType;
    let goalTitle = newShare.goalTitle;

    userShareList = newShare.users.split(',');
    for (let i = 0; i < userShareList.length; i++) {
        let user = userShareList.at(i)
        if (allGoals[user]) {
            if (!(allGoals[user].sharedGoals[currentUser])) {
                allGoals[user].sharedGoals[currentUser] = [];
            }
            for (let i = 0; i < allGoals[currentUser].personalGoals[goalType].length; i++) {
                if (allGoals[currentUser].personalGoals[goalType].at(i).goalTitle === goalTitle) {
                    allGoals[user].sharedGoals[currentUser].push(allGoals[currentUser].personalGoals[goalType][i]);
                }
            }
        }
    }
    goalsCurrentlySharing.push(newShare);
    
    return goalsCurrentlySharing;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});