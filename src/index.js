import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'
import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App1/>
//   </React.StrictMode>,
//   document.getElementById('root1')
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <App2/>
//   </React.StrictMode>,
//   document.getElementById('sidebar')
// );


