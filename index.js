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

//Get Goals
apiRouter.get(`/goals`, (req, res) => {
    res.send(goals);
});

//Submit New Goals
apiRouter.post(`/goals`, (req, res) => {
    goals = updateGoals(req.body, goals);
    res.send(goals);
});

//Get Goals Shared by You
apiRouter.get(`/sharing`, (req, res) => {
    res.send(sharedGoals);
});

//Get Goals Shared With You By Other People
apiRouter.get(`/shared`, (req, res) => {
    res.send(sharedWithMe);
})

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

//Function for adding a new goal
let goals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};
function updateGoals(goals, newData) {
    goalType = newData.at(0);
    goals[goalType].push(newGoal);

    return goals;
}

//Function for adding sharing a new goal
let sharedGoals = [];
function updateSharedGoals(newShare, sharedGoals) {
    sharedGoals.push(newShare);
    
    return sharedGoals;
}