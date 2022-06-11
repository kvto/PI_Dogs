import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from "./Store/index.js"
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  //El <Provider>componente hace que Redux store 
  // esté disponible para cualquier componente anidado que nec
  // esite acceder a la tienda Redux.


  //El BROWSERROUTER biblioteca estándar para el enrutamiento en React. 
  // Permite la navegación entre vistas de diferentes componentes en una aplicación React, 
  // permite cambiar la URL del navegador y mantiene la interfaz de usuario sincronizada con la URL.
  <Provider store = {store}> 
  <React.StrictMode>
    <BrowserRouter>
     <App />
     </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
