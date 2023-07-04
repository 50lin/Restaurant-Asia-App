import { obtenerDatosBreakfast, obtenerDatosDinner, obtenerDatosLunch, obtenerDatosSnack } from "./main.js";

let datosAsianBreakfast = await obtenerDatosBreakfast()
let datosAsianLunch = await obtenerDatosLunch()
let datosAsianDinner = await obtenerDatosDinner()
let datosAsianSnack = await obtenerDatosSnack()

let arrayPedidoCliente = []
let arrayPedidosAdmin = []
let datosCategoriaActual = datosAsianBreakfast.hits

let carrito = document.getElementById("carrito")




cargarCarritoDesdeLocalStorage()

function cargarCarritoDesdeLocalStorage() {
    if (arrayPedidoCliente.length === 0) {
        const carritoStorage = localStorage.getItem("pedidoCliente");
        if (carritoStorage) {
            arrayPedidoCliente = JSON.parse(carritoStorage);
            console.log(arrayPedidoCliente)

            arrayPedidoCliente.forEach(element => {

                carrito = document.getElementById("carrito")
                let caja = document.createElement("div")
                carrito.appendChild(caja)
                caja.classList.add("cajas-del-carrito")


                let cajaDeFoto = document.createElement("div")
                caja.appendChild(cajaDeFoto)
                cajaDeFoto.classList.add("cajas-de-foto")


                let foto = document.createElement("img")
                foto.src = element.imagen
                cajaDeFoto.appendChild(foto)

                let titulo = document.createElement("h3")
                titulo.innerHTML = element.titulo
                caja.appendChild(titulo)
            });




        }
    }
}






//este boton toma el array de pedidos del cliente y si tiene elementos los sube a un nuevo array que seria el del admin, y vacia el array de cliente por que se supone que ya pidio. En caso de pisar el boton sin tener algun pedido no hara nada
let botonPedirOrden = document.getElementById("botonPedirOrden")
botonPedirOrden.addEventListener("click", () => { arrayPedidoCliente.length !== 0 ? arrayPedidosAdmin.push(arrayPedidoCliente) : console.log("hola") })
botonPedirOrden.addEventListener("click", () => { arrayPedidoCliente = [] })
botonPedirOrden.addEventListener("click", limpiarCarrito)

async function limpiarCarrito() {

    carrito.innerHTML = ""
    localStorage.clear();
    console.log(arrayPedidoCliente)

    console.log(arrayPedidosAdmin)
}


//botones para renderizar las resetas segun su categoria... se reasigana el valor de la variable que contien los datos objetenidos de la api, para pasar a la funcion de renderCards, render modal y pedirClientes

let botonBreakfast = document.getElementById("botonBreakfast")
botonBreakfast.addEventListener("click", () => { datosCategoriaActual = datosAsianBreakfast.hits })
botonBreakfast.addEventListener("click", () => { prueba.renderCards() })


let botonLunch = document.getElementById("botonLunch")
botonLunch.addEventListener("click", () => { datosCategoriaActual = datosAsianLunch.hits })
botonLunch.addEventListener("click", () => { prueba.renderCards() })


let botonDinner = document.getElementById("botonDinner")
botonDinner.addEventListener("click", () => { datosCategoriaActual = datosAsianDinner.hits })
botonDinner.addEventListener("click", () => { prueba.renderCards() })


let botonSnack = document.getElementById("botonSnack")
botonSnack.addEventListener("click", () => { datosCategoriaActual = datosAsianSnack.hits })
botonSnack.addEventListener("click", () => { prueba.renderCards() })



//clase constructora de Cartasde recetas
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


//clase que crea las cartas y asigna funcionalidades a ellas
class Menu {
    constructor() {
    }

    //renderiza el array de cartas para mostrar en pantalla
    async renderCards() {

        let menuPlatillos = document.getElementById("menu-platillos")

        menuPlatillos.innerHTML = ""

        datosCategoriaActual.forEach((element, i) => {
            let platillo = new Cards(element.recipe.label, element.recipe.image, element.recipe.ingredients, i, element.recipe.calories, element.recipe.cautions, element.recipe.dishType, element.recipe.mealType, element.recipe.totalWeight, element.recipe.dietLabels)

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
            botonDetalles.addEventListener('click', () => { prueba.renderModal(platillo) })
            cajaBotones.appendChild(botonDetalles)

            let botonPedir = document.createElement("button")
            botonPedir.innerHTML = `Pedir`
            botonPedir.addEventListener('click', () => { prueba.pedirCliente(platillo) })
            cajaBotones.appendChild(botonPedir)

        


        });
    }


    pedirCliente(platillo) {

        //agrega un elemento al array de pedidos pendientes

        arrayPedidoCliente.push(platillo)

        // Guardar el array de pedidos pendientes en el local storage
        localStorage.setItem("pedidoCliente", JSON.stringify(arrayPedidoCliente));

        //muestra o renderiza los elementos en el carrito

        carrito = document.getElementById("carrito")
        let caja = document.createElement("div")
        carrito.appendChild(caja)
        caja.classList.add("cajas-del-carrito")


        let cajaDeFoto = document.createElement("div")
        caja.appendChild(cajaDeFoto)
        cajaDeFoto.classList.add("cajas-de-foto")


        let foto = document.createElement("img")
        foto.src = platillo.imagen
        cajaDeFoto.appendChild(foto)

        let titulo = document.createElement("h3")
        titulo.innerHTML = platillo.titulo
        caja.appendChild(titulo)

        console.log(arrayPedidoCliente)

        console.log(arrayPedidosAdmin) 


    }


    //renderiza un modal con la carta seleccionada, se pasa como agumento el indice de la carta para renderizarla
    renderModal(platillo) {

        //mostrar u ocultar modal, predetermiando esta oculto dede el css
        let modal = document.getElementById("modal")
        modal.style.display = "flex"

        let salir = document.getElementById("salir")
        salir.addEventListener('click', () => {
            modal.style.display = "none"
        })

       
        //renderizar modal
        

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


    sacarPedidoAdmin(indexCarta) {

        arrayPedidosAdmin.forEach((element, i) => {
            if (indexCarta == i) {
                //saca el pedido del array de pedidos pendientes, desde la pagina de adminisrador, se supone que ya estaria listo el pedido y lo saca por eso
            }
        })
    }      



// a






}


let prueba = new Menu()

prueba.renderCards(datosAsianBreakfast.hits)








