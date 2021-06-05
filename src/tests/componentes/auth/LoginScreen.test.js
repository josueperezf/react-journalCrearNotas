import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme"
import { Provider } from "react-redux";
import { LoginScreen } from "../../../componentes/auth/LoginScreen"
import { MemoryRouter } from 'react-router';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => {
    return {
        startGoogleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn(),
    }
});


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const estadoInicial = {
    auth:{},
    ui: {
        loading: false,
        msgError: null
    }
};
let store = mockStore(estadoInicial);

// para este ejemplo como llama a dispactch y son funciones asincronas, pero no las quiero probar que hacen, sino si se llaman,
// entonces creo la siguiente linea
store.dispatch = jest.fn();

// MemoryRouter sirve para finjir las rutas y la navegacion
const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
    );

describe('Puebas en <LoginScreen/>', () => {
    // beforeEach es es una funcion que se llama cada vez que se vaya a ejecutar un test(), se usa para reiniciar variables y cosas asi
    beforeEach(() => {
        store = mockStore(estadoInicial);
    });

    test('Debe de mostrarse Correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar la Accion de startGoogleLogin', () => {
        // startGoogleLogin
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    test('debe de disparar el startLoginEmailPassword', () => {
        wrapper.find('form').prop('onSubmit')({ 
            preventDefault(){}
        });
        expect(startLoginEmailPassword).toHaveBeenCalled();
    })
    
})
