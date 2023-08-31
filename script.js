// Seleciona o elemento HTML com a classe 'btns' e armazena na variável 'button'
var button = document.querySelector('.btns');
// Seleciona o elemento HTML com a classe 'container' e armazena na variável 'container'
var container = document.querySelector('.container');
// Seleciona o elemento HTML com o id 'quantidadeLeds' e armazena na variável 'quantidadeLedInput'
var quantidadeLedInput = document.getElementById('quantidadeLeds');
// Seleciona o elemento HTML com o id 'ddp' e armazena na variável 'ddpInput'
var ddpInput = document.getElementById('ddp');

// Declaração de variáveis iniciais
var state = true; // Variável de controle de estado
var resistencia = 0; // Valor da resistência (inicializada com 0)
var tensaoled = 2; // Tensão dos LEDs
var corrente = 20000; // Valor da corrente

// Função para calcular a resistência
function calcularResistencia() {
  // Converte os valores dos inputs para números de ponto flutuante
  var quantidadeLed = parseFloat(quantidadeLedInput.value);
  var ddp = parseFloat(ddpInput.value);

  // Calcula a resistência usando a fórmula (ddp - tensaoled) / corrente
  resistencia = (ddp - tensaoled) / corrente;

  // Retorna a quantidade de LEDs ou 1 dependendo do estado
  if (state) {
    return quantidadeLed;
  } else {
    return 1;
  }
}

// Função para atualizar o resultado na página
function atualizarResultado() {
  // Remove parágrafos existentes dentro do elemento 'container'
  const existingParagraphs = container.querySelectorAll('p');
  existingParagraphs.forEach((existingP) => {
    container.removeChild(existingP);
  });

  // Cria um novo parágrafo para exibir o resultado
  const p = document.createElement('p');
  var resistenciaCalculada = calcularResistencia();
  // Define o conteúdo do parágrafo com os resultados calculados
  p.innerHTML = 'Você precisará de ' + resistenciaCalculada + ' resistor(es) de ' + resistencia + ' Ω.';
  // Adiciona o parágrafo ao elemento 'container'
  container.appendChild(p);

  // Remove imagens existentes dentro do elemento 'container'
  const existingImages = container.querySelectorAll('img');
  existingImages.forEach((existingImg) => {
    container.removeChild(existingImg);
  });

  // Adiciona imagens de resistores de acordo com a resistência calculada
  for (let i = 0; i < resistenciaCalculada; i++) {
    const img = document.createElement('img');
    img.src = 'resistor.jpg';
    container.appendChild(img);
  }
}

// Adiciona um listener para o evento de clique
document.addEventListener('click', e => {
  let x = e.target;
  // Verifica se o elemento clicado possui a classe 'btns'
  if (x.classList.contains('btns')) {
    // Alterna entre os modos Paralelo e Série e atualiza o estado
    if (button.innerHTML === 'Paralelo') {
      button.style.backgroundColor = 'green';
      button.innerHTML = 'Série';
      state = false;
    } else {
      button.style.backgroundColor = 'red';
      button.innerHTML = 'Paralelo';
      state = true;
    }
  }
  
  // Verifica se o elemento clicado possui a classe 'calculate'
  if (x.classList.contains('calculate')) {
    // Chama a função para atualizar o resultado
    atualizarResultado();
  }
});
