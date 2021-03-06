class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == null || this[i] == ""){
				return false
			}
		}
		return true
	}
}

class Bd{
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null){
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId)+1
	}

	gravar(despesa) {
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(despesa))
		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){
		let id = localStorage.getItem('id')
		let despesas = Array()

		for (let i=1; i<=id; i++){
			let despesa = JSON.parse(localStorage.getItem(i))
			if(despesa === null){
				continue
			}
			despesa.id = i
			despesas.push(despesa)

		}
		return despesas
	}

	pesquisar(despesa){
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		if(despesa.ano != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
		if(despesa.mes != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}
		if(despesa.dia != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}
		if(despesa.tipo != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		if(despesa.descricao != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)	
		}
		if(despesa.valor != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)	
		}
		return despesasFiltradas
	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function cadastrarDespesas() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao =  document.getElementById('descricao')
	let valor =  document.getElementById('valor')

	
	let despesa = new Despesa(ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	) 

	if(despesa.validarDados()){
		document.getElementById('tituloModal').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('tituloModalDiv').className = 'modal-header text-success'
		document.getElementById('conteudoModal').innerHTML = 'Despesa foi cadastrada com sucesso'
		document.getElementById('btnModal').innerHTML = 'Voltar'
		document.getElementById('btnModal').className = 'btn btn-success'
		$('#registraDespesa').modal('show')
		bd.gravar(despesa)
	}else{
		document.getElementById('tituloModal').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('tituloModalDiv').className = 'modal-header text-danger'
		document.getElementById('conteudoModal').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos'
		document.getElementById('btnModal').innerHTML = 'Voltar e corrigir'
		document.getElementById('btnModal').className = 'btn btn-danger'
		$('#registraDespesa').modal('show')
	}
}

function carregaListaDespesas(listaDespesas = Array(), filtro){
	let despesas
	if(listaDespesas.length == 0 && !filtro){
		despesas = bd.recuperarTodosRegistros()
	}else{
		despesas = listaDespesas
	}
	
	let lista = document.getElementById('listaDespesas')
	lista.innerHTML = ''

	despesas.forEach(function(d){
		linha = lista.insertRow()
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		switch(d.tipo) {
			case '1': d.tipo = 'Alimentação'
			break
			case '2': d.tipo = 'Educação'
			break
			case '3': d.tipo = 'Lazer'
			break
			case '4': d.tipo = 'Saúde'
			break
			case '5': d.tipo = 'Transporte'
			break
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function (){
			bd.remover(btn.id.replace('id_despesa_',''))
			window.location.reload()
		}
		linha.insertCell(4).append(btn)
	})


}

function limparCampos(){
	document.getElementById('ano').value = ''
	document.getElementById('mes').value = ''
	document.getElementById('dia').value = ''
	document.getElementById('tipo').value = ''
	document.getElementById('descricao').value = ''
	document.getElementById('valor').value = ''
}

function pesquisarDespesas(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao =  document.getElementById('descricao').value
	let valor =  document.getElementById('valor').value

	let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
	let despesas = bd.pesquisar(despesa)
	carregaListaDespesas(despesas, true)

}