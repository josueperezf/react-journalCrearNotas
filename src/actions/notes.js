import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileupload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

/**
 * 
 * FERNANDO a todo lo que sea asincrono le antepone la palabra,
 * lo que no tengan el start en este archivo y sea asincrono,
 * fue que yo le coloque un nombre diferente para entenderlo mejor
 */
export const startNewNote = () => {
    // getState es casi igual al useSelector
    // en cualquier accion puedo usar el segundo parametro, el cual siempre la referencia a todos lo state 'auth, ui, notes etc'
    return async (dispatch, getState) => {
        // necesito el id de la persona
        const {uid} = getState().auth;
        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime()
        }

        try {
            const documento = await db.collection(`${uid}/journal/notes`).add(newNote);
            dispatch(activeNote(documento.id, newNote));
            dispatch(addNewNote(documento.id, newNote));
        } catch (error) {
            console.log(error);
        }
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

/**
 * sirve para refrescar el listado de notas localmente 'en el navegador', despues de agregar una
 */
export const addNewNote = (id, note) => ({
    type:types.notesAddNew,
    payload : {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type:types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});
/**
 * sirve para limpiar la data de los state que tengamos,
 * ya que al cerrar sesion, la sesion muere, pero esta data persiste
 */

 export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )
        

        Swal.close();
    }
}


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type:types.notesLogoutCleaning
});

