import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el archivo el authReducer', () => {
    test('debe retornar mi estado por default', () => {
        const action = {type:null};
        const stateInicial = {};
        const state = authReducer(stateInicial, action);
        expect(state).toEqual(stateInicial);
    });

    test('debe realizar el login', () => {
        const action = {
            type:types.login,
            payload: {
                uid:'1234',
                displayName:'Josue'
            }
        };
        const stateInicial = {};
        const state = authReducer(stateInicial, action);
        expect(state).toEqual({uid:'1234',name:'Josue'});
    });
    test('debe retornar un objeto vacio al cerrar sesion', () => {
        const action = {
            type:types.logout,
        };
        const stateInicial = {};
        const state = authReducer(stateInicial, action);
        expect(state).toEqual({});
    })
    
    
});