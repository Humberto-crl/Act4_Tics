const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const selectCategoria = document.getElementById("categoria");

let listaProductos = []; 

async function obtenerProductos() {
    try {
        contenedor.innerHTML = "<p>Cargando productos...</p>";

        const respuesta = await fetch("https://fakestoreapi.com/products");

        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos");
        }

        const productos = await respuesta.json();

        listaProductos = productos;

        cargarCategorias(productos);
        renderizarProductos(productos);

    } catch (error) {

        console.error(error);

        contenedor.innerHTML = `
            <p class="error">
                Error al cargar los productos.
            </p>
        `;
    }
}

function renderizarProductos(productos) {
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productos.forEach(producto => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p class="precio">$${producto.price}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}

function cargarCategorias(productos) {
    const categorias = [...new Set(productos.map(p => p.category))];

    selectCategoria.innerHTML = "<option value=\"todas\">Todas las categorías</option>";

    categorias.forEach(categoria => {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        selectCategoria.appendChild(opcion);
    });
}

function filtrarProductos() {
    const texto = buscador.value.trim().toLowerCase();
    const categoria = selectCategoria.value;

    const filtrados = listaProductos.filter(producto => {
        const coincideTexto = producto.title.toLowerCase().includes(texto);
        const coincideCategoria = categoria === "todas" || producto.category === categoria;
        return coincideTexto && coincideCategoria;
    });

    renderizarProductos(filtrados);
}

buscador.addEventListener("input", filtrarProductos);
selectCategoria.addEventListener("change", filtrarProductos);

obtenerProductos();