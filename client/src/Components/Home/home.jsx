import React from 'react';
import './home.css';
import Paginated from '../Paginated/paginated';
import NavBar from "../Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import reload from "../Img/reload.png";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getAllDogs, getAllTemps, orderByName, filterByTemp, filterCreated } from '../../actions';



export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogsBreed);
  const allTemperaments = useSelector((state) => state.allTemps);
  const [, setOrden] = useState("");
  /// INICIALIZAMOS ESTADOS PARA LA PAGINACION DONDE //
  /// dogsOnPage SERA LOS 8 PERROS QUE SE MOSTRARIAN ///
    const [dogsOnPage,] = useState(8);
    const [pageCurrent, setCurrentPage] = useState(1);
    /// OBTENEMOS EL ULTIMO DOGS QUE DEBERIA MOSTRAR EN LA PAGINA///
    const indexLastDog = pageCurrent * dogsOnPage;
    /// OBTENERMOS EL PRIMER DOG QUE DEBERIA MOSTRAR EN LA PAGINA ///
    const indexFristDog = indexLastDog - dogsOnPage;
    /// DIVIDMOS EL ARREGLO TOMADO EN ALL DOGS DESDE indexFristDog A indexLastDog ///
   const currentDog = allDogs.slice(indexFristDog, indexLastDog);
   console.log(currentDog);
    useEffect(()=>{
      dispatch(getAllDogs());},[dispatch]);  
    useEffect(()=>{
        dispatch(getAllTemps());},[dispatch]);  
    
        const paginado = (pageNumber) => {
          setCurrentPage(pageNumber)
      }

        function handleRefresh() {
          window.location.reload(false);
      }

      function handleOrder(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
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
                    className="icon"
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
      <NavBar/>
      </div>
      

      <h1 className="tittle">Aplicativo Canino 🐶</h1>

      <select onChange={e=>handleOrder(e)} className="list">
                    <option value="default">Orden Alfabetico 🔠</option>
                    <option value="Asc">A-Z 📈</option>
                    <option value="Des">Z-A 📉</option>
                    <option value="min_weight">Peso minimo ➕</option>
                    <option value="max_weight">Peso maximo ➖</option>
                </select>
    
                <select onChange={(e) => handleFilterDogsByTemperament(e)} className="list">
                            <option value='All'>Temperamentos 🌡️</option>
                            {allTemperaments.map(e=>{
                                return <option key={e.id} value={e.name}>{e.name}</option>
                            })}
                        </select>
                        

                 <select onChange={(e)=>handleFilterCreate(e)} className="list">
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
    </div>
  )
}
