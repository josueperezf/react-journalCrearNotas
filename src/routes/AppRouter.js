import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { JournalScreen } from '../componentes/journal/JournalScreen';
import firebase from 'firebase/app';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
export const AppRouter = () => {
    const dispatch = useDispatch();
    /**
     * en este proyecto, si la persona refresca la pagina, no busca en el localstorage,
     * en su lugar va a firebase y realiza una pregunta, la misma esta en el bloque de useEfect
     * como esta tarea puede tardar dependiendo del internet,
     * ademas de que no sabemos si la persona esta autenticada o no.
     * entonces usamos un useState que es para manejar una variable reactiva tipo angular
     * cuando esta en true debe poner el <h1>Espere...</h1>, cuando ya haga la peticion a firebase y obtenga respuesta le cambiamos ese valor a falso
     * luego de cambiar a falso, le permitimos que siga ejecutando el bloque de codigo que sigue, que seria el router y demas
     * en conclusion es para saber si esta cargando o no
     */
    const [checking, setChecking] = useState(true)
    // el siguiente bloque es pasa saber si firebase me responde si esta logueado o no,
    // recordemos que a ese metodo no hay que pasarle nada, ya que firebase ya sabe que maquina soy y que usuario tiene la sesion
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // sirve para detectar cuando la autenticacion cambia
        firebase.auth().onAuthStateChanged( async (user) => {
            //si esta autenticado
            if(user?.uid) {
                dispatch(login(user?.uid, user.displayName));
                setIsLoggedIn(true);
                // como sabemos a donde va a redirigir, cargamos la data de la base de firebase
                dispatch(startLoadingNotes(user?.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
        // la siguiente linea era [],  pero la consola del navegador sugirio que colocaramos el dispatch, aunque sabemos que la funcion dispach no va a cambiar, solo sera llamada
        // digamos que entre los corchetes colocamos lo que tengamos dentro del useEffect y sea definido o creado fuera de ese useEffect,
        // ejemplo setIsLoggedIn fue creado fuera del bloque del useEffect, pero usado dentro, por ende es opcional, pero se coloca entre [], asi sepamos que no va a cambiar
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    /**
     * PublicRoute hace que si trata de entrar a una ruta donde por obligacion debe de NO ESTAR autenticado,
     * y si esta autentica, lo debe redirigir a la raiz
     * ejemplo, si trata de entrar a login y ya esta logueado, no lo deja entrar, sino lo lleva a la ruta raiz
     */

    /**
     * PrivateRoute es para controlar que puedan entrar solo los logueados, si no lo estan los lleva a la raiz '/'
     */
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/" component={JournalScreen}
                    />
                    <Redirect to='auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
