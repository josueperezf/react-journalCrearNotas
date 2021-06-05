import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { NoteScreen } from '../../../componentes/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';



// finjo el llamado a la accion activeNote
jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active: {
            id: 'y2xMESctTGX45n7xeUKP',
            title:'Hola',
            body:'Mundo',
            date: 0

        },
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
        <NoteScreen /> 
    </Provider>

)

describe('Pruebas en <NoteScreen/>', () => {
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar el active note', () => {
        /**
         * este metodo se dispara cada vez que un usuario selecciona una nota para editar, esta se almacenaria en el stado actual, en nota activa
         */
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name:'title',
                value:'Hola, modificado'
            }
        });
        // pregunta si ha sido llamada la accion activeNote
        // expect(activeNote).toHaveBeenCalled();
        // con los parametros esperados en el ultimpo cambio, esto es por que cuando se carga inicialmente se llamaria a activeNote,
        // pero nosotros no queremos ese evento sino el que nosotros gatillamos con el simulate, por ello buscamos el ultimo evento y con los parametros que queremos para estar mas seguros
        expect( activeNote ).toHaveBeenLastCalledWith(
            'y2xMESctTGX45n7xeUKP',
            {
                title: 'Hola, modificado',
                body: 'Mundo',
                id: 'y2xMESctTGX45n7xeUKP',
                date: 0
            }
        );
    })
    
    
})