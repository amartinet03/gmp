
// Lista ordenada alfabéticamente por apellido
const conductores = [
    { nombre: "Buchaillot, Julieta", empresa: "Fletes Norte", legajo: "95782", otros: "Ingreso autorizado" },
    { nombre: "Garcia, Florencia Daniela", empresa: "Geovictoria S.A.", legajo: "94477", otros: "Ingreso autorizado" },
    { nombre: "Martinet, Agustina Maria Andrea", empresa: "Transportes XYZ", legajo: "94674", otros: "Ingreso autorizado" },
    { nombre: "Milhas Mac Dougall, Marian", empresa: "Carga Rápida S.A.", legajo: "95257", otros: "Ingreso autorizado" },
    { nombre: "Zeheiri, Micaela", empresa: "Logística Sur", legajo: "91135", otros: "Ingreso autorizado" }
];

// Índice para recorrer la lista secuencialmente
let conductorIndex = 0;

const patentes = [
    { numPatente: "AB 123 CD" },
    { numPatente: "EF 456 GH" },
    { numPatente: "IJ 789 KL" },
    { numPatente: "MN 012 OP" },
    { numPatente: "QR 345 ST" }
];

let patenteIndex = 0;

// Botón para cargar guardia secuencial
document.getElementById("cargar-guardia").addEventListener("click", () => {

    document.getElementById("nombre-guardia").innerText = "Lucini, Gabriel Alejandro";
    document.getElementById("casilla").innerText = "3";
    document.getElementById("legajo-guardia").innerText = "98023";
    document.getElementById("turno").innerText = "Mañana";

    document.getElementById("foto-guardia").src = `imagenes/gabi.jpg`;

    
});

document.getElementById("cargar-datos").addEventListener("click", () => {
    const persona = conductores[conductorIndex];
    const patente = patentes[patenteIndex]

    document.getElementById("patente").innerText = patente.numPatente; // Muestra la patente actual

    document.getElementById("conductor").innerText = persona.nombre;
    document.getElementById("empresa").innerText = persona.empresa;
    document.getElementById("legajo").innerText = persona.legajo;

    // Obtener fecha y hora actual en formato corto
    const ahora = new Date();

    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const anio = ahora.getFullYear();

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    const fechaHora = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

    document.getElementById("ingreso-hora").innerText = fechaHora;

    document.getElementById("otros-datos").innerText = persona.otros;

    // Número aleatorio entre 1 y 7 (si tenés 7 fotos)
    const numFoto = Math.floor(Math.random() * 7) + 1;

    // Asigna imagen aleatoria
    document.getElementById("foto-conductor").src = `imagenes/foto${numFoto}.jpg`;

    // Avanza al siguiente conductor; si se termina la lista, vuelve al inicio
    conductorIndex = (conductorIndex + 1) % conductores.length;
    patenteIndex = (patenteIndex + 1) % patentes.length; // Avanza a la siguiente patente
});

document.getElementById("compartir-pantalla").addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const videoOrigen = document.getElementById("video-origen");
        videoOrigen.srcObject = stream;

        videoOrigen.addEventListener("loadedmetadata", () => {
            console.log("Resolución capturada:", videoOrigen.videoWidth, videoOrigen.videoHeight);
            iniciarRecorte();
        });
    } catch (err) {
        console.error("Error al compartir pantalla:", err);
    }
});

function iniciarRecorte() {
    const video = document.getElementById("video-origen");

    const canvasPatente = document.getElementById("camara-patente");
    const canvasConductor = document.getElementById("camara-conductor");
    const canvasAcompanante = document.getElementById("camara-acompanante");

    const ctxPatente = canvasPatente.getContext("2d");
    const ctxConductor = canvasConductor.getContext("2d");
    const ctxAcompanante = canvasAcompanante.getContext("2d");

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Usa la mitad del ancho y la mitad del alto para recortar en 2x2
    const recorte1 = { x: (videoWidth/2) - (videoWidth * 1/3), y: 0, w: videoWidth / 3, h: videoHeight / (2.2) };
    const recorte2 = { x: videoWidth / 2, y: 0, w: videoWidth / 3, h: videoHeight / (2.2) };
    const recorte3 = { x: (videoWidth/2) - (videoWidth * 1/3), y: videoHeight / 2, w: videoWidth / 3, h: videoHeight / (2.6) };

    function dibujar() {
        ctxPatente.clearRect(0, 0, canvasPatente.width, canvasPatente.height);
        ctxConductor.clearRect(0, 0, canvasConductor.width, canvasConductor.height);
        ctxAcompanante.clearRect(0, 0, canvasAcompanante.width, canvasAcompanante.height);

        ctxPatente.drawImage(video,
            recorte1.x, recorte1.y, recorte1.w, recorte1.h,
            0, 0, canvasPatente.width, canvasPatente.height
        );

        ctxConductor.drawImage(video,
            recorte2.x, recorte2.y, recorte2.w, recorte2.h,
            0, 0, canvasConductor.width, canvasConductor.height
        );

        ctxAcompanante.drawImage(video,
            recorte3.x, recorte3.y, recorte3.w, recorte3.h,
            0, 0, canvasAcompanante.width, canvasAcompanante.height
        );

        requestAnimationFrame(dibujar);
    }

    dibujar();
}