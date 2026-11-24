
function adicionarCarrinho(id, nome, preco) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let produto = carrinho.find(item => item.id === id);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarContador();

    alert("Produto adicionado ao carrinho!");
}

function atualizarContador() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let quantidade = carrinho.reduce((total, item) => {
        return total + item.quantidade;
    }, 0);

    document.getElementById("contador").textContent = quantidade;
}

atualizarContador();
