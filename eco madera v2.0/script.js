document.addEventListener('DOMContentLoaded', checkSession);

// Comprobación de sesión
function checkSession() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('catalog-header').classList.remove('hidden');
        document.getElementById('catalog-container').classList.remove('hidden');
        document.getElementById('login-modal').style.display = 'none';
        loadInitialProducts();
        showWelcomeAnimation(username);
    } else {
        document.getElementById('login-modal').style.display = 'flex';
    }
}

// Evento de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (rememberMe) {
        localStorage.setItem('username', username);
    }

    showWelcomeAnimation(username);
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('catalog-header').classList.remove('hidden');
    document.getElementById('catalog-container').classList.remove('hidden');
    loadInitialProducts();
});
// Función para añadir productos a favoritos
function addToFavorites(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(productName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`Producto añadido a favoritos: ${productName}`);
}
// Mostrar productos guardados en favoritos
function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesTab = window.open();
    let htmlContent = '<h1>Favoritos</h1>';
    if (favorites.length === 0) {
        htmlContent += '<p>No tienes productos guardados en favoritos.</p>';
    } else {
        favorites.forEach(product => {
            htmlContent += `<p>${product}</p>`;
        });
    }
    favoritesTab.document.write(htmlContent);
}
// Comprar un producto
function buyProduct(productName, price) {
    const paymentMethods = `
        <h1>Compra de ${productName}</h1>
        <p>Precio: ${price}</p>
        <p>Selecciona un método de pago:</p>
        <button>Nequi</button>
        <button>PayPal</button>
        <button>Pago en físico</button>
    `;
    const paymentTab = window.open();
    paymentTab.document.write(paymentMethods);
}
// Mostrar la animación de bienvenida
function showWelcomeAnimation(username) {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('welcome-animation');
    welcomeMessage.innerText = `¡Bienvenido, ${username}!`;
    document.body.appendChild(welcomeMessage);

    setTimeout(() => {
        welcomeMessage.remove();
    }, 3000);
}

// Mostrar/Ocultar contraseña
document.getElementById('toggle-password').addEventListener('change', function () {
    const passwordInput = document.getElementById('password');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

// Cargar productos iniciales
function loadInitialProducts() {
    const catalogItems = document.getElementById('catalog-items');
    catalogItems.innerHTML = '';
    const products = [
        { title: 'separador tallado con textura', description: 'separador tallado de madera natural para libros .', price: '$7000', images: ['img1.jpg'] },
        { title: 'separador tallado y marcado Modernista', description: 'separador en madera tallado y dibujado.', price: '$7000', images: ['img2.jpg'] },
        { title: 'seoarador marcado Ecológica', description: 'separador marcado Hecho con madera reciclada.', price: '$7000', images: ['img3.jpg'] },
        { title: 'separador marcado con pintura Ecológica', description: 'separador marcado con pintura Hecha con madera reciclada.', price: '$7000', images: ['img4.jpg'] },
        { title: 'separador tallado  Ecológica', description: 'Hecha con madera reciclada.', price: '$7000', images: ['img5.jpg'] },
        { title: 'separador tallado  Ecológica', description: 'Hecha con madera reciclada.', price: '$7000', images: ['img6.jpg'] },
        { title: 'paquetes de separadores tallado  Ecológica', description: 'Hecha con madera reciclada.', price: '$20.000', images: ['img7.jpg'] },
        { title: 'paquete de separador tallado  Ecológica', description: 'Hecha con madera reciclada.', price: '$16.000', images: ['img8.jpg'] },

        // Añadir más productos aquí (15 por categoría)
    ];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('catalog-item');
        productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price}</strong></p>
            <button onclick="openProduct('${product.title}', '${product.description}', '${product.price}', ['${product.images.join("','")}'])">Ver Producto</button>
        `;
        catalogItems.appendChild(productDiv);
    });
}

// Abrir una pestaña nueva con detalles del producto
function openProduct(title, description, price, images) {
    const newTab = window.open();
    let imageHtml = '';
    images.forEach(image => {
        imageHtml += `<img src="${image}" alt="${title}" style="width: 200px; margin: 10px;">`;
    });

    newTab.document.write(`
        <html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <button onclick="window.close()">Volver a la página principal</button>
            </header>
            <h1>${title}</h1>
            <p><strong>Precio: </strong>${price}</p>
            <p>${description}</p>
            ${imageHtml}
            <button onclick="addToFavorites('${title}')">Añadir a Favoritos</button>
            <button onclick="purchaseProduct()">Comprar</button>
        </body>
        </html>
`);
}


// Función para añadir a favoritos
function addToFavorites(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(productName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`Producto añadido a favoritos: ${productName}`);
}

// Filtro por categoría
function filterByCategory(category) {
    const catalogItems = document.getElementById('catalog-items');
    catalogItems.innerHTML = '';
    const filteredProducts = [
        // Productos por categoría (minimalista, colorido, clásico, moderno, personalizado)
    ];

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('catalog-item');
        productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price}</strong></p>
            <button onclick="openProduct('${product.title}', '${product.description}', '${product.price}', ['${product.images.join("','")}'])">Ver Producto</button>
        `;
        catalogItems.appendChild(productDiv);
    });
}

// Mostrar ventana de confirmación para cerrar sesión
function showLogoutConfirmation() {
    document.getElementById('logout-confirmation').classList.remove('hidden');
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('username');
    document.getElementById('logout-confirmation').classList.add('hidden'); // Cerrar ventana de confirmación
    window.location.reload();
}

// Cerrar ventana de confirmación
function closeLogoutConfirmation() {
    document.getElementById('logout-confirmation').classList.add('hidden');
}


// Iniciar sesión con Google, Facebook, Twitter (simulado)
function socialLogin(platform) {
    alert(`Iniciando sesión con ${platform}`);
    const username = platform === 'Google' ? 'usuario_google' : platform === 'Facebook' ? 'usuario_facebook' : 'usuario_twitter';
    localStorage.setItem('username', username);
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('catalog-header').classList.remove('hidden');
    document.getElementById('catalog-container').classList.remove('hidden');
    showWelcomeAnimation(username);
    loadInitialProducts();
}

