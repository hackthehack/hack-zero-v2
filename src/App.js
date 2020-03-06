import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={<h1>This is root</h1>}/>
        <Route path="/createHack" component={CreateHack}/>
        <Route path="/hacks" component={HacksPage}/>
        <Route path="/hack/:id" component={HackDetails}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
