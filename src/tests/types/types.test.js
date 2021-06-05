import { types } from "../../types/types"

describe('Pruebas en el archivo types/types.js', () => {
    const typesEsperados = {
        login:          '[Auth] login',
        logout:         '[Auth] logout',
        
        uiSetError :    '[UI] set error',
        uiRemoveError : '[UI] remove error',
        
        uiStartLoading: '[UI] start loading',
        uiFinishLoading:'[UI] finish loading',
    
        notesAddNew:        '[Notes] new note',
        notesActive:        '[Notes] set active note',
        notesLoad :         '[Notes] load notes',
        notesUpdated :      '[Notes] updated note',
        notesFileUrl:       '[Notes] update image url',
        notesDelete:        '[Notes] delete note',
        notesLogoutCleaning:'[Notes] logout cleaning',
    }
    test('Debe tener ciertos tipos', () => {
        // comparo que los objetos sean iguales
        expect(typesEsperados).toEqual(types);
    });
    
})