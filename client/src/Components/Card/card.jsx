import React from "react";
import { Link } from "react-router-dom";
import "./card.css"

export default function Card({ image, name, temperament, weight, id }) {
    let temp = "";
    typeof temperament === "object" ?
        temp = temperament.map(t => {
            return t.name
        }).join(", ") : temp = temperament
    return (
        <div className="card-containers-dogs">
            <div className="card-container">
                <Link className="toDogId" to={`/home/${id}`}>
                    <h2 className="nameDH">{name}🏷️</h2>
                    <h4 className="weightHome">{`Peso ${weight} Kg ⚖️`}</h4>
                    <h3 className="temperamentsHome">Temperamentos🌡️: </h3>
                    <h3 className="temperamentsHome">{temp}</h3>
                    <div className="image-conteiner">
                        <img
                            src={image}
                            alt=""
                            whidth="250px" height="250px"
                            className="image"
                        ></img>
                    </div>
                </Link>
            </div>
        </div>

    );
}