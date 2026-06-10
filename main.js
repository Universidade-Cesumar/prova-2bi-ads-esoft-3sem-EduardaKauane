const API_URL = "https://6a29b36df59cb8f65f1d81b3.mockapi.io/Material";

const form = document.getElementById("form-cadastro");
const corpoTabela = document.getElementById("corpo-tabela");

// get
async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        const materiais = await resposta.json();

        corpoTabela.innerHTML = "";

        materiais.forEach((material) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.quantidade}</td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch(erro) {
        console.error("Erro ao carregar materiais", erro);
    }
}