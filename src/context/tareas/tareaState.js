import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  //Crear dispatch y state

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Funciones

  //Obtener tareas de un proyecto
  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto }
      });

      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //Agregar tarea al proyecto seleccionado
  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado)
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //valida y muestra error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  //eliminar tarea por su id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //edita tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //extrae tarea actual para editar
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
