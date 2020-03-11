import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/createHack" component={CreateHack} />
        <Route path="/hacks" component={HacksPage} />
        <Route paht="/login" component={Login} />
        <Route path="/hack/:id" component={HackDetails} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
