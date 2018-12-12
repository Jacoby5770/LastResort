# Last Resort

## Setup

### Languages and Tools Used

* JavaScript

* Python

* Scrapy

* PostgreSQL

* Visual Studio as my IDE

* macOS High Sierra 10.13.6

### Instructions

1) Clone the repo and cd into the project directory

2) Start a local PostgreSQL server

3) Seed the database with `npm run seed`

4) Run the node server `npm run start-dev`

5) Go to http://localhost:8080

6) Enter your Brightspace credentials


### Optional Setup for Scraper 

1) If the AWS EC2 instance with the backend is not running on http://3.17.41.214/, then you can setup an EC2 instance of Ubuntu to run the scraper

2) In security groups, edit inbound rules and set a rule for port 80 for HTTP connections. You can also open port 8050 for TCP connections to verify Splash is running later.

3) Install pip3 for python3 on the EC2 instance, then `pip install scrapy scrapy-splash flask`

4) From the local repo of the project, transfer the GradeScraper folder and scrapy.cfg file into the EC2 instance

5) cd into the GradeScraper folder and run `sudo python3 app.py` to start the flask server, note the IP of the server

6) In your local repo, go to client/components/AddBrightspace.js and edit the IP of the url of the GET request to be the IP of your server

7) Now you can enter Brightspace credentials to the web app without our server running
