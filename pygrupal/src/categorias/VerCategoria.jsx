import '../App.css';
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function VerCategoria(props){
    const params = useParams();
    const dispatch = useDispatch();
    const libros = useSelector((state) => state.libros);
    const listado = useSelector((state) => state.categorias);
    const [categorias, setCategorias] = React.useState({});

    React.useEffect(async () => {
        if(!listado || listado.length == 0) return;

        setCategorias(listado.find((unItem) => unItem.id == params.id));

    }, [params, listado]);

    React.useEffect(async () => {
        try{
            const respuesta = await axios.get("http://localhost:3000/api/libro");

            dispatch({
                type: "LISTADO_LIBROS",
                listado: respuesta.data
            });
        }
        catch(e){
            swal("Oops!", e.response.data, "error");
        }
    }, []);

    return(
        <div>
            <div>
                <h1 class="title-secondary">Detalle categoría</h1>
            </div>
            <div>
                <table class="card" id="card-ver_categoria">
                    <tr>
                        <td>
                            <ul>
                                <li>Nombre: {categorias.nombre}</li>
                                {libros.find((unItem) => unItem.categoria_id == categorias.id) ? (
                                    <li>Libros con esta categoría:
                                        <ul>
                                            {libros.map((unItem) =>
                                                unItem.categoria_id == categorias.id ? (
                                                    <li>{unItem.nombre}</li>
                                                ) : null
                                            )}
                                        </ul>
                                    </li> ) : <li>Libros con esta categoria: No hay libros todavía.</li>
                                }
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="center-bottom">
                <Link class="link" to = {"/categorias/listado"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg> Volver al listado de categorías</Link>
            </div>
        </div>
    );
}