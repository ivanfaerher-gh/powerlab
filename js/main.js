const contenedor = document.getElementById("contenedor-productos");

const cantidadCarrito = document.getElementById("cantidad-carrito");

const totalCarrito = document.getElementById("total-carrito");

const botonVaciar = document.getElementById("vaciar-carrito");

const buscador = document.getElementById("buscador");

let listaProductos = [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



function actualizarCarrito() {

    cantidadCarrito.textContent = carrito.length;

    const total = carrito.reduce((acumulador, producto) => {

        return acumulador + producto.precio;

    }, 0);

    totalCarrito.textContent = total;

}



function mostrarProductos(productos) {

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        const card = document.createElement("article");

        card.classList.add("producto-card");

        card.innerHTML = `

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p>$${producto.precio}</p>

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <button class="btn-agregar">

                Agregar al carrito

            </button>

        `;

        const boton = card.querySelector(".btn-agregar");

        boton.addEventListener("click", () => {

            carrito.push(producto);

            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );

            actualizarCarrito();

            Swal.fire({

                icon: "success",

                title: "Producto agregado",

                text: `${producto.nombre} fue agregado al carrito`,

                timer: 1500,

                showConfirmButton: false

            });

        });

        contenedor.appendChild(card);

    });

}



actualizarCarrito();



botonVaciar.addEventListener("click", () => {

    carrito = [];

    localStorage.removeItem("carrito");

    actualizarCarrito();

    Swal.fire({

        icon: "success",

        title: "Carrito vaciado",

        timer: 1500,

        showConfirmButton: false

    });

});



fetch("productos.json")

    .then(respuesta => respuesta.json())

    .then(productos => {

        listaProductos = productos;

        mostrarProductos(productos);

    })

    .catch(error => {

    Swal.fire({

        icon: "error",

        title: "Error",

        text: "No se pudieron cargar los productos"

    });

});

    



buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const productosFiltrados = listaProductos.filter(producto => {

        return producto.nombre
            .toLowerCase()
            .includes(texto);

    });

    mostrarProductos(productosFiltrados);

});