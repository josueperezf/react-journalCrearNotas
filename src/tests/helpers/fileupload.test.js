import { fileUpload } from "../../helpers/fileupload";
import cloudinary from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'josueperezf', 
    api_key: '144764244564265', 
    api_secret: 'liAql-624pHxPw27uqwitIl0VAk' 
  });

describe('Pruebas en el fileupload', () => {

    test('debe de cargar un archivo y retornal el url', async () => {
        const resp = await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZ0zLLXqb4Uoj1AFMF_xmFfgUhY1TP5iOYQ&usqp=CAU');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        // extraemos el id de la imagen que asigna cloudinary
        const segmento = url.split('/');
        const imagenId = segmento[segmento.length-1].replace('.png', '');
        cloudinary.v2.api.delete_resources(imagenId, {}, () => {} );
    });

    test('debe de retornar un error en caso de que no se envie un archivo', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
    
});