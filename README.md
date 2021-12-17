# BusBooking

This is the front-end web application an online bus seat booking platform. The main users of the system are passengers, bus owners, and conductors. Passengers can reserve seats using by registering/logging in, and then doing payments using Paypal. Bus owners can regiter their buses on our app and add turns/routes so that pasengers can reserve seats accordingly.

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

npm install

npm start
```


## Data fields 

Each document in the dataset consists of 12 fields and 4 of them are text fields (name, bio, years, and best_figures are text fields).

1. name – Player Name
2. bio – A description about the player (This includes information like player type, play style, records, debut, education etc.)
3. years – Career Duration of the Player (ex: 1996 – 2010)
4. matches – Number of matches played
5. runs_scored – Total runs scored as a batsman
6. highest_score – Highest score in an innings as a batsman
7. bat_avg – Batting Average
8. wickets – Wickets taken as a bowler
9. runs_conceded – Runs Conceded as a bowler
10. best_figures – Best figures obtained as a bowler in an innings
11. ball_avg – Bowling average
12. catches_taken – Catches taken as a fielder

## Web Scraping

The corpus for the IR system was created using Web Scraping. “Beautiful Soup” python package was used in Web Scraping. Wikipedia, online encyclopedia was scraped to obtain data. First, https://en.wikipedia.org/wiki/List_of_Sri_Lanka_ODI_cricketers webpage was scraped to get player names and their stats using a python program. After obtaining names of all the ODI players from this page, the player names were used to construct the URLs of individual wiki pages of all these players and these pages were also scraped to obtain further descriptions about the players using the same python program. Then, the data was saved in .json format in the disk and later translated to Sinhala using simpleen.io (uses DeepL translation API internally) Then, the data was encoded using Unicode as well.

## Indexing and Handling Queries

The IR system was developed using ElasticSearch (elasticsearch python library was used). The web application to aid the IR system was developed using Flask, python web framework. Standard indexing methods, default mappings (were checked after indexing to see whether suitable) and standard analyzer provided by ElasticSearch were used in creating the IR system. The querying is done using multi-match queries and Boolean queries with best fields.


