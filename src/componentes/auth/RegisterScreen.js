import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { registrarUsuario } from '../../actions/auth';

export const RegisterScreen = () => {
    // la siguiente linea me permite llamar a cualquiera de mis reducer, pasandoselo como parametro
    const dispatch = useDispatch();
    // sirve para obtener los valores del state en general, toda la data que tengan, por ello,
    // debemos especificar de que reducer queremos obtener el state o mejor dicho los valores si cambian y demas
    // const state = useSelector(state => state.ui)
    const {msgError} = useSelector(state => state.ui)
    const [form, handleInputChange] = useForm({
        name:'josue',
        email:'josueperezf@gmail.com',
        password:'123456',
        password2:'123456'

    });
    const {name, email, password, password2} = form;

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(registrarUsuario(email, password,name));
        }
    }
    const isFormValid = () => {
        // setErrorAction
        if(name.trim().length === 0) {
            dispatch(setErrorAction('Name es requerido'));
            // console.log('name es requerido');
            return false;
        } else if(! validator.isEmail(email)) {
            dispatch(setErrorAction('Email no es valido'));
            // console.log('email no es valido');
            return false;
        } else if(password !== password2 || password.length <5 ) {
            dispatch(setErrorAction('Password debe ser igual y tener minimo 5 caracteres'));
            // console.log('password debe ser igual y tener minimo 5 caracteres');
            return false;
        }
        dispatch(removeErrorAction());
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister} className="animate__animated  animate__fadeIn animate__faster">
                {
                    msgError &&
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>)

                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
