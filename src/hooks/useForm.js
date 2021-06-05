import { useState } from 'react'

// initialState es el nombre de los input que deseo que tenga el formulario
export const useForm = (initialState = {}) => {
    const [values, setvalues] = useState(initialState);
    // reset en los input su valor inicial, pero si se le envia una nueva data, entonces coloca esos valores nuevo a los value de los input
    const reset = (newStateForm = initialState)=>{
        setvalues(newStateForm);
    }
    const handleInputChange = ({target})=>{
        setvalues({
            ...values,
            [target.name]:target.value
        });
    }
    return [values, handleInputChange, reset];
}