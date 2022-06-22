<div id="top"></div>


<!-- ABOUT THE PROJECT -->
# Friender - Find a friend now!
![image](/public/Screen%20Shot%202022-06-22%20at%201.08.38%20PM.png)
## Frontend: JavaScript - React
## Backend: Python - Flask - Postgres

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Python](https://docs.python.org/3/)
* [React](https://reactjs.org/docs/getting-started.html)
* [Flask](https://flask.palletsprojects.com/en/2.1.x/)
* [Flask-SQLALchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [Postgres](https://www.postgresql.org/docs/current/app-psql.html)


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Friender is a full stack application that allows users to find a potential friend. Users will have the ability to match with each other and send private messages (work in progress).


### Installation

After downloading the code from GitHub:

    $ npm install

To start the React component of the application:

    $ npm start

To start the backend server:

    $ npm run start-api


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Routes -->
## Routes
- /users/:username
- /users/:username/friends
- /users/:username/findfriends
- /users/:username/chat

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Features -->
## Features
### AWS S3
- Images saved to Amazon S3 bucket and the URLs generated are saved in the database
### useEffect and useContext
- useEffect to obtain user's login information and useContext to share it across components for authentication


<!-- ROADMAP -->
## Roadmap

Ideas for improving the current setup

- Creating a chat feature between users using SocketIO (in progress)



# Made by Austin Chao
*Pair programmed with [Melanie Wong](https://github.com/melawong)*

<p align="right">(<a href="#top">back to top</a>)</p>

