import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, starLogout, startLoginEmailPassword } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const estadoInicial = {};
// si no me equivoco, mockStore sirve para cargar el getState 
let store = mockStore(estadoInicial);

describe('Pruebas con las acciones de Auth',  () => {
    // beforeEach es es una funcion que se llama cada vez que se vaya a ejecutar un test(), se usa para reiniciar variables y cosas asi
    beforeEach(() => {
        store = mockStore(estadoInicial);
    });
    // si lo que se va es sync, se debe ejecutar dispactch, la siguiente funcion no lo es
    test('Login y logout deben de crear la accion respectiva', () => {
        // por josue
        const uid = 'abc';
        const displayName = 'Josue Perez';
        expect(login(uid, displayName).payload).toEqual({uid, displayName});
        expect(logout()).toEqual({type:types.logout});
    });

    test('debe de realizar el starLogout', async () => {
        await store.dispatch(starLogout());
        const actions = store.getActions();
        /**
         * al ejecutar el logout, auth.js ejecuta dos dispatch,
         * por ello debemos probar si los dos se ejecutan, asi mismo que sean del tipo esperado,
         * el mismo seria logout y notesLogoutCleaning
         */
        expect(actions[0]).toEqual({type: types.logout});
        expect(actions[1]).toEqual({type: types.notesLogoutCleaning});
    });

    test('debe iniciar el startLoginEmailPassword', async () => {
        /**
         * esta es para iniciar sesion con firebase,
         * IMPORTANTE, recordemos que para los test usamos una base de datos y oara desarrollo otra, 
         * asi que para esta necesitamos los usuarios que tengamos en la base de datos de firebase
         * https://console.firebase.google.com/u/0/project/ejemplo-52bbe/authentication/users
         */
        const email     ='josueperezf@gmail.com';
        const password  = '123456';
        await store.dispatch(startLoginEmailPassword(email, password));
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null,
            }
        });
    })
    
    
});