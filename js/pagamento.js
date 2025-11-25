// Constantes
const FRETE_PRICE = 15.00;

// Carregar carrinho ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    setupMenuToggle();
    setupFormFormatting();
});

// Carregar itens do carrinho do localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.style.display = 'block';
        document.querySelector('.btn-finalizar').disabled = true;
        updateTotals([]);
    } else {
        emptyCartMessage.style.display = 'none';
        document.querySelector('.btn-finalizar').disabled = false;
        
        let html = '';
        cart.forEach((item, index) => {
            // Parse price
            const priceString = item.price.replace('R$ ', '').replace(',', '.');
            const price = parseFloat(priceString) * parseInt(item.quantity);
            
            html += `
                <div class="summary-item cart-item" data-index="${index}">
                    <div>
                        <div class="item-name">${item.product}</div>
                        <div class="item-details">
                            ${item.color ? 'Cor: ' + item.color + ' | ' : ''}
                            ${item.storage ? 'Armazenamento: ' + item.storage + ' | ' : ''}
                            Qtd: ${item.quantity}
                        </div>
                    </div>
                    <span class="item-price">R$ ${price.toFixed(2).replace('.', ',')}</span>
                    <button type="button" class="remove-btn" onclick="removeItem(${index})">✕</button>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        updateTotals(cart);
    }
}

// Remover item do carrinho
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Animação de remoção
    const itemElement = document.querySelector(`[data-index="${index}"]`);
    if (itemElement) {
        itemElement.style.opacity = '0';
        itemElement.style.transform = 'translateX(-20px)';
        itemElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            loadCart();
            showToast(`${removedItem.product} removido do carrinho`);
        }, 300);
    }
}

// Atualizar totais
function updateTotals(cart) {
    let subtotal = 0;
    
    // Se o carrinho estiver vazio, resetar valores
    if (!cart || cart.length === 0) {
        document.getElementById('subtotalPrice').textContent = 'R$ 0,00';
        document.getElementById('fretePrice').textContent = 'R$ 15,00';
        document.getElementById('totalPrice').textContent = 'R$ 15,00';
        return;
    }
    
    // Calcular subtotal
    cart.forEach(item => {
        try {
            // Remover 'R$ ' e converter vírgula para ponto
            let priceString = item.price;
            
            // Se o preço vier como número, converter para string
            if (typeof priceString === 'number') {
                priceString = 'R$ ' + priceString.toFixed(2).replace('.', ',');
            }
            
            priceString = priceString.replace('R$ ', '').replace(',', '.');
            const price = parseFloat(priceString);
            const quantity = parseInt(item.quantity) || 1;
            
            if (!isNaN(price)) {
                subtotal += price * quantity;
            }
        } catch (error) {
            console.error('Erro ao calcular preço do item:', item, error);
        }
    });
    
    // Calcular frete (grátis se subtotal > R$ 100)
    const frete = subtotal > 100 ? 0 : FRETE_PRICE;
    const total = subtotal + frete;
    
    // Atualizar DOM
    document.getElementById('subtotalPrice').textContent = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
    document.getElementById('fretePrice').textContent = frete === 0 ? 'Grátis' : 'R$ ' + frete.toFixed(2).replace('.', ',');
    document.getElementById('totalPrice').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    
    // Debug
    console.log('Carrinho atualizado:', {
        itemsCount: cart.length,
        subtotal: subtotal.toFixed(2),
        frete: frete.toFixed(2),
        total: total.toFixed(2)
    });
}

// Menu toggle
function setupMenuToggle() {
    document.getElementById('menuToggle').addEventListener('click', function() {
        document.getElementById('sideMenu').classList.toggle('open');
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('sideMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('open');
        }
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        z-index: 5000;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Setup form formatting
function setupFormFormatting() {
    // Phone formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = '(' + value;
                } else if (value.length <= 7) {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
                } else {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7, 11);
                }
            }
            e.target.value = value;
        });
    }

    // CEP formatting
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 5) {
                value = value.slice(0, 5) + '-' + value.slice(5, 8);
            }
            e.target.value = value;
        });
    }

    // Card number formatting
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Expiry formatting
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV only digits
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Remove error styling when user starts typing
    document.querySelectorAll('#paymentForm input, .address-form input').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorDiv = this.parentElement.querySelector('.error-message');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
    });
}

// Payment Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateAndSubmitPayment();
        });
    }
});

function validateAndSubmitPayment() {
    // Get form values
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    
    // Delivery address values
    const fullName = document.getElementById('fullName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Clear previous error messages
    clearErrors();
    
    // Validate all fields
    let isValid = true;
    
    // Check empty fields
    if (!cardName) {
        showError('cardName', 'Nome do titular é obrigatório');
        isValid = false;
    }
    
    if (!cardNumber) {
        showError('cardNumber', 'Número do cartão é obrigatório');
        isValid = false;
    }
    
    if (!expiry) {
        showError('expiry', 'Data de validade é obrigatória');
        isValid = false;
    }
    
    if (!cvv) {
        showError('cvv', 'CVV é obrigatório');
        isValid = false;
    }
    
    if (!fullName) {
        showError('fullName', 'Nome completo é obrigatório');
        isValid = false;
    }
    
    if (!address) {
        showError('address', 'Endereço é obrigatório');
        isValid = false;
    }
    
    if (!city) {
        showError('city', 'Cidade é obrigatória');
        isValid = false;
    }
    
    if (!state) {
        showError('state', 'Estado é obrigatório');
        isValid = false;
    }
    
    if (!cep) {
        showError('cep', 'CEP é obrigatório');
        isValid = false;
    }
    
    if (!phone) {
        showError('phone', 'Telefone é obrigatório');
        isValid = false;
    }
    
    // Validate card number format (16 digits)
    const cardNumberClean = cardNumber.replace(/\s/g, '');
    if (cardNumberClean && !/^\d{16}$/.test(cardNumberClean)) {
        showError('cardNumber', 'Número do cartão deve ter 16 dígitos');
        isValid = false;
    }
    
    // Validate CVV format (3 digits)
    if (cvv && !/^\d{3}$/.test(cvv)) {
        showError('cvv', 'CVV deve ter 3 dígitos');
        isValid = false;
    }
    
    // Validate expiration date format (MM/AA)
    if (expiry && !/^\d{2}\/\d{2}$/.test(expiry)) {
        showError('expiry', 'Data deve estar no formato MM/AA');
        isValid = false;
    } else if (expiry) {
        // Validate expiration date is not in the past
        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const expiryYear = parseInt(year);
        const expiryMonth = parseInt(month);
        
        if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
            showError('expiry', 'Data de validade expirada');
            isValid = false;
        }
        
        // Validate month is between 01 and 12
        if (expiryMonth < 1 || expiryMonth > 12) {
            showError('expiry', 'Mês inválido');
            isValid = false;
        }
    }
    
    // If all validations pass
    if (isValid) {
        // Clear cart after successful payment
        localStorage.removeItem('cart');
        showToast('Pagamento confirmado!', 'success');
        
        setTimeout(() => {
            alert('Pagamento confirmado! Seu pedido será processado em breve.');
            window.location.href = '/html/home.html';
        }, 1500);
    }
}

// Helper function to show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        
        // Check if error message already exists
        let errorDiv = field.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
}

// Helper function to clear all errors
function clearErrors() {
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    });
}
