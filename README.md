# REACH!
## Specification Deliverable
### Elevator Pitch

We all have goals. Some are small. Some are big. But regardless  of what they are, writing down goals and having somebody keep us accountable to them makes it much more likely to achieve them. "REACH!" lets you do all this in one app. On "REACH!", you can add your own goals, set a time period, and optionally add another user on the app as an accountability buddy. They'll be notified as you log (or fail to log) progress, so they can help you become your best self.

### Design

![Mock](startup_webpage_design.jpg)

### Key Features
- Secure login over HTTPS
- Ability to select categories of goals, including phyiscal, educational, occupational, hobbies, and relationship
- Ability to write and set goals in each category
- Ability for a user to share their goal with another user
- Goals are persistently stored
- Ability to report progress on a goal
### Technologies
- HTML - uses correct HTML structures for application. Three HTML pages. One for login, one for personal goals, and one for goals shared by other users
- CSS - style application so that it looks good. Different colors for different goal categories
- JavaScript - provides login, displaying personal goals, and displaying other users' goals
- Service - Backend servie with endpoints for:
    - login
    - retrieving goals
    - sharing goals with other users
- DB/Login - stores users and goals in database. Credentials securely stored in database. Can't access or create foals without authentication
- WebSocket - When user share their goals, their goal is broadcast to the other chosen user
- React - application uses the React web framework
## HTML Deliverable
For this deliverable, I built the crude structure of my application using HTML.

- HTML Pages - 6 HTML pages representing the follwing functionalities:
    1. Login (index.html)
    2. See and monitor personal goals (goals.html)
    3. Create a new goal (newgoal.html)
    4. Update progress on personal goals (progress.html)
    5. See and monitor shared goals (sharegoals.html)
    6. Share goals with selected users (sendgoals.html)
- Links - The login page automatically links to the personal goals page. The personal and shared goals page contain links to other pages. The create goals, update goals, and send goals page automatically return to the correct page after submission
- Text - Goals on the personal and shared pages are represented by textual description. Possible progress updates on certain goals are also represented by textual description.
- 3rd Party Service - The inspirational quote from Michael Scott is my placeholder for a 3rd party service call. I will have a new inspirational quote daily.
- Images - Inspirational quote image from Dwayne "The Rock" Johnson because everybody needs inspiration to acheive their goals.
- Login - Input box and submit button for login on home page.
- Database - The personal goals will be stored in a database, along with the progress reported. The data shown on the personal goals page will be pulled from this database. When new goals are created or progress is logged on "newgoal.html" and "progress.html", the info entered into the input boxes/select boxes will be stored in the database. The personal goals page will then be populated with that data. 
- WebSocket - Goals shared from other people, as well as goals shared to other people. This includes live updates on progress as it is reported.
<!-- ## CSS Deliverable
## JavaScript Deliverable
## Service Deliverable
## DB/Login Deliverable
## WebSocket Deliverable
## React Deliverable -->