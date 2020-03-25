import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import MyHacks from "../components/MyHacks";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
