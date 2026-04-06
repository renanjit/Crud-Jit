# 📦 Gestão de Produtos - Full Stack

Sistema completo de gerenciamento de produtos, usando boas práticas de desenvolvimento

## 🚀 Tecnologias

### Backend (Node.js)
- **Express 5**: Framework web com suporte nativo a operações assíncronas.
- **Prisma ORM**: Gerenciamento de banco de dados e consultas seguras.
- **SQLite**: Banco de dados relacional leve.
- **Zod**: Validação de esquemas e tipos de dados.
- **Arquitetura**: Organizado em camadas (**Controller -> Service -> Repository**).

### Frontend (Vue.js)
- **Vue 3**: Utilizando Composition API para maior flexibilidade.
- **Vite**: Ferramenta de build extremamente rápida.
- **Filtragem Reativa**: Busca em tempo real no lado do cliente.

---

## 📂 Estrutura do Projeto

```text
crud-jit/
├── backend-loja/        # API REST em Node.js
│   ├── prisma/          # Modelagem do Banco de Dados
│   └── src/
│       ├── controllers/ # Porta de entrada (HTTP)
│       ├── services/    # Regras de negócio e Zod
│       ├── repository/  # Chamadas ao Prisma
│       └── middlewares/ # Erros centralizados (AppError)
└── frontend-loja/       # Interface Vue.js
    └── src/
        ├── components/  # Tabela e Formulário
        ├── services/    # Chamadas de API (fetch)
        └── App.vue      # Gerente do estado e modais
```
## 🛠️ Como rodar o projeto

### 1. Backend

Entre na pasta:
```bash
cd backend-loja
```

Instale as dependências:
```bash
npm install
```

Configure o `.env` com a URL do SQLite:
```env
DATABASE_URL="file:./src/database/loja.sqlite"
```

Gere o banco de dados:
```bash
npx prisma migrate dev --name init
```

Rode o servidor:
```bash
npm run dev
```

---

### 2. Frontend

Entre na pasta:
```bash
cd frontend-loja
```

Instale as dependências:
```bash
npm install
```

Rode o projeto:
```bash
npm run dev
```

Acesse no navegador: http://localhost:5173

---

## ✨ Funcionalidades

- [x] CRUD completo de produtos
- [x] Busca dinâmica por nome ou descrição
- [x] Sistema de modal para cadastro e edição
- [x] Tratamento de erros global no backend
- [x] Validação rigorosa com Zod
