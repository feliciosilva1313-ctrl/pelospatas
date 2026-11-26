
<?php

$servidor = "sql111.infinityfree.com";
$usuario = "if0_43525739";
$senha = "7jbAUXaItKmc";
$banco = "if0_43525739";

$conexao = mysqli_connect($servidor, $usuario, $senha, $banco);

if (!$conexao) {
    die("Erro na conexão: " . mysqli_connect_error());
}

?>
