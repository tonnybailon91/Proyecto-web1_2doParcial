var firebaseConfig = {
  apiKey: "AIzaSyAgYt9jGy_jKQOQihgpIcyU8QfMMcYlPEI",
  authDomain: "proyectogestionarsilabos.firebaseapp.com",
  projectId: "proyectogestionarsilabos",
  storageBucket: "proyectogestionarsilabos.appspot.com",
  messagingSenderId: "816790329430",
  appId: "1:816790329430:web:b45c94d05ed0982899c3f7"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const asignaturaForm = document.querySelector('#asignatura-form');
const asignaturaContainer = document.getElementById('asignatura-container');
let editStatus = false;
let id= '';


//Coleccion en Firebase
const saveAsignatura = (codigo,asi,carrera,nivel,docente,descripcion) =>
  db.collection('Registro_Lista_Asignatura').doc().set({
    codigo,asi,carrera,nivel,docente,descripcion
  })
.then(function(docRef) {
    correcto1();

})
.catch(function(error){
    incorrecto1();
});
const correcto1 =()=>{
    Swal.fire(
        'Exelente!',
        'Se guardo correctamente!',
        'success'
    )
      //window.location='home.html';
    };

 const incorrecto1 =()=>{
    Swal.fire(
        'ERROR!',
        'No se pudo registrar!',
        'error'
      )
    }
    if(!saveAsignatura){
      Swal.fire(
        'ERROR!',
        'No se pudo registrar!',
        'error'
      )
    }
    

//Obtener TAREAS
const getAsignatura = () => db.collection('Registro_Lista_Asignatura').get();
const onGetTasks = (callback) => db.collection('Registro_Lista_Asignatura').onSnapshot(callback);
const deleteTask = id => db.collection("Registro_Lista_Asignatura").doc(id).delete();
const getTask = (id) => db.collection("Registro_Lista_Asignatura").doc(id).get();
const updateTask = (id, updatedTask) => db.collection("Registro_Lista_Asignatura").doc(id).update(updatedTask);




window.addEventListener('DOMContentLoaded', async (e) => {
  const querySnapshot = await getAsignatura();
  onGetTasks((querySnapshot) => {
    asignaturaContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      console.log(doc.data())

      const asignatura = doc.data();
      asignatura.id = doc.id;

      asignaturaContainer.innerHTML += `
      <link rel="stylesheet" href="Registro_lista_asignatura.css">
      <div class="card card-body mt-2 border-primary">
      <h3><b class="ac">ASIGNATURA REGISTRADA</b></h3>
      <p><b>Código: </b>${asignatura.codigo}</p>
      <p><b>Asignatura: </b>${asignatura.asi}</p>
      <p><b>Carrera: </b>${asignatura.carrera}</p>
      <p><b>Nivel: </b>${asignatura.nivel}</p>
      <p><b>Docente: </b>${asignatura.docente}</p>
      <p><b>Descripcion: </b>${asignatura.descripcion}</p>
      <div>
      <button class="btn btn-primary btn-borrar" data-id="${asignatura.id}" >🗑️ Eliminar </button>
      <button id="btnedi" class="btn btn-secundary btn-editar" data-id="${asignatura.id}"> ✏️ Editar </button>
  
      </div>
      <div>`

      const btnsBorrar = document.querySelectorAll('.btn-borrar')
      btnsBorrar.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          await deleteTask(e.target.dataset.id)
        })
      })
      // Funcion Editar
      const btnsEdit = document.querySelectorAll('.btn-editar');
      btnsEdit.forEach(btn =>{
      btn.addEventListener('click', async e =>{
      const doc= await getTask(e.target.dataset.id);
      const asignatura = doc.data();
       
       editStatus = true;
       id = doc.id;
      
       asignaturaForm['asignatura-codigo'].value = asignatura.codigo;
       asignaturaForm['asignatura-asi'].value = asignatura.asi;
       asignaturaForm['asignatura-carrera'].value = asignatura.carrera;
       asignaturaForm['asignatura-nivel'].value = asignatura.nivel;
       asignaturaForm['asignatura-docente'].value = asignatura.docente;
       asignaturaForm['asignatura-descripcion'].value = asignatura.descripcion;
       asignaturaForm ['btn-asignatura-form'].innerText ='Actualizar'
      })
      })
    });
  });

});

//Capturar Datos
asignaturaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const codigo = asignaturaForm['asignatura-codigo'];
  const asi = asignaturaForm['asignatura-asi'];
  const carrera = asignaturaForm['asignatura-carrera'];
  const nivel = asignaturaForm['asignatura-nivel'];
  const docente = asignaturaForm['asignatura-docente'];
  const descripcion = asignaturaForm['asignatura-descripcion'];
  

  //Validación para editar.
  if(!editStatus){
    await saveAsignatura(codigo.value,asi.value,carrera.value,nivel.value,docente.value, descripcion.value);
  } else {
    await updateTask(id,{
      codigo: codigo.value,
      carrera:carrera.value,
      asi:asi.value,
      nivel:nivel.value,
      docente:docente.value,
      descripcion: descripcion.value
    });
    editStatus= false;
    id='';
    asignaturaForm['btn-asignatura-form'].innerText = 'Guardar';
    
  }

  await getAsignatura();
  //Resetea el formulario.
  asignaturaForm.reset();
  codigo.focus();
  asi.focus();
  carrera.focus();
  nivel.focus();
  docente.focus();
  //Cursor se posiona alli.
});
