document.addEventListener('DOMContentLoaded', async function() {
    const productForm = document.querySelector('.form-section form');
    const productsContainer = document.querySelector('.products');

    const products = await fetchProducts();
    products.forEach(product => addProductToDOM(product));

    productForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const price = document.getElementById('price').value.trim();
        const imageUrl = document.getElementById('image').value.trim();

        if (name && price && imageUrl) {
            const newProduct = { name, price, image: imageUrl };
            const addedProduct = await addProduct(newProduct);
            addProductToDOM(addedProduct);
            productForm.reset();
        }
    });

    productsContainer.addEventListener('click', async function(event) {
        if (event.target.classList.contains('delete-icon')) {
            const productCard = event.target.closest('.product-card');
            const productId = productCard.dataset.id;
            await deleteProduct(productId);
            productCard.remove();
        }
    });

    function addProductToDOM(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.id = product.id;

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>R$ ${product.price}</p>
            <img src="assets/lixeira.png" alt="Deletar" class="delete-icon">
        `;

        productsContainer.appendChild(productCard);
    }
});
