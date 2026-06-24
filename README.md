# Controle de Almoxarifado SENAC - Zona Norte

Aplicação web para controle de estoque de materiais de saúde, desenvolvida para modernizar a rotina do almoxarifado do curso técnico de Enfermagem.

---

## O problema

O controle era feito em planilha Excel, com anotações em papel e sem contabilização automática de entradas e saídas — gerando falta de clareza sobre o estoque disponível e dificuldade nas baixas diárias.

## A solução

Sistema web com front-end conectado a uma API RESTful via [MockAPI.io](https://mockapi.io/) que permite cadastrar, listar, manipular e excluir materiais em tempo real, com busca por nome.

---

## Funcionalidades

- Cadastro de materiais
- Listagem em tempo real
- Baixa de estoque com validação de quantidade
- Exclusão de itens
- Busca por nome com filtro local
- Dashboard com total de itens
- Destaque para itens com estoque crítico

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Estrutura | **HTML5** |
| Estilo | **CSS3** |
| Lógica | **JavaScript** |
| API | [MockAPI.io](https://mockapi.io/) |

---

## Como rodar

1. Crie um projeto em [MockAPI.io](https://mockapi.io/)
2. Crie um resource chamado `Material` com os seguintes campos:
   - `name` (string)
   - `quantidade` (number)
3. Copie a URL gerada (ex: `https://xxxxxxxx.mockapi.io/Material`)
4. No arquivo `main.js`, substitua o valor de `API_URL`:
   ```js
   const API_URL = "https://xxxxxxxx.mockapi.io/Material";
   ```
5. Abra o `index.html` no navegador e comece a usar.

---

## Estrutura de arquivos

```
├── index.html   # Estrutura da página
├── style.css    # Estilização
├── main.js      # Lógica e integração com a API
└── README.md    # Documentação
```

---

Desenvolvido por [Eduarda Kauane](https://linkedin.com/in/eduardakauane) — SENAC Zona Norte