
<?php

$servidor = "sql204.infinityfree.com";
$usuario = "if0_43457385";
$senha = "vyB21v0kNNTNcE";
$banco = "if0_43457385_teste";

$conexao = mysqli_connect($servidor, $usuario, $senha, $banco);

if (!$conexao) {
    die("Erro na conexão: " . mysqli_connect_error());
}

?>
