import {createStore} from "redux";

const estadoInicial = {
    personas: [],
    categorias: [],
    libros: []
}

function reducer(state = estadoInicial, action) {
    const nuevoEstado = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "AGREGAR_PERSONA":
            nuevoEstado.personas.push(action.posts);
            return nuevoEstado;

        case "LISTADO_PERSONAS":
            nuevoEstado.personas = action.listado;
            return nuevoEstado;
        
        case "ELIMINAR_PERSONA":
            nuevoEstado.personas = nuevoEstado.personas.filter(
                (unaPersona) => unaPersona.id !== action.idPersonaAEliminar);
            return nuevoEstado;

        case "AGREGAR_CATEGORIA":
            nuevoEstado.categorias.push(action.posts);
            return nuevoEstado;

        case "LISTADO_CATEGORIAS":
            nuevoEstado.categorias = action.listado;
            return nuevoEstado;
        
        case "ELIMINAR_CATEGORIA":
            nuevoEstado.categorias = nuevoEstado.categorias.filter(
                (unaCategoria) => unaCategoria.id !== action.idCategoriaAEliminar);
            return nuevoEstado;

        case "AGREGAR_LIBRO":
            nuevoEstado.libros.push(action.posts);
            return nuevoEstado;

        case "LISTADO_LIBROS":
            nuevoEstado.libros = action.listado;
            return nuevoEstado;

        case "ELIMINAR_LIBRO":
            nuevoEstado.libros = nuevoEstado.libros.filter(
                (unLibro) => unLibro.id !== action.idLibroAEliminar);
            return nuevoEstado;

        default:
            return state;
    }
}
export default createStore(reducer);