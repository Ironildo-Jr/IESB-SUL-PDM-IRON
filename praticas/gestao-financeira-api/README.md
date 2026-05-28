# Gestão Financeira — Backend (Node + Express + sql.js)

Resumo
- API REST em Node.js e Express que usa `sql.js` (SQLite em WASM) para persistência em arquivo.

Principais tecnologias
- Node.js
- Express
- sql.js (SQLite compiled to WebAssembly)

Pré-requisitos
- Node.js (recomendado >= 18)
- npm

Instalação
1. Entrar na pasta do backend:

```
cd praticas/gestao-financeira-api
```
2. Instalar dependências:

```
npm install
```

Como executar
- Iniciar a API:

```
npm start
```

Rotas principais
- `GET /categories` — lista categorias
- `POST /categories` — cria categoria
- `PUT /categories/:id` — atualiza categoria
- `DELETE /categories/:id` — remove categoria
- `GET /transactions` — lista transações (retorna categoria aninhada)
- `POST /transactions` — cria transação
- `PUT /transactions/:id` — atualiza transação
- `DELETE /transactions/:id` — remove transação

Formato esperado (transações)
- Exemplo de payload para criar/atualizar transação:

```
{
  "description": "Compra mercado",
  "amount": 123.45,
  "date": "2026-05-27",
  "categoryId": 2
}
```

Persistência
- Ao criar/alterar/excluir dados, o banco em memória (sql.js) é persistido em disco via `saveDb()`.
- Arquivo do schema: `db/schema.sql`.
- Arquivo de dados (gerado): `data/database.sqlite` — pode ser removido para resetar o banco e recriar as tabelas a partir do schema.

Dicas de rede / testes em dispositivo
- Para testar a partir de um celular físico, aponte o frontend para `http://<SEU-PC-IP>:3000` ou use um túnel (`localtunnel` / `ngrok`).
- Exemplo com localtunnel:

```
npx localtunnel --port 3000 --subdomain myproj
```

Observações
- O campo `description` é `NOT NULL` no schema — envie sempre uma descrição não vazia.
- Se houver erros ao acessar o banco, verifique os logs do servidor (console) para mensagens com `DB error` ou `stmt.run result`.
