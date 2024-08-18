import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './i18n'; 
import LanguageSwitcher from './components/LanguageSwitcher';
// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <LanguageSwitcher />
    <HomePage />
  </BrowserRouter>,
  document.getElementById("root")
  // test
);
