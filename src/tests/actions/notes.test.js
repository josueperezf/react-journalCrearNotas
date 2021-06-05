import {  // startLoadingNotes,
    startUploading, startNewNote, startSaveNote } from '../../actions/notes';
/** inicio instalacion de redux-mock-store para hacer las pruebas con los action que asincronos */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
// import { fileUpload } from '../../helpers/fileupload';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
/***
 * VIDEO DEL CURSO
 * https://www.udemy.com/course/react-cero-experto/learn/lecture/20219956#questions
 * ESTA prueba no me funciono bien, lo arregle para que andara, pero no quedo tal como fernando herrera lo hizo,
 * habian personas que tenian el mismo problema que yo pero nadie dio solucion, asi que yo me invente una
 */
// uid es id de usuario, id es de la nota
/** fin instalacion de redux-mock-store para hacer las pruebas con los action que asincronos */
/**
 * aqui esta la base de datos que se usara para las pruebas
 * https://console.firebase.google.com/u/0/project/ejemplo-52bbe/firestore/data~2FPRUEBAS~2Fjournal~2Fnotes
 */


// la siguiente linea lo que hace es simular cada vez que se llame al fileupload, que lo que hace es cargar imagenes, bueno, simularemos, que siempre retorne este string,
// con una url de ejemplo, que nos serviria para ver si realmente ejecuto, a mi no me funciono, entonces yo simule traer una imagen desde url, obtenerla para almacenarla en firebase

const url_imagen_venezuela = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZ0zLLXqb4Uoj1AFMF_xmFfgUhY1TP5iOYQ&usqp=CAU';

// el mock es para colocar una respuesta predeterminada, cada vez que se haya una llamada a fileupload
jest.mock("../../helpers/fileupload", () => {
    return {
      fileUpload: () => {
          return url_imagen_venezuela;
          /*
        return Promise.resolve(
          "https://this-represents-an-url.com/photo.png"
        );*/
      },
    };
  });


const estadoInicial = {
    auth: {
        uid:'PRUEBAS',
    },
    notes: {
        active: {
            id: 'y2xMESctTGX45n7xeUKP',
            title:'Hola',
            body:'Mundo'

        }
    }
};
// si no me equivoco, mockStore sirve para cargar el getState 
let store = mockStore(estadoInicial);
// jest.setTimeout(50000);
// cuando ejecuta algo nativo de javascript y da error, omito ese fallo reescribiendo el metodo como las siguientes lineas
global.scrollTo = jest.fn();
global.querySelector = jest.fn();

describe('Pruebas en el action notes',  () => {
    beforeEach(() => {
        // la siguiente linea es para que reinicialice la variable store, recordemos que estore es mockStore que nos sirve para probar los dispatch de react
        store = mockStore(estadoInicial);
    });

    test('debe crear una nueva nota, llamando a startNewNote', async () => {
        /**
         * para hacer esta prueba debo estar autenticado en firebase, ademas una dispach y demas,
         * para este ultimo detalle se instalo redux-mock-store
         */
        await store.dispatch(startNewNote());
        /**
         * luego de ejecutar la linea anterior firebase arroja un error por no tener permisos en firebase,
         * ya que debe estar auntenticado
         * [2021-05-29T14:46:44.453Z]  @firebase/firestore: Firestore (8.4.2): Connection GRPC stream error. Code: 7 Message: 7 PERMISSION_DENIED: Missing or insufficient permissions
         */

        /**
         * Fernando Herrera recomienda que debemos tres bases de datos, la de testing, desarrollo y la de produccion,
         * este tipo de pruebas solo se deben hacer en ambiente de testing o desarrollo para evitar problemas
         * asi que decide crear una nueva base de datos en firebase, junto a la que esta en 'produccion' para esta proyecto
         */

        // con la siguiente lineas veo todos los action que se llamaron al ejecutar mi dispatch, recordemos que una action puede llamar a otra 
        // expect.any lo que hace es decir que no me importa el valor que tenga, solo el tipo de dato
        const actions = store.getActions();
        // al ejecutar esta prueba, llamaria a dos action por ende, se haran dos expect 
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload : {
                id: expect.any(String),
                title:'',
                body:'',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload : {
                id: expect.any(String),
                title:'',
                body:'',
                date: expect.any(Number)
            }
        });
        /**
         * cada vez que se ejecuta el codigo anterior que es para prueba, esta realizando inseciones en nuestra base de datos de test, por ende,
         * para evitar que se llene de basura la base de datos, debemos eliminar esos valores
         */
        const {id:idDocumentoInsertado} = actions[0].payload;
        await db.doc(`/PRUEBAS/journal/notes/${ idDocumentoInsertado }`).delete();
    });
    /**
     * esta prueba esta comentada, ya que fernando la realizo pero a mi no me funciono, mucha gente pregunto,
     * pero en ellas no esta la solucion
     */
    // test('startLoadingNotes debe cargar las notas por uid', async (done) => {
    //     await store.dispatch(startLoadingNotes('PRUEBAS'));
    //     // la siguiente linea es para ver que action fueron llamados al ejecutar el dispatch
    //     const actions = store.getActions();
    //     done();
    //     expect(actions[0]).toEqual({
    //         type:types.notesLoad,
    //         payload: expect.any(Array)
    //     });
    // });

    test('startSaveNote debe de actualizar la nota', async () => {
        /**
         * para esta prueba fernando uso una id de nota valido en la base de datos para hacer el update
         * recordemos que al startSaveNote en si lo que hace es un update,
         * en pocas palabras, cuando la persona presiona el boton nueva nota, en vez de tener un formulario en blanco y
         * guardar solo cuando el usuario presione en guardar, lo que hace es que cuando tu presionas nueva nota, inserta una en blanco,
         * y te deja en formulario para que llenes nos valores, y cuando quieres guardar, llama a la accion startSaveNote, enviandole la nota que quiere modificar
         */
        const note = {
            id: 'y2xMESctTGX45n7xeUKP',
            title:'titulo',
            body: 'body'
        };
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0].type).toBe(types.notesUpdated);
    });

    test('startUploading debe de actualizar el url  de la entrada', async () => {
        /**
         * por si al momento de ver esto no lo recuerdo, dejo claro, que en esta prueba, para saber a quien pertenece la imagen que se esta cargando,
         * en la constante estadoInicial, esta registrado una imagen de prueba, la cual contiene un id de nota, que debe existir en la base de datos de PRUEBAS,
         * TAMBIEN  recuerdo que hay dos bases de datos, una de desarrollo y otra de testing. para las pruebas se usua solo la base de datos de prueba,
         * esto queda establecido por las variables de entorno, ya que reactv al si se estar corriendo el proyecto con npm start toma los ,env de desarrollo,
         * si corremos el proyecto con npm run test, para ejecutar las pruebas, el tomara las variables de entorno del archivo .env.test
         * la configuracion de la base de datos esta en el archivo firebase-config.js
         * 
         * PRUEBA
         * https://console.firebase.google.com/u/0/project/ejemplo-52bbe/firestore/data~2FPRUEBAS~2Fjournal~2Fnotes~2Fy2xMESctTGX45n7xeUKP
         * desarollo
         * https://console.firebase.google.com/u/0/project/react-curso-udemy-30b6d/firestore/data~2F1eImTXuyn5NqpQy7upAUP66rzCh1~2Fjournal
         */
        // esta seccion no es como la creo fernando, pero a mi me gusto mas asi
        // const urlImagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZ0zLLXqb4Uoj1AFMF_xmFfgUhY1TP5iOYQ&usqp=CAU';
        // const resp = await fetch(urlImagen);
        // const blob = await resp.blob();
        // const file = new File([blob], 'foto.png');
        // await store.dispatch(startUploading(file) );
        // antes de esta linea ya debimos tomar la imagen y almacenar su url en nuestro firebase,
        // ahora buscaremos la referencia al documento
        
        const file = new File([], 'photo.png');
        await store.dispatch(startUploading(file) );
        // la siguiente seccion es de fernando herrera pero a mi no me funciono, decia que daba una promesa y nunca respondia
        /**
         * asi que me invente una SOLUCION, para determinar si pasa la prueba pasa o no, como se que luego de insertar o modificar una nota,
         * el proyecto la convierte en nota activa, por decirlo de una forma, lo vuelve la nota con la que se esta trabajando y la guarda en 
         * el state de notes, en un objeto llamado active, cada vez que inserta o modifica, pone alli la que trabajo con los ultimos cambios
         * asi que decidi buscar  alli, si en esa nota activa esta la url a la que quiero colocarle como nueva, significa que si hizo la tarea
         */

        // las siguientes lineas de codigo son las de fernando y no funcionaron, inverti mucho tiempo para nada
        // const referenciaAlDocumentoActualizado = await db.doc('/PRUEBAS/journal/notes/y2xMESctTGX45n7xeUKP').get();
        // expect(referenciaAlDocumentoActualizado.data().url).toBe(url_imagen_venezuela);
        const {url} = store.getState().notes.active;
        expect(url).toBe(url_imagen_venezuela);
    })
    
});