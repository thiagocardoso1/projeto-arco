function controleEstoque(ProdutosEstoque) {
    const divEstoque = document.querySelector(".produtosNoEstoque");

    divEstoque.innerHTML = `
        ${Object.values(ProdutosEstoque)
            .map(produto => 
                `<h3>${produto.nome}</h3>
                <ul class="estoqueProdutos">
                    <li>Valor: ${produto.valor}</li>
                    <li>Data de cadastro: ${produto.dataCadastroProduto}</li>
                    <li>Quantidade Vendida: ${produto.quantidadeVendida}</li>
                    <li>Quantidade em Estoque: ${produto.quantidadeEstoque}</li>
                    <li>Status: ${produto.status === 0 ? "fora do estoque" : "no estoque"}</li>
                </ul>
                `
            ).join('')
        }
    `
}

export default controleEstoque;