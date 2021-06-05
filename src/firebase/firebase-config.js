import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// console.log(process.env);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain:process.env.REACT_APP_AUTHDOMAIN,
    projectId:process.env.REACT_APP_PROJECTID,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
    appId:process.env.REACT_APP_APPID
};
/**
 * la seccion que esta comentada, es por que fernando uso dos base de datos, una para prueba y la otra para desarrollo,
 * por ende, lo  que esta comentado tiene en duro los valores, en cambio el decidio crear variables de entorno para hacer mejor el trabajo
 * la documentacion de las variables de entorno esta en: https://create-react-app.dev/docs/adding-custom-environment-variables
 * es de destacar, que para que React lea las varibales de entorno, toda variable debe llevar el prefijo  REACT_APP_
 * si no se pone este prefijo, react no encontrara la variable,
 * ademas si se crea o modifica una variable, se debe bajar y levantar el proyecto de nuevo
 */

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyA3t7HiYwoGQPvqq-xC4-7MrAx2O8Rm2Bs",
//   authDomain: "ejemplo-52bbe.firebaseapp.com",
//   projectId: "ejemplo-52bbe",
//   storageBucket: "ejemplo-52bbe.appspot.com",
//   messagingSenderId: "1061148988404",
//   appId: "1:1061148988404:web:48a59df044f6c776df1fa1"
// };

// /**
//  * los siguientes if es para que cuando le estemos haciendo las pruebas unitarias use una base de datos de firebase,
//  * y cuando estemos en desarrollo o produccio, use otra
//  */
// if (process.env.NODE_ENV === 'test') {
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // produccion
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const autenticacionConGoogle = new firebase.auth.GoogleAuthProvider();
export {
    db,
    autenticacionConGoogle,
    firebase
}