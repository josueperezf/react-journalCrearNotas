import { types } from "../types/types";
//  siempre el state debe estar inicializado con valor, puede ser vacio, un boolean, pero no undefined
// state = {}
export const authReducer = (state = {}, action)=> {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
        default:
            return state;
    }
}