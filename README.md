[![Travis CI logo](TravisCI.png)](https://travis-ci.org)
![Whitespace](Whitespace.png)
[![Codecov logo](Codecov.png)](https://www.codecov.io)

[![Build Status](https://travis-ci.org/Denniskamau/nodeAPI.svg?branch=master)](https://travis-ci.org/Denniskamau/nodeAPI)
[![codecov](https://codecov.io/gh/Denniskamau/nodeAPI/branch/master/graph/badge.svg)](https://codecov.io/gh/Denniskamau/nodeAPI)
# nodeAPI
An illustration of how to deelop a simple REST API with node.js

Ideally the API allows a registered user to add a server url to be monitored if it is up or down.

Incase the server is down then the user is notified via sms 

## Technologies
**Pasport.js** - Authentication.[link](http://www.passportjs.org/)

**mocha** - Testing.[link](https://mochajs.org/)

**twilio** - SMS notification.[link](https://www.twilio.com/)

## Setup
- Clone the repository:`git clone https://github.com/Denniskamau/nodeAPI/`
- Install the required moduls: `npm install`
- Start the server: `npm start`


## Endpoints
- Authentication `localhost:5000/user/signup ` and `localhost:5000/user/login`
- Adding a new web server `localhost:500/website`
