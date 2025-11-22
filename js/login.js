document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const messageBox = document.getElementById('message-box');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const showMessage = (text, isError = false) => {
        messageBox.textContent = text;
        messageBox.classList.remove('hidden', 'bg-red-900/50', 'text-red-300', 'bg-green-900/50', 'text-green-300');
        if (isError) {
             messageBox.classList.add('bg-red-900/50', 'text-red-300');
        } else {
            messageBox.classList.add('bg-green-900/50', 'text-green-300');
        }
    };

    const hideMessage = () => {
        messageBox.classList.add('hidden');
        messageBox.textContent = '';
    };

    form.addEventListener('submit', async (e) => {
         e.preventDefault(); // Previne o envio padrão do formulário
         hideMessage();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

        if (!username || !password) {
            showMessage("Por favor, preencha todos os campos.", true);
            return;
        }

    const validUsername = "teste@exemplo.pt";
    const validPassword = "dadai123";

        if (username === validUsername && password === validPassword) {
            showMessage("Sessão iniciada com sucesso! Redirecionando...", false);
            form.reset();
        } else {
            showMessage("Credenciais inválidas. Tente novamente.", true);
            asswordInput.value = ''; 
        }
    });
});