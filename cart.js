document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    
    document.querySelectorAll('.add-to-cart, .product button:not([target="_blank"])').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = e.target.closest('.product');
            const name = product.querySelector('h4').textContent;
            const priceText = product.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            
            cart.push({ name, price });
            updateCart();
            
            const originalText = button.textContent;
            button.textContent = '✓ Added!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        });
    });
    
    document.getElementById('cart-icon').addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('cart-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', () => {
        document.getElementById('cart-dropdown').style.display = 'none';
    });
    
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`Checkout complete! Total: $${calculateTotal().toFixed(2)}`);
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
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
            `;
        });
        
        totalElement.textContent = total.toFixed(2);
    }
    
    function calculateTotal() {
        return cart.reduce((sum, item) => sum + item.price, 0);
    }
});
