# Netfloo 2.0

Netfloo 2.0 is a Netflix clone built using React, Tailwind CSS, MongooseDB, Redux, Express, and Firebase.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

Netfloo 2.0 currently has the following features:


- Browse movies and TV shows by category
- Search for movies and TV shows
- View details of a movie or TV show, including a trailer, cast, and synopsis
- Add movies and TV shows to your watchlist
- Log in with your Google account to sync your watchlist across devices

## Snippets

- Firebase  
- authenicate users to use the app with either google or email


https://user-images.githubusercontent.com/101741874/233515455-68bddb96-2b9b-4e12-a114-a03b6a8d6735.mp4
<img width="1440" alt="Screen Shot 2023-04-20 at 8 50 03 PM" src="https://user-images.githubusercontent.com/101741874/233515575-3d827593-0e46-49cf-b047-5a4b6c5f1053.png">

- Firebase 
- to prevent user from entering the app without logging in and also to provide a Google authenication
[NLogin.webm](https://user-images.githubusercontent.com/101741874/233516141-89b0d428-432a-47fe-baf1-1ca5ef5955e7.webm)

- MongoAtlas 
- store the youtube API data, to prevent calling on the same data twice, 

<img width="1440" alt="Screen Shot 2023-04-20 at 9 01 40 PM" src="https://user-images.githubusercontent.com/101741874/233516694-229b0cbf-8303-472b-9d70-39af007f4475.png">

- Mainpage 
- Featuring a main movie display, on hover it will show you a preview of the coresponding movie, can scroll on each card slider, and on clicking play it will navigate you to a screen with the expanded video

https://user-images.githubusercontent.com/101741874/233517127-807ce763-74e1-404d-b74f-fc2eeab05784.mp4

- Tv shows and Movies
- featuring a genre selector component to render in the appropriate movies and tv shows


https://user-images.githubusercontent.com/101741874/233518080-b52461ff-e32e-471d-955b-91c96d0f630b.mp4

-My list

[NMyList.webm](https://user-images.githubusercontent.com/101741874/233520969-88cd2d15-bca3-4c46-ab91-8931c7a21602.webm)



## Technologies

Netfloo 2.0 uses the following technologies:

- [React](https://reactjs.org/) - a JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework
- [MongoAtlas](https://www.mongodb.com/atlas/database) - a multi-cloud database.
- [MongooseDB](https://mongoosejs.com/) - an object modeling tool for MongoDB
- [Redux](https://redux.js.org/) - a predictable state container for JavaScript apps
- [Express](https://expressjs.com/) - a fast, unopinionated, minimalist web framework for Node.js
- [Firebase](https://firebase.google.com/) - a mobile and web application development platform

## Installation

To run Netfloo 2.0 on your local machine, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/your-username/netfloo-2.0.git`
2. Change directory to netflix/ui 
2. Install the dependencies using `npm install`
3. Create a `.env` file with your Firebase configuration settings.
4. Start the weback using `npm start`
5. Create a second terminal and change directory to netflix/ai
6. In that second terminal use 'npm run start


## Usage

Once you have installed and started the development server, you can browse Netfloo 2.0 by visiting `http://localhost:3000` in your web browser.

## Contributing

We welcome contributions to Netfloo 2.0! To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and test them locally
4. Push your changes to your forked repository
5. Submit a pull request to the original repository

## License

Netfloo 2.0 is open source software licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it however you like.

