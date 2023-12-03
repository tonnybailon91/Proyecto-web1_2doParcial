/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
// Funciones de los botones cancelar y volver.
function cancelar(){
    window.location='Registro_lista_asignatura.html';
}
    function volver(){
    window.location='home.html';
}
const codigo= document.getElementById("asignatura-codigo");
const asignatura= document.getElementById("asignatura-asi");
const carrera= document.getElementById("asignatura-carrera");
const nivel= document.getElementById("asignatura-nivel");
const docente = document.getElementById("asignatura-docente");
const form = document.getElementById("asignatura-form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings=""
    let entrar = false
   //EXPRESIONES REGULARES
   let codigoasi = /^[a-zA-Z0-9\_\-]{1,10}$/ // Letras, numeros, guion y guion_bajo
   let asignaturasi =/^[a-zA-ZÀ-ÿ\s]{1,40}$/
   let carrerasi = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
   let nivelasi = /^[a-zA-Z0-9\_\-]{1,40}$/ 
   let docenteasi = /^[a-zA-ZÀ-ÿ\s]{1,40}$/

   //VALIDACION CODIGO ASIGNATURA
   console.log(codigoasi.test(codigo.value))
   if(!codigoasi.test(codigo.value)){
    warnings +=` <ul> <li>Asignatura inválida <br></li></ul>`
    alert('El código es invalido');
    entrar= true;
   } 
   //VALIDACION ASIGNATURA
   console.log(asignaturasi.test(asignatura.value))
   if(!asignaturasi.test(asignatura.value)){
    warnings +=` <ul> <li>Asignatura incorrecta <br></li></ul>`
    alert('La asignatura  es invalida');
    entrar= true;
   }
  // VALIDACION CARRERA ASIGNATURA
   console.log(carrerasi.test(carrera.value))
   if(!carrerasi.test(carrera.value)){
    warnings +=`<ul> <li>Carrera inválida <br></li></ul>`
    alert('La carrera es invalida');
    entrar= true;
   }
//VALIDACION Nivel ASIGNATURA
console.log(nivelasi.test(nivel.value))
if(!nivelasi.test(nivel.value)){
 warnings +=`<ul> <li>Nivel inválido <br></li></ul>`
 alert('Nivel invalido');
 entrar= true;
}
//VALIDACION  DOCENTE ASIGNATURA
console.log(docenteasi.test(docente.value))
if(!docenteasi.test(docente.value)){
 warnings +=`<ul> <li>Asignatura inválido <br></li></ul>`
alert('Docente incorrecto');
 entrar= true;
}
   if(entrar){
    parrafo.innerHTML = warnings 
   }
});

