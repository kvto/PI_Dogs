import React from 'react';
import './landing.css';
import linkedin from "../Img/linkid.png";
import githubicon from "../Img/git.png";
import { Link } from "react-router-dom";

/* COMPONENTE DE CLASE

export default class Home extends React.Component{
.... 
}
EL RENDER DE UN COMPONENTE DE CLASE ES
  render(){
    return{
      ....
    }
  }

  PARA COLOCAR UN ESTADO LOCAL EN UN COMPONENTE DE CLASE ES:
    constructor(props){
      super(props);
      this.state={                                             =>     ESTO EQUIVALE AL states en los
                                                                      componentes de funciones
        name:'kevin';
      }
    }





COMPONENTE DE FUNCION 
          |
          |
          |*/
export default function landing() {
  /* EL RENDER DE UN COMPONENTE DE FUNCION ES
  RETURN
    |*/
  return (
    <div className='background'>
    <div className="icons">
                <a target="_blank" href={"https://www.linkedin.com/in/kevin913montero/"}rel="noopener noreferrer">
                    <img className="icono" src={linkedin}alt="LINK"></img>
                </a>
                <a target="_blank" href={"https://github.com/kvto" } rel="noopener noreferrer">
                    <img className="icono" src={githubicon} alt="GITHUB"></img>
                </a>
            </div>
      <h1 className="title1">Aplicación para Perritos</h1>
      <h1 className='title'>*Bienvenidos*🐶</h1>
      <Link to ="/home">
       <button className="buttom">Ingresar 🔸 </button>
      </Link>
     
      </div>
  )
}
