# __KES Notices__

KES Notices is a Full Stack Web App for displaying notices from kesshroffcollege.com/enotice with different filters for getting the desired notices rather than scrolling through the list.

> API is created using express and node and has a single route that fetches all the notices from the database 

## Prerequisites

### Database
mongoDB [Community Edition](https://www.mongodb.com/download-center/community/).


## Getting Started

You would need to change directory to the downloaded master folder
```
$ cd kesnotices-master
```

Install the mongoose and puppeteer 
```
$ npm i mongoose puppeteer
```

Run the *scrape.js*
```
$ node scrape.js
```

Stop the script using CTRL + C once you get the following message
```
[x] Press CTRL + C to stop now!
```

Now change the directory to backend 
```
$ cd backend
```

Install the dependencies for server
```
$ npm i body-parser cors express mongoose
```


Run the *server.js* file
```
$ node server.js
```

Once the server is started you will get the following message
```
Connected to Port 5000
@api-route : http://localhost:5000/api/notices
Connected to DB!
```

Now go back to the main directory (kesnotices-master)
```
$ cd ..
```

Now change the directory to frontend and run the *index.js* file
```
$ cd frontend && index.html
```

## Working
1. ./scrape.js 
    - uses puppeteer to scrape all the notices from [KES Colleges enotices page](http://kesshroffcollege.com/enotices/)
    - creates a json and saves in the current directory
    - saves the document in the mongoDB 
      - Database name: notices
      - Collection name : notices

2. ./backend/server.js
    - initalizes express app
    - connects to the local mongoDB _mongodb://localhost:127.0.0.1/notices_
    - creates a route for the API to fetch notices _@route /api/notices_
    - runs the server on localhost : port 5000

3. ./frontend/main.js
    - fetchs the data from the API and stores into an array
    - initially creates all notices div and adds to the _./frontend/index.html_
    - create multiple arrays based on filter attributes of the notices
    - displays the notices dynamically based on the buttons provided on the HTML page

## Built With

* [Express JS](https://expressjs.com/) - The web application framework used
* [Node JS](https://nodejs.org/) - For server side scripting
* [Figma](https://www.figma.com/downloads/) - Prototyping tool for designing the frontend
* [KES Shroff College e-notices Page](http://kesshroffcollege.com/enotices/) - Used to get the notices

## Authors

* **miri** : Student as KES College [github.com/miri-san-so](https://github.com/miri-san-so)

## Inspiration
* Going through list of all the notices makes a burden for me and my friends so this can help in filtering the notices we need.
* Give a better UI

# Thankyou for Visiting!
