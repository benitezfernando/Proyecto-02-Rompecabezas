
var instrucciones = [
  "Con las flechas del teclado intercambia las piezas hasta formar el rompecabezas.",
  "*AYUDA* El cuadrante Nro 9 tiene que estar vacio para completar el objetivo.",
  
];

var movimientos = [];


var grilla = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];


var filaVacia = 2;
var columnaVacia = 2;


function mostrarInstrucciones(instrucciones) {
  for (var i = 0; i < instrucciones.length; i++) {
    mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
  }
}



function agregarUltimoMovimiento(direccion) {
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion);
}


function chequearSiGano() {
  var contPieza = 1;
  for (var i = 0; i < grilla.length; i++) {
    for (var j = 0; j < grilla[i].length; j++) {
      if (grilla[i][j] !== contPieza) {
        return false;
      } else {
        contPieza++;
      }
    }
  }
  return true;
}


function mostrarCartelGanador() {
  alert("Ganaste! Felicitaciones.");
}


function intercambiarPosicionesGrilla(
  filaPos1,
  columnaPos1,
  filaPos2,
  columnaPos2
) {
  var temp = grilla[filaPos1][columnaPos1];

  grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
  grilla[filaPos2][columnaPos2] = temp;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}

// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
  return fila >= 0 && fila <= 2 && (columna >= 0 && columna <= 2);
}


function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }

  

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(
      filaVacia,
      columnaVacia,
      nuevaFilaPiezaVacia,
      nuevaColumnaPiezaVacia
    );
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

    

    agregarUltimoMovimiento(direccion);
  }
}


var codigosDireccion = {
  IZQUIERDA: 37,
  ARRIBA: 38,
  DERECHA: 39,
  ABAJO: 40
};


function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM("pieza" + pieza1, "pieza" + pieza2);
}



function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById("flecha");
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = "↑";
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = "↓";
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = "→";
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = "←";
      break;
  }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [
    codigosDireccion.ABAJO,
    codigosDireccion.ARRIBA,
    codigosDireccion.DERECHA,
    codigosDireccion.IZQUIERDA
  ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
    mezclarPiezas(veces - 1);
  }, 100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en 
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora, 
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
  document.body.onkeydown = function(evento) {
    if (
      evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA
    ) {
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if (gano) {
        setTimeout(function() {
          mostrarCartelGanador();
        }, 500);
      }
      evento.preventDefault();
    }
  };
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
  mostrarInstrucciones(instrucciones);
  mezclarPiezas(30);
  capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();
