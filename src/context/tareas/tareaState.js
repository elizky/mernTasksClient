import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA
} from "../../types";

const TareaState = props => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "elegir", estado: true, proyectoId: 1 },
      { id: 2, nombre: "asd", estado: false, proyectoId: 2 },
      { id: 3, nombre: "fasff", estado: true, proyectoId: 1 },
      { id: 4, nombre: "123123", estado: true, proyectoId: 1 },
      { id: 5, nombre: "asd", estado: false, proyectoId: 2 },
      { id: 6, nombre: "fasff", estado: true, proyectoId: 2 },
      { id: 7, nombre: "123123", estado: true, proyectoId: 1 },
      { id: 8, nombre: "asd", estado: false, proyectoId: 2 },
      { id: 9, nombre: "fasff", estado: true, proyectoId: 2 },
      { id: 10, nombre: "123123", estado: true, proyectoId: 1 }
    ],
    tareasproyecto: null,
    errortarea: false
  };

  //Crear dispatch y state

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Funciones

  //Obtener tareas de un proyecto
  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    });
  };

  //Agregar tarea al proyecto seleccionado
  const agregarTarea = tarea => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    });
  };

  //valida y muestra error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  //eliminar tarea por su id
  const eliminarTarea = id =>{
      dispatch({
          type: ELIMINAR_TAREA,
          payload: id
      })
  }

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
