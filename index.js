const $registerNavButton = document.querySelector(".button-registro");
const $userNavButton = document.querySelector(".button-usuarios");
const $form = document.querySelector(".crud-form");
const $users = document.querySelector(".users-form");
const $user_errorP = document.getElementById("errorMsg");
const $registered = document.getElementById("alreadyRegistered");
const $fragment  = document.createDocumentFragment();
$users.style.display = "none";
const $deleteButton = document.getElementById("delete-button");

//CONTENT TABLE DOM
let $name_content = document.getElementById("name-content");
let $surname_content = document.getElementById("surname-content");
let $user_content = document.getElementById("user-content");
let $date_content = document.getElementById("date-content");
let $mail_content = document.getElementById("mail-content");



$registerNavButton.addEventListener("click", (event)=>{
     event.preventDefault();
     $form.style.display = "flex";
     $users.style.display = "none";


});
$userNavButton.addEventListener("click", (event)=>{
     event.preventDefault();
     $form.style.display = "none";
     $users.style.display = "block";

});

const getAll = async ()=>{
     try {
          let response = await fetch("http://localhost:3000/usuario");
          if(!response.ok){
               throw new Error("Algo ha ido mal: " + response.status)
          }else{

               let json = await response.json();
               console.log(response)
               if(json.length===0){
                    $name_content.textContent = ""; 
                    $surname_content.textContent = "";
                    $user_content.textContent = "";
                    $date_content.textContent = "";
                    $mail_content.textContent = "";
               }else{
                    json.forEach(element => {


                         $name_content.textContent = element.nombre; 
                         document.getElementById("button-edit-name").dataset.nombre = element.nombre;
                         document.getElementById("button-edit-name").dataset.id = element.id;
     
                         $surname_content.textContent = element.apellido;
                         document.getElementById("button-edit-surname").dataset.apellido = element.apellido;
                         document.getElementById("button-edit-surname").dataset.id = element.id;
     
                         $user_content.textContent = element.usuario;
                         document.getElementById("button-edit-user").dataset.usuario = element.usuario;
                         document.getElementById("button-edit-user").dataset.id = element.id;
     
                         $date_content.textContent = element.nacimiento;
                         document.getElementById("button-edit-date").dataset.nacimiento = element.nacimiento;
                         document.getElementById("button-edit-date").dataset.id = element.id;
     
                         $mail_content.textContent = element.email;
     
                         document.getElementById("delete-button").dataset.id = element.id;
     
     
                         
     
                    });
               }

          }

     } catch (error) {
          $user_errorP.textContent = error;

     }
}

document.addEventListener("DOMContentLoaded", getAll);

document.addEventListener("submit",async e=>{
     if(e.target===$form){
          e.preventDefault();


        // Obtener los elementos del formulario
        const id = e.target.elements.id.value;
        const nombre = e.target.elements.nombre.value;
        const apellidos = e.target.elements.apellidos.value; // Actualizado para coincidir con el formulario
        const usuario = e.target.elements.usuario.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value; // Actualizado para coincidir con el formulario
        const date = e.target.elements.date.value;

           // Log para verificar que los elementos están siendo accedidos correctamente
          console.log({ id, nombre, apellidos, usuario, email, password, date });

          let getUsersResponse = await fetch("http://localhost:3000/usuario");
          let users = await getUsersResponse.json();

        if(users.length === 0){
               //CREATE POST
               try {
                    console.log("en el try");
                    let options = {
                         method:"POST",
                         headers:{
                              "Content-type":"application/json; charset=utf-8"
                         },
                         body: JSON.stringify({
                              id: "0",
                              nombre: nombre,
                              apellido: apellidos, // Actualizado para coincidir con el formulario
                              usuario: usuario,
                              email: email,
                              contraseña: password, // Actualizado para coincidir con el formulario
                              nacimiento: date // Actualizado para coincidir con el formulario
                         })
                    };
                    let response = await fetch("http://localhost:3000/usuario",options)
                    let json = await response.json();

                    if(!response.ok){
                         throw new Error("Algo ha ido mal: " + response.status)
                    }else{
                         console.log("Datos enviados exitosamente:", json);
                         location.reload();
                    }
               } catch (error) {
                    $user_errorP.textContent = error;
               }
        }else{
          console.log("hay que hacer update, ya existe un user");
          $registered.textContent = "Ya estas registrado en la base de datos, si quieres eliminar tu perfil ve a la seccion Perfil."
        } 
     }

});

$deleteButton.addEventListener("click", async ()=>{
     try {
          let options = {
               method:"DELETE",
               headers:{
                    "Content-type":"application/json; charset=utf-8"
               }
          };
          let response = await fetch("http://localhost:3000/usuario/0",options);
          let json = await response.json();

          if(!response.ok){
               throw new Error("Algo ha ido mal: " + response.status)
          }else{
               console.log("Datos enviados exitosamente:", json);
               location.reload();
          }
     } catch (error) {
          $user_errorP.textContent = error;
     }
     
});
