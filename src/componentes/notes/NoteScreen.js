import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const {active:nota} = useSelector(state => state.notes);
    // le envio toda la nota para que esos sean los campos que maneje el formulario, igual si no cambia el valor de alguno de ello no hay problema
    const [form, handleInputChange, reset] = useForm(nota);
    const { body, title, id } = form;
    /**
     * como este componente sera llamado cada vez que precione en una nota de la lista,
     * pasa que el formulario solo se dibuja con el primer elemento seleccionado, 
     * con los siguientes no, para ello fernando creo una variable llamada idActivo,
     * que al ser useRef, su valor no cambiara, solo cuando yo quiera,
     * 
     * para solucionar este problema se utilizo el useEffect, el cual analiza si el id que dijimos que no cambiara cada vez que se renderice,
     * es diferente al valor de la nota que acaba de seleccionar el usuario, entonces disparamos el metodo reset, para 
     * asignarle nuevos valores al formulario, asi mismo, a la variable que no cambia cada vez que se renderice,
     * le asignamos un nuevo valor que usaremos por si ocurren mas cambios
     */
    const idActivo = useRef(nota.id);
    useEffect(() => {
        if(idActivo.current !== nota.id) {
            reset(nota);
            idActivo.current = nota.id;
        }
    }, [nota, reset]);

    
    useEffect(() => {
        
        dispatch( activeNote( form.id, { ...form } ) );

    }, [form, dispatch])


    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (nota.url) &&
                    <div className="notes__image">
                        <img 
                            src={nota.url}
                            alt="imagen"
                        />
                    </div>
                }


            </div>
            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
