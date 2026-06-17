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
                <td><button class="btn-baixar" data-id="${material.id}">Editar</button>
                <button class="btn-excluir" data-id="${material.id}"><img src="https://cdn-icons-png.flaticon.com/128/7718/7718788.png" loading="lazy" alt="excluir " title="excluir " width="24" height="24"></button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch(erro) {
        console.error("Erro ao carregar materiais", erro);
    }
}

// post
form.addEventListener("submit", async (evento) => {
    event.preventDefault();

    const nome = document.getElementById("input-nome").value;
    const quantidade = document.getElementById("input-quantidade").value;

    const novoMaterial = {
        nome: nome,
        quantidade: Number(quantidade)
    };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoMaterial)
        });

        if (resposta.ok) {
            form.reset();
            carregarMateriais();
        }

    } catch(erro) {
        console.error("Erro ao cadastrar material", erro);
    }
});

carregarMateriais();