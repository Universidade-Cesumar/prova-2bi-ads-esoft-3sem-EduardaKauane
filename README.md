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

## Tecnologias utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout
- **JavaScript (ES6+)** - Lógica e requisições assíncronas (`fetch`, `async/await`)
- **MockAPI.io** - Simulação de back-end / API RESTful

---

## Como configurar e rodar

1. Crie um projeto em [https://mockapi.io/](https://mockapi.io/)
2. Crie um recurso (resource) chamado `Material` com os seguintes campos:
   - `name` (string)
   - `quantidade` (number)
3. Copie a URL gerada do recurso (ex: `https://xxxxxxxx.mockapi.io/materiais`)
4. No arquivo `script.js`, substitua o valor da constante `API_URL` pela URL copiada:
   ```javascript
   const API_URL = "https://xxxxxxxx.mockapi.io/materiais";
   ```
5. Abra o arquivo `index.html` no navegador e comece a usar.

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