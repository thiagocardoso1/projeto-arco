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

        exibirClientes(Clientes);
    }
})