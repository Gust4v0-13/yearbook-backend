# API do Yearbook Digital

Base URL: `http://localhost:3000` (desenvolvimento)

## CORS

Esta API tem CORS habilitado para qualquer origem. Você pode consumi-la
de qualquer domínio (localhost, Vercel, etc.) sem configuração adicional
no cliente.

## Rotas gerais

| Método | Rota      | Descrição                          |
| ------ | --------- | ----------------------------------- |
| GET    | `/`       | Mensagem de status da API           |
| GET    | `/status` | Status e timestamp do servidor      |

## Alunos

| Método | Rota          | Descrição               |
| ------ | ------------- | ------------------------ |
| GET    | `/alunos`     | Listar todos os alunos   |
| GET    | `/alunos/:id` | Buscar aluno por ID      |
| POST   | `/alunos`     | Criar novo aluno         |
| PUT    | `/alunos/:id` | Atualizar aluno          |
| DELETE | `/alunos/:id` | Deletar aluno            |

## Mensagens

| Método | Rota             | Descrição                 |
| ------ | ---------------- | -------------------------- |
| GET    | `/mensagens`     | Listar todas as mensagens (inclui dados do autor) |
| POST   | `/mensagens`     | Criar nova mensagem        |
| DELETE | `/mensagens/:id` | Deletar mensagem           |

## Modelos de dados

### Aluno

| Campo         | Tipo     | Observação                  |
| ------------- | -------- | ---------------------------- |
| id            | Int      | Gerado automaticamente       |
| nome          | String   | Obrigatório                  |
| email         | String   | Único, obrigatório            |
| senhaHash     | String   | ⚠️ NUNCA retornado pela API  |
| cidade        | String   | Opcional                     |
| frase         | String   | Opcional                     |
| planosFuturos | String   | Opcional                     |
| fotoUrl       | String   | Opcional (Uploadcare)        |
| role          | Enum     | USER (padrão) ou ADMIN       |
| criadoEm      | DateTime | Gerado automaticamente       |

### Mensagem

| Campo     | Tipo     | Observação               |
| --------- | -------- | -------------------------- |
| id        | Int      | Gerado automaticamente     |
| texto     | String   | Obrigatório                |
| imagemUrl | String   | Opcional (Uploadcare)      |
| autorId   | Int      | FK → Aluno, obrigatório    |
| criadoEm  | DateTime | Gerado automaticamente     |

## Erros

| Status | Quando ocorre                                          |
| ------ | -------------------------------------------------------- |
| 400    | Validação falhou (ex: `POST /mensagens` sem `texto`)     |
| 404    | Registro não encontrado (aluno ou mensagem inexistente)  |
| 500    | Erro inesperado no servidor                              |

## Regras importantes

- `senhaHash` nunca aparece em nenhuma resposta da API
- Não há autenticação implementada nas rotas atualmente — todas as rotas de `/alunos` e `/mensagens` são de acesso livre