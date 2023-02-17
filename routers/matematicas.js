const express = require('express');
const {matematicas} = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.get('/:tema', (req, res) => {
  const TEMA = req.params.tema;
  const RESULTADOS = matematicas.filter(curso => curso.tema === TEMA);
  if(RESULTADOS.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${TEMA}`);
  }
  return res.send(JSON.stringify(RESULTADOS))
});


routerMatematicas.get('/', (req, res) => {
  res.send(JSON.stringify(matematicas));
});


module.exports = routerMatematicas;