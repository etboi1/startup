const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

// Connect to the database cluster
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const goalCollection = db.collection('goals');

// Test that you can connect to the database
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

//Function for getting the user from the database collection. I called my collection 'user'
function getUser(username) {
  //This syntax is used when the key is the same as the parameter searched for
  return userCollection.findOne({ username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 14);

  const user = {
    username: username,
    password: hashedPassword,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function getPersonalGoals(username) {
  const cursor = goalCollection.find({
    username: username
  });
  return cursor.toArray();
}

function addGoal(newGoal) {
  goalCollection.insertOne(newGoal);
}

async function shareGoal(currentUser, goalTitle, users) {
  usersList = users.split(',');
  try {
    goalToShare = await goalCollection.updateOne(
      {
        $and: [
          { username: currentUser},
          { goalTitle: goalTitle, }    
        ]
      }, 
      { $push: {sharedWith : {$each: usersList, $slice: -usersList.length}}}
    );
  }
  catch {
    console.error("Error updating goal's share list");
  }
}

function getSharedWithClient(currentUser) {
  const cursor = goalCollection.find({ sharingWith: { $in: [currentUser] } });
  return cursor.toArray();
}

function getSharedByClient(currentUser) {
  const cursor = goalCollection.find(
    {
      $and: [
        { username: currentUser},
        { sharingWith: { $exists: true, $ne: [] }}
      ]
    }
  );
  return cursor.toArray();
}

//Don't forget to add the thing to export stuff from this file to other files that need to use it
module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getPersonalGoals,
  addGoal,
  shareGoal,
  getSharedWithClient,
  getSharedByClient
}