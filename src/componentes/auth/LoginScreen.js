import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { removeErrorAction, setErrorAction } from '../../actions/ui';

export const LoginScreen = () => {
    // sirve para llamar a cualquier function de los archivos que tengo en la carpeta action
    const dispatch = useDispatch();
    const [ formValues, handleInputChange] = useForm({

        email:'magdalena@gmail.com',
        password:'123456',
    });
    // el useSelector, nos permite obtener el valor del estado de un reducer en especifico
    // sirve para tener el  valor del state del reducer, en este caso de ui
    const {msgError, loading} = useSelector(state => state.ui);

    const {email, password} = formValues;

    const handleLogin = (e)=>{
        e.preventDefault();
        if (validaciones()) {
            dispatch(startLoginEmailPassword(email, password));
        }

    }
    const handleGoogleLogin = ()=>{
        dispatch(startGoogleLogin());
    }
    const validaciones = () =>{
        if(email.trim().length ===0) {
            // console.log('el correo es requerido');
            dispatch(setErrorAction('el correo es requerido'));
            return false;
        } else if(!validator.isEmail(email)) {
            // console.log('debe ser un correo valido');
            dispatch(setErrorAction('debe ser un correo valido'));
            return false;
        } else if(password.trim().length === 0) {
            // console.log('el password es requerido');
            dispatch(setErrorAction('el password es requerido'));
            return false;
        }
        dispatch(removeErrorAction());
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Login</h3>
                {
                    msgError &&
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>)

                }
            <form onSubmit={handleLogin} className="animate__animated  animate__fadeIn animate__faster">

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


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
