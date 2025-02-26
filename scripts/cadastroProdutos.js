import adicionarAoEstoque from "./adicionarAoEstoque.js";
import ProdutosEstoque from "../store/produtosEstoque.js";
import { exibirProdutos } from "./cadastroVendas.js";

const formProdutos = document.querySelector(".forms__produtos");

let ProdutosCadastrados = {};

formProdutos.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.querySelector("#idNomeProduto").value;
    const descricao = document.querySelector("#idDescricao").value;
    const codigo = document.querySelector("#idCode").value;
    const valor = document.querySelector("#idValor").value;
    const valorPromocional = document.querySelector("#idValorPromocional").value;
    const dataInicialPromo = document.querySelector("#idDataInicialPromo").value;
    const dataFinalPromo = document.querySelector("#idDataFinalPromo").value;
    const dataCadastroProduto = document.querySelector("#idDataCadastroProduto").value;
    const ativo = document.querySelector("#idAtivo");
    let status;

    if (ativo.checked === true) {
        status = true;
    } else {
        status = false;
    }

    if (Object.values(ProdutosCadastrados).some(produto => produto.codigo === codigo)) {
        window.alert("Produto com código existente!")
    } else {
        let id = `produto${Object.keys(ProdutosCadastrados).length + 1}`

        ProdutosCadastrados = {
            ...ProdutosCadastrados,
            [id]: { descricao, codigo, valor, valorPromocional, dataInicialPromo, dataFinalPromo, dataCadastroProduto, status }
        }

        ProdutosEstoque[nome] = {
            nome, valor, dataCadastroProduto, quantidadeVendida: 0, quantidadeEstoque: 0, status, valorPromocional
        }

        adicionarAoEstoque(ProdutosEstoque);
        exibirProdutos(ProdutosEstoque);
        limpar();

        window.alert("Produto cadastrado");
    }
})

function limpar() {
    document.querySelector("#idNomeProduto").value = null;
    document.querySelector("#idDescricao").value = null;
    document.querySelector("#idCode").value = null;
    document.querySelector("#idValor").value = null;
    document.querySelector("#idValorPromocional").value = null;
    document.querySelector("#idDataInicialPromo").value = null;
    document.querySelector("#idDataFinalPromo").value = null;
    document.querySelector("#idDataCadastroProduto").value = null;
}