import React from 'react';
import './home.css';
import Card from '../Card/card';
import Paginated from '../Paginated/paginated';
import NavBar from "../Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import reload from "../Img/reload.png";
import search from "../Img/search.gif";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getAllDogs, getAllTemps, orderByName, filterByTemp, filterCreated, orderByW } from '../../actions';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemps());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const allDogs = useSelector((state) => state.dogsBreed);
  const allTemperaments = useSelector((state) => state.allTemps);

  const [, setOrden] = useState("");
  const [dogsOnPage,] = useState(8);
  const [pageCurrent, setCurrentPage] = useState(1);
  const indexLastDog = pageCurrent * dogsOnPage;
  const indexFristDog = indexLastDog - dogsOnPage;
  const currentDog = allDogs.slice(indexFristDog, indexLastDog);


  function handleRefresh() {
    window.location.reload(false);
  }

  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`${e.target.value}`);
  }

  function handleFilterDogsByTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemp(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreate(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterWeight(e) {
    e.preventDefault();
    dispatch(orderByW(e.target.value));
    setCurrentPage(1);
    setOrden(`${e.target.value}`);
  }



  return (

    <div className='home'>
      <div className='createDog'>
        <div className='buttoms'>
          <button
            type="submit"
            onClick={handleRefresh}
            className="buttomRefresh"
          >
            <img
              width="33px" height="33px"
              className="iconRefresh"
              src={reload}
              alt="">
            </img>
          </button>
          <Link
            to="/home/createDog"
            className="crearDog"
          ><button className='buttomCreate'>➕</button>
          </Link>
        </div>
      </div>

      <div className='navbar'>
        <NavBar />
      </div>


      <h1 className="tittle">Aplicativo Canino 🐶</h1>
      <select onChange={e => handleOrder(e)} className="list">
        <option value="default">Orden Alfabetico 🔠</option>
        <option value="asc">A-Z 📈</option>
        <option value="des">Z-A 📉</option>
      </select>
      <select onChange={e => handleFilterWeight(e)} className="list">
        <option value="default">Peso ⚖️</option>
        <option value="desc">Peso maximo ➕</option>
        <option value="asc">Peso minimo ➖</option>
      </select>
      <select onChange={(e) => handleFilterDogsByTemperament(e)} className="list">
        <option value='All'>Temperamentos 🌡️</option>
        {
          allTemperaments.map((temperament) => (
            <option
              key={temperament.id}
              value={temperament.name}
            >{temperament.name}</option>
          ))
        }
      </select>
      <select onChange={(e) => handleFilterCreate(e)} className="list">
        <option value="default">Raza existentes 🐶</option>
        <option value="All">Todos</option>
        <option value="Create">Creados</option>
        <option value="Api">Existentes</option>
      </select>

      <Paginated
        dogsOnPage={dogsOnPage}
        allDogs={allDogs.length}
        pagina={paginado}
      />

      {currentDog.length > 0 ? (
        <div className="positions">{
          currentDog.map(d => {
            return (
              <Card
                key={d.id}
                id={d.id}
                name={d.name}
                temperament={d.temperament ? d.temperament : d.temperaments}
                image={d.image}
                weight={d.weight}
                height={d.height}
              ></Card>
            )
          })
        }
        </div>
      ) : (
        <div><img alt="" className="loading" src={search} />
          <h1 className="loadinttext">BUSCANDO...</h1>
        </div>
      )
      }
    </div>
  )
}
