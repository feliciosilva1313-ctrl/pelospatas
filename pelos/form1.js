// Para onde ir depois de logar/cadastrar (ajuste o caminho para a sua página)
const PAGINA_DESTINO = "index.html";

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
const abaLogin = document.getElementById("abaLogin");
const abaCadastro = document.getElementById("abaCadastro");

// ---------- Trocar de aba ----------
function mostrarLogin() {
    formLogin.classList.remove("escondido");
    formCadastro.classList.add("escondido");
    abaLogin.classList.add("ativa");
    abaCadastro.classList.remove("ativa");
}

function mostrarCadastro() {
    formCadastro.classList.remove("escondido");
    formLogin.classList.add("escondido");
    abaCadastro.classList.add("ativa");
    abaLogin.classList.remove("ativa");
}

// ---------- Cadastro ----------
function cadastrar(evento) {
    evento.preventDefault();

    const senha = document.getElementById("cadSenha").value;
    const confirmar = document.getElementById("cadConfirmar").value;
    const erro = document.getElementById("erroCadastro");
    const arquivo = document.getElementById("cadFoto").files[0];

    erro.textContent = "";

    if (senha !== confirmar) {
        erro.textContent = "As senhas não coincidem.";
        return;
    }

    if (arquivo) {
        // limite de 500 KB, para não lotar o localStorage
        if (arquivo.size > 500 * 1024) {
            erro.textContent = "A foto deve ter no máximo 500 KB.";
            return;
        }

        const leitor = new FileReader();
        leitor.onload = function () {
            salvarUsuario(leitor.result);
        };
        leitor.readAsDataURL(arquivo);
    } else {
        salvarUsuario(""); // sem foto: mostra a inicial do nome
    }
}

function salvarUsuario(foto) {
    const usuario = {
        nome: document.getElementById("cadNome").value,
        email: document.getElementById("cadEmail").value,
        telefone: document.getElementById("cadTelefone").value,
        cidade: document.getElementById("cadCidade").value,
        foto: foto, // vazio = mostra a inicial do nome
        senha: document.getElementById("cadSenha").value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("logado", "true");

    window.location.href = PAGINA_DESTINO;
}

// ---------- Login ----------
function entrar(evento) {
    evento.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;
    const erro = document.getElementById("erroLogin");

    const salvo = localStorage.getItem("usuario");

    if (!salvo) {
        erro.textContent = "Nenhuma conta encontrada. Faça seu cadastro.";
        return;
    }

    const usuario = JSON.parse(salvo);

    if (usuario.email === email && usuario.senha === senha) {
        localStorage.setItem("logado", "true");
        window.location.href = PAGINA_DESTINO;
    } else {
        erro.textContent = "E-mail ou senha incorretos.";
    }
}