import React from "react";
import "./paginated.css"

export default function Paginated ({dogsOnPage, allDogs, pagina}) {
    const pageNumbers = []
    /* RECIBIMOS NUESTROS TRES PARAMETROS EN NUESTRO COMPONENETE DE FUNCION
    
    REALIZAMOS UN FOR DONDE NUESTRA CONDICION RADICA EN DIVIDIR LO QUE SERIA
    EL RESULTADO DE DIVIDIR TODAS LAS RAZAS (DB Y API) ENTRE LOS RAZAS DE PERROS
    QUE HAN SIDO DADAS (8)*/
    for(let i = 0; i<Math.ceil(allDogs/dogsOnPage); i++) {
        pageNumbers.push(i+1)
    }

    return(
        <div>
            <ul className="paginationUl">
                {pageNumbers?.map(n => (
                    <button
                        className="paginationButton"
                        key={n}
                        onClick={() => pagina(n)}
                    >
                    {n}
                </button>
            ))}
            </ul>    
        </div>
    )
}