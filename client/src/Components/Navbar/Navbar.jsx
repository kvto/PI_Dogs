import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions/index";
import lupa from "../Img/buscar.png";
import "./Navbar.css"

export default function Navbar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")


    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0) {
            return alert ("🚫 INGRESAR UN NOMBRE, POR FAVOR 🚫")
        } else{
            dispatch(getByName(name));
            setName("")
        }
    }

    return (
        <div className="buscador">
            <div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    onKeyPress={e => e.key === 'Enter' && handleSubmit(e) }
                    onChange={e => handleInputChange(e)}
                    value={name}
                    className="campoBuscar"
                />
                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="botonBuscar">
                    <img
                        src={lupa}
                        alt=""
                        className="iconBuscar"
                    />
                </button>
            </div>
        </div>
    )

}