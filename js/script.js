const audioUno = document.querySelector("#audioUno");
const audioDos = document.querySelector("#audioDos");
const audioTres = document.querySelector("#audioTres");
const audioCuatro = document.querySelector("#audioCuatro");

let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

const SOUNDS = {
    play1: () => audioUno.play(),
    play2: () => audioDos.play(),
    play3: () => audioTres.play(),
    play4: () => audioCuatro.play(),
}


$botonComenzar = document.querySelector("#boton");

actualizarEstado("Toca comenzar para jugar");
actualizarNumeroDeRondas("-");
bloquearInputUsuario();

$botonComenzar.onclick = function(){
    comenzarJuego();
}

function comenzarJuego(){
    reiniciarEstado();
    manejarRonda();
    actualizarNumeroDeRondas(ronda);
}

function reiniciarEstado(){
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
}

function manejarRonda(){
    actualizarEstado("Turno de la maquina");
    bloquearInputUsuario();

    const $cuadros = document.querySelectorAll(".cuadro");
    const $nuevoCuadro = obtenerCuadroAleatorio($cuadros);
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;
    
    secuenciaMaquina.forEach(function(cuadro,index){
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function(){
            resaltar(cuadro);
            audio(cuadro);
        } ,RETRASO_MS)
    })

    setTimeout(function(){
        actualizarEstado("Turno del jugador");
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR)

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroDeRondas(ronda)
}

function manejarInputUsuario(e){
    const $cuadro = e.target;
    resaltar($cuadro);
    audio($cuadro);

    secuenciaUsuario.push($cuadro);

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
    console.log($cuadroMaquina.id)


    if ($cuadro.id !== $cuadroMaquina.id){
        perder();
        return;
    }

    if (secuenciaMaquina.length === secuenciaUsuario.length){
        bloquearInputUsuario();
        setTimeout(manejarRonda,1000);
    }
}

function actualizarEstado(cadena){
    const $estado = document.querySelector("#estado");
    if (cadena === "Turno de la maquina"){
        $estado.style.backgroundColor = "#C45829"
    }
    if (cadena === "Turno del jugador"){
        $estado.style.backgroundColor = "#7329C4"
    }
    if (cadena === "Perdiste! - Toca Comenzar para volver a jugar"){
        $estado.style.backgroundColor = "#c42d2d"
    }
    $estado.innerHTML = cadena.toUpperCase();
}

function actualizarNumeroDeRondas($ronda){
    const $numeroRonda = document.querySelector("#numeroRonda")
    $numeroRonda.innerHTML = $ronda;
}

function bloquearInputUsuario(){
    const $cuadros = document.querySelectorAll(".cuadro");

    $cuadros.forEach(function($cuadro){
        $cuadro.onclick = function(){
            console.log("input bloqueado");
        }
    })
}

function obtenerCuadroAleatorio($cuadros){
    let $cuadroAleatorio = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[$cuadroAleatorio];
}

function resaltar(cuadro){
    cuadro.style.transition = "all 100ms";
    cuadro.style.opacity = 1;
    cuadro.style.transform = "scale(0.9)";
    setTimeout(function(){
        cuadro.style.opacity = 0.5;
        cuadro.style.transform = "scale(1.0)";
    }, 500)
}

function desbloquearInputUsuario(){
    const $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(function(cuadro){
        cuadro.onclick = manejarInputUsuario;
    })
}

function perder(){
    bloquearInputUsuario();
    actualizarEstado("Perdiste! - Toca Comenzar para volver a jugar");

}

function audio(cuadro){
    console.log(cuadro.id)
    if (cuadro.id == "cuadroRojo"){
        SOUNDS.play1();
    }
    if (cuadro.id == "cuadroAmarillo"){
        SOUNDS.play2();
    }
    if (cuadro.id == "cuadroVerde"){
        SOUNDS.play3();
    }
    if (cuadro.id == "cuadroAzul"){
        SOUNDS.play4();
    }
}