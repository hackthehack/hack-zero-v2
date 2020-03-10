import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";
import Header from './components/header'
import './css/main.css'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        {/* <Route exact path="/" component={<h1>This is root</h1>}/> */}
        <Route path="/createHack" component={CreateHack}/>
        <Route path="/hacks" component={HacksPage}/>
        <Route path="/hack/:id" component={HackDetails}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
