const modificarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class= "modal-header-tittle">Carrito.</h1>
    
    `;
  
    modalContainer.append(modalHeader);
  
    const modalButton = document.createElement ("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";
  
    modalButton.addEventListener("click", () => {
  
  modalContainer.style.display = "none";
  
    })
  
    modalHeader.append(modalButton);
  
    carrito.forEach((juego) => {
  
      let carritoContenido = document.createElement ("div")
      carritoContenido.className = "modal-content"
      carritoContenido.innerHTML = `
    
    <img class = "img-game img-fluid" src ="${juego.img}">
    <h3 class = "titulo-juego">${juego.nombre}</h3>
    <p>${juego.precio}</p>
    <span class="restar"> ➖ </span>
    <p>Cantidad: ${juego.cantidad} </p>
    <span class="sumar"> ➕ </span>
    <p> Total ${juego.cantidad * juego.precio} </p>
    `;
  
    modalContainer.append(carritoContenido);
    console.log(carrito.length);
  
    let restar = carritoContenido.querySelector(".restar")

    restar.addEventListener("click", () => {

        if(juego.cantidad !== 1) {
            juego.cantidad--;
        }
        saveLocal();
        modificarCarrito();

    });

    let sumar = carritoContenido.querySelector (".sumar")

    sumar.addEventListener("click", () => {

        juego.cantidad++;
        saveLocal();
        modificarCarrito();
    });



    let eliminar = document.createElement("span");

    eliminar.innerText = "❌"
    eliminar.className = "delete-product";
    carritoContenido.append(eliminar);

    eliminar.addEventListener("click", eliminarJuego);
    });

  
    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0); 
  
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar : ${total} $`
    modalContainer.append(totalBuying);
  };

  verCarrito.addEventListener("click", modificarCarrito);

const eliminarJuego = () => {
    const foundId = carrito.find((element)=> element.id);

    Swal.fire({
        icon: 'error',
        title: 'Producto eliminado',
        text: 'Haz eliminado este producto de tu carrito.',
      })

carrito = carrito.filter ((carritoId) => {
    return carritoId !== foundId;
});
carritoCounter();
saveLocal();
modificarCarrito();
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

const carritoLength = carrito.length;

localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

    cantidadCarrito.innerText = carrito.length;
};

carritoCounter();