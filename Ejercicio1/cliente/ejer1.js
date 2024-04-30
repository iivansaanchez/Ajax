//Rescatamos el input y el boton
const input = document.getElementById('login');
const botton = document.getElementById('comprobar');

//Almacenamos en una variable la peticion
const peticion = new XMLHttpRequest();
//Creamos un parrafo
const parrafo = document.createElement('p');
//Añadimos el parrafo al body
document.body.appendChild(parrafo);

//Cuando pulsemos el boton de comprobar disparamos un evento
botton.addEventListener('click', function(){
    //Una vez pulsado abrimos la peticion
    peticion.open('GET', 'https://intranetjacaranda.es/Ejercicios/compruebaDisponibilidad.php');
    //Enviamos la peticion
    peticion.send();
    //Creamos un evento que se dispare cuando la peticion este en su ultimo estado
    peticion.addEventListener('load', function() {
        //Si la respuesta de la peticion es 200 --> OK
        if(peticion.status === 200){
            //Almacenamos la respuesta de la peticion
            let response = peticion.responseText;
            //Le introducimos al parrafo la respuesta
            parrafo.innerHTML = `El nombre de usuario: ${input.value} ${response} está disponible`;
        }else{
            muestraError();
        }
    })
})
//Si da error
peticion.addEventListener('error', muestraError);
//Si se aborta la peticion
peticion.addEventListener('abort', muestraError);
//Si el tiempo estimado se acaba
peticion.addEventListener('timeout', muestraError);

function muestraError() {
    if (this.status) {
        console.log("Error "+this.status+" ("+this.statusText+") en la petición");
    } else {
        console.log("Ocurrió un error o se abortó la conexión");
    }
}
