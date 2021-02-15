<?php
	require "../app_lista/tarefa.model.php";
	require "../app_lista/tarefa.service.php";
	require "../app_lista/conexao.php";

	$acao = isset($_GET['acao']) ? $_GET['acao'] : $acao;


	if($acao == 'inserir') {
		$tarefa = new Tarefa();
		$tarefa->__set('tarefa', $_POST['tarefa']);

		$conexao = new Conexao();

		$tarefa_service = new TarefaService($conexao, $tarefa);
		$tarefa_service->inserir();

		header('Location: nova_tarefa.php?inclusao=1');
	}else if($acao == 'recuperar'){
		$conexao = new Conexao();
		$tarefa = new Tarefa();

		$tarefa_service = new TarefaService($conexao, $tarefa);
		$tarefas = $tarefa_service->recuperar();
	}else if($acao == 'atualizar'){
		$tarefa = new Tarefa();
		$tarefa->__set('id', $_POST['id']);
		$tarefa->__set('tarefa', $_POST['tarefa']);

		$conexao = new Conexao();

		$tarefa_service = new TarefaService($conexao, $tarefa);

		if($tarefa_service->atualizar()){
			header('Location: todas_tarefas.php');
		}
	}else if ($acao == 'remover'){
		$tarefa = new Tarefa();
		$tarefa->__set('id', $_GET['id']);
		$conexao = new Conexao();
		$tarefa_service = new TarefaService($conexao, $tarefa);
		if($tarefa_service->remover()){
			header('Location: todas_tarefas.php');
		}
	}else if ($acao == 'realizada'){
		$tarefa = new Tarefa();
		$tarefa->__set('id', $_GET['id']);
		$tarefa->__set('id_status', 2);
		$conexao = new Conexao();
		$tarefa_service = new TarefaService($conexao, $tarefa);
		if($tarefa_service->marcarRealizada()){
			header('Location: todas_tarefas.php');
		}
	}else if ($acao == 'recuperar_pendentes'){
		$conexao = new Conexao();
		$tarefa = new Tarefa();

		$tarefa_service = new TarefaService($conexao, $tarefa);
		$tarefas = $tarefa_service->recuperar_pendentes();
	}
	


?>