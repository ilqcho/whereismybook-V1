import React from "react";

export default function Imagen(props){
    return(
        <div>
            <img src={props.url} class="imagen-personas" alt="img" />
        </div>
    )
}