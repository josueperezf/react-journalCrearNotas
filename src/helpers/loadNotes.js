import { db } from "../firebase/firebase-config"

/**
 * lo que pasa es que firebase no envia la data como lo esperamos,
 * por ello es que se hace un ciclo foreach para ordenarla en el formato q necesitamos
 */
export const loadNotes = async (uid) => {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];
    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });
    // console.log(notes);
    return notes
}