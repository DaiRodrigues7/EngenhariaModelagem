document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('login-form'); // Seleciona o formulário de login
            const messageBox = document.getElementById('message-box'); // Caixa de mensagens
            const usernameInput = document.getElementById('username'); // Campo de nome de utilizador ou email
            const passwordInput = document.getElementById('password'); // Campo de palavra-passe

            const showMessage = (text, isError = false) => { // Função para mostrar mensagens
                messageBox.textContent = text; // Define o texto da mensagem
                messageBox.classList.remove('hidden', 'bg-red-900/50', 'text-red-300', 'bg-green-900/50', 'text-green-300'); // Remove classes anteriores
                messageBox.classList.add('block'); // Mostra a caixa de mensagem
                if (isError) {
                    messageBox.classList.add('bg-red-900/50', 'text-red-300');
                } else {
                    messageBox.classList.add('bg-green-900/50', 'text-green-300');
                }
            };

            const hideMessage = () => { // Função para esconder mensagens 
                messageBox.classList.add('hidden'); // Esconde a caixa de mensagem
                messageBox.textContent = ''; // Limpa o texto da mensagem
            };

            form.addEventListener('submit', async (e) => { // Manipulador de evento para o envio do formulário
                e.preventDefault(); // Previne o envio padrão do formulário

                hideMessage(); // Esconde qualquer mensagem anterior

                const username = usernameInput.value.trim(); // Obtém o valor do nome de utilizador ou email
                const password = passwordInput.value.trim(); // Obtém o valor da palavra-passe

                if (!username || !password) { // Verifica se os campos estão preenchidos
                    showMessage("Por favor, preencha todos os campos.", true); // Mostra mensagem de erro
                    return;
                }

                const validUsername = "dadai@";
                const validPassword = "dadai123";

                if (username === validUsername && password === validPassword) {
                    showMessage("Sessão iniciada com sucesso! Redirecionando...", false);
                    form.reset();

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1500);

                } else {
                    showMessage("Credenciais inválidas. Tente novamente.", true);
                    passwordInput.value = ''; 
                }
            });
        });