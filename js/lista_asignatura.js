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
const saveAsignatura = (titulo, descripcion) =>
  db.collection('Lista_Asignatura').doc().set({
    titulo, descripcion
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

//Obtener TAREAS
const getAsignatura = () => db.collection('Lista_Asignatura').get();
const onGetTasks = (callback) => db.collection('Lista_Asignatura').onSnapshot(callback);
const deleteTask = id => db.collection("Lista_Asignatura").doc(id).delete();
const getTask = (id) => db.collection("Lista_Asignatura").doc(id).get();
const updateTask = (id, updatedTask) => db.collection("Lista_Asignatura").doc(id).update(updatedTask);




window.addEventListener('DOMContentLoaded', async (e) => {
  const querySnapshot = await getAsignatura();
  onGetTasks((querySnapshot) => {
    asignaturaContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      console.log(doc.data())

      const asignatura = doc.data();
      asignatura.id = doc.id;

      asignaturaContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
      <h3>${asignatura.titulo}</h3>
      <p>${asignatura.descripcion}</p>
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
      
       asignaturaForm['asignatura-titulo'].value = asignatura.titulo;
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
  const titulo = asignaturaForm['asignatura-titulo'];
  const descripcion = asignaturaForm['asignatura-descripcion'];
  

  //Validación para editar.
  if(!editStatus){
    await saveAsignatura(titulo.value, descripcion.value);
  } else {
    await updateTask(id,{
      titulo: titulo.value,
      descripcion: descripcion.value
    });
    editStatus= false;
    id='';
    asignaturaForm['btn-asignatura-form'].innerText = 'Guardar';
  }

  await getAsignatura();
  //Resetea el formulario.
  asignaturaForm.reset();
  titulo.focus();//Cursor se posiona alli.
});
