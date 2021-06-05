import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    component:Component,
    ...rest
}) => {
    /**
     * este router recibe tres parametros
     * isAuthenticated => boolean que determina si tiene usuario o no, sino tiene usuario lo manda a login
     * component:Component => recibe component, como es un componente lo renombra a Component con la letra mayuscula
     * este lo que hace es recibir el componente de la ruta que quiere renderizar,  al recibirlo si esta autenticado lo carga, sino a login
     * ...rest => es para que todos los demas parametros que pueda recibir no los pierda, sino que los envie al componente que venga por Component
     */

    /**
     *  el return tiene un route basico, pero en la seccion de component, recibe una funcion, que en vez de llaves tiene parentesis
     * {...rest} => envia todos los parametros que el tenga
     * component evalua si esta autenticado, si lo esta, los props o mejor dicho, los parametros que recibe la el componentes,
     * se los envia a Component para que no los pierda
     */
     
    // localStorage.setItem('ultimaRuta',rest.location.pathname+rest.location.search );
    return (
        <Route
            {...rest}
            component={ (props)=>(
                (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to='/auth/login' />)
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
}