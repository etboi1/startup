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

- **HTML Pages** - 6 HTML pages representing the follwing functionalities:
    1. Login (index.html)
    2. See and monitor personal goals (goals.html)
    3. Create a new goal (newgoal.html)
    4. Update progress on personal goals (progress.html)
    5. See and monitor shared goals (sharegoals.html)
    6. Share goals with selected users (sendgoals.html)
- **Links** - The login page automatically links to the personal goals page. The personal and shared goals page contain links to other pages. The create goals, update goals, and send goals page automatically return to the correct page after submission
- **Text** - Goals on the personal and shared pages are represented by textual description. Possible progress updates on certain goals are also represented by textual description.
- **3rd Party Service** - The inspirational quote from Michael Scott is my placeholder for a 3rd party service call. I will have a new inspirational quote daily.
- **Images** - Inspirational quote image from Dwayne "The Rock" Johnson because everybody needs inspiration to acheive their goals.
- **Login** - Input box and submit button for login on home page.
- **Database** - The personal goals will be stored in a database, along with the progress reported. The data shown on the personal goals page will be pulled from this database. When new goals are created or progress is logged on "newgoal.html" and "progress.html", the info entered into the input boxes/select boxes will be stored in the database. The personal goals page will then be populated with that data. 
- **WebSocket** - Goals shared from other people, as well as goals shared to other people. This includes live updates on progress as it is reported.

## CSS Deliverable
For this deliverable I properly styled the application into its final appearance.

- **Header, footer and main content body on most pages** - the pages for creating goals and sharing them are intended to be more like pop-ups, so there are no footers on those. 
- **Navigation elements** - I dropped text-decorations (underlines) and changed colors for all anchor elements. I also changed the background and text colors when you hover over all anchor elements. Obviously, there was also a lot of other from-scratch css I wrote to style the navbar appropriately in a flexbox.
- **Responsive to window resizing** - my app looks appropriate on all window sizes and devices. There is some break-down as the window size gets really small, but I figured it was good enough.
- **Application elements** - I tried to keep a good-looking and consistent color scheme. Used good contrast and whitespace (or just negative space on pages that aren't white, such as the login page). I used a wide variety of elements including:
    - Accordions: incorporated using the Bootstrap CSS Framework on the personal and shared goals pages
    - Buttons: used from-scratch css to make good-looking buttons that changed background and border color upon hovering over them
    - Inputs: including textareas, selects, etc. I resized these, changed the colors and the response when a user selects one
- **Application text content** - Consistent fonts as the same font family is used across all pages. Purposely did not use a font with serifs because it looked old and  ghetto.
- **Application images** - The image on the front page is responsive to window resizing. I also added a border around it.

## JavaScript Deliverable
For this deliverable I implemented my JavaScript so that the logic for all interactions with the primary user work. In addition, I added placeholders for future technologies.

- **Login** - When you press the login button, it takes you to the personal goals page through the use of javascript. In addition, the username and password info is stored in local storage. Later, it will be stored in a database
- **Database** - A lot of data needs to be saved for this application. This includes creating new personal goals and storing them, sharing goals and storing which goals are shared, and updating progress to a goal. I utilized JSON objects stored in local storage as a placeholder for the eventual database. I also saved the username and password in a variable in local storage. For the section displaying goals shared by other users, I pulled the info from a placeholder object that will be similar to the eventual database. Becuase that info will be shared by other users, it cannot be directly edited by the primary user
- **WebSocket** - When another user shares a goal with the current user, they will be notified via WebSocket. This is simulated by use of a setInterval and setTimeout function. Every 20 seconds, a notification is displayed saying that a user (taken from a fake list of users for the time being) has shared a goal with you. The notification remains for 10 seconds and then dissappears. If you click on the notification, it takes you to the shared goals page.
- **Application Logic** - Most of the application logic is centered around the databases and displaying information from the databases. The newgoal.html, sendgoals.html, and progress.html pages correctly store the entered information into local storage, and then upon initialization, that information is retrieved and correctly displayed in the accordions on the goals.html and sharegoals.html pages. In addition, Bootstrap JavaScript was used to construct the accordions
    - IMPORTANT INFO!
        - Upon initially entering the website, there will be NO (or not much) info on any of the pages except for "shared with you" section of the Shared page. This is because there is nothing in local storage. It is for the primary user (you, the grader) to make goals and share them
        - click add goal and enter the necessary info to create a goal
        - click share goal on the "shared" page to share a new goal

## Service Deliverable
- **Node.js/Express HTTP service** - it has been done my lord
- **Static middleware for frontend** - used express middleware to serve up frontend
- **Calls to third party endpoints** - called a third party endpoint for serving up an inspirational quote on the main goal page
- **Backend service endpoints** - endpoints for storing and retrieving personal and shared goals
    - Unfortunately, I forgot one endpoint - that is the progress endpoint. I got part of it working, but not all of it. For now, just don't click on the report progress button. I will fix that later. I hope that's not too many points off, as the rest of it is all working
- **Frontend calls service endpoints** - I did this using fetch
<!-- ## DB/Login Deliverable
## WebSocket Deliverable
## React Deliverable -->