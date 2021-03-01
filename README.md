# React.js Boilerplate Project

Reference list:
> - React Lifecycle Method Diagram ([Link](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/))

IDE & tools list:
> - Visual Studio Code IDE
> - MongoDB Local Community Server
> - Git CLI
> - Postman App ([Website](https://www.postman.com/downloads/))
> - Redux DevTools Extension for Chrome, Firefox ([Link](https://github.com/zalmoxisus/redux-devtools-extension))

Finished task list:
> 1. install node.js
> 2. npm initialize & install express boiler-plate package (npm init & install express --save)
> 3. MongoDB Local Server setting & connect with express server (npm install mongoose --save)
> 4. mongoose Schema structure & Model concept for typical log-in DB (./models/User.js)
> 5. setup git CLI operation with Github
> 6. intall body-parser package for parsing the data between front-end & back-end
> 7. install The Postman app for checking the back-end
> 8. install nodemon package for realtime refreshing server (npm install nodemon --save-dev : "--save-dev" only for local & except the publish, should run "nodemon" instead of "node")
> 9. seperate sensitive information for development & publish stage (./config, publish "Heroku Service")
> 10. sensitive information to save with encryption by Bcrypt (npm install bcrypt --save)
> 11. backend login logic making
> 12. create login authorization token with DB _id (npm install jsonwebtoken --save)
> 13. save the token on client cookie with express cookie-parser (npm install cookie-parser --save)
> 14. making "Authorization Route" for checking when the page change with login auth data (decode the cookie data to DB _id & check DB at refreshing new pages)
> 15. install create-react-app on ./client folder with npx
> 16. install react-router-dom on ./client folder with npm & write router address with functions
> 17. install axios on ./client folder with npm (AJAX way for using jQuery)
> 18. trying to connect client to server in same address with different port, it shows error with CORS(Cross-origin request) message.
> 19. use proxy (./client) to solve the CORS problem for localhost development process ([Doc](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually))
> 20. as the official document install http-proxy-middleware on (./client) folder and setup the setupProxy.js
> 21. install concurrently package to run both the backend & frontend server and put at package.json ("dev": "concurrently \"npm run backend\" \"npm run start --prefix client\"")
> 22. install AntDesign package at (./client) for React CSS framework for concentrate on function & efficiency
> 23. install redux, redux-react, redux-promise, redux-thunk on (./client) for central state management
> 24. install Redux DevTools and setup at client index.js to connect the tools and test on Chrome


Package list:
> - node.js
> - npm express (back-end package)
> - mpm mongoose (MongoDB package)
> - npm body-parser (url json parser)
> - npm nodemon (refresh server without reset the server)
> - npm bcrypt (data encryption)
> - npm jsonwebtoken (safe authorization)
> - npm cookie-parser (saving temporary data on client computer with cookie)
> - npx create-react-app . (react app basic boiler-plate, npx is utilizing the parent npm packages)
> - npm react-router-dom (one page router)
> - npm axios (jQuery data delivering like as AJAX)
> - npm http-proxy-middleware (proxy for running the both frontend & backend for development process)
> - npm concurrently (multiple run the process for the both frontend & backend at once)
> - npm antd (CSS out of box framework)
> - npm redux redux-react (central state manager)
> - npm redux-promise redux-thunk (redux middleware to use redux easier)

Test environment:
> ~$ npm run dev (execute both frontend & backend with Local MongoDB)

To-do list:
> - Tizen™ webapp platform adoption

###### © 2021 [Joonsoo Kim](https://joonsoo.me).