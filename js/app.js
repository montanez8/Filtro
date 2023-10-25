
class camper {
    constructor(numeroIdentificacion, nombre, telefono, email, grupoCampus, campoinsAcumulados) {
        this.numeroIdentificacion = numeroIdentificacion;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.grupoCampus = grupoCampus;
        this.campoinsAcumulados = campoinsAcumulados;

    }
}
class concepto {
    constructor(id, descripcion, valor) {
        this.id = id,
            this.descripcion = descripcion,
            this.valor = valor
    }
}
// array
let campers = [];
let conceptos = [];

// variables
const submitButton = document.querySelector('.btn-registrar');
const formularioRegistar = document.querySelector('.formularioRegistar');
const btnConcepto = document.querySelector('.btn-concepto');
const formularioConcepto = document.querySelector('#conceptosForm');

// eventos

document.addEventListener('DOMContentLoaded', () => {
    campers = JSON.parse(localStorage.getItem('campersLocal')) || [];
    conceptos = JSON.parse(localStorage.getItem('conceptoLocal')) || [];
    mostrarCampers();
    mostrarConcepto();
    ListCoceptos();
});

submitButton.addEventListener('click', registrarCampers);
btnConcepto.addEventListener('click',registrarConcepto);


const listaCamper = document.querySelector('#lista-campers');
listaCamper.addEventListener('click', eliminarCampers);

const listaConceptos = document.querySelector('#lista-comceptos');
listaConceptos.addEventListener('click',eliminarConcepto);
// funciones de Gestion Campers
function registrarCampers(e) {
    e.preventDefault();
    const identificacionInput = document.getElementById('identificacion').value;
    let nombresInput = document.getElementById('nombres').value;
    let telefonoInput = document.getElementById('telefono').value;
    let EmailInput = document.getElementById('email').value;
    let grupoCamperInput = document.getElementById('grupoCamper').value;
    let campcoinsAcumuladosInput = document.getElementById('CampcoinsAcumulados').value;

    let camperadd = new camper(identificacionInput, nombresInput, telefonoInput, EmailInput, grupoCamperInput, campcoinsAcumuladosInput);
    campers = [...campers, camperadd];
    guardarCampersLocalStorage();
    mostrarCampers();

}
function mostrarCampers() {
    vaciarListaCampers();
    console.log(campers)
    campers.forEach((i) => {
        console.log(i);
        console.log(i.numeroIdentificacion);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i.numeroIdentificacion}</td>
            <td>${i.nombre}</td>
            <td>${i.telefono}</td>
            <td>${i.email}</td>
            <td>${i.grupoCampus}</td>
            <td>${i.campoinsAcumulados}</td>
            
            <td><a href="#" class="borrar-camper" data-id="${i.numeroIdentificacion}">
                Eliminar
                </a></td>
        `;
        document.querySelector('#lista-campers tbody').appendChild(row);
    });
    guardarCampersLocalStorage();
}



function guardarCampersLocalStorage() {
    localStorage.setItem('campersLocal', JSON.stringify(campers));
}

function eliminarCampers(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-camper')) {
        camper = e.target.parentElement.parentElement;
        const camperId = camper.querySelector('a').getAttribute('data-id');
        campers = campers.filter(camper => camper.numeroIdentificacion !== camperId);
        console.log('eliminado')
        mostrarCampers();
    }
}

function vaciarListaCampers() {
    const listaCampers = document.querySelector('#lista-campers tbody');
    while (listaCampers.firstChild) {
        listaCampers.removeChild(listaCampers.firstChild);
    }
}

//Funciones de Gestion Conceptos

function registrarConcepto(e) {
    e.preventDefault();
    const IdconceptoInput = document.getElementById('Id').value;
    let DescripcionInput = document.getElementById('Descripcion').value;
    let ValorInput = document.getElementById('Valor').value;

    let conceptosadd = new concepto(IdconceptoInput,DescripcionInput,ValorInput);
    conceptos = [...conceptos,conceptosadd];
    guardarConceptoLocalStorage();
    mostrarConcepto();

}

function guardarConceptoLocalStorage(){
    localStorage.setItem('conceptoLocal', JSON.stringify(conceptos));
}

function  mostrarConcepto(){
    vaciarListaConceptos();
    conceptos.forEach((i) => {
        console.log(i);
        console.log(i.id);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i.id}</td>
            <td>${i.descripcion}</td>
            <td>${i.valor}</td>
            <td><a href="#" class="borrar-concepto" data-id="${i.id}">
                Eliminar
                </a></td>
        `;
        document.querySelector('#lista-comceptos tbody').appendChild(row);
    });
    guardarConceptoLocalStorage();
}

function eliminarConcepto(e){
    e.preventDefault();
    if (e.target.classList.contains('borrar-concepto')) {
        concepto = e.target.parentElement.parentElement;
        const conceptoId = concepto.querySelector('a').getAttribute('data-id');
        conceptos = conceptos.filter(concepto => concepto.id !== conceptoId);
        console.log('eliminado')
        mostrarConcepto();
    }
}
function vaciarListaConceptos(){
    const listaConceptos = document.querySelector('#lista-comceptos tbody');
    while (listaConceptos.firstChild) {
        listaConceptos.removeChild(listaConceptos.firstChild);
    }
}

// Consignación de CampCoins

function ListCoceptos(){
    const selectcamper = document.getElementById('conceptosSelect');

    selectcamper.innerHTML = '<option value="">Seleccione un camper</option>';

    campers.forEach(function(i) {

        const option = document.createElement('option');
        option.value = i.numeroIdentificacion;
        option.innerText = i.nombre;


        selectcamper.appendChild(option);
    });



}


