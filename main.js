const API_URL = "https://6a29b36df59cb8f65f1d81b3.mockapi.io/Material";

const form = document.getElementById("form-cadastro");
const corpoTabela = document.getElementById("corpo-tabela");
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");

let todosMateriais = [];

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (typeof estoqueAtual !== "number" || typeof quantidadeRetirada !== "number") {
        return false;
    }
    if (isNaN(estoqueAtual) || isNaN(quantidadeRetirada)) {
        return false;
    }
    if (quantidadeRetirada <= 0) {
        return false;
    }
    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }
    return true;
}

// get
async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        const materiais = await resposta.json();

        todosMateriais = materiais;
        filtrarMateriais();

        corpoTabela.innerHTML = "";

        materiais.forEach((material) => {
            const linha = criarLinhaMaterial(material);
            corpoTabela.appendChild(linha);
        });

        // atualiza contadores do dashboard
        document.getElementById("total-itens").textContent = materiais.length;
        const criticos = materiais.filter(m => m.quantidade < 10).length;
        document.getElementById("total-criticos").textContent = criticos;

    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
    }
}

// criando a linha (<tr>) da tabela para um material, com input de retirada e botões de ação
function criarLinhaMaterial(material) {
    const linha = document.createElement("tr");
    linha.dataset.id = material.id;

    // se o total de materiais for menor que 10, recebe estoque crítico
    if (material.quantidade < 10) {
        linha.classList.add("estoque-critico");
    }

    linha.innerHTML = `
        <td>${material.nome}</td>
        <td class="coluna-quantidade">${material.quantidade}</td>
        <td>
            <input type="number" class="input-retirada" id="input-retirada" min="1" placeholder="Qtd. a retirar">
        </td>
        <td class="coluna-acoes">
            <button class="btn-baixar" type="button">Retira quantidade</button>
            <button class="btn-excluir" type="button"><img src="https://cdn-icons-png.flaticon.com/128/7718/7718788.png" loading="lazy" alt="excluir " title="Excluir item" width="24" height="24"></button>
        </td>
    `;

    return linha;
}

function renderizarTabela(materiais) {
    corpoTabela.innerHTML = "";

    materiais.forEach((material) => {
        const linha = criarLinhaMaterial(material);
        corpoTabela.appendChild(linha);
    });

    // atualiza ambos os contadores
    totalItens.textContent = materiais.length;

    const totalCriticosEl = document.getElementById("total-criticos");
    const criticos = materiais.filter(m => m.quantidade < 10).length;
    totalCriticosEl.textContent = criticos;
}

// filtro de busca
function filtrarMateriais() {
    const termo = inputBusca.value.toLowerCase().trim();

    const materiaisFiltrados = todosMateriais.filter((material) =>
        material.nome.toLowerCase().includes(termo)
    );

    renderizarTabela(materiaisFiltrados);
}

inputBusca.addEventListener("input", filtrarMateriais);

// post
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("input-nome").value.trim();
    const quantidade = Number(document.getElementById("input-quantidade").value);

    if(!nome) {
        alert("Digite o nome do material.");
        return;
    }

    // verifica se existe algum material com o mesmo nome
    const materialExistente = todosMateriais.find((m) => m.nome.toLowerCase() === nome.toLowerCase());

    try {
        if (materialExistente) {
            const novaQuantidade = materialExistente.quantidade + quantidade;

            const resposta = await fetch(`${API_URL}/${materialExistente.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({quantidade: novaQuantidade})
            });

            if (!resposta.ok) {
                throw new Error(`Erro ao atualizar material`);
            }
        } else {
            const resposta = await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nome, quantidade})
            });

            if (!resposta.ok) {
                throw new Error(`Erro ao cadastrar material`);
            }
        }

        form.reset();
        await carregarMateriais();

    } catch(erro) {
        console.error("Erro ao cadastrar material", erro);
    }
});

// put e delete
corpoTabela.addEventListener("click", async (evento) => {
    const linha = evento.target.closest("tr");
    if (!linha) return;

    const id = linha.dataset.id;

    if (evento.target.closest(".btn-baixar")) {
        await baixarEstoque(id, linha);
    }

    if (evento.target.closest(".btn-excluir")) {
        await excluirMaterial(id);
    }
});

// put
async function baixarEstoque(id, linha) {
    const inputRetirada = linha.querySelector(".input-retirada");
    const quantidadeRetirada = Number(inputRetirada.value);
    const estoqueAtual = Number(linha.querySelector(".coluna-quantidade").textContent);

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
        alert("Inválido. Verifique a quantidade informada (não pode ser negativa, zero, ou maior que o estoque atual).");
        return;
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantidade: novaQuantidade })
        });

        if (resposta.ok) {
            await carregarMateriais();
        }
    } catch (erro) {
        console.error("Erro ao realizar baixa de estoque", erro);
    }
}

// delete
async function excluirMaterial(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este material?");
    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            await carregarMateriais();
        }
    } catch (erro) {
        console.error("Erro ao excluir material", erro);
    }
}

carregarMateriais();