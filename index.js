const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
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
app.use(cookieParser());

//just like simon, serve up front-end static content from public directory
app.use(express.static('public'));

//Trust ip addresses from proxy - this way we can use ip addresses without req.ip
app.set('trust proxy', true);

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
        const user = await DB.createUser(req.body.username, req.body.password);

        //Set the cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        })
    }
});

//Get autherization token for an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.status(204).end();
            return;
        }
        //if the compare fails, the password was wrong
        res.status(401).send({ msg: 'Incorrect password'});
        return;
    }
    //if the user doesn't exist, notify the client
    res.status(401).send({ msg: 'User does not exist. Did you mean to create a new account?' });
})

//Delete Autherization token if stored in cookie
apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
})

//secureApiRouter for verifying credentials for endpoints
let secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    }
    else {
        res.status(401).send({ msg: 'You are unauthorized to perform this action'})
    }
})

//Get Goals
secureApiRouter.get(`/goals`, async (req, res) => {
    authToken = req.cookies[authCookieName];
    const userDoc = await DB.getUserByToken(authToken);
    const personalGoals = await DB.getPersonalGoals(userDoc.username);
    res.send(personalGoals);
})

//Submit New Goals
secureApiRouter.post(`/goals`, async (req, res) => {
    //Make sure the body includes the username
    const newGoal = {...req.body, sharingWith: []};
    await DB.addGoal(newGoal);
    const personalGoals = await DB.getPersonalGoals();
    res.send(personalGoals);
})

//Report progress on a goal
secureApiRouter.put(`/progress`, async (req, res) => {
    console.log(req.body);
    user = req.body.username;
    progressingTitle = req.body.progressingTitle;
    updateStatus = req.body.status;
    await DB.updateProgress(user, progressingTitle, updateStatus);
    const personalGoals = await DB.getPersonalGoals();
    res.send(personalGoals);
})

//Get Goals Shared With You By Other People
secureApiRouter.get(`/shared`, async (req, res) => {
    authToken = req.cookies[authCookieName];
    const userDoc = await DB.getUserByToken(authToken);
    const sharedWithClient = await DB.getSharedWithClient(userDoc.username);
    res.send(sharedWithClient);
})

//Get Goals Shared by You
secureApiRouter.get(`/share`, async (req, res) => {
    authToken = req.cookies[authCookieName];
    const userDoc = await DB.getUserByToken(authToken);
    const sharedByClient = await DB.getSharedByClient(userDoc.username);
    res.send(sharedByClient);
})

//Share a Goal
secureApiRouter.put(`/share`, async (req, res) => {
    currentUser = req.body.username;
    goalTitle = req.body.goalTitle;
    //users will be a string, not a list
    users = req.body.users;
    await DB.shareGoal(currentUser, goalTitle, users);
    res.status(204).end();
})

//Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});