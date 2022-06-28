import React from 'react';
import './landing.css';
import linkedin from "../Img/linkid.png";
import githubicon from "../Img/git.png";
import { Link } from "react-router-dom";

export default function landing() {
  return (
    <div className='background'>
      <div className="icons">
        <a target="_blank" href={"https://www.linkedin.com/in/kevin913montero/"} rel="noopener noreferrer">
          <img className="icono" src={linkedin} alt="LINK"></img>
        </a>
        <a target="_blank" href={"https://github.com/kvto"} rel="noopener noreferrer">
          <img className="icono" src={githubicon} alt="GITHUB"></img>
        </a>
      </div>
      <h1 className="title1">Aplicación para Perritos</h1>
      <h1 className='title'>*Bienvenidos*🐶</h1>
      <Link to="/home">
        <button className="buttom">Ingresar 🔸 </button>
      </Link>
    </div>
  )
}
