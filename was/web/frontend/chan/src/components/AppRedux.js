import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ConnectedRouter, connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducer from "../redux/reducer";
import rootSaga from "../redux/saga";

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const reducers = combineReducers({
	router: connectRouter(history),
	...reducer,
});
const middleware = [sagaMiddleware, routerMiddleware(history)];

const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== "production",
	middleware: middleware,
});

sagaMiddleware.run(rootSaga);

const AppRedux = ({ children }) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>{children}</ConnectedRouter>
		</Provider>
	);
};

export default AppRedux;
