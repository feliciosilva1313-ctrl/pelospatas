function mostrarLogin() {
    document.getElementById("formLogin").classList.remove("escondido");
    document.getElementById("formCadastro").classList.add("escondido");

    document.getElementById("abaLogin").classList.add("ativa");
    document.getElementById("abaCadastro").classList.remove("ativa");
}

function mostrarCadastro() {
    document.getElementById("formCadastro").classList.remove("escondido");
    document.getElementById("formLogin").classList.add("escondido");

    document.getElementById("abaCadastro").classList.add("ativa");
    document.getElementById("abaLogin").classList.remove("ativa");
}

function entrar(event) {
    event.preventDefault(); // impede o recarregamento da página
    window.location.href = "../pelos/index.html";
}

function cadastrar(event) {
    event.preventDefault();

    const senhas = document.querySelectorAll("#formCadastro input[type='password']");
    if (senhas[0].value !== senhas[1].value) {
        alert("As senhas não coincidem.");
        return;
    }

    window.location.href = "../HOME/HOME.html";
}