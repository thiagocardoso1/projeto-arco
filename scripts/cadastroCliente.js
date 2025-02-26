import Clientes from "../store/clientesCadastrados.js";
import { exibirClientes } from "./cadastroVendas.js";

const formCLiente = document.querySelector(".forms__cliente")

formCLiente.addEventListener("submit", function (event) {
    event.preventDefault()

    const nome = document.querySelector("#idNome").value;
    const cpf = document.querySelector("#idCpf").value;
    const nascimento = document.querySelector("#idNascimento").value;
    const cadastro = document.querySelector("#idCadastro").value;
    const email = document.querySelector("#idEmailCliente").value;
    const telefone = document.querySelector("#idTelefoneCliente").value;
    const celular = document.querySelector("#idCelularCliente").value;
    const endereco = document.querySelector("#idEnderecoCliente").value;

    if (Object.values(Clientes).some(cliente => cliente.cpf === cpf)) {
        window.alert("CPF já cadastrado no sistema");
    } else {
        Clientes[nome] = {
            ...Clientes[nome],
            nome, cpf, nascimento, cadastro, email, telefone, celular, endereco
        }

        limpar()
        exibirClientes(Clientes);
        window.alert("Cliente cadastrado");
    }
})

function limpar() {
    document.querySelector("#idNome").value = null;
    document.querySelector("#idCpf").value =  null;
    document.querySelector("#idNascimento").value =   null;
    document.querySelector("#idCadastro").value = null;
    document.querySelector("#idEmailCliente").value = null;
    document.querySelector("#idTelefoneCliente").value =  null;
    document.querySelector("#idCelularCliente").value =   null;
    document.querySelector("#idEnderecoCliente").value =  null;
}