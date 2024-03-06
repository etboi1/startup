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
app.get(`/goals`, (req, res) => {
    res.send(goals);
})

//Submit New Goals
app.post(`/goals`, (req, res) => {
    goals = updateGoals(req.body, goals);
    res.send(goals);
})

//Get Goals Shared by You
app.get(`/shared`, (req, res) => {
    res.send(sharedGoals);
})

//Get Goals Shared With You By Other People

//Share New Goal

//Function for adding a new goal
let goals = {'Physical':[], 'Educational':[], 'Occupational':[], 'Hobbies':[], 'Social':[]};
function updateGoals(goals, newData) {
    goalType = newData.at(0);
    goals[goalType].push(newGoal);

    return goals;
}

//Function for adding sharing a new goal