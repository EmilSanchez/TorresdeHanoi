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



function iniciarJuego() {
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


}

let torreSeleccionadaDesde = null;
let torreSeleccionadaHacia = null;


function seleccionarTorre(torreId) {
    if (!torreSeleccionadaDesde) {
        torreSeleccionadaDesde = torreId;
        
    } else {
        torreSeleccionadaHacia = torreId;
        

        moverDisco(torreSeleccionadaDesde, torreSeleccionadaHacia);

        // Reiniciar selecciones
        torreSeleccionadaDesde = null;
        torreSeleccionadaHacia = null;
    }
}

function moverDisco(desde, hacia) {
    const n = parseInt(document.getElementById("numDiscos").value, 10);

    if (desde === hacia) {
        alert("Debes mover a una torre diferente.");
        return;
    }

    const origen = torres[desde];
    const destino = torres[hacia];

    if (origen.estaVacia()) {
        alert("No hay discos en la torre de origen.");
        return;
    }

    const discoOrigen = origen.verCima();
    const discoDestino = destino.verCima();

    if (!destino.estaVacia() && discoOrigen > discoDestino) {
        alert("Movimiento inválido: no puedes colocar un disco grande sobre uno pequeño.");
        return;
    }

    const disco = origen.desapilar();
    destino.apilar(disco);
    movimientos++;

    actualizar_torre();

    if (torres["B"].cantidad_Discos() === n || torres["C"].cantidad_Discos() === n)  {
        setTimeout(() => alert("¡Felicidades! Completaste el juego en " + movimientos + " movimientos."), 100);
    }
}


function reiniciarJuego() {
    document.getElementById("numDiscos").value = "3";
    document.getElementById("minMov").textContent = "";
    document.getElementById("realMov").textContent = "";
    torres = {};
    movimientos = 0;
    ["A", "B", "C"].forEach(id => {
        const contenedor = document.getElementById("torre" + id);
        contenedor.innerHTML = "";
    });
}
    

