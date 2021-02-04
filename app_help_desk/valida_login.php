<?php
    session_start();

    $usuarios_app = array(
        array('id' => 1, 'email' => 'adm@teste.com.br', 'senha' => '123456', 'perfil_id' => 1),
        array('id' => 2,'email' => 'user@teste.com.br', 'senha' => 'abc', 'perfil_id' => 1),
        array('id' => 3,'email' => 'jose@teste.com.br', 'senha' => '123456', 'perfil_id' => 2),
        array('id' => 4,'email' => 'maria@teste.com.br', 'senha' => '123456', 'perfil_id' => 2)
    );


    $usuario_autenticado = false;
    $usuario_id = null;
    $perfis = array (1 => 'administrativo', 2 => 'usuario');

    foreach($usuarios_app as $usuario){
        if($usuario['email'] == $_POST['email'] && $usuario['senha'] == $_POST['senha']){
            $usuario_autenticado = true;
            $usuario_id = $usuario['id'];
            $usuario_perfil_id = $usuario['perfil_id'];
            break;
        }
    }

    if($usuario_autenticado){
        $_SESSION['autenticado'] = true;
        $_SESSION['id'] = $usuario_id;
        $_SESSION['perfil_id'] = $usuario_perfil_id;
        header('Location: home.php');
    }else{
        $_SESSION['autenticado'] = false;
        header('Location: index.php?login=erro');
    }

?>