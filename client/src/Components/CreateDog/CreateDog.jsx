import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {getAllTemps, postDog, getAllDogs} from "../../actions/index"
import reload from "../Img/reload.png"
import remove from "../Img/remove.png"
import iconHome from "../Img/home.png"
import "./CreateDog.css"

//// VALIDACIONES DEL FRONT ///////
const validate = function(input){
    let error = {}
    if (!input.name) error.name = "🚫 Por favor ingresar el nombre de la raza 🚫"
    //////////
    if (!input.min_weight)error.min_weight = "🚫 Por favor, ingresar un valor 🚫"
    //////////
    if (!input.max_weight) error.max_weight = "🚫 Por favor, ingresar un valor 🚫"
    //////////
    if (!input.min_height) error.min_height = "🚫 Por favor, ingresar un valor 🚫"
    //////////
    if (!input.max_height) error.max_height = "🚫 Por favor, ingresar un valor 🚫"
    //////////
    if (parseInt(input.min_height) <= 15) error.min_height = "🚫 Mayor a: 15 cm 🚫" 
    //////////
    if (parseInt(input.max_weight) <= 2) error.max_weight = "🚫 No menor a: 2Kg 🚫" 
    //////////
    if (parseInt(input.min_life_span) < 0) error.min_life_span = "🚫 Mayor a: 1 año 🚫"
    //////////
    if (parseInt(input.max_life_span) > 21) error.max_life_span = "🚫 Menor a: 20 años 🚫"
    //////////
    if (parseInt(input.image) > 250) error.max_life_span = "🚫 Valor muy grande 🚫"
    //////////
    if (parseInt(input.min_life_span) > parseInt(input.max_life_span)) error.min_life_span = "🚫 La esperanza de vida minima es mayor a su maxima 🚫"
    //////////
    if (parseInt(input.min_weight) > parseInt(input.max_weight)) error.min_weight = "🚫 El peso minimo es mayor a su peso maximo 🚫"
    //////////
    if (parseInt(input.min_height) > parseInt(input.max_height)) error.min_height = "🚫 La altura minima es mayor a su altura maxima 🚫"
    return error
}

export default function CreateDog(){
    const dispatch = useDispatch()
    //// CREAMOS UN ESTADO PARA GUARDAR LA INFORMACION DE NUESTRA BASE DE DATOSS ////
    const temperaments = useSelector((state) => state.allTemps)
    console.log(temperaments);
    //// ESTADO PARA MENAJAR LAS VALIDACIONES ///
    const [errors, setErrors] = useState({})

    /// ALMACENAMOS TODA LA INFORMACION, EL USEFECT Y EL DISPACTCH *VER CLASES* ///
     useEffect(() => {
         dispatch(getAllTemps())
     }, [dispatch]);
     
    /// ESTADO QUE ME VA A PERMITIR MANEJAR  LA INFORMACION///
    /// INTRODUCIDA POR EL CLIENTE ///
    const [input, setInput] = useState({
        name:"",
        min_height:'',
        max_height:'',
        min_weight:'',
        max_weight:'',
        min_life_span:'',
        max_life_span:'',
        image: "",
        temperament:[]
    })

    console.log(input)
    
    function refreshPage() {
        window.location.reload(false);
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament : [...input.temperament, e.target.value]
        })
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(el => el !== e)
        })
    }

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
            dispatch(postDog(input));
            alert('La raza fue agregada correctamente!✅');
            setInput({
                name:"",
                min_height:'',
                max_height:'',
                min_weight:'',
                max_weight:'',
                min_life_span:'',
                max_life_span:'',
                image: "",
                temperament:[]
        });
        dispatch(getAllDogs());
         navigate("/home");
         
    }
    return(
        <div className="backgroundCreate">

            <div className="titleRefreshHome">
            <button
                type="submit"
                onClick={refreshPage}
                className="buttonRefresh">
			    <img
                    className="iconRefresh"
                        src={reload}
                        width="40px"
                    alt="">
                </img>
            </button>
            
            <div className="homeButton">
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
            <h1 className="tituleCrear">Registre la nueva raza 🐶</h1> 
            </div>
            <div className="card-containers">
                <div className="containers">
                    <div className="breed">
                        <label>Nombre de la raza 🏷️: </label>
                        <input className="inputs"
                        type= "text"
                        value= {input.name = input.name.substring(0, 1).toUpperCase() + input.name.substring(1)}
                        name="name"
                        placeholder="Nombre de la raza"
                        onChange={(e) => handleChange(e)}/>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="minHeight">
                        <label>Altura: Min 📏:</label>
                        <input className="inputs"
                        type= "number"
                        min="1"
                        max="99"
                        value= {input.min_height}
                        name="min_height"
                        placeholder="Altura: Min"
                        onChange={(e) => handleChange(e)}/>
                        {errors.min_height && 
                            <p className="error">{errors.min_height}</p>}
                    </div>
                    <div className="maxHeight">
                        <label>Altura: Max 📏:</label>
                        <input className="inputs"
                        type= "number"
                        min="1"
                        max="99"
                        value= {input.max_height}
                        name="max_height"
                        placeholder="Altura: Max"
                        onChange={(e) => handleChange(e)}/>
                        {errors.max_height && 
                            <p className="error">{errors.max_height}</p>}
                    </div>
                    <div className="minWeight">
                        <label>Peso: Min ⚖️:</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="99"
                        value= {input.min_weight}
                        name="min_weight"
                        placeholder="Peso: Min"
                        onChange={(e) => handleChange(e)}/>
                        {errors.min_weight && 
                            <p className="error">{errors.min_weight}</p>}
                    </div>
                    <div className="maxWeight">
                        <label>Peso: Max ⚖️:</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="99"
                        value= {input.max_weight}
                        name="max_weight"
                        placeholder="Peso: Max"
                        onChange={(e) => handleChange(e)}/>
                        {errors.max_weight &&
                            <p className="error">{errors.max_weight}</p>}
                    </div>
                    <div className="minLifeSpan">
                        <label>Años de vida: Min 📆:</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="21"
                        value= {input.min_life_span}
                        name="min_life_span"
                        placeholder="Años de vida: Min"
                        onChange={(e) => handleChange(e)}/> 
                        {errors.min_life_span &&
                        <label className="error">{errors.min_life_span}</label>}
                    </div>
                    <div className="maxLifeSpan">
                        <label>Años de vida: Max 📆:</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="21"
                        value= {input.max_life_span}
                        name="max_life_span"
                        placeholder="Años de vida: Max"
                        onChange={(e) => handleChange(e)}/> 
                        {errors.max_life_span &&
                        <label className="error">{errors.max_life_span}</label>}
                    </div>
                    <div className="picture">
                        <label>Imagen 🖼️:</label>
                        <input className="inputs"
                        type="text"
                        value= {input.image}
                        name="image"
                        placeholder="URL de la imagen..."
                        onChange={(e) => handleChange(e)}/>
                    </div>
                </div>


                    <div>
                    <select onChange={(e) => handleSelect(e)}  className="listTemps">
                        <option hidden>Temperamentos del perro 🌡️</option>
                        {temperaments?.map((e,i)=>{
                     return(<option key={e.id} value={e.name} >{e.name}</option>)
                 })}
                    </select>
                    </div>

                    <div className="temperamentsItems">
                    {input.temperament.map(el =>
                        <p
                            key={el}
                            className="itemsTemperaments">
                                {el}
                                <button
                                    className="buttonRemove"
                                    onClick={() => handleDelete(el)}
                                >
                                <img
                                    src={remove} 
                                    height="12px"
                                    weight="10px"
                                    alt="delete"
                                    className="imgRemoveTemperament"
                                    />
                                </button>
                            </p>
                    )}  
                    </div>
                <div>
                        <button
                            className="createDogButton"
                            type="submit"
                            disabled={input.temperament.length < 1 || input.temperament.length >= 15 ? true : false}
                            onClick={(e) => handleSubmit(e)}
                        >Crear Raza‼️‼️</button>
                    </div>
            </div>
        </div>
    )
}