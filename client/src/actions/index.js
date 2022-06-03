import axios from "axios";
import {
GET_ALL_DOGS,
GET_ALL_TEMPS,
FILTER_BY_TEMP,
FILTER_CREATED,
ORDER_BY_NAME,
ORDER_BY_WEIGTH,
GET_BY_NAME,
POST_DOG,
GET_DETAIL,
CLEAN_DOG_ID,
} from "./action"


export  function getAllDogs(){
    return async function (dispatch){
      //  console.log('entra getAllDogs');
        const allDogs = await axios.get('http://localhost:3001/dogs');
        //console.log(json);
          dispatch({
            type : GET_ALL_DOGS,
            payload : allDogs.data,
        })

    }
}

export  function getAllTemps(){
    return async function (dispatch){
      // console.log('entra getAllTemps');
        const allTemps = await axios.get('http://localhost:3001/temperament');
     //   console.log(allTemps, 'del getAllTemps');
          dispatch({
            type : GET_ALL_TEMPS,
            payload : allTemps.data,
        })

    }
}

export  function postDog(payload){
  return async function (dispatch){
    //  console.log('payload =>',payload);
      if(payload.image===''){
    
      }
          const posteo = {
            "name":payload.name,
            "height": payload.min_height+' - '+payload.max_height,
            "weight": payload.min_weight+' - '+payload.max_height,
            "life_span": payload.min_life_span+' - '+payload.max_life_span,
            "temperament": payload.temperament
        }
       // console.log(posteo);
            const created = await axios.post('http://localhost:3001/dogs',posteo);
       //     console.log('created',created);
            dispatch({
                type : POST_DOG,
                payload : created.data,
            })
        }

      }

export function filterByTemp(payload){
    return{
        type: FILTER_BY_TEMP,
        payload ,
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload ,
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload ,
    }
}

export  function getDetail(id){
    return async function (dispatch){
      try{
        const detail = await axios.get('http://localhost:3001/dogs/'+id);
      //  console.log('detalle',detail);
          dispatch({
            type : GET_DETAIL,
            payload : detail.data,
        })

    }catch (e){
        alert(e)
    }
}
}
export function cleanDogId() {
    return (dispatch) => {
      let action = {
        type: CLEAN_DOG_ID,
        payload: [],
      };
      return dispatch(action);
    };
  }
  

export function orderByW(payload){
    return{
        type: ORDER_BY_WEIGTH, 
        payload ,
    }
}

    export function getByName(name){
        return async function (dispatch){
            try{
                 //  console.log('entra getAllDogs');
              const nameDog = await axios.get('http://localhost:3001/dogs?name='+ name);
              //console.log(json);
                dispatch({
                  type : GET_BY_NAME,
                  payload : nameDog.data,
              })
      

            } catch(err){
                alert('No se encontro una raza con la busqueda asociada!')
            }

           
          }
    }




