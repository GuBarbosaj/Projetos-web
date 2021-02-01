var altura = window.innerHeight
var largura = window.innerWidth
var vidas = 1
var tempo, tempoRespawn

var nivel = window.location.search
nivel = nivel.replace('?', '')


if (nivel === 'facil'){
	tempo = 30
	tempoRespawn = 2000
}else if (nivel === 'normal') {
	tempo = 45
	tempoRespawn = 1000
}else if (nivel === 'dificil'){
	tempo = 60
	tempoRespawn = 750
}


function ajustaTamanhoPalcoJogo (){
 	altura = window.innerHeight
	largura = window.innerWidth
	//console.log(largura, altura)
}

var cronometro = setInterval(function(){
	tempo -= 1;
	if (tempo < 0){
		clearInterval(cronometro)
		clearInterval(cria_mosca)
		window.location.href = 'vitoria.html'
	}else{
		document.getElementById('cronometro').innerHTML = tempo	
	}
}, 1000)

function posicaoRandomica() {
	if (document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()
		if(document.getElementById(parseInt(vidas))){
			document.getElementById(parseInt(vidas)).src = "imagens/coracao_vazio.png"
			vidas++
		}else{
			window.location.href = 'fim_jogo.html'
		}
		console.log(vidas)
	}


	var x = Math.floor(Math.random() * largura) - 90
	var y = Math.floor(Math.random() * altura) - 90

	x = x < 0 ? 0 : x
	y = y < 0 ? 0 : y

	//console.log(x, y)

	mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.position = 'absolute'
	mosquito.style.left = x + 'px'
	mosquito.style.top = y + 'px'
	mosquito.id = 'mosquito'
	mosquito.onclick = function () {
		this.remove()
	}

	document.body.appendChild(mosquito)

}

function tamanhoAleatorio() {
	var classe = Math.ceil(Math.random() * 3)

	if(classe === 1){
		return 'mosquito1'
	}else if (classe === 2){
		return 'mosquito2'
	}else{
		return 'mosquito3'
	}
}

function ladoAleatorio() {
	var classe = Math.ceil(Math.random() * 2)
	if(classe === 1){
		return 'ladoA'
	}else {
		return 'ladoB'
	}
}

