import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";
import Login from "./components/Login";
import Register from "./components/register";
import Header from "./components/header";
import Login from "./components/Login"
import Home from "./components/Home";
import "./css/main.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/createHack" component={CreateHack} />
        <Route path="/hacks" component={HacksPage} />
        <Route path="/hack/:id" component={HackDetails} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
