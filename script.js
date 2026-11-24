const perguntas = [
    {
        pergunta: "O que é Desenvolvimento de Sistemas?",
        alternativas: [
            "Criar e desenvolver programas e sistemas",
            "Consertar apenas computadores",
            "Montar móveis tecnológicos",
            "Criar apenas jogos",
            "Trabalhar somente com internet"
        ],
        correta: 0
    },
    {
        pergunta: "Qual destas é uma possivel carreira  para quem  faz o curso?",
        alternativas: [
            "Analista de sistemas",
            "Desenvolvedor de Software",
            "Especialista em marketing digital",
            "Designer gráfico",
            "Professor"
        ],
        correta: 1
    },
    {
        pergunta: "Para que serve o curso de Desenvolvimento de Sistemas?",
        alternativas: [
            "Ensinar somente a consertar celulares",
            "Ensinar a montar computadores",
            "Preparar para criar programas, sites e aplicativos",
            "Ensinar apenas a usar redes sociais",
            "Trabalhar somente com desenhos"
        ],
        correta: 2
    },
    {
        pergunta: "Como a tecnologia está presente no nosso cotidiano?",
        alternativas: [
            "Somente nas escolas",
            "Apenas nos computadores",
            "Somente nos videogames",
            "Em celulares, bancos, escolas e vários serviços",
            "Apenas nas empresas"
        ],
        correta: 3
    },
    {
        pergunta: "Por que escolher o curso de Desenvolvimento de Sistemas? ",
        alternativas: [
            "Porque não possui atividades práticas",
            "Porque é voltado apenas para diversão",
            "Porque oferece aprendizado ptático e está alinhado com o mercado",
            "Porque não precisa aprender programação",
            "Porque permite aprender diferentes tecnologias"
        ],
        correta: 4
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostas = [];

const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const perguntaTexto = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const proximo = document.getElementById("proximo");

document.getElementById("comecar").onclick = function() {
    inicio.hidden = true;
    quiz.hidden = false;
    mostrarPergunta();
};

function mostrarPergunta() {
    alternativas.innerHTML = "";
    proximo.hidden = true;

    document.getElementById("aviso").textContent =
        "Escolha uma alternativa";

    let atual = perguntas[perguntaAtual];

    perguntaTexto.textContent = atual.pergunta;

    document.getElementById("contador").textContent =
        "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;

    let porcentagem = (perguntaAtual / perguntas.length) * 100;

    document.getElementById("progresso").textContent =
        Math.round(porcentagem) + "%";

    document.getElementById("barra-progresso").style.width =
        porcentagem + "%";

    for (let i = 0; i < atual.alternativas.length; i++) {
        let botao = document.createElement("button");

        botao.className = "alternativa";
        botao.textContent = atual.alternativas[i];

        botao.onclick = function() {
            selecionarResposta(i);
        };

        alternativas.appendChild(botao);
    }
}

function selecionarResposta(escolhida) {
    let atual = perguntas[perguntaAtual];
    let botoes = alternativas.children;

    let acertou = escolhida === atual.correta;

    if (acertou) {
        pontuacao++;
    }

    respostas.push({
        escolhida: escolhida,
        acertou: acertou
    });

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;

        if (i === atual.correta) {
            botoes[i].classList.add("correta");
        }

        if (i === escolhida && !acertou) {
            botoes[i].classList.add("errada");
        }
    }

    if (acertou) {
        document.getElementById("aviso").textContent =
            "Muito bem! Você acertou!";
    } else {
        document.getElementById("aviso").textContent =
            "Resposta incorreta!";
    }

    proximo.hidden = false;
}

proximo.onclick = function() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
};

function mostrarResultado() {
    quiz.hidden = true;
    resultado.hidden = false;

    let erros = perguntas.length - pontuacao;

    document.getElementById("pontuacao").textContent =
        pontuacao + "/" + perguntas.length;

    document.getElementById("total-acertos").textContent = pontuacao;
    document.getElementById("total-erros").textContent = erros;

    document.getElementById("progresso").textContent = "100%";
    document.getElementById("barra-progresso").style.width = "100%";

    let revisao = document.getElementById("revisao");
    revisao.innerHTML = "";

    for (let i = 0; i < perguntas.length; i++) {
        let texto = document.createElement("p");

        if (respostas[i].acertou) {
            texto.className = "certo";
            texto.textContent =
                "✓ ACERTOU! Pergunta " + (i + 1);
        } else {
            texto.className = "errado";
            texto.textContent =
                "✕ ERROU! Pergunta " + (i + 1) +
                " | Resposta correta: " +
                perguntas[i].alternativas[perguntas[i].correta];
        }

        revisao.appendChild(texto);
    }
}

function reiniciar() {
    perguntaAtual = 0;
    pontuacao = 0;
    respostas = [];

    resultado.hidden = true;
    inicio.hidden = false;

    document.getElementById("barra-progresso").style.width = "0%";
}
