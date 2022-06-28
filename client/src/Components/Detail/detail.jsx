import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import search from "../Img/search.gif";
import { getDetail, cleanDogId } from "../../actions";
import { Link } from "react-router-dom"
import iconHome from "../Img/home.png"
import "./detail.css";



export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
    return dispatch(cleanDogId());
  }, [dispatch, id])

  const Dog = useSelector((state) => state.detail);
  return (
    <div>
      {!Array.isArray(Dog) ?
        <>
          <div className="container">
            <div className="iconHome-detail">
              <Link
                to="/home"
                className="linkHome"
              >
                <img
                  src={iconHome}
                  alt=""
                  width="40px"
                  className="iconHome"
                />
              </Link>
            </div>
            <h1 className="text">Detalles de la raza🐶</h1>
            <div className="cardContainer">
              <h2 className="name">{Dog.name}</h2>
              <img className="imgDet" src={Dog.image} alt="" />
              <div className="description">
                <h4>Altura📏: {Dog.height} Cm</h4>
                <h4>Peso⚖️: {Dog.weight} Kg</h4>
                <h4>Años de vida📆: {Dog.life_span.replace('years', '')} años</h4>
                <h3>Temperamentos🌡️:</h3><h4>{
                  Dog.created ? Dog.temperaments.map(t => { return t.name }).join(", ") :
                    Dog.temperament
                }</h4>
              </div>
            </div>
          </div>
        </> :
        <>
          <div><img alt="" className="loading" src={search} />
            <h1 className="loadinttext">BUSCANDO...</h1>
          </div>
        </>}
    </div>
  )
}
