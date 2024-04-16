const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarSpan = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


musicaFocoInput.addEventListener('change', function() {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})


// focoBt.addEventListener('click', function() {
//     html.setAttribute('data-contexto', 'foco');
//     banner.setAttribute('src', '/imagens/foco.png');
// })
focoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

// curtoBt.addEventListener('click', function() {
//     html.setAttribute('data-contexto', 'descanso-curto');
//     banner.setAttribute('src', '/imagens/descanso-curto.png');
// })

curtoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

// longoBt.addEventListener('click', function() {
//     html.setAttribute('data-contexto', 'descanso-longo');
//     banner.setAttribute('src', '/imagens/descanso-longo.png');
// })

longoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto (contexto) {
    mostrarTempo();
    botoes.forEach(function(botao) {
        botao.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>'
            break;
        case 'descanso-curto':
            titulo.innerHTML = 'Que tal dar uma respirada? <br> <strong class="app__title-strong">Faça uma pausa curta!</strong>'   
            break;
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície. <br> <strong class="app__title-strong">Faça uma pausa longa.</strong> '
            break;
        default:
            break;
    }
}

const contagemRegressiva = function () {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    // Quando é chamado no evento de CLICK, o intervaloId AINDA TEM O VALOR DE NADA/NULL, por isso ele começa normal, se clicar de novo, ele vai ter algum valor, conforme feito na condição IF. Sendo assim, é chamado a função zerar() onde para a contagem (clearInterval) e da ao intervaloId o valor de NULL novamente,  para após clicar, ser continuado a contagem, visto que a variavel contagemRegressiva nao foi afetado nisso, continuando de onde parou.
    if (intervaloId) {
        iniciarOuPausarSpan.textContent ='Começar';
        iniciarOuPausarImg.src = '/imagens/play_arrow.png';
        audioPause.play();
        zerar();
        return;
    }
    iniciarOuPausarSpan.textContent ='Pausar';
    iniciarOuPausarImg.src = '/imagens/pause.png'
    audioPlay.play();
    intervaloId = setInterval (contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null
}

function mostrarTempo() {
    // OBS: A função objeto Date trabalha com MILISEGUNDOS, por isso pegamos o valor em segundos 1500 e multiplicamos por 1000
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

