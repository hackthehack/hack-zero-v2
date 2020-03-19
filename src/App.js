import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";
import Login from "./components/Login";
import Register from "./components/register";
import Header from "./components/header";
import Home from "./components/Home";
import EditHack from './components/edit-hack'
import "./css/main.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create" component={CreateHack} />
        <Route path="/hacks" component={HacksPage} />
        <Route exact path="/hack/:id" component={HackDetails} />
        <Route path="/hack/:id/edit" component={EditHack} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
