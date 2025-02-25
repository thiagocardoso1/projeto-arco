import ProdutosEstoque from "../store/produtosEstoque.js";
import controleEstoque from "./controleEstoque.js";

let ProdutosEmVenda = {};

const divEmpresas = document.querySelector(".divEmpresas");
const divClientes = document.querySelector(".divClientes");
const divProdutos = document.querySelector(".divProdutos");
const formsVenda = document.querySelector(".forms__venda")

export function exibirEmpresas(Empresas) {
    if (!divEmpresas) {
        console.error("Elemento '.divEmpresas' não encontrado.");
        return;
    }

    divEmpresas.innerHTML = `
        <label for="idProduto">Empresas cadastradas: </label>
        <select name="empresas" id="idEmpresas">
            <optgroup label="Empresa: " class="opt-empresas">
                ${Object.values(Empresas)
            .map(empresa => `<option value="${empresa.nomeFantasia}">${empresa.nomeFantasia}</option>`)
            .join('')}
            </optgroup>
        </select>
    `;
}

export function exibirClientes(Clientes) {
    if (!divClientes) {
        console.error("Elemento '.divClientes' não encontrado.");
        return;
    }

    divClientes.innerHTML = `
        <label for="idCliente">Clientes cadastrados: </label>
        <select name="clientes" id="idClientes">
            <optgroup label="Clientes: " class="opt-clientes">
                ${Object.values(Clientes)
            .map(cliente => `<option value="${cliente.nome}">${cliente.nome}</option>`)
            .join('')}
            </optgroup>
        </select>
    `;
}

export function exibirProdutos(Produtos) {
    if (!divProdutos) {
        console.error("Elemento '.divProdutos' não encontrado.");
        return;
    }

    // Adicionei um form com um createElement pois por algum motivo quando adicionava o form junto dos outros elementos, somente ele não era gerado, enquanto os outros elementos eram gerados normalmente.

    const form = document.createElement("form");
    form.id = "formProdutosVenda"
    form.innerHTML = `
        <label for="iProdutosDisponiveis">Produtos cadastrados: </label>
        <select name="produtosDisponiveis" id="idProdutosDisponiveis">
            <optgroup label="Produtos: " class="opt-produtos">
                ${Object.values(Produtos)
            .map(produto => `<option value="${produto.nome}">${produto.nome}</option>`)
            .join('')}
            </optgroup>
        </select>

        <label for="idProdutoQuantidadeVenda">Quantidade: </label>
        <input type="number" name="produtoQuantidadeVenda" id="idProdutoQuantidadeVenda" required>
        <input type="submit" target=".formsControle" value="Cadastrar">
    `

    divProdutos.innerHTML = "";
    divProdutos.appendChild(form);

    setTimeout(produtosVenda(Produtos), 0);
}

function produtosVenda(Produtos) {
    setTimeout(() => {
        const formProdutosVenda = document.querySelector("#formProdutosVenda");

        if (!formProdutosVenda) {
            console.error("Elemento '#formProdutosVenda' não encontrado.");
            return;
        }

        formProdutosVenda.addEventListener("submit", function (event) {
            event.preventDefault();

            const produtoSelecionado = document.querySelector("#idProdutosDisponiveis").value;
            const produtoQuantidade = document.querySelector("#idProdutoQuantidadeVenda").value;

            ProdutosEmVenda = {
                ...ProdutosEmVenda,
                [produtoSelecionado]: { produtoSelecionado, produtoQuantidade, valor: Produtos[produtoSelecionado].valor, valorPromocional: Produtos[produtoSelecionado].valorPromocional }
            }

            exibirProdutosEmVenda(ProdutosEmVenda);
        })
    }, 0)
}

function exibirProdutosEmVenda(ProdutosEmVenda) {
    const divProdutosEmVenda = document.querySelector(".divProdutosEmVenda");

    divProdutosEmVenda.innerHTML = `
    <h3>Produtos à serem vendidos: </h3>
    ${Object.values(ProdutosEmVenda)
            .map(produto => `
                <ul class="produtosEmVenda">
                    <li>Nome: ${produto.produtoSelecionado}</li>
                    <li>quantidade: ${produto.produtoQuantidade}</li>
                    <li>valor: ${Number(produto.valor) * Number(produto.produtoQuantidade)}</li>
                </ul>
            `
            ).join('')
        }
    `

    exibirPromo(ProdutosEmVenda)
}

function exibirPromo(ProdutosEmVenda) {
    const divDesconto = document.querySelector(".divDesconto");
    let totalSemDeconto = 0;
    let totalDesconto = 0;

    Object.values(ProdutosEmVenda)
        .map(produto => {
            totalDesconto += (Number(produto.valorPromocional) * Number(produto.produtoQuantidade));
            totalSemDeconto += (Number(produto.valor) * Number(produto.produtoQuantidade));
        })

    divDesconto.innerHTML = `
        <p>Deconto: ${((totalSemDeconto - totalDesconto) / totalSemDeconto * 100).toFixed(2)}%</p>
        <p>Total da Venda(Sem desconto): R$${(totalSemDeconto).toFixed(2)}</p>
        <p>Total da Venda(Com desconto): R$${(totalDesconto).toFixed(2)}</p>
    `

    console.log(ProdutosEmVenda)
}

function calcularPagamento() {
    const pagamento = document.querySelector("#idPagamento").value;
    let total = 0;

    Object.values(ProdutosEmVenda).map((produto) => {
        if (Number(produto.valorPromocional == 0)) {
            total += Number(produto.valor);
        } else {
            total += Number(produto.valorPromocional);
        }
    })

    if (pagamento < total || !pagamento) {
        window.alert("Pagamento insuficiente!")
        return
    } else {
        openPopup(total);
    }
}

function atualizarEstoque() {
    let produtosInsuficientes = [];
    
    Object.values(ProdutosEmVenda).forEach((produtoVenda) => {
        const produtoEstoque = Object.values(ProdutosEstoque).find(
            (estoque) => estoque.nome === produtoVenda.produtoSelecionado
        );

        if (!produtoEstoque || Number(produtoVenda.produtoQuantidade) > Number(produtoEstoque.quantidadeEstoque)) {
            produtosInsuficientes.push(produtoVenda.produtoSelecionado);
        }
    });

    if (produtosInsuficientes.length > 0) {
        window.alert(`Produto(s): ${produtosInsuficientes.join(", ")} fora de estoque !`);
        document.getElementById("popup").style.display = "none";
        return
    } else {
        Object.values(ProdutosEstoque).forEach((produto) => {
            const produtoVenda = Object.values(ProdutosEmVenda).find(
                (produtoVenda) => produtoVenda.produtoSelecionado === produto.nome
            )

            produto.quantidadeEstoque = Number(produto.quantidadeEstoque) - Number(produtoVenda.produtoQuantidade)
        })

        controleEstoque(ProdutosEstoque)
        window.alert("Pagamento realizado");
    }
}

function openPopup(total) {
    const jsonContent = document.querySelector(".content__json");
    const confirmar = document.querySelector(".confirmar");
    const cancelar = document.querySelector(".cancelar");
    const empresa = document.querySelector("#idEmpresas").value;
    const cliente = document.querySelector("#idClientes").value;
    const dataVenda = document.querySelector("#idDataVenda").value;
    const pagamento = document.querySelector("#idPagamento").value;

    document.getElementById("popup").style.display = "flex";
    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
    })

    window.addEventListener("click", function (event) {
        let popup = this.document.getElementById("popup");
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });

    jsonContent.innerHTML = `
        <span>Empresa: ${empresa}</span>
        <span>Cliente: ${cliente}</span>
        <span>Data da Venda: ${dataVenda}</span>

        ${Object.values(ProdutosEmVenda)
            .map(produto => `
                <h3>${produto.produtoSelecionado}</h3>
                <ul class="produtos-popup">
                    <li>Quantidade: ${produto.produtoQuantidade}</li>
                    <li>Valor: ${produto.valor}</li>
                    <li>Valor Promocional: ${produto.valorPromocional == 0 ? "sem valor promocional" : produto.valorPromocional}</li>
                </ul>
            `).join('')
        }

        <span>Troco: ${pagamento - total}</span>
    `

    confirmar.addEventListener("click", function() {
        atualizarEstoque();
        ProdutosEmVenda = {}

        document.querySelector(".divProdutosEmVenda").innerHTML = ``
        document.querySelector(".divDesconto").innerHTML = ``
        document.getElementById("popup").style.display = "none";

        console.log(ProdutosEmVenda);
    })

    cancelar.addEventListener("click", function() {
        ProdutosEmVenda = {}

        document.querySelector(".divProdutosEmVenda").innerHTML = ``
        document.querySelector(".divDesconto").innerHTML = ``
        document.getElementById("popup").style.display = "none";
        window.alert("Pagamento cancelado")

        console.log(ProdutosEmVenda);
    })
}

function verificarDados() {
    const cliente = document.querySelector("#idClientes");
    const empresa = document.querySelector("#idEmpresas");
    const produto = document.querySelector("#idProdutosDisponiveis");
    const produtosEmVenda = document.querySelector(".produtosEmVenda");

    if (!cliente) {
        window.alert("Sem clientes cadastrados");
        return
    } else if (!empresa) {
        window.alert("Sem empresas cadastradas");
        return
    } else if (!produto) {
        window.alert("Sem produtos cadastrados");
        return
    } else if (!produtosEmVenda) {
        window.alert("Adicione um produto!");
        return
    } else {
        calcularPagamento();
    }
}

formsVenda.addEventListener("submit", function (event) {
    event.preventDefault();

    verificarDados();
})