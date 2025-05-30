class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class Pila {
    constructor(nombre) {
        this.nombre = nombre;
        this.cima = null;
    }

    apilar(valor) {
        const nuevo = new Nodo(valor);
        nuevo.siguiente = this.cima;
        this.cima = nuevo;
    }

    desapilar() {
        if (this.estaVacia()) return null;
        const valor = this.cima.valor;
        this.cima = this.cima.siguiente;
        return valor;
    }

    verCima() {
        return this.estaVacia() ? Infinity : this.cima.valor;
    }

    estaVacia() {
        return this.cima === null;
    }

    obtenerDiscos() {
        let actual = this.cima;
        let discos = [];
        while (actual) {
            discos.push(actual.valor);
            actual = actual.siguiente;
        }
        return discos;
    }

    cantidad_Discos() {
        let actual = this.cima;
        let contador = 0;
        while (actual) {
            contador++;
            actual = actual.siguiente;
        }
        return contador;
    }
}
function BotonesMoverInhabilitados() {
    document.getElementById("boton_A").disabled = true;
    document.getElementById("boton_B").disabled = true;
    document.getElementById("boton_C").disabled = true;
    document.getElementById("autogame").disabled = true; // Desactiva el botón de jugar automático
    console.log("Botones inhabilitados");
}

BotonesMoverInhabilitados();
document.getElementById("resetgame").disabled = true; // Habilita el botón de reiniciar juego
document.getElementById("stopgame").disabled = true; // Habilita el botón de detener juego automático

function BotonesMoverHabilitados() {
    document.getElementById("boton_A").disabled = false;
    document.getElementById("boton_B").disabled = false;
    document.getElementById("boton_C").disabled = false;
    document.getElementById("autogame").disabled = false; // Desactiva el botón de jugar automático
    console.log("Botones Habilitados");
}



function iniciarJuego() {
    
    document.getElementById("boton_A").disabled = false;
    document.getElementById("boton_B").disabled = false;
    document.getElementById("boton_C").disabled = false;
    document.getElementById("autogame").disabled = false; // Habilita el botón de jugar automático
    console.log("Iniciando juego... Botones habilitados");
    document.getElementById("numDiscos").disabled = true; // Desactiva el input
    document.getElementById("go").disabled = true; // Desactiva el botón de jugar
    const n = parseInt(document.getElementById("numDiscos").value, 10); 

    if (isNaN(n) || n <= 0) {
        alert("Por favor, ingrese un número de discos válido.");
        return;
    }

    const torreA = new Pila("A");
    const torreB = new Pila("B");
    const torreC = new Pila("C");

    torres = { A: torreA, B: torreB, C: torreC };
  
    for (let i = n; i >= 1; i--) {
      torreA.apilar(i);
    }
  
    movimientos = 0;
    const minMov = Math.pow(2, n) - 1;
    document.getElementById("minMov").textContent = minMov;
    document.getElementById("realMov").textContent = movimientos;
    document.getElementById("resetgame").disabled = false; // Habilita el botón de reiniciar juego
    actualizar_torre();
    
}
  
function actualizar_torre() {
    ["A", "B", "C"].forEach(id => {
        const contenedor = document.getElementById("torre" + id);
        contenedor.innerHTML = "";
        const discos = torres[id].obtenerDiscos();

        // ¡Aquí está el cambio clave!

        discos.slice().reverse().forEach((valor, index) => {
            const disco = document.createElement("div");
            disco.className = `disco disco-${valor}`;
            disco.textContent = valor;
            disco.style.width = (valor * 20) + "px";
            disco.style.left = (75 - valor * 10) + "px";
            disco.style.bottom = (index * 22) + "px"; 
            contenedor.appendChild(disco);
        });

    });

    document.getElementById("realMov").textContent = movimientos;
    console.log(movimientos);
    // if (movimientos != 0) {
    //     document.getElementById("resetgame").disabled = false; // Habilita el botón de reiniciar juego
    // }
    
}

let torreSeleccionadaDesde = null;
let torreSeleccionadaHacia = null;

function seleccionarTorre(torreId) {

    if (!torreSeleccionadaDesde) {
        torreSeleccionadaDesde = torreId;
        let seleccion = document.querySelector(`#torre${torreId}`);
        seleccion.style.backgroundColor = "rgba(255, 255, 0, 0.5)"; // Cambia el color de fondo a amarillo
        seleccion.style.transition = "background-color 0.5s ease"; // Añade una transición suave
        seleccion.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.5)"; // Añade un efecto de sombra  
        seleccion.style.transition = "transform 0.5s ease"; // Añade una transición suave
        const disco = document.querySelector(`#torre${torreId} .disco-${torres[torreId].verCima()}`);
        if (disco) {
            disco.style.marginBottom = "100px";
        }
        
    } else {
        torreSeleccionadaHacia = torreId;
        let seleccionDesde = document.querySelector(`#torre${torreSeleccionadaDesde}`);
        seleccionDesde.style.backgroundColor = ""; // Restablece el color de fondo
        seleccionDesde.style.boxShadow = ""; // Restablece la sombra
        seleccionDesde.style.transition = ""; // Restablece la transición
        seleccionDesde.style.transform = ""; // Restablece la transformación
        const discoDesde = document.querySelector(`#torre${torreSeleccionadaDesde} .disco-${torres[torreSeleccionadaDesde].verCima()}`);
        
        moverDisco(torreSeleccionadaDesde, torreSeleccionadaHacia);

        // Reiniciar selecciones
        torreSeleccionadaDesde = null;
        torreSeleccionadaHacia = null;
    }
}



function moverDisco(desde, hacia) {
    
    const n = parseInt(document.getElementById("numDiscos").value, 10);

    if (desde === hacia) {
        
        
        const discoDesde = document.querySelector(`#torre${desde} .disco-${torres[desde].verCima()}`);
        if (discoDesde) {
            discoDesde.style.marginBottom = "0px";
        }
        
        return;
    }

    const origen = torres[desde];
    const destino = torres[hacia];

    if (origen.estaVacia()) {
        
        
        const discoDesde = document.querySelector(`#torre${desde} .disco-${torres[desde].verCima()}`);
        if (discoDesde) {
            discoDesde.style.marginBottom = "0px";
        }
        return;
    }

    const discoOrigen = origen.verCima();
    const discoDestino = destino.verCima();

    if (!destino.estaVacia() && discoOrigen > discoDestino) {
                
        const discoDesde = document.querySelector(`#torre${desde} .disco-${torres[desde].verCima()}`);
        if (discoDesde) {
            discoDesde.style.marginBottom = "0px";
        }
        return;
    }

    const disco = origen.desapilar();
    destino.apilar(disco);
    movimientos++;

    actualizar_torre();

    if (torres["B"].cantidad_Discos() === n || torres["C"].cantidad_Discos() === n)  {
        setTimeout(() => alert("¡Felicidades! Completaste el juego"), 100);
        movimientos = 0;
        document.getElementById("autogame").disabled = true; // Desactiva el botón de jugar automático
    }
}

function reiniciarJuego() {
    document.getElementById("numDiscos").disabled = false; // 
    document.getElementById("go").disabled = false; // 
    document.getElementById("autogame").disabled = false; // Habilita el botón de jugar automático
    document.getElementById("minMov").textContent = "0";
    document.getElementById("realMov").textContent = "0";
    BotonesMoverInhabilitados();
    torres = {};
    movimientos = 0;
    ["A", "B", "C"].forEach(id => {
        const contenedor = document.getElementById("torre" + id);
        contenedor.innerHTML = "";
    });
    torreSeleccionadaDesde = null;
    torreSeleccionadaHacia = null;
    document.getElementById("resetgame").disabled = true; // Desactiva el botón de reiniciar juego

}


function generarMovimientos(n, origen, destino, auxiliar) {
    if (n === 1) {
        movimientosPendientes.push([origen, destino]);
    } else {
        generarMovimientos(n - 1, origen, auxiliar, destino);
        movimientosPendientes.push([origen, destino]);
        generarMovimientos(n - 1, auxiliar, destino, origen);
    }
}

function ejecutarMovimientosAutomaticos() {
    if (movimientosPendientes.length === 0) {
        clearInterval(intervalo);
        alert("¡Juego automatico completado!");
        BotonesMoverHabilitados();
        document.getElementById("resetgame").disabled = false;
        document.getElementById("stopgame").disabled = true;
        document.getElementById("autogame").disabled = true;
        console.log("Juego completado automáticamente.");
        movimientos = 0;
        return;
    }

    const [desde, hacia] = movimientosPendientes.shift();
    const origen = torres[desde];
    const destino = torres[hacia];
    const disco = origen.desapilar();
    destino.apilar(disco);
    movimientos++;

    actualizar_torre();

}

function jugarAutomatico() {

    if (movimientos > 0) {
        const continuar = confirm("Ya has realizado algunos movimientos. ¿Quieres reiniciar y jugar automáticamente desde el inicio?");
        if (!continuar) {
            return; // No hace nada si el usuario cancela
        }else {
            alert("iniciando juego automático...");
            document.getElementById("resetgame").disabled = true; //
            console.log("Jugando automáticamente...");
            reiniciarJuego();
            iniciarJuego(); // Reinicia el juego
            BotonesMoverInhabilitados();
    
            const n = parseInt(document.getElementById("numDiscos").value, 10);
            console.log("Discos obtenidos" + n);

            // if (isNaN(n) || n <= 0) {
            //     alert("Por favor, ingrese un número válido de discos.");
            //     return;
            // }
    
            movimientosPendientes = []; // Borra movimientos anteriores
            generarMovimientos(n, "A", "C", "B");
    
            intervalo = setInterval(ejecutarMovimientosAutomaticos, 500);
            BotonesMoverInhabilitados();
            console.log("Botones Habilitados");
            document.getElementById("stopgame").disabled = false; // Desactiva el botón de detener juego automático
            document.getElementById("resetgame").disabled = true; // Desactiva el botón de reiniciar juego
            
        }

    }else {
        alert("iniciando juego automático...");
        reiniciarJuego();
        iniciarJuego(); // Reinicia el juego
        BotonesMoverInhabilitados();

        const n = parseInt(document.getElementById("numDiscos").value, 10);
        console.log("Discos obtenidos" + n);

        // if (isNaN(n) || n <= 0) {
        //     alert("Por favor, ingrese un número válido de discos.");
        //     return;
        // }
        
        movimientosPendientes = []; // Borra movimientos anteriores
        generarMovimientos(n, "A", "C", "B");
        intervalo = setInterval(ejecutarMovimientosAutomaticos, 500);
        BotonesMoverInhabilitados();
        console.log("Botones Habilitados");
        document.getElementById("stopgame").disabled = false; // Desactiva el botón de detener juego automático
        document.getElementById("resetgame").disabled = true; // Desactiva el botón de reiniciar juego
    }
    
     
} 

function detenerJuegoAutomatico() {
    const continuar = confirm("¿Estás seguro de que deseas detener el juego automático?");
    if (!continuar) {
        return; // No hace nada si el usuario cancela
    }
    clearInterval(intervalo);
    alert("Juego automático detenido.");
    BotonesMoverHabilitados();
    document.getElementById("autogame").disabled = true; // Desactiva el botón de jugar automático
    document.getElementById("resetgame").disabled = false; // Habilita el botón de reiniciar juego
    document.getElementById("stopgame").disabled = true; // Desactiva el botón de detener juego automático
    console.log("Juego automático detenido.");
    console.log(`Torres después del movimiento #${movimientos}:`);
    console.log("A:", torres["A"].obtenerDiscos());
    console.log("B:", torres["B"].obtenerDiscos());
    console.log("C:", torres["C"].obtenerDiscos());
}



    

