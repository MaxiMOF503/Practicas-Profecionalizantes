// ====================== FILTRO POR CATEGORÍA ======================
function filtrar(categoria, boton) {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        producto.style.display = (categoria === 'todos' || producto.dataset.categoria === categoria) ? '' : 'none';
    });

    // ======== ACTIVAR BOTÓN ========
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => btn.classList.remove('active'));
    if (boton) boton.classList.add('active');
}

// ====================== BÚSQUEDA POR NOMBRE ======================
function buscarProducto() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        const nombre = producto.dataset.nombre.toLowerCase();
        producto.style.display = nombre.includes(texto) ? '' : 'none';
    });
}

// ====================== CARRITO ======================
let carrito = [];

function agregarCarrito(nombreProducto, precio) {
    carrito.push({ nombre: nombreProducto, precio: precio });
    actualizarCarrito();
    mostrarToast(`${nombreProducto} agregado al carrito`);
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total-carrito');
    if (!lista || !totalElement) return;

    lista.innerHTML = '';
    let total = 0;
    carrito.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = `${prod.nombre} - $${prod.precio}`;
        lista.appendChild(li);
        total += prod.precio;
    });

    totalElement.textContent = `Total: $${total}`;
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// ====================== TOAST ======================
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = mensaje;
    toast.classList.remove('hide');
    toast.classList.add('show');
    toast.style.visibility = 'visible';

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.classList.remove('show', 'hide');
            toast.style.visibility = 'hidden';
        }, 400);
    }, 2500);
}

// ====================== FORMULARIO CONTACTO ======================
const form = document.getElementById('form-contacto');
if (form) {
    const mensaje = document.getElementById('feedback');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mensaje.style.display = 'block';
        mensaje.textContent = "¡Mensaje enviado correctamente!";
        form.reset();
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 3000);
    });
}

// ====================== MENÚ ACTIVO AUTOMÁTICO ======================
const enlaces = document.querySelectorAll('header nav ul li a');
const url = window.location.pathname.split("/").pop();

enlaces.forEach(enlace => {
    if (enlace.getAttribute('href') === url || (url === '' && enlace.getAttribute('href') === 'index.html')) {
        enlace.classList.add('active');
    } else {
        enlace.classList.remove('active');
    }
});
