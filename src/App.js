import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHack from "./components/create-hack";
import HacksPage from "./components/HacksPage";

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
      </Switch>
    </BrowserRouter>
  );
}
export default App;
