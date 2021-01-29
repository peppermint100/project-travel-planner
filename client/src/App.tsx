import React from 'react';
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
import { CookiesProvider } from "react-cookie";
import PlanDetailPage from "./pages/PlanDetailPage";
import dotenv from "dotenv"
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  dotenv.config()

  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoadingPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/home" component={Auth(HomePage)} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/plan/:planId" component={Auth(PlanDetailPage)} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
