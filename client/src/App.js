// import logo from './logo.svg';
// import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          {/*
          <Route exact path="/">
            <LandingPage />
          </Route>
  
          compress to :
          <Route exact path="/" component={LandingPage} />
          */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

/*
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
*/