import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from './pages/AboutPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { _requestMe } from './redux/actions/MeAction';
import Auth from "./hoc/Auth"
import 'antd/dist/antd.css';
import { RootReducerType } from './redux/reducers/rootReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_requestMe())
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoadingPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/home" component={Auth(HomePage, "/home")} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
      </Switch>
    </Router>
  );
}

export default App;
