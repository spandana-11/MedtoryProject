import React from 'react';
import App from './App';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/UseContext';
import Preview from './components/Preview';
import Displaydata from './components/Displaydata';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<UserProvider>
<BrowserRouter>

    <App />
    {/* <Preview/> */}
  </BrowserRouter>
    
  </UserProvider>

    


  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
