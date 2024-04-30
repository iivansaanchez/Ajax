//En primer lugar rescatamos el input y el boton comprobar
const boton = document.getElementById("comprobar");
const input = document.getElementById("login");

//En segundo lugar debemos almacenar en una variable la peticion
const peticion = new XMLHttpRequest();
//Creamos un parrafo y lo añadimos al body
const parrafo = document.createElement('p');
document.body.appendChild(parrafo);
//Rescatamos el ul que hemos creado en el html
const ul = document.getElementById("lista");



//Vamos a crear un evento para cuando pulsemos el boton haga la peticion
boton.addEventListener("click", function() {
    //Una vez pulsado el boton abrimos la peticion que este caso sera una peticion GET
    peticion.open('GET', 'https://intranetjacaranda.es/Ejercicios/compruebaDisponibilidadXML.php');
    //Una vez abierta/creada la enviamos
    peticion.send();
    //El evento siguiente saltara cuando la peticion haya llegado a su ultimo estado
    peticion.addEventListener("load", function() {
        //Una vez dentro comprobamos que la peticion este en un estado OK/200
        if(peticion.status === 200){
            //Almacenamos la respuesta de la peticion, que en este caso la respuesta que da es en xml
            let response = peticion.responseXML;
            //Limpiamos la lista cada vez que se haga la peticion para evitar duplicacion
            ul.innerHTML = "";
            
            //Una vez que tenemos la respuesta tenemos que sacar el valor de dentro de la etiqueta disponible
            let disponibilidad = response.querySelector('disponible').textContent;
            
            //Ahora que tenemos la respuesta almacenada en dispinibilidad debemos controlar si la respuesta es si o no
            if(disponibilidad === "si"){
                //Si esta disnible devolvemos el valor solo del parrafo
                parrafo.innerHTML = `El nombre de usuario: ${input.value} ${disponibilidad} está disponible`;
            }else{
                //Si es no devolvemos el valor del parrafo y una lista con posibles nombres de usuario
                parrafo.innerHTML = `El nombre de usuario: ${input.value} ${disponibilidad} está disponible`;
                //Recogemos las posibles alternativas que estan en la etiqueta alternativas y luego en la etiqueta login
                //querySelectorAll devuelve un NodeList por lo tanto habria que pasarlo a array
                let alternativas = response.querySelectorAll('alternativas login');
                //Pasamos alternativas a un array usando array.from
                alternativas = Array.from(alternativas);
                console.log(alternativas)
                //Recorremos las alternativas
                alternativas.forEach(function(alternativa) {
                    //Creamos boton seleccionar
                    const seleccionar = document.createElement('button');
                    seleccionar.innerHTML = "Selecionar";
                    //Creamos un li
                    let li = document.createElement('li');
                    //Le añadimos contenido al li
                    li.textContent = `${input.value}` + alternativa.textContent;
                    li.appendChild(seleccionar);
                    console.log(li);
                    //Por ultimo lo añadimos al ul
                    ul.appendChild(li);
                })
            }
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