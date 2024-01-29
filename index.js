"use strict";

class Game {
    constructor() {
        this.rodada = 1
        this.listaAtribuicoes = []
        this.listaEnvios = []
    }
    getRodada() {
        return this.rodada;
    }

    avancarRodada() {
        this.rodada++
    }
    adicionaAtribuicao(atribuicao) {
        this.listaAtribuicoes.push(atribuicao)
    }
}

let game = new Game();

// Define a classe Jogador
class Jogador {
    constructor(nome, cor, territorios, pontosRodada) {
        this.nome = nome;
        this.cor = cor;
        this.territorios = territorios;
        this.pontosRodada = pontosRodada
    }
}

class JogadorAtribuicao {
    constructor(jogador, territorio, quantidade, game) {
        this.jogador = jogador.nome;
        this.territorio = territorio.nome;
        this.quantidade = quantidade;
        this.rodada = game.rodada
    }

    getJogador() {
        return this.jogador;
    }

    getPais() {
        return this.pais;
    }

    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }

    getQuantidade() {
        return this.quantidade;
    }
}

const jogador1 = new Jogador('adriano', 'blue', [], 5);
const computador = new Jogador('computador', 'red', [], 5);

// Defina a classe Territorio
class Territorio {
    constructor(nome, valor, jogador, cor, x, y, largura, altura) {
        this.nome = nome;
        this.valor = valor;
        this.jogador = jogador;
        this.cor = cor;
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.adjacencias = []
        this.setas = []
    }

    setarAdjacencias(adjacencias) {
        this.adjacencias = adjacencias
    }

    adicionarSetas(setas) {
        this.setas.push(setas)
    }
}

// Função para desenhar um território
function desenharTerritorio(ctx, territorio) {
    ctx.fillStyle = territorio.cor;
    ctx.fillRect(territorio.x, territorio.y, territorio.largura, territorio.altura);
    ctx.strokeRect(territorio.x - 10, territorio.y - 10, territorio.largura + 20, territorio.altura + 20);
    ctx.clearRect(territorio.x + 50, territorio.y + 50, territorio.largura - 100, territorio.altura - 100);

    // Configurar o texto
    ctx.fillStyle = "orange";  // Cor do texto
    ctx.font = "20px Arial";  // Configuração da fonte

    // Obter as coordenadas do meio do território
    const meioX = territorio.x + territorio.largura / 2;
    const meioY = territorio.y + territorio.altura / 2;

    // Calcular a largura do texto
    const larguraTexto = ctx.measureText(territorio.nome).width;

    // Posicionar e desenhar o texto no meio do território
    ctx.fillText(territorio.valor, meioX - larguraTexto / 2, meioY);
}


// Seu código existente
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let territorioAcionado
// Territorio 1
const territorio1 = new Territorio('pangea', 2, null, 'gray', 100, 100, 200, 200);
desenharTerritorio(ctx, territorio1);

// Territorio 2
const territorio2 = new Territorio('aldebaran', 7, null, 'gray', 400, 100, 200, 200);
desenharTerritorio(ctx, territorio2);

// Novo Territorio 3
const territorio3 = new Territorio('atlantis', 5, null, 'gray', 700, 100, 200, 200);
desenharTerritorio(ctx, territorio3);

territorio1.setarAdjacencias([territorio2])
territorio2.setarAdjacencias([territorio1, territorio3])
territorio3.setarAdjacencias([territorio2])

// Lista de territórios
let listaTerritoriosJogo = [territorio1, territorio2, territorio3];

criarAdjacencias()
function criarAdjacencias() {
    listaTerritoriosJogo.forEach(territorio => {
        territorio.adjacencias.forEach(adjacencia => {
            let meioX = adjacencia.x + adjacencia.largura / 2;
            let meioY = adjacencia.y + adjacencia.altura / 2;
            territorio.adicionarSetas({ meioX: meioX, meioY: meioY })
        })

    })


}


// Adiciona eventos de clique aos territórios
canvas.addEventListener('click', function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const territorioClicado = listaTerritoriosJogo.find(territorio =>
        mouseX >= territorio.x && mouseX <= territorio.x + territorio.largura &&
        mouseY >= territorio.y && mouseY <= territorio.y + territorio.altura
    );

   /* const setaClicada = listaTerritoriosJogo.forEach(territorio => {
        territorio.adjacencias.forEach(adjacencia => {
            let meioX = adjacencia.x + adjacencia.largura / 2;
            let meioY = adjacencia.y + adjacencia.altura / 2;
            return mouseX >= meioX && mouseX <= meioX + territorio.largura &&
             mouseY >= meioY && mouseY <= meioY + territorio.altura
        })
    })*/

   // console.log(setaClicada)

    if (territorioClicado) {
        if (inicioJogo) {
            escolherTerritorio(territorioClicado, jogador1);
            inicioJogo = false
            return
        }

        console.log("territorioClicado")
        console.log(territorioClicado)
        if (territorioClicado.jogador == "adriano" && jogador1.pontosRodada > 0) {
            console.log("Meu territorio")
            atribuirPontos(jogador1, territorioClicado)
            desenharTerritorio(ctx, territorioClicado)
            console.log(jogador1)
        } else if(territorioClicado.jogador == "adriano") {
            console.log("Abrir setas")
            desenharSeta(ctx, territorioClicado);
            territorioAcionado = territorioClicado
        }

    }
});

function desenharSeta(ctx, territorio) {
    territorio.adjacencias.forEach((adjacencia, index) => {
        // Desenhar a seta
        ctx.lineWidth = 20;
        ctx.fillStyle = adjacencia.jogador === "adriano" ? "blue" : "red";
        ctx.strokeStyle = adjacencia.jogador === "adriano" ? "blue" : "red";
        ctx.beginPath();

        let meioX = territorio.x + territorio.largura / 2;
        let meioY = territorio.y + territorio.altura / 2;
        ctx.moveTo(meioX + 10, meioY);
        let adjacenciaMeioX = territorio.setas[index].meioX 
        let adjacenciaMeioY = territorio.setas[index].meioY 

        ctx.lineTo(adjacenciaMeioX, adjacenciaMeioY);

        ctx.closePath();

        // Preencher a seta com a cor
        ctx.fill();

        // Desenhar o contorno da seta
        ctx.stroke();

        ctx.fillStyle = "pink";
        ctx.beginPath();
        console.log(adjacenciaMeioX, adjacenciaMeioY)
        ctx.moveTo(adjacenciaMeioX, adjacenciaMeioY);

        ctx.lineTo(adjacenciaMeioX, adjacenciaMeioY - 30);
        ctx.lineTo(adjacenciaMeioX + 30, adjacenciaMeioY);
        ctx.lineTo(adjacenciaMeioX, adjacenciaMeioY + 30);

        ctx.closePath();
        ctx.fill();
    });
}


function atribuirPontos(jogador, territorioClicado) {
    const jogadaEncontrada = existeJogada(jogador, territorioClicado)
    if (jogadaEncontrada) {
        jogadaEncontrada.quantidade++
    } else {
        game.adicionaAtribuicao(new JogadorAtribuicao(jogador, territorioClicado, 1, game))
    }
    jogador.pontosRodada--;
    //new JogadorAtribuicao(jogador, territorioClicado,?, game.rodada)
    territorioClicado.valor++
}

function existeJogada(jogador, territorioClicado) {
    const atribuicaoEncontrada = game.listaAtribuicoes.filter(atribuicao => {
        return atribuicao.rodada === game.rodada
            && atribuicao.jogador === jogador.nome
            && atribuicao.territorio === territorioClicado.nome
    })

    if (atribuicaoEncontrada.length == 0) {
        return false

    }
    return atribuicaoEncontrada[0];
}

// Função para escolher um território por um jogador
function escolherTerritorio(territorio, jogador) {
    territorio.jogador = jogador;
    jogador.territorios.push(territorio);

    alert(`${jogador.nome} escolheu o território ${territorio.nome}`);

    const territorioEncontrado = listaTerritoriosJogo.find(t => t.nome === territorio.nome);

    if (territorioEncontrado) {
        console.log("Território encontrado:", territorio);
        territorio.cor = jogador.cor;
        territorio.jogador = jogador.nome;
        desenharTerritorio(ctx, territorio);

    } else {
        console.log("Território não encontrado na lista.");
    }
}

let inicioJogo = true;
// Começar jogo
//alert('Clique em um território para escolher como seu');



// Adicione este código após a definição da função desenharSeta

// Obtém as coordenadas do clique do mouse no canvas
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Verifica se o ponto de clique está dentro da área da seta
function isInsideArrow(mouseX, mouseY, arrowX, arrowY) {
    // Defina a lógica para verificar se o ponto está dentro da área da seta
    // Neste exemplo, estamos usando uma caixa delimitadora simples como exemplo
    return (
        mouseX >= arrowX &&
        mouseX <= arrowX + 30 && // largura da seta
        mouseY >= arrowY - 30 && // altura da seta (ajuste conforme necessário)
        mouseY <= arrowY + 30
    );
}

// Adiciona um ouvinte de clique ao canvas
canvas.addEventListener('click', function (event) {
    var mousePos = getMousePos(canvas, event);

    // Itera sobre as setas e verifica se o clique ocorreu em alguma delas
    territorioAcionado.adjacencias.forEach((adjacencia, index) => {
        var arrowX = territorioAcionado.setas[index].meioX;
        var arrowY = territorioAcionado.setas[index].meioY;

        if (isInsideArrow(mousePos.x, mousePos.y, arrowX, arrowY)) {
            // Código a ser executado quando a seta for clicada

            console.log('Seta clicada!');
            console.log(territorioAcionado.nome + " Para " + adjacencia.nome)
            // Adicione aqui a lógica que você deseja executar ao clicar na seta
        }
    });
});