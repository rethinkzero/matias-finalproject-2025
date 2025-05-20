document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const name = product.querySelector('h4').textContent;
            const price = parseFloat(product.dataset.price);
            
            cart.push({ name, price });
            updateCart();
            
            button.textContent = '✓ Added!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 1500);
        });
    });
    
    document.getElementById('cart-icon').addEventListener('click', () => {
        const dropdown = document.getElementById('cart-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Checkout complete!');
        cart.length = 0;
        updateCart();
    });
    
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1200);
    
    function updateCart() {
        const count = document.getElementById('cart-count');
        const itemsContainer = document.getElementById('cart-items');
        const totalElement = document.getElementById('cart-total');
        
        count.textContent = cart.length;
        
        itemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price;
            itemsContainer.innerHTML += `
                <div class="cart-item">
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            `;
        });
        
        totalElement.textContent = total.toFixed(2);
    }
});
