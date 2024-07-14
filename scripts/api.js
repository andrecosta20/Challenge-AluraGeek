const API_URL = 'http://localhost:3000/products';

async function fetchProducts() {
    const response = await fetch(API_URL);
    return response.json();
}

async function addProduct(product) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return response.json();
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}
