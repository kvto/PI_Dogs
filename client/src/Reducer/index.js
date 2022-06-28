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
    CLEAN_DOG_ID

} from "../actions/action"

const initialState = {
    dogsBreed: [],
    allTemps: [],
    dogsAll: [],
    detail: [],

}
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {


        case GET_ALL_DOGS:
            return {
                ...state,
                dogsBreed: payload,
                dogsAll: payload
            };


        case GET_ALL_TEMPS:
            return {
                ...state,
                allTemps: payload
            };

        case POST_DOG:
            return {
                ...state,
            };


        case FILTER_CREATED:
            const Dogs = state.dogsAll;
            if (payload === "default") return {
                ...state,
            }

            const createdFilter = (
                payload === "All" ? state.dogsAll :
                    Dogs.filter((e) => {
                        if (payload === "Create") {
                            if (e.created) {
                                return e;
                            }
                        } else if (payload === "Api") {
                            if (!e.created) {
                                return e;
                            }
                        }
                        return false;
                    })
            );
            return {
                ...state,
                dogsBreed: createdFilter
            }



        case FILTER_BY_TEMP:
            const dogs = state.dogsAll;
            dogs.map((dog) => {
                return (
                    Array.isArray(dog.temperaments)

                        ? dog.temperaments = dog.temperaments.map((t) => { return t.name }).join(", ")

                        : dog.temperament
                )
            })
            const temperamentFilter =
                payload === 'All' ? state.dogsAll
                    : dogs.filter((e) => (
                        e.temperament?.includes(payload) || e.temperaments?.includes(payload)))
            return {
                ...state,
                dogsBreed: temperamentFilter,
            }


        case ORDER_BY_NAME:
            if (payload === "default") return {
                ...state,
            }

            let sortedDog =
                payload === 'asc' ?
                    state.dogsBreed.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        else
                            return 0;

                    }) : state.dogsBreed.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }
                        else
                            return 0;

                    })
            return {
                ...state,
                dogsBreed: sortedDog,

            }

        case ORDER_BY_WEIGTH:
            if (payload === "default") return {
                ...state,
            }
            let newState2 = state.dogsBreed.filter((e) => e.weight.length > 3);
            let newState = newState2.filter((e) => !e.weight.includes('NaN'));
            let sortedWeigth = payload === 'asc' ?
                newState.sort(function (a, b) {
                    if (parseInt(a.weight.replace(/ - /, '')) > parseInt(b.weight.replace(/ - /, ''))) {
                        return 1;
                    }
                    if (parseInt(a.weight.replace(/ - /, '')) < parseInt(b.weight.replace(/ - /, ''))) {
                        return -1;
                    }
                    else
                        return 0;
                })
                : newState.sort(function (a, b) {
                    if (parseInt(a.weight.replace(/ - /, '')) > parseInt(b.weight.replace(/ - /, ''))) {
                        return -1;
                    }
                    if (parseInt(a.weight.replace(/ - /, '')) < parseInt(b.weight.replace(/ - /, ''))) {
                        return 1;
                    }
                    else
                        return 0;
                })
            return {
                ...state,
                dogsBreed: sortedWeigth,
            }

        case GET_BY_NAME:
            return {
                ...state,
                dogsBreed: payload
            }

        case GET_DETAIL:
            if (!payload.err) {
                return {
                    ...state,
                    detail: payload,
                }

            } else {
                alert(payload.err)
                return { ...state }
            }

        case CLEAN_DOG_ID:
            return {
                ...state,
                detail: [],
            };
        default:
            return state;
    }

};
