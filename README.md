# Tabtracker
Tabtracker is an jwt based single page web application for tracker guitar tab. Anyone can access,bookmark different types of songs including its video, lyrics, guitar tabs and others informations and also can create his own favorite songs.

### Technologis
* Frontend - Next js
* Backend - Express js
* Database - MongoDB

### Setup & Configuration
##### Server setup
For authentication secret key and database setup, Go to ```server folder``` from ```root``` and create ```config.js``` file. Inside ```config.js``` put the followings and configure:
```
module.exports={
    secret:'',      // your credentials
    databaseURL:''     // your credentials
}
```
##### Client setup
We need to create an environment file that will contain information of our **API_URL** and **NEXT_PUBLIC_API_URL**. Create ```.env``` file in root and write below information:
```
API_URL= // your API route
NEXT_PUBLIC_API_URL= // your Next API route
```
### Database Seeding 
For seeding database, in command line, run ```cd server``` and then ```npm run seed```

### Package Installation
* To install server packages, in command line, run ```cd server``` and then ```npm install```
* To install client packages, in command line, run ```npm install```

### Staring Server & Client
* To start server, in command line, run ```cd server``` and then ```npm run dev```
* To start client, in command line, run ```npm run dev```

#### Issues
* Social media sharing for individual song is not working properly yet 