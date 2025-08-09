# API de Transferências

Esta API permite login, registro de usuários, consulta de usuários e transferência de valores entre usuários. O banco de dados é em memória, ideal para testes e automação de APIs.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd PGATS-02-API
   ```
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Execução

- Para iniciar o servidor:
  ```bash
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`.
- A documentação Swagger estará disponível em `http://localhost:3000/api-docs`.

## Endpoints

- `POST /register`: Registra novo usuário. Não permite usuários duplicados.
- `POST /login`: Realiza login. Username e senha obrigatórios.
- `GET /users`: Lista todos os usuários.
- `POST /transfer`: Realiza transferência. Só permite valores acima de R$ 5.000,00 para favorecidos.
- `GET /transfers`: Lista todas as transferências.

## Regras de Negócio

- Login exige username e senha.
- Não é possível registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.

## Testes

Para testar com Supertest, importe o `app.js` em seus testes sem executar o método `listen()`.

## Estrutura de Diretórios

- `controller/`: Lógica dos endpoints
- `service/`: Regras de negócio
- `model/`: Dados em memória
- `app.js`: Configuração da aplicação
- `server.js`: Inicialização do servidor
- `swagger.json`: Documentação Swagger

## Exemplo de Registro

```json
{
  "username": "joao",
  "password": "123456",
  "favorecidos": ["maria"]
}
```

## Exemplo de Transferência

```json
{
  "from": "joao",
  "to": "maria",
  "amount": 4000
}
```
