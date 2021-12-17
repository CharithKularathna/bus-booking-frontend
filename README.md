# BusBooking

This is the front-end web application of an online bus seat booking platform. The main users of the system are passengers, bus owners, and conductors. Passengers can reserve seats using by registering/logging in, and then doing payments using Paypal. Bus owners can register their buses on our app and add turns/routes so that passengers can reserve seats accordingly.

🌎 [https://www.busbooking-frontend.web.app/](https://www.busbooking-frontend.web.app/)

## Technologies Used

<p align="left"> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> 
    <a href="" target="_blank"> <img src="https://img.icons8.com/ultraviolet/48/000000/react--v2.png"/> </a>
    <a href="https://redux.js.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/redux.png"/> </a>
    <a href="https://www.w3.org/html/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/html-5.png"/> </a> 
    <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://img.icons8.com/color/48/000000/css3.png"/> </a> 
    <a href="https://getbootstrap.com" target="_blank"> <img src="https://img.icons8.com/color/48/000000/bootstrap.png"/> </a>
    <a href="" target="_blank"> <img src="https://img.icons8.com/color/48/000000/material-ui.png"/> </a>
    <a style="padding-right:8px;" href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a>
    <a style="padding-right:8px;" href="" target="_blank"> <img src="https://img.icons8.com/color/48/000000/google-firebase-console.png"/> </a>
</p>

## Folder Stucture

The important files and directories of the repository is shown below

    ├── data : all player data data scraped from the [website](http://en.wikipedia.org/)                    
        ├── sin : contains all sinhala translated and unicode converted .json documents
        └── 01.json - 202.json : all player data scraped from [website](http://en.wikipedia.org/) in English
    ├── templates : contains index.html which is the main webpage of the system.
    ├── Scraping : contains the python script used to scrape data from [website](http://en.wikipedia.org/) in English                 
        └── web-scrape.py : python script used to scrape data
    ├── app.py : Backend of the web application developed using Flask framework
    ├── makeIndex.py : Script to create the index on elasticsearch cluster
    ├── search.py : Query/Search functions and other support functions
    ├── sample_queries.txt :  Sample queries          


### Launching the Web Appication Locally

```commandline
git clone https://github.com/CharithKularathna/bus-booking-frontend

cd transport-booking-system-client

npm install

npm start
```


## Sample Images and Screenshots 

![Home](https://user-images.githubusercontent.com/47145853/146514209-9c4e45f7-8e39-4e34-bdec-54dfa1ae5a9e.png)
![Sign in](https://user-images.githubusercontent.com/47145853/146513996-8e04181a-d46c-4836-93aa-83584496be07.png)



