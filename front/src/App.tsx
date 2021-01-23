import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutPage from './pages/AboutPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { _requestMe } from './redux/actions/MeAction';
import Auth from "./hoc/Auth"
import 'antd/dist/antd.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_requestMe())
  }, [])
  return (
    <Router>
      <Route exact path="/" component={LoadingPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/home" component={Auth(HomePage, "/home")} />
      <Route exact path="/forgot-password" component={ForgotPasswordPage} />
    </Router>
  );
}

export default App;
