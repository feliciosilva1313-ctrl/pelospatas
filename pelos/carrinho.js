function pegarCarrinho() {
    var carrinho = localStorage.getItem("carrinho");
    if (carrinho == null) {
        return [];
    }
    return JSON.parse(carrinho);
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(botao) {
    var carrinho = pegarCarrinho();
    var id = botao.getAttribute("data-id");
    var achou = false;

    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id == id) {
            carrinho[i].quantidade = carrinho[i].quantidade + 1;
            achou = true;
        }
    }

    if (achou == false) {
        carrinho.push({
            id: id,
            nome: botao.getAttribute("data-nome"),
            preco: Number(botao.getAttribute("data-preco")),
            imagem: botao.getAttribute("data-img"),
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);

    botao.innerHTML = "✔ Adicionado!";
    botao.classList.add("adicionado");
    setTimeout(function () {
        botao.innerHTML = "🛒 Adicionar ao carrinho";
        botao.classList.remove("adicionado");
    }, 1500);
}

function mostrarCarrinho() {
    var lista = document.getElementById("lista-carrinho");
    if (lista == null) {
        return;
    }

    var carrinho = pegarCarrinho();
    var html = "";
    var total = 0;

    for (var i = 0; i < carrinho.length; i++) {
        var item = carrinho[i];
        var subtotal = item.preco * item.quantidade;
        total = total + subtotal;

        html += '<div class="item-carrinho">';
        html += '<img src="' + item.imagem + '">';
        html += '<h3>' + item.nome + '</h3>';
        html += '<div>';
        html += '<button onclick="mudarQuantidade(' + i + ', -1)">-</button>';
        html += '<span>' + item.quantidade + '</span>';
        html += '<button onclick="mudarQuantidade(' + i + ', 1)">+</button>';
        html += '</div>';
        html += '<strong>R$ ' + subtotal.toFixed(2).replace(".", ",") + '</strong>';
        html += '<button onclick="remover(' + i + ')">Remover</button>';
        html += '</div>';
    }

    if (carrinho.length == 0) {
        html = '<p>Seu carrinho está vazio</p>';
    }

    lista.innerHTML = html;
    document.getElementById("total").innerHTML = "R$ " + total.toFixed(2).replace(".", ",");
}

function mudarQuantidade(posicao, valor) {
    var carrinho = pegarCarrinho();
    carrinho[posicao].quantidade = carrinho[posicao].quantidade + valor;

    if (carrinho[posicao].quantidade == 0) {
        carrinho.splice(posicao, 1);
    }

    salvarCarrinho(carrinho);
    mostrarCarrinho();
}

function remover(posicao) {
    var carrinho = pegarCarrinho();
    carrinho.splice(posicao, 1);
    salvarCarrinho(carrinho);
    mostrarCarrinho();
}

function limparCarrinho() {
    salvarCarrinho([]);
    mostrarCarrinho();
}

function finalizarCompra() {
    alert("compra finalizada!")
    limparCarrinho();
    window.location.href = "index.html";
}

mostrarCarrinho();
