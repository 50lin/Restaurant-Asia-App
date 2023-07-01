export async function obtenerDatosBreakfast() {

    try {
        const respuesta = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=96cb0228&app_key=d201e1a9a3dfd5be66e0a4e8ceafe01c&cuisineType=Asian&mealType=Breakfast")
        const datosAsianBreakfast = await respuesta.json()

        return datosAsianBreakfast

    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export async function obtenerDatosLunch() {
    const respuesta = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=96cb0228&app_key=d201e1a9a3dfd5be66e0a4e8ceafe01c&cuisineType=Asian&mealType=Dinner")
    const datosAsianLunch = await respuesta.json()

    return datosAsianLunch
}


export async function obtenerDatosDinner() {
    const respuesta = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=96cb0228&app_key=d201e1a9a3dfd5be66e0a4e8ceafe01c&cuisineType=Asian&mealType=Dinner")
    const datosAsianDinner = await respuesta.json()

    return datosAsianDinner
}


export async function obtenerDatosSnack() {
    const respuesta = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=96cb0228&app_key=d201e1a9a3dfd5be66e0a4e8ceafe01c&cuisineType=Asian&mealType=Snack")
    const datosAsianSnack = await respuesta.json()

    return datosAsianSnack
}



