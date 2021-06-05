import { types } from "../types/types";

const estadoInicial = {
    loading:false,
    msgError:null
}
export const uiReducer = (state = estadoInicial, action ) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError:action.payload
            }
        case types.uiRemoveError:
            return {
                ...state,
                msgError:null
            }
        case types.uiStartLoading:
            return {
                ...state,
                loading:true
            }
        case types.uiFinishLoading:
            return {
                ...state,
                loading:false
            }
        default:
            return state
    }
}