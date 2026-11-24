// carrinho.js - versão básica

var FRETE = 10;

// transforma "R$ 75,00 cada" em 75
function pegarNumero(texto) {
    texto = texto.replace('R$', '').replace('cada', '').replace('.', '').replace(',', '.');
    return parseFloat(texto);
}

// transforma 75 em "R$ 75,00"
function formatar(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// recalcula o preço de cada item e o resumo do pedido
function atualizar() {
    var itens = document.querySelectorAll('.item-carrinho');
    var subtotal = 0;

    for (var i = 0; i < itens.length; i++) {
        var preco = pegarNumero(itens[i].querySelector('.item-info p').textContent);
        var qtd = parseInt(itens[i].querySelector('.quantidade span').textContent);
        var totalItem = preco * qtd;

        itens[i].querySelector('.item-preco').textContent = formatar(totalItem);
        subtotal = subtotal + totalItem;
    }

    var entrega = itens.length > 0 ? FRETE : 0;

    var valores = document.querySelectorAll('.totais dd');
    valores[0].textContent = formatar(subtotal);
    valores[1].textContent = formatar(entrega);
    valores[2].textContent = formatar(subtotal + entrega);
}

// botões + e -
var botoes = document.querySelectorAll('.quantidade button');

for (var i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        var span = this.parentElement.querySelector('span');
        var qtd = parseInt(span.textContent);

        if (this.textContent === '+') {
            qtd = qtd + 1;
        } else if (qtd > 1) {
            qtd = qtd - 1;
        }

        span.textContent = qtd;
        atualizar();
    };
}

// botões "Remover"
var removers = document.querySelectorAll('.btn-remover');

for (var j = 0; j < removers.length; j++) {
    removers[j].onclick = function (evento) {
        evento.preventDefault();
        this.closest('.item-carrinho').remove();
        atualizar();
    };
}

// botão "Finalizar pedido"
document.querySelector('.btn-finalizar').onclick = function () {
    alert('Confira o email seu email para finaliza seu pedido.🐾');
    window.location.href = "index.html";
    
};



atualizar();