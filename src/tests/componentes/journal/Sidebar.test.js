import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { starLogout } from '../../../actions/auth';
import { Sidebar } from '../../../componentes/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    starLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Fernando'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
/**
 * IMPORTANTEEEEEEEEEEEEEEEEEEEEEEEEEEE
 * para evitar problemas al llamar el dispatch se hace la siguiente linea de codigo
 * store.dispatch = jest.fn();
 */
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>

)

describe('Pruebas en <Sidebar/>', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe de llamar a la accion logout', () => {
        wrapper.find('button').prop('onClick')()
        expect(starLogout).toHaveBeenCalled();
    });

    test('debe de llamar a la accion startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });
    
});