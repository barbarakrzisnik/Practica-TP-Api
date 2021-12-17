console.log("hola mundo")

const contenedorTarjetas = document.querySelector(".contenedor-tarjetas")
const contenedorTrago = document.querySelector(".contenedor-trago")

fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
.then((res) =>  res.json())
.then((data) => {
    console.log(data.drinks)
    crearTarjetaHTML(data.drinks)
})

const crearTarjetaTrago = (data) => {

    contenedorTrago.style.display = "flex"

    const html = `
        <div class="tarjeta-info-trago">
            <img src="${data.strDrinkThumb}">
            <div>
                <h2>${data.strDrink}</h2>
            <ul>
                <li>Categoria: ${data.strCategory}</li>
                <ul>
                    <h3>Ingredientes</h3>
                    <li>${data.strIngredient1}</li>
                    <li>${data.strIngredient2}</li>
                    <li>${data.strIngredient3}</li>
                    <li>${data.strIngredient4}</li>
                </ul>
            </ul>
            <button class="boton-volver">Volver</button>
            </div>
        </div>
    `

    contenedorTrago.innerHTML = html

    const botonVolver = document.querySelector(".boton-volver")

    botonVolver.onclick = () => {
     contenedorTrago.style.display = "none"
     contenedorTarjetas.style.display = "flex"
    }
}

const mostrarTrago = (id) => {
    contenedorTarjetas.style.display = "none"

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) =>  res.json())
    .then((data) => {
    console.log(data)
     crearTarjetaTrago(data.drinks[0])
    })

    

}
const crearTarjetaHTML = (data) => {
 const html = data.reduce((acc, curr) => {
    return acc + `
        <div class="tarjeta">
            <h2>${curr.strDrink}</h2>
            <div class="imagen-tarjeta"><img src="${curr.strDrinkThumb}"></div>
            <button class="boton-ver-mas" data-id=${curr.idDrink}>Ver mas</button>
        </div>
    `
  }, "")
  contenedorTarjetas.innerHTML = html
  botonVerMas()
}

const botonVerMas = () => {
    const botonesVerMas = document.querySelectorAll(".boton-ver-mas")
    for (let i = 0; i < botonesVerMas.length; i++) {
        botonesVerMas[i].onclick = () => {
       const idTrago = botonesVerMas[i].dataset.id
       console.log(idTrago)
       mostrarTrago(idTrago)
}}}




