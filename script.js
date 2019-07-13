var timerId = null; // variavel que armazena a chamada da funcao timeout

function iniciaJogo() {

    var varUrl = window.location.search //busca o valor que esta depois de *.html no url, nesse caso vai trazer ? + a informação depois da interogação

    var varNivelJogo = varUrl.replace("?", ""); //metodo repleace subtitui o valor de ? por nada

    var varTempoSegundos = 0

    // 1 facil > 120 segundos
    if (varNivelJogo == 1) {
        varTempoSegundos = 120
    }

    // 2 normal > 60 segundos
    if (varNivelJogo == 2) {
        varTempoSegundos = 60
    }

    //3 dificil > 30 segundos
    if (varNivelJogo == 3) {
        varTempoSegundos = 30
    }

    // inserir segundos no cronometro
    console.log(varTempoSegundos)
    document.getElementById("idCronometro1").innerHTML = varTempoSegundos


    var varQtdBaloes = 80;

    criaBaloes(varQtdBaloes)

    document.getElementById("idBaloesInteiros").innerHTML = varQtdBaloes
    document.getElementById("idBaloesEstourados").innerHTML = 0

    contagemTempo(varTempoSegundos + 1)

}

function contagemTempo(segundos) {

    segundos = segundos - 1

    if (segundos == -1) {
        clearTimeout(timerId)// para a execucao da funcao setTimeOut
        gameOver()
        return false
    }

    document.getElementById("idCronometro1").innerHTML = segundos

    timerId = setTimeout("contagemTempo(" + segundos + ")", 1000)
}

function gameOver() {
    removeEventosBaloes()
    alert("Fim de jogo, você não conseguiu estourar todos os balões a tempo")
}


function criaBaloes(varQtdBaloes) {

    for (var i = 1; i <= varQtdBaloes; i++) {

        var varBalao = document.createElement("img")
        varBalao.src = "imagens/balao_azul_pequeno.png"
        varBalao.style.margin = '10px'
        varBalao.style.cursor = 'pointer'
        varBalao.id = 'b' + i
        varBalao.onclick = function () { estourar(this) }


        document.getElementById("idCenario").appendChild(varBalao)
    }

}

function estourar(e) {
    var idBalao = e.id
    document.getElementById(idBalao).setAttribute("onclick", "")
    document.getElementById(idBalao).src = "imagens/balao_azul_pequeno_estourado.png"

    pontuacao(-1)

    // alert(idBalao)
}

function pontuacao(acao) {

    var varBaloesInteiros = document.getElementById("idBaloesInteiros").innerHTML
    var varBaloesEstourados = document.getElementById("idBaloesEstourados").innerHTML

    varBaloesInteiros = parseInt(varBaloesInteiros)
    varBaloesEstourados = parseInt(varBaloesEstourados)

    varBaloesInteiros = varBaloesInteiros + acao
    varBaloesEstourados = varBaloesEstourados - acao

    document.getElementById("idBaloesInteiros").innerHTML = varBaloesInteiros
    document.getElementById("idBaloesEstourados").innerHTML = varBaloesEstourados

    situacaoJogo(varBaloesInteiros)
}

function situacaoJogo(parBaloesInteiros) {

    if (parBaloesInteiros == 0) {
        alert('Parabéns, você conseguiu estourar todos os balões com problema')
        pararJogo()
    }

}

function pararJogo() {
    clearTimeout(timerId);
}

function removeEventosBaloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {  //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = ''; i++; //faz a iteração da variávei i
    }
}