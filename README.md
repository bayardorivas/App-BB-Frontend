![BR Bad Bank application](https://github.com/bayardorivas/appbb/blob/master/splash.png "BR Bad Bank - Bayardo Rivas - MIT Capstone Project")
<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/bayardorivas" target="_blank">Bayardo Rivas</a>
</p>

<br>

## :dart: About ##

This is my capstone project for "Professional Certificate in Coding: Full Stack Development with MERN" at [MIT - Massachusetts Institute of Technology](https://web.mit.edu/). It has been a great experience, with a lot of learning about all the development ecosystem. 

  The project simulates some of the most basics transactions on a bank application. In this project I am using as Database the service of [MongoDb Atlas](https://www.mongodb.com/atlas/database) wich is a Database cloud service. I defined a [DAL](https://en.wikipedia.org/wiki/Database_abstraction_layer) that give us the flexibility to change make change on our Database backend with mininum effort and separated from the application. 
  
  The frontend is created with HTML, Bottstrap as CSS library and ReactJS, so fields are validated and transactions affects the balance, the user can not wihdraw more than the balance in the account, passords are validated to be more than 8 characters, amounts fields can not be negatives or other characters than numbers. Any user can create accouts, and make its own transactactios and see these as well.
  
  The backend was built running NodeJS, Express, MongoDB and using Router middleware. During the coding process, I worked with local Database, MongoDB and using the ODM Mongoose, to helpe me with the test of API routes and Database access I used [Postman](https://www.postman.com/) as a client for testing.
  
  An authentication layer is working using the service of authentication service of Google [Firebase](https://firebase.google.com/). The application authenticate with user and password, but you can authenticate with your Google account also.
  
  To deploy the appllcation, I used the service of [Render.Com](https://render.com/), this site allows developers to deploy web applications really fast and easy. You connect your Render project to your Github, select your repository and start your deploy. Once you have deployed the application, if you make change to your code and it is updated in your Github repo, automatically Render identifies the change and run a new deployment with changes you included.

## :sparkles: Features ##

:heavy_check_mark: Forms validation;\
:heavy_check_mark: User account creation;\
:heavy_check_mark: User can view all its own transactions;\
:heavy_check_mark: User can login authenticating with email and password, and with a Google account;\
:heavy_check_mark: Logged in user can deposit and withdraw;\
:heavy_check_mark: It is possible to swithc between users (Login and Logout);

## :rocket: Technologies ##

  - Javascript
  - CSS
  - HTML
  - Firebase
  - MongoDb
  - Render
  
  
The following tools were used in this project:

- [React](https://en.reactjs.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Formik](https://formik.org/)
- [Mongoose](https://mongoosejs.com/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/bayardorivas/appbb

# Access and runing the backend
$ cd appbb
$ cd bb-backend

# Edit .env.example file (environment variables) and add your information, then rename it to .env

# Install dependencies of backend
$ npm install

# Run the project
$ npm start

# The server will initialize in the <http://localhost:2500>

# Access and runing the frontend
$ cd appbb
$ cd bb-frontend

# Edit .env.example file (environment variables) and add your information, then rename it to .env

# Install dependencies of backend
$ npm install

# Run the project
$ npm start

# The application will initialize in the <http://localhost:3000>

```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/bayardorivas" target="_blank">Bayardo Rivas Romero</a>

&#xa0;

<a href="#top">Back to top</a>
