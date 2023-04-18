const boton = document.getElementById("btnBuscar");
const listado = document.getElementById("lista");
const url = "https://japceibal.github.io/japflix_api/movies-data.json"
let buscador = undefined;
let menu = document.getElementById("offcanvasTop");
const b = [];

let getJSONData = function (url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

function estrellas(vote_average) {

    let number = parseInt(vote_average);
    let retorno = "";
    for (let i = 1; i <= number; i++) {
        retorno += `<p class="fa fa-star checked"></p>`;
    }
    for (let b = number + 1; b <= 10; b++) {
        retorno += `<p class="fa fa-star"></p>`;
    }
    return retorno;
}

function mostrarPelis(array) {
    let listadoPelis = "";
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let nombrePeli = array[i].title.toLowerCase();
        let tagline = array[i].tagline.toLowerCase();
        let overview = array[i].overview.toLowerCase();
        const a = array[i].genres
        a.map(e => e.name)
        f = a[0].name.toLowerCase()
        console.log(f)
        
        if ((buscador == undefined) || (nombrePeli.includes(buscador)) || (tagline.includes(buscador)) || (overview.includes(buscador)) || (f.includes(buscador))) {
            listadoPelis += ` 
        
            <div onclick="idPeli(${element.id})"  class="row list-group-item-action cursor-active" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop">
                <div class="col">
                    <h2>${element.title}</h2>
                    <h5>${element.tagline}</h5>
                </div>
                <div class="col-3">
                    <p > ${estrellas(element.vote_average)}</p>
                    <p>Puntuacion ${element.vote_average}</p>
                </div>
            </div>
      
        `
        }

    }
    listado.innerHTML = listadoPelis;
}


function idPeli(id) {
    localStorage.setItem("idPeli", id)
}

function infoPeli(array) {
    let id = localStorage.getItem("idPeli")
    const e = array.find(element => element.id == id)


    const a = e.release_date.slice(0,4)

    infoMenu = `
            <div class="offcanvas-header row ">
            <button type="button" class="btn-close row-2" data-bs-dismiss="offcanvas" aria-label="Close" id="limpia"></button>
                <div><h5 class="offcanvas-title col" id="offcanvasTopLabel">${e.title}</h5>
                <p>${e.overview}</p>
                </div>
                <hr>
                <div class="" id="generos">
                        <div class="dropdown" id="list">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                Mas info
                            </button>
                                <ul class="p-2 dropdown-menu">
                                    <li><p>Year: ${a}</p></li>
                                    <li><p>Runtime: ${e.runtime} mins</p></li>
                                    <li><p>Budget: ${e.budget}</p></li>
                                    <li><p>Revenue: ${e.revenue}</p></li>
                                </ul>
                        </div>
                </div>
                
            </div>
                
            `
    menu.innerHTML = infoMenu

    for (let i = 0; i < e.genres.length; i++) {
        const genero = e.genres[i];
        gener = `
        <span class="m-2 shadow-sm p-1 mb-3 sm-6 bg-body rounded">${genero.name}</span>
        
        `
        document.getElementById("generos").innerHTML += gener
    }
}



document.addEventListener("DOMContentLoaded", async () => {
    let a = await getJSONData(url);
    if (a.status === "ok") {
        data = a.data
    }
    boton.addEventListener("click", () => {
        buscador = document.getElementById("inputBuscar").value.toLowerCase();
        mostrarPelis(data)
    })


    lista.addEventListener("click", () =>{
        infoPeli(data)
    })
    mostrarPelis(data)
})