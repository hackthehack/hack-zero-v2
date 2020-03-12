import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";
<<<<<<< HEAD
import Login from "./components/Login";
import Register from "./components/register";
import Header from "./components/header";
=======
import Register from "./components/register";
import Header from "./components/header";
import Home from "./components/Home";
>>>>>>> side-nav
import "./css/main.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
<<<<<<< HEAD
        {/* <Route exact path="/" component={<h1>This is root</h1>}/> */}
        <Route path="/login" component={Login} />
=======
        <Route exact path="/" component={Home} />
>>>>>>> side-nav
        <Route path="/register" component={Register} />
        <Route path="/createHack" component={CreateHack} />
        <Route path="/hacks" component={HacksPage} />
        <Route path="/hack/:id" component={HackDetails} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
