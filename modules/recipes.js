import { obtenerDatosDePrueba, obtenerDatosBreakfast, obtenerDatosDinner, obtenerDatosLunch, obtenerDatosSnack } from "./main.js";

let datosAsianBreakfast = awai obtenerDatosBreakfast()
console.log(datosAsianBreakfast.hits)

class Cards {

    constructor(titulo, imagen, ingredientes, index) {
        this.titulo = titulo
        this.imagen = imagen
        this.ingredientes = ingredientes
        this.index = index
    }
}



class Menu {
    constructor() {

    }


    async renderCards() {

        datosAsianBreakfast.hits.forEach((element, i) => {
            let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i)


            let menuPlatillos = document.getElementById("menu-platillos")

            let carta = document.createElement("article")
            menuPlatillos.appendChild(carta)

            let cajaImagen = document.createElement("div")
            cajaImagen.classList.add("img-cards")
            carta.appendChild(cajaImagen)

            let imagen = document.createElement("img")
            imagen.src = element.recipe.image
            imagen.classList.add("img-cards")
            cajaImagen.appendChild(imagen)

            let titulo = document.createElement("h1")
            titulo.innerHTML = element.recipe.label
            carta.appendChild(titulo)



            let ul = document.createElement("ul")

            element.recipe.ingredients.forEach(element => {

                let li = document.createElement("li")
                li.innerHTML = element.food
                ul.appendChild(li)
            });

            carta.appendChild(ul)


            let cajaBotones = document.createElement("div")
            cajaBotones.classList.add("caja-botones")
            carta.appendChild(cajaBotones)

            let botonDetalles = document.createElement("button")
            botonDetalles.innerHTML = `Detalles`
            botonDetalles.addEventListener('click', function(){ renderModal(i)}) 
            cajaBotones.appendChild(botonDetalles)

            let botonPedir = document.createElement("button")
            botonPedir.innerHTML = `<a href=javascript:pedir(${i})>Pedir</a>`
            cajaBotones.appendChild(botonPedir)

            

              console.log(platillo)
        });



        /*  datosAsianBreakfast.hits.forEach((element, i) => {
             let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i)
             console.log(platillo)
         }); */

    }
    //renderiza el array de cartas para mostrar en pantalla
    //debe tener las funcionalidades de ordenar y filtros

    pedirCliente() {

    }
    //agrega un elemento al array de pedidos pendientes

    sacarPedidoAdmin() { }
    //saca el pedido del array de pedidos pendientes, desde la pagina de adminisrador, se supone que ya estaria listo el pedido y lo saca por eso

   

}


function renderModal(indexCarta) {

    datosAsianBreakfast.hits.forEach((element, i) => {
        let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i)

        if (indexCarta == i) {


            alert(`hola ${i}`)
           
            
        }



    })



}







let prueba = new Menu()

prueba.renderCards()










