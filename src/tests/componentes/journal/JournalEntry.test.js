
import { JournalEntry } from "../../../componentes/journal/JournalEntry";
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
/**
 * IMPORTANTEEEEEEEEEEEEEEEEEEEEEEEEEEE
 * para evitar problemas al llamar el dispatch se hace la siguiente linea de codigo
 * store.dispatch = jest.fn();
 */
store.dispatch = jest.fn();

const nota = {
    id: 'y2xMESctTGX45n7xeUKP',
    title:'Hola',
    body:'Mundo',
    date: 0
};
const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry nota={nota}  /> 
    </Provider>

)

describe('Pruebas en <JournalEntry/>', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de activar la nota', () => {
        wrapper.find('div[className="journal__entry pointer animate__animated animate__fadeIn animate__faster"]').simulate('click');
        // la siguiente es otra forma de hacer la prueba, en ves de preguntar si la accion fue llamada usando un mock, se usa el store
        /**
         * como tengo esta linea store.dispatch = jest.fn();
         * puedo saber si una accion en especifica ha sido llamada y con que valores
         */
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(nota.id, nota)
        );
    })
});