<?php
    session_start();
    $arquivo = fopen('arquivo.txt', 'a');

    $_POST['titulo'] = str_replace('#','-',$_POST['titulo']);
    $_POST['categoria'] = str_replace('#','-',$_POST['categoria']);
    $_POST['descricao'] = str_replace('#','-',$_POST['descricao']);

    //$texto = $titulo .'#'. $categoria .'#'. $descricao;
    $texto = implode('#', $_POST);
    $texto = $_SESSION['id'] . '#' . $texto . PHP_EOL;
    fwrite($arquivo, $texto);
    fclose($arquivo);
    header('Location: abrir_chamado.php');
?>