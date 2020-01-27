import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas } = tareasContext;

  const [proyectoAcutal] = proyecto

  //funcion eliminar
  const tareaEliminar = id => {
    eliminarTarea(id);
    obtenerTareas(proyectoAcutal.id)
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo">
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto">
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button className="btn btn-primario" type="button">
          Editar
        </button>
        <button
          className="btn btn-secundario"
          type="button"
          onClick={() => tareaEliminar(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
