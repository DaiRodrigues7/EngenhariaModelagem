const toggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

toggle.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
});

//fecha só clicando fora
document.addEventListener("click", (e) => {
    if (!sideMenu.contains(e.target) && !toggle.contains(e.target)) {
        sideMenu.classList.remove("open");
    }
});

// Product card click handler
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        // Redirecionar para página de produto
        window.location.href = this.href;
    });
});

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('a[href="/html/carrinho.html"]');
    
    if (cartIcon) {
        // Remove badge anterior se existir
        const existingBadge = cartIcon.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }

        // Adicionar novo badge se houver itens
        if (cart.length > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = cart.length;
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -10px;
                background: #dc3545;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            `;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(badge);
        }
    }
}

// Update badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Listen for storage changes (carrinho atualizado em outra aba/janela)
window.addEventListener('storage', updateCartBadge);