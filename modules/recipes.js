import { obtenerDatosBreakfast, obtenerDatosDinner, obtenerDatosLunch, obtenerDatosSnack } from "./main.js";

let datosAsianBreakfast = await obtenerDatosBreakfast()
let datosAsianLunch = await obtenerDatosLunch()
let datosAsianDinner = await obtenerDatosDinner()
let datosAsianSnack = await obtenerDatosSnack()


let botonBreakfast = document.getElementById("botonBreakfast")
botonBreakfast.addEventListener("click", () => {prueba.renderCards(datosAsianBreakfast.hits)
})

let botonLunch = document.getElementById("botonLunch")
botonLunch.addEventListener("click", () => {prueba.renderCards(datosAsianLunch.hits)
})

let botonDinner = document.getElementById("botonDinner")
botonDinner.addEventListener("click", () => {prueba.renderCards(datosAsianDinner.hits)
})

let botonSnack = document.getElementById("botonSnack")
botonSnack.addEventListener("click", () => {prueba.renderCards(datosAsianSnack.hits)
})


class Cards {

    constructor(titulo, imagen, ingredientes, index, calorias, precauciones, tipoPlato, tipoComida, pesoTotal, etiquetaDieta) {
        this.titulo = titulo
        this.imagen = imagen
        this.ingredientes = ingredientes
        this.index = index
        this.calorias = calorias
        this.precauciones = precauciones
        this.tipoPlato = tipoPlato
        this.tipoComida = tipoComida
        this.pesoTotal = pesoTotal
        this.etiquetaDieta = etiquetaDieta
    }
}


class Menu {
    constructor() {
    }
    
    //renderiza el array de cartas para mostrar en pantalla
    async renderCards(datosPorCategoria) {
        
        let menuPlatillos = document.getElementById("menu-platillos")

        menuPlatillos.innerHTML = ""

        datosPorCategoria.forEach((element, i) => {
            let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i)

            let carta = document.createElement("article")
            menuPlatillos.appendChild(carta)

            let cajaImagen = document.createElement("div")
            cajaImagen.classList.add("img-cards")
            carta.appendChild(cajaImagen)

            let imagen = document.createElement("img")
            imagen.src = platillo.imagen
            imagen.classList.add("img-cards")
            cajaImagen.appendChild(imagen)

            let titulo = document.createElement("h1")
            titulo.innerHTML = platillo.titulo
            carta.appendChild(titulo)

            //botones
            let cajaBotones = document.createElement("div")
            cajaBotones.classList.add("caja-botones")
            carta.appendChild(cajaBotones)

            let botonDetalles = document.createElement("button")
            botonDetalles.innerHTML = `Detalles`
            botonDetalles.addEventListener('click', () => { prueba.renderModal(i, datosPorCategoria) })
            cajaBotones.appendChild(botonDetalles)

            let botonPedir = document.createElement("button")
            botonPedir.innerHTML = `Pedir`
            botonPedir.addEventListener('click', () => { prueba.sacarPedido(i) })
            cajaBotones.appendChild(botonPedir)
        });
    }


    pedirCliente() {

let arrayPedidoCliente = []

        //agrega un elemento al array de pedidos pendientes
        datosAsianBreakfast.hits.forEach((element, i) => {
            let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i)
            if (indexCarta == i) {
             
             arrayPedidoCliente.concat(platillo)
             
             
                //saca el pedido del array de pedidos pendientes, desde la pagina de adminisrador, se supone que ya estaria listo el pedido y lo saca por eso
            }
        })

        console.log(arrayPedidoCliente)
    }


    


    renderModal(indexCarta, categoriarenderModal) {

        //mostrar u ocultar modal
        let modal = document.getElementById("modal")
        modal.style.display = "flex"

        let salir = document.getElementById("salir")
        salir.addEventListener('click', () => {
            modal.style.display = "none"
        })

       
        //renderizar modal
        categoriarenderModal.forEach((element, i) => {
            let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i, element.recipe.calories, element.recipe.cautions, element.recipe.dishType, element.recipe.mealType, element.recipe.totalWeight, element.recipe.dietLabels)
            if (indexCarta == i) {

                //detalles

                let detalles = document.getElementById("detalles")

                detalles.innerHTML = ""

                let imagenDetalles = document.createElement("img")
                imagenDetalles.src = platillo.imagen
                detalles.appendChild(imagenDetalles)

                let titulo = document.createElement("h1")
                titulo.innerHTML = platillo.titulo
                detalles.appendChild(titulo)

                let tipoPlato = document.createElement("h3")
                tipoPlato.innerHTML = platillo.tipoPlato.toString()
                detalles.appendChild(tipoPlato)

                let tipoComida = document.createElement("h3")
                tipoComida.innerHTML = platillo.tipoComida.toString()
                detalles.appendChild(tipoComida)

                let pesoTotal = document.createElement("h3")
                pesoTotal.innerHTML = platillo.pesoTotal
                detalles.appendChild(pesoTotal)

                let calorias = document.createElement("h3")
                calorias.innerHTML = platillo.calorias
                detalles.appendChild(calorias)

                let precauciones = document.createElement("h3")
                precauciones.innerHTML = platillo.precauciones.toString()
                detalles.appendChild(precauciones)

                let etiquetaDieta = document.createElement("h3")
                etiquetaDieta.innerHTML = platillo.etiquetaDieta.toString()
                detalles.appendChild(etiquetaDieta)


                //ingredientes

                let ingredientes = document.getElementById("ingredientes")
                ingredientes.innerHTML = ""

                platillo.ingredientes.forEach(e => {

                    let ingrediente = document.createElement("article")
                    ingrediente.classList.add("ingrediente")
                    ingredientes.appendChild(ingrediente)

                    let imagenIngrediente = document.createElement("img")
                    imagenIngrediente.src = e.image
                    ingrediente.appendChild(imagenIngrediente)

                    let tituloIngrediente = document.createElement("h1")
                    tituloIngrediente.innerHTML = e.food
                    ingrediente.appendChild(tituloIngrediente)

                    let tipoIngrediente = document.createElement("h4")
                    tipoIngrediente.innerHTML = e.foodCategory
                    ingrediente.appendChild(tipoIngrediente)

                    let procedimiento = document.createElement("p")
                    procedimiento.innerHTML = e.text
                    ingrediente.appendChild(procedimiento)
                });
            }
        })
    }
    
    
    sacarPedidoAdmin(indexCarta, categoriarenderModal) {
        

        datosAsianBreakfast.hits.forEach((element, i) => {
            let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i)
            if (indexCarta == i) {
                //saca el pedido del array de pedidos pendientes, desde la pagina de adminisrador, se supone que ya estaria listo el pedido y lo saca por eso
            }
        })
    }





}


let prueba = new Menu()

prueba.renderCards(datosAsianBreakfast.hits)
prueba.sacarPedidoAdmin()









