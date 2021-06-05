import { types } from "../types/types"

export const setErrorAction = (error) => ({
    type:types.uiSetError,
    payload:error
});

export const removeErrorAction = () => ({
    type:types.uiRemoveError,
    payload:null
});

export const uiStartLoading = () => ({
    type:types.uiStartLoading,
});

export const uiFinishLoading = () => ({
    type:types.uiFinishLoading,
});