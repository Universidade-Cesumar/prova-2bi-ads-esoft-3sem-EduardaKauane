# Sistema de Controle de Almoxarifado - SENAC Zona Norte

## Sobre o Projeto

Aplicação web para modernizar o controle de estoque de materiais de saúde do almoxarifado utilizado nas aulas práticas do curso técnico de Enfermagem.

### O problema

O controle atual é feito por meio de planilha (Excel), o que gera dificuldades como:
- Falta de contabilização automática de entradas e saídas
- Necessidade de anotações em papel antes de lançar na planilha
- Falta de clareza sobre o que há disponível em estoque
- Dificuldade no controle das baixas diárias de materiais

### A solução

Aplicação web (Front-end + API) que permite cadastrar e listar os materiais do almoxarifado de forma simples e em tempo real, consumindo uma API RESTful via [MockAPI.io](https://mockapi.io/).

---

## Sprint 1 - Base do Sistema

**Objetivo:** Construir a base do sistema de controle de almoxarifado: interface inicial, formulário de cadastro e tabela de listagem, consumindo a MockAPI.

### Funcionalidades implementadas

- Formulário de cadastro de materiais (nome e quantidade)
- Envio dos dados via **POST** para a MockAPI ao clicar em "Cadastrar"
- Listagem de materiais via **GET**, carregada e exibida dinamicamente ao abrir a página
- Tabela atualizada automaticamente após cada novo cadastro

### Tecnologias utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout
- **JavaScript (ES6+)** - Lógica e requisições assíncronas (`fetch`, `async/await`)
- **MockAPI.io** - Simulação de back-end / API RESTful

---

## 🗂️ Estrutura de Arquivos

```
├── index.html      # Estrutura da página
├── style.css       # Estilização da aplicação
├── script.js       # Lógica de integração com a API
└── README.md       # Documentação do projeto
```

---

## Contexto de Uso

Projeto desenvolvido com base no levantamento de requisitos junto à responsável pelo almoxarifado (Camila), enfermeira do curso técnico de Enfermagem do SENAC Zona Norte.