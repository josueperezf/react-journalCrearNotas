## firebase

1. se creo un nuevo proyecto, le damos un nombre
2. debemos ir a la seccion de authentication, 
3. en sign-in method, y seleccionar correo electronico, marcamos habilitar, luego seleccionamos las opciones que salgan, menos la que diga 'Vínculo del correo electrónico(acceso sin contraseña)'
4. habilitamos en authentication ademas de correo electronico, la opcion de correo, si pide correo de soporte o algo asi, colocamos el de nosotros de gmail
5. para la atenticacion, debemos ir a <https://console.firebase.google.com/u/0/project/react-curso-udemy-30b6d/overview>, seleccionar web

6. en esa seccion colocamos un nombre, alli nos dara la informacion para que coloquemos en nuestro frontend

## base de datos en firebase

para crear la base de datos, debemos ir a <https://console.firebase.google.com/u/0/project/react-curso-udemy-30b6d/firestore>
1. seleccionar crear base de datos,
2. seleccionar 'iniciar modo de produccion'
3. dejar ubicacion recomendada que marca por default
4. presionamos habilitar
5. debemos ir a la pestaña de reglas y estar

        allow read, write: if false; => hace que cualquier usuario pueda insertar en nuestra base de datos
        allow read, write: if request.auth != null; => hace que solo los usuarios autenticados puedan realizar insert

## uso de redux

¿Qué veremos en esta sección?

1. Redux aplicado en nuestro proyecto
2. Firebase
3. FireStore
4. Redux Devtools
5. Thunk
6. Formularios
7. Google SingIn
8. Acciones Asíncronas
9. Mantener el estado de la autenticación


En esta sección configuraremos Redux en nuestro proyecto por primera vez, aplicado al inicio en la parte de la autenticación y mantener el estado de la misma a lo largo de toda la aplicación.

## plugins requeridos

1. para poder usar sass en la aplicacion debemos instalar

        npm install node-sass

2. manejo de rutas

        npx create-react-app demo-app

3. reducer <https://es.redux.js.org/>

        npm i -S redux
        npm i -S react-redux
        npm i -D redux-devtools

4. firebase

        npm i firebase

5. redux-thunk => sirve de middleware para realizar las tareas asincrona 'http' entre otras, sirve para el flujo que comento fernando middleware => dispactch => reducer

        npm install --save redux-thunk

6. validator => sirve para las validaciones de los inputs <https://www.npmjs.com/package/validator>

7. para el manejo de fechas: <https://momentjs.com/> para ver los formatos de fecha permitidos <https://momentjs.com/docs/#/displaying/format/>

        npm install moment --save

9. pruebas

        npm i --save-dev enzyme 
        npm install --save-dev @wojtekmaj/enzyme-adapter-react-17
        npm install --save-dev enzyme-to-json
        npm install --save-dev @testing-library/react-hooks
        
        dentro de la carpeta src/ debe existir un archivo llamado setupTests.js, sino existe lo debemos crear, en el pegamos lo siguiente:
        
        import Enzyme from 'enzyme';
        import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
        import {createSerializer} from 'enzyme-to-json';
        Enzyme.configure({ adapter: new Adapter() });
        expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

        npm i redux-mock-store => sirve para probarr acciones asíncronas y el middleware de Redux. <https://www.npmjs.com/package/redux-mock-store>

10. para facilitar eliminar imagenes desde cloudinary <https://cloudinary.com/documentation/node_integration> se usa la version de node no la de react por que es la mas usada, pero segun fernando, cualquiera de las dos podria servir

        npm install cloudinary --save-dev

        debemos importarlo en nuestro proyecto de la siguiente manera:

        import cloudinary from 'cloudinary';
        cloudinary.config({ 
        cloud_name: 'mi-cloud_name', 
        api_key: 'mi-api-key', 
        api_secret: 'mi-api_secret' 
        });
        mis credenciales deben estar en el dashboard: <https://cloudinary.com/console/c-6b509865b49f0e2c03d7aba9e32891>
         
        para ver como eliminar segun el lenguaje de programacion que estemos usando <https://cloudinary.com/documentation/admin_api#delete_resources> debemos seleccionar node en este ejemplo, en la seccion de delete
## subir imagenes

Para el almacenamiento de las imagenes,
1. se usara cloudinary, yo ya tengo cuenta alli,

2. debemos ir a <https://cloudinary.com/console/c-6b509865b49f0e2c03d7aba9e32891/settings/upload>

3. estando en la pestaña de upload debemos hacer click en: <b>Add upload preset</b>

4. firebase nos asigna un nombre, pero se lo cambiamos por el que queramos ejemplo <b>react-journal</b>

5. va a haber una opcion de <b>Signing Mode:</b> esto es para saber si van a ingresar solo las personas autenticadas o cualquiera,<b>signed es autenticado, unsigned es para no autenticados</b> para esta practica se uso, el unsigned

6. si cambiar ninguna de las demas opciones se presiona en SAVE.

7. despues de ello, vamos a la opcion del menu principal, llamada dashboard o tablero en español.

8. en el dashboard, en la seccion de  <b>account detail o detalles de la cuenta </b> presionamos <b>more o mas</b> segun el idioma, alli tendremos el <b>api base URL</b> que es la url que usaremos para subir una imagen o video, tambien tenemos servicio de editar imagenes, recortar videos y demas pero no se vera en este curso

9. copiamos la url que nos enseña en <b>api base URL</b>, ejemmplo <https://api.cloudinary.com/v1_1/josueperezf> la pegamos en postman como peticion <b>POST</b>, a esa url le pegamos la paralabra upload, ya que vamos a subir un archivo, quedando algo asi <https://api.cloudinary.com/v1_1/josueperezf/upload> .  seleccionamos en postman la pestaña de body, seguido form-data, y creamos una variable o key llama <b>file</b> debe ser de tipo file para que nos permita cargar archivos postman. seleccionamos la imagen que queramos cargar, creamos otra variable llamada <b>upload_preset</b> y el valor que tendra es el nombre que le dimos en <b>el paso 4</b> de esta seccion o guia <b>react-journal</b>

10. luego de subir el archivo, <b>cloudinary</b>  nos retorna un status code 200 por la carga exitosa, pero al mismo tiempo, varios datos, entre ellos la url que indica donde quedo almacena la imagen que acabamos de subir, <b>ejemplo</b> "secure_url": "https://res.cloudinary.com/josueperezf/image/upload/v1621173913/anzxecqd3rkwwahm6q3a.jpg", 

11. en la pestaña de <https://cloudinary.com/console/c-6b509865b49f0e2c03d7aba9e32891/media_library/folders/home> podriamos ver todos los archivos que hemos cargado

## variables de entorno

para usar variables de entorno debemos ir a la documentacion oficial <https://create-react-app.dev/docs/adding-custom-environment-variables>
debemos crear un archivo de nombre .env su contenido podria ser algo asi

                DOMAIN=www.example.com
                REACT_APP_FOO=$DOMAIN/foo
                REACT_APP_BAR=$DOMAIN/bar


se pueden crear variables de entorno para diferentes funciones, ejemplo
.env: Defecto.
.env.local: Anulaciones locales. Este archivo se carga para todos los entornos excepto test.
.env.development, .env.test, .env.production: Configuración del entorno específicos.
.env.development.local, .env.test.local, .env.production.local: Versiones locales de configuración de entorno específicas.

react sin necesidad de hacerle nada, sabe si estamos en desarrollo o test, ejemplo, si estamos viendo el proyecto desde el navegador, estaria de modo desarrollo <b>.env.development</b>.
si estamos corriendo el proyecto de modo npm run test, entonces usaria el archivo llamado <b>.env.test</b>

<b>NOTA</b> El valor de las variables de entorno no deben de ir entre comillas asi sean string, ademas no deben terminar con coma o punto y coma

## notas de las pruebas

1. los mock nos ayuda para simular llamadas, es decir a las acciones, en vez de la llamada ir a un servidor o lo que sea, nosotros podemos sobre escribir ese metodo como se muestra en el ejemplo y preguntar solo si fue llamada la funcion o no
                jest.mock('../../../actions/notes', () => ({
                        activeNote: jest.fn(),
                }));

2. para probar si se ejecutaron los dispatch usamos <b> import configureStore from 'redux-mock-store';import thunk from 'redux-thunk'; </b> esto iria acompañado de
        * let store = mockStore(initState); donde initState seria un objeto que tendria valores de los estado que podriamos necesitar.
        * store.dispatch = jest.fn(); sirve para que los dispatch que son simulados funcionen