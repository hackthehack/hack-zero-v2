import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";
import HackDetails from "./components/hack-details";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/createHack">
          <CreateHack />
        </Route>
        <Route path="/hacks">
          <HacksPage />
        </Route>
        <Route path="/hack/:id" component={HackDetails}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
