const gameContent = document.getElementById("gameContent");

const verCarrito = document.getElementById("verCarrito");

const modalContainer = document.getElementById("modal-container")

const cantidadCarrito = document.getElementById("cantidadCarrito");
 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getGames = async () => {

const response = await fetch("data.json");
const data = await response.json();




data.forEach((juego) => {

  let contenido = document.createElement("div");
  contenido.className = "card1"
  contenido.innerHTML = `
  
  <img class="img-fluid" src="${juego.img}">
  <h3>${juego.nombre}</h3>
  <p class = "price">${juego.precio} $<p>
  
  `;
  gameContent.append(contenido);
 
let comprar = document.createElement("button")
comprar.innerText = "Comprar"
comprar.className = "comprar"
contenido.append(comprar);



comprar.addEventListener("click", () => {

Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Agregado al carrito!',
  showConfirmButton: false,
  timer: 1500
});


const repeat = carrito.some((repeatJuego) => repeatJuego.id === juego.id);

if(repeat) {
  carrito.map ((game) => {
    if (game.id === juego.id) {
      game.cantidad++;

    }
  });
} else {

  carrito.push({
    id: juego.id,
    img: juego.img,
    nombre: juego.nombre,
    precio: juego.precio,
    cantidad: juego.cantidad,
  });
}

console.log(carrito);
console.log(carrito.length);
carritoCounter();
saveLocal();
});

});








};

const saveLocal = () => {

  localStorage.setItem("carrito", JSON.stringify (carrito));

};


getGames ();

