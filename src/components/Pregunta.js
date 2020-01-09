import React, { Fragment, useState } from "react";
import Error from "./Error";

const Pregunta = props => {
  const { guardarPresupuesto, guardarPreguntaPresupuesto, guardarRestante } = props;
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const agregarPresupuesto = e => {
    e.preventDefault();
    //valida
    if (cantidad <= 0 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }
    //si esta todo ok
    guardarError(false);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad)
    guardarPreguntaPresupuesto(false);
  };
  return (
    <Fragment>
      <h2>Coloca tu Presupuesto</h2>
      {error ? <Error mensaje={"El presupuesto es incorrecto"} /> : null}
      <form onSubmit={agregarPresupuesto}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Agrega tu Presupuesto"
          onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
        />
        <input
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />
      </form>
    </Fragment>
  );
};

export default Pregunta;
