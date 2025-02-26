import ProdutosEstoque from "../store/produtosEstoque.js";
import controleEstoque from "./controleEstoque.js";

const formSection = document.querySelector(".formsAdicionarEstoque");

function adicionarAoEstoque(ProdutosEstoque) {
    if (!formSection) {
        console.error("Elemento '.formsAdicionarEstoque' não encontrado.");
        return;
    }

    formSection.innerHTML = `
    <h2>Adicionar produtos ao estoque</h2>
    <i class="bi bi-arrow-down-circle arrowEstoque"></i>
    <form class="forms__form" id="formEstoque">
        <label for="idProduto">Selecione um produto</label>
        <select name="produto" id="idProduto">
            <optgroup label="Produtos disponíveis" class="produtosDisponiveis">
                ${Object.values(ProdutosEstoque)
            .map(produto => `<option value="${produto.nome}">${produto.nome}</option>`)
            .join('')}
            </optgroup>
        </select>

        <label for="idProdutoQuantidade">Quantidade: </label>
        <input type="number" name="produtoQuantidade" id="idProdutoQuantidade" required>
        <input type="submit" target=".formsControle" value="Cadastrar">
    </form>
    `;

    adicionarEvento();
}

function adicionarEvento() {
    const formAdicionarEstoque = document.querySelector("#formEstoque");

    formAdicionarEstoque.addEventListener("submit", function (event) {
        event.preventDefault();

        const produtoSelecionado = document.querySelector("#idProduto").value;
        const produtoQuantidade = document.querySelector("#idProdutoQuantidade").value;

        ProdutosEstoque[produtoSelecionado] = {
            ...ProdutosEstoque[produtoSelecionado],
            quantidadeEstoque: Number(ProdutosEstoque[produtoSelecionado].quantidadeEstoque) + Number(produtoQuantidade)
        }

        controleEstoque(ProdutosEstoque);
    })
}

export default adicionarAoEstoque;