const { Router } = require('express');
const express = require('express');
const {programacion} = require('../datos/cursos.js').infoCursos;
const routerProgramacion = express.Router();


routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(programacion));
});

//Middleware
routerProgramacion.use(express.json());

routerProgramacion.get('/:lenguaje', (req, res) => {
  const LENGUAJE = req.params.lenguaje;
  const RESULTADOS = programacion.filter(curso => curso.lenguaje === LENGUAJE);
  if(RESULTADOS.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${LENGUAJE}`);
  }
  //console.log(req.query.ordenar);
  if(req.query.ordenar === 'vistas'){
  return  res.send(JSON.stringify(RESULTADOS.sort((a,b) => b.vistas - a.vistas)));
  }
  return res.send(JSON.stringify(RESULTADOS));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const LENGUAJE = req.params.lenguaje;
  const NIVEL = req.params.nivel;
  const RESULTADOS = programacion
  .filter(curso => curso.lenguaje === LENGUAJE && curso.nivel === NIVEL);

  if(RESULTADOS.length === 0){
    // return res.status(404).send(`No se encontraron cursos de ${LENGUAJE} DE NIVEL ${NIVEL}`)
    return res.status(404).end();
  }
  return res.send(JSON.stringify(RESULTADOS));
});

routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body;
  console.log(cursoNuevo);
  programacion.push(cursoNuevo);
  return res.send(JSON.stringify(programacion));
});

routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0){
    programacion[indice] = cursoActualizado;
  }
  return res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res) =>{
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice =  programacion.findIndex(curso => curso.id == id);
  if(indice >= 0){
    const cursoAmodificar = programacion[indice];
    Object.assign(cursoAmodificar, infoActualizada);
  }
  return res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);
  console.log(indice);
  if(indice >= 0){
    console.log(programacion[indice]);
    programacion.splice(indice, 1);
  }
  res.send(programacion);
});

module.exports = routerProgramacion;