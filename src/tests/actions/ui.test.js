import { removeErrorAction, setErrorAction, uiFinishLoading, uiStartLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas del action ui.js', () => {
    test('Todas las acciones deben de funcionar', () => {
        const mensajeError = 'Ayuda!!!!';
        const action = setErrorAction(mensajeError);
        expect(action).toEqual({
            type:types.uiSetError,
            payload:mensajeError
        });

        const ConstRemoveErrorAction = removeErrorAction();
        const ConstUiStartLoading    = uiStartLoading();
        const ConstUiFinishLoading   = uiFinishLoading();

        expect(ConstRemoveErrorAction).toEqual({
            type:types.uiRemoveError,
            payload:null
        });
        expect(ConstUiStartLoading).toEqual({
            type:types.uiStartLoading
        });
        expect(ConstUiFinishLoading).toEqual({
            type:types.uiFinishLoading
        });
    })
    
});