import React, { useReducer } from "react";
import uuid from 'uuid'
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from "../../types";

const ProyectoState = props => {

  const proyectos = [
    { id: 1, nombre: "funciona?" },
    { id: 2, nombre: "ta" }
  ];
  const initialState = {
    //al apretar el boton nuevo proyecto aparece
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null
  };

  //dispacth para ejecutar acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //funciones para el CRUD

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  //obtener proyectos
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    });
  };

  //Agregar nuevo proyecto
  const agregarProyecto = proyecto =>{
      proyecto.id = uuid.v4()

      //insertar el proyecto en el state
      dispatch({
          type: AGREGAR_PROYECTO,
          payload: proyecto
      })
  }

  //
  const mostrarError = () => {
      dispatch({
          type: VALIDAR_FORMULARIO

      })
  }
  //selecciona el proyecto que dio click
  const proyectoActual = proyectoId => {
      dispatch({
          type: PROYECTO_ACTUAL,
          payload: proyectoId
      })
  }

  //elimina un proyecto
  const eliminarProyecto = proyectoId => {
      dispatch({
          type: ELIMINAR_PROYECTO,
          payload : proyectoId
      })
  }


  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
