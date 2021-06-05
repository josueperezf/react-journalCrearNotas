import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { types } from '../../../types/types';
import { RegisterScreen } from '../../../componentes/auth/RegisterScreen';

// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn(),
// }))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const estadoInicial = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(estadoInicial);
// store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>

)




describe('Pruebas en <RegisterScreen/>', () => {

    test('debe funcionar correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de hacer el dispatch de la accion respectiva', () => {
        /**
         * se simula que trata de enviar los datos para registrar, con un email vacio, esto debe retornar un mensaje de error, si lo hace, pasa la prueba
         */
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email no es valido'
        });
    });

    test('debe de mostrar la caja de alerta con el error', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        };
        
        const store = mockStore(initState);
        
        const wrapper = mount( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );

        
        expect( wrapper.find('.auth__alert-error').exists()  ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim()  ).toBe( initState.ui.msgError );


        
    })
    
    
})
