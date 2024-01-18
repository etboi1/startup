# Chess is Fun!
# Specification Deliverable
### Elevator Pitch

Have you ever been on a road trip or waiting in line with a buddy and the conversation stalls? Then you awkwardly each go on your phones to check social media or otherwise waste time. Instead, you could spend your time interacting with your friend and playing a game that grows your mind! The "Chess is Fun!" app makes it so that two people can pull out their phones and play chess together without the need for a physical board.

### Design
### Key Features
- Secure login over HTTPS
- Display of total number of wins of each user to all users
- Play chess on a digital chess board
- Number of wins stored
### Technologies
- HTML - uses correct HTML structure for application. Two, maybe three HTML pages. At least one will be for login, and another will be for displaying total wins of each user. HTML may also be necessary for the Chess board page.
- CSS - style application so that it looks good, and also design the chess board and pieces using css
- JavaScript - provides login, display other users total number of wins
- Service - Backend servie with endpoints for:
    - login
    - moving pieces
    - retrieving and storing number of wins
- DB/Login - stores users and their number of wins in database. Credentials stored in database. People can't play chess if they aren't authenticated.
- WebSocket - when games are played, the total number of wins for each user is updated and this information is broadcast to all other users
- React - application uses the React web framework
<!-- ## HTML Deliverable
## CSS Deliverable
## JavaScript Deliverable
## Service Deliverable
## DB/Login Deliverable
## WebSocket Deliverable
## React Deliverable -->