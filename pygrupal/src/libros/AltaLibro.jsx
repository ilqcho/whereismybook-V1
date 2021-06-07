import '../App.css';
import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
import {Link} from "react-router-dom";

export default function AltaLibro(props){

    const dispatch = useDispatch();

    const categorias = useSelector((state) => state.categorias)

    const [formulario, setFormulario] = React.useState({
        nombre : "",
        descripcion: "",
        categoria_id: "",
    });
    
    const cambioNombre = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.nombre = e.target.value;
        setFormulario(nuevoFormulario);
    };

    const cambioDescripcion = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.descripcion = e.target.value;
        setFormulario(nuevoFormulario);
    };

    const cambioCategoria = (e) => {
        const nuevoFormulario = JSON.parse(JSON.stringify(formulario));
        nuevoFormulario.categoria_id = e.target.value;
        setFormulario(nuevoFormulario);
    };

    React.useEffect (async () => {
        try{    
            const respuesta = await axios.get("http://localhost:3000/api/categoria");
            dispatch({
                type: "LISTADO_CATEGORIAS",
                listado: respuesta.data
            });
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    }, []);

    const guardarCambios = async () => {
        try{
            const respuesta = await axios.post("http://localhost:3000/api/libro", formulario);

            dispatch({
                type: "AGREGAR_LIBRO",
                libro: respuesta.data
            });

            swal("YAY", "Libro agregado", "success");

            props.history.push("/libros/listado");

        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    }

    return(
        <div>
            <div>
                <h1 class="title-secondary">Agregar libro:</h1>
            </div>            
            <div class="form" id="form-register_book">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre" value={formulario.nombre} onChange={cambioNombre}/>
                <label>Descripción:</label>
                <input type="text" placeholder="Descripción" value={formulario.descripcion} onChange={cambioDescripcion}/>
                <label>Categoría:</label>
                <select name="categoria_id" onChange={cambioCategoria} required>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((unaCategoria) =>
                        unaCategoria ? (
                            <option value={unaCategoria.id}>{unaCategoria.nombre}</option>
                        ) : null
                    )}
                </select>
                <div class="center-bottom">
                    <button type="button" className="btn btn-primary" onClick={guardarCambios}>Guardar</button>
                    <Link to={"/libros/listado"}><button type="button" className="btn btn-secondary">Cancelar</button></Link>
                </div>
            </div>    
            <div class="center-bottom">
                <Link class="link" to={"/libros/listado"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg> Volver al listado de libros</Link>
            </div>
        </div>
    );
};