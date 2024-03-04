import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import Team from './Team';
import Products from './Products';
import Customers from './Customers';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/Products" element={<Products/>}></Route>
            <Route path="/Customers" element={<Customers/>}></Route>
            <Route path="/Team" element={<Team/>}></Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
