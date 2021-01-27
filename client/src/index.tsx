import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/main.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import mySaga from './redux/mySaga';
import { rootReducer } from './redux/reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga);

store.subscribe(() => {
  console.log("redux store : ", store.getState());
});

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

