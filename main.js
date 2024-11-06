// Data do evento (Ajuste aqui para o seu evento)
const eventDate = new Date("2024-11-18T08:00:00").getTime();

// Função para atualizar o contador a cada segundo
function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  // Cálculos de dias, horas, minutos e segundos
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Exibir o valor no HTML
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // Se o evento já passou, mostrar uma mensagem
  if (timeLeft < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown-container").innerHTML = "<h1>O evento já começou!</h1>";
  }
}

// Atualizar o contador a cada segundo
const countdown = setInterval(updateCountdown, 1000);

// Exibe e esconde informações adicionais
const showButton = document.getElementById('showCardButton');
const closeButton = document.getElementById('closeCardButton');
const card = document.getElementById('card');
const infoText = document.getElementById('infoText');

// Esconde o card inicialmente
card.style.display = 'none';

// Exibe o card e oculta o texto "Saiba Mais"
showButton.addEventListener('click', function () {
  infoText.style.display = 'none';
  card.style.display = 'block';
});

// Fecha o card e exibe o texto "Saiba Mais" novamente
closeButton.addEventListener('click', function () {
  card.style.display = 'none';
  infoText.style.display = 'block';
});

// Localize a linha que define o elemento que está gerando o erro
const button = document.querySelector('#buttonSend'); // ou outro seletor que você estiver usando

// Adicione uma verificação para garantir que o elemento existe
// Função para validar campos e enviar o formulário
async function validarCampos() {
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');

  const nomeValido = validarNome(nome);
  const emailValido = validarEmail(email);
  const telefoneValido = validarTelefone(telefone);

  if (nomeValido && emailValido && telefoneValido) {
    // Dados do formulário
    const data = {
      nome: nome.value,
      email: email.value,
      telefone: telefone.value
    };

    // Exibe a mensagem de carregamento
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block'; // Mostra a mensagem de carregamento

    try {
      const response = await fetch('https://julia-forms.onrender.com/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        // Redireciona para o link do WhatsApp ou outra página
        window.location.href = result.redirect; // Mude para a URL desejada
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      // Você pode adicionar um log ou tratamento de erro aqui se desejar
    } finally {
      // Oculta a mensagem de carregamento após o envio
      loadingMessage.style.display = 'none'; // Esconde a mensagem de carregamento
    }
  }
}


// Validação individual de campos
function validarNome(campo) {
  const valido = campo.value.trim().length > 0;
  aplicarBorda(campo, valido);
  return valido;
}

function validarEmail(campo) {
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value);
  aplicarBorda(campo, valido);
  return valido;
}

function validarTelefone(campo) {
  const valido = /^\d{10,11}$/.test(campo.value); // Aceita telefone com 10 ou 11 dígitos
  aplicarBorda(campo, valido);
  return valido;
}

// Função para aplicar estilo de borda e mensagem de erro
function aplicarBorda(campo, valido) {
  const mensagemErro = campo.nextElementSibling;

  if (valido) {
    campo.classList.add('valid');
    campo.classList.remove('invalid');
    mensagemErro.style.display = 'none'; // Esconde mensagem de erro
  } else {
    campo.classList.add('invalid');
    campo.classList.remove('valid');
    mensagemErro.textContent = 'Dado Inválido';
    mensagemErro.style.display = 'block'; // Mostra mensagem de erro
  }
}

// Adiciona o evento de envio do formulário
document.getElementById('cadastroForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  validarCampos(); // Chama a função de validação
});