"use strict";

class Game {
    constructor() {
        this.rodada = 1
    }
    getRodada() {
		return this.rodada;
	}

    avancarRodada() {
        this.rodada++
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
    constructor(nome, valor, jogador, cor) {
        this.nome = nome;
        this.valor = valor;
        this.jogador = jogador;
        this.cor = cor;
    }
}

// Função para desenhar um território
function desenharTerritorio(ctx, territorio) {
    ctx.fillStyle = territorio.cor;
    ctx.fillRect(territorio.x, territorio.y, territorio.largura, territorio.altura);
    ctx.strokeRect(territorio.x - 10, territorio.y - 10, territorio.largura + 20, territorio.altura + 20);
    ctx.clearRect(territorio.x + 50, territorio.y + 50, territorio.largura - 100, territorio.altura - 100);
}

// Seu código existente
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Territorio 1
const territorio1 = new Territorio('pangea', 2, null, 'gray');
territorio1.x = 100;
territorio1.y = 100;
territorio1.largura = 200;
territorio1.altura = 200;
desenharTerritorio(ctx, territorio1);

// Territorio 2
const territorio2 = new Territorio('aldebaran', 7, null, 'gray');
territorio2.x = 400;
territorio2.y = 100;
territorio2.largura = 200;
territorio2.altura = 200;
desenharTerritorio(ctx, territorio2);

// Novo Territorio 3
const territorio3 = new Territorio('atlantis', 5, null, 'gray');
territorio3.x = 700;
territorio3.y = 100;
territorio3.largura = 200;
territorio3.altura = 200;
desenharTerritorio(ctx, territorio3);

// Lista de territórios
let listaTerritoriosJogo = [territorio1, territorio2, territorio3];

// Adiciona eventos de clique aos territórios
canvas.addEventListener('click', function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const territorioClicado = listaTerritoriosJogo.find(territorio => 
        mouseX >= territorio.x && mouseX <= territorio.x + territorio.largura &&
        mouseY >= territorio.y && mouseY <= territorio.y + territorio.altura 
    );

    if (territorioClicado) {
        if(inicioJogo) {
            escolherTerritorio(territorioClicado, jogador1);
            inicioJogo = false
            return
        }

        console.log("territorioClicado")
        console.log(territorioClicado)
        if(territorioClicado.jogador == "adriano") {
            console.log("Meu territorio")
            atribuirPontos(jogador1, territorioClicado)
            console.log(jogador1)
        }

    }
});

function atribuirPontos(jogador, territorioClicado) {
    jogador.pontosRodada--;
    //new JogadorAtribuicao(jogador, territorioClicado,?, game.rodada)
    territorioClicado.valor++
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
alert('Clique em um território para escolher como seu');

