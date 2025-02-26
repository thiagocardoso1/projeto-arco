import Empresas from "../store/empresasCadastradas.js";
import { exibirEmpresas } from "./cadastroVendas.js";

const formEmpresa = document.querySelector(".forms__empresa");

formEmpresa.addEventListener("submit", function (event) {
    event.preventDefault();

    const razaoSocial = document.querySelector("#idSocial").value;
    const nomeFantasia = document.querySelector("#idFantasia").value;
    const cnpj = document.querySelector("#idCnpj").value;
    const dataCadastro = document.querySelector("#idDataCadastroEmpresa").value;
    const email = document.querySelector("#idEmail").value;
    const telefone = document.querySelector("#idTelefoneEmpresa").value;
    const celular = document.querySelector("#idCelularEmpresa").value;
    const contato = document.querySelector("#idContato").value;
    const endereco = document.querySelector("#idEnderecoEmpresa").value;

    if (Object.values(Empresas).some(empresa => empresa.cnpj === cnpj)) {
        window.alert("Empresa com esse cnpj já cadastrada!")
        return;
    } else {
        Empresas[nomeFantasia] = {
            ...Empresas[nomeFantasia],
            razaoSocial, nomeFantasia, cnpj, dataCadastro, email, telefone, celular, contato, endereco
        }

        exibirEmpresas(Empresas);
    }
})