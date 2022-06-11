import React from 'react';
import './home.css';
import Card from '../Card/card';
import Paginated from '../Paginated/paginated';
import NavBar from "../Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import reload from "../Img/reload.png";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getAllDogs, getAllTemps, orderByName, filterByTemp, filterCreated, orderByW } from '../../actions';


/**1ERO -> DISPACTCH = getAllDogs Y getAllTemps
 * 
 * 
 * 
 * 2do -> DISPACTH / ACTIONS                  type: GET_ALL_DOGS,
                                              payload : allDogs.data,       

                                              type : GET_ALL_TEMPS,
                                              payload : allTemps.data,

  3ERO -> SE DIRIGE A NUESTR REDUCER DONDE    return {
                                              ...state,
                                              dogsBreed : payload,
                                              dogsAll : payload
                                              };

                                              return {
                                              ...state,
                                              allTemps : payload
                                              };  

TENIENDO COMO RESULTADO DE PROMESAS LO QUE TENEMOS EN NUESTRO CONTROLLADOR
DE LA API CON ROUTE (/dogs ; /temperament) ASIGNADO A dogsAll Y allTemps 
                                            
POR ENDE AL MOMENTO DE REALIZAR EL SELECTOR A PARA dogsAll Y PARA dogsBreed Y allTemps



*/
export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogsBreed);
  const allTemperaments = useSelector((state) => state.allTemps);
/* 
[input,setInput] => input= SE ALOJA EL VALOR DEL ESTADO 
                    setInput=   LA FUNCION PARA SETEAR EL VALOR DEL ESTADO*/


                        /*FUNCION */                    
  const [, setOrden] = useState("");
  /// INICIALIZAMOS el valor del ESTADOS PARA LA PAGINACION DONDE //
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
  useEffect(() => {
    /* DESPACHAMOS TANTO TODA LA INFORMACION DE LOS PERROS (API Y BD)
    Y TEMPERAMENTOS (BD)*/
    dispatch(getAllDogs());
    dispatch(getAllTemps());
  }, [dispatch]);

  /* CREAMOS UNA CONSTANTE QUE PISA EL ESTADO setCurrentPage
  DANDONLE UN NUEVO VALOR AL pageCurrent*/ 
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  /* UN ESTADO ES UNA VARIABLE QUE VA A SOBREVIVIR LOS DISTINTOS
  RENDERIZADOS QUE REALICEMOS
  
  un componente SE VAN A RENDERIZAR UNA VEZ QUE EL ESTADO DE ESE COMPONENETE
  CAMBIE*/
  function handleRefresh() {
    window.location.reload(false);
  }

  function handleOrder(e) {
    e.preventDefault(); /* Cancela el evento si este es cancelable, 
    sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
    /* DESPACHA LA FUNCION ORDERBYNAME - CON EL VALOR ASC O DESC POR EL CLIENTE */
    dispatch(orderByName(e.target.value));
    /*SETEAMOS PAGE CON EL VALOR 1 YA QUE SERA LA PAGINA
    DONDE COMENZARA EL ORDENAMIENTO INDEPENDIENTEMENTE
    DE DONDE ME ENCUENTRE*/
    setCurrentPage(1);
    /* SETEAMOS EL ORDEN CON EL VALOR QUE EL CLIENTE
    ESCOGERIA "ASC O DES**/
    setOrden(`${e.target.value}`);
    console.log(setOrden);
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
        <option value="default">Peso 🔠</option>
        <option value="desc">Peso maximo ➕</option>
        <option value="asc">Peso minimo ➖</option>
      </select>

      <select onChange={(e) => handleFilterDogsByTemperament(e)} className="list">
        <option value='All'>Temperamentos 🌡️</option>
        {
          /*MAPEAMOS TODA LA INFORMACION DEL TEMPERAMENTE,
          ASIGNANDOLE UNA KEY A CADA ELEMENTO, tomando su numbre 
          Y MONSTRARLO EN EL COMPONENTE DE FRONT*/
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


    </div>
  )
}
