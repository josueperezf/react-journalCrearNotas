import { types } from "../types/types"
import { autenticacionConGoogle, firebase } from '../firebase/firebase-config';
import { uiFinishLoading, uiStartLoading } from "./ui";
// startLoginEmailPassword funcionaria como el middleware, el dispatch seria la tarea que se llamaria al terminar la tarea asincrona
import Swal from 'sweetalert2';
import { noteLogout } from "./notes";
// console.log(process.env);
export const startLoginEmailPassword =  (email, password)=>{
    /**
     * estos dispatch llaman a todos los reducern,
     * y como el nombre de nuestros tipos o acciones son unicos,
     * entonces solamente un reducer ejecutara la accion
     */
    return (dispatch)=>{
        dispatch(uiStartLoading());
        // el return de la siguiente linea lo coloco fernando solo para que al momento de hacer las pruebas o test,
        // se pueda tener acceso a las acciones mas facilmente y saber si inicio sesion o no el usuario
        return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(async ({user})=>{
            dispatch(login(user.uid, user.displayName));
            dispatch(uiFinishLoading());
        }).catch((e)=>{
            console.log(e);
            // tambien quitamos el cargando cuando ocurre un error
            dispatch(uiFinishLoading());
            //usando sweetalert
            Swal.fire('Error', e.message ,'error');
        });
    }
}

export const registrarUsuario = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(async ({user})=>{
                    await user.updateProfile({displayName:name});
                    dispatch(login(user.uid, user.displayName));
                }).catch((e)=>{
                    console.log(e);
                    //usando sweetalert
                    Swal.fire('Error', e.message ,'error');
                });
    }
}

export const startGoogleLogin = ()=>{
    return (dispatch) => {
        firebase.auth().signInWithPopup(autenticacionConGoogle)
            .then(({user})=>{
                dispatch(login(user.uid, user.displayName));
            })
    }
}

export const login = (uid, displayName)=>{
    return {
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }
}

//asincrono
export const starLogout = () => {
    // console.log('entro al auth action, starLogout ');
    return async (dispatch) => {
        // la siguiente linea no necesita pasar el id de usuario o algo asi, porque firebase ya sabe que usuario soy
        await firebase.auth().signOut();
        dispatch(logout());
        // la siguiente linea es para que luego de cerrar sesion, todas las notas que esten almacenadas en el navegador
        dispatch(noteLogout());
    }   
}
export const logout = () => ({
    type:types.logout
})
