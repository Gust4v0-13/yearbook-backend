# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend.vercel.app`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`
    ## Auth

    ### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:** 

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado

      ### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)
      # API do Yearbook — Documentação de Endpoints

Base URL (produção): `https://yearbook-backend.vercel.app`

## Convenções

- Todas as respostas são em JSON
- Rotas protegidas exigem header `Authorization: Bearer <token>`
- O campo `senhaHash` nunca é retornado em nenhuma resposta
- Erros seguem o formato `{ "erro": "mensagem descritiva" }`

## Auth

### POST /auth/register

Cria uma nova conta de aluno.

- **Autenticação:** Não
- **Body:**

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "minhasenha123",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG"
}
```

- **Resposta de correto** `201 Created`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `409` — Email já cadastrado

### POST /auth/login

Autentica um aluno e retorna um token JWT.

- **Autenticação:** Não
- **Body:**

```json
{
  "email": "maria@email.com",
  "senha": "minhasenha123"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Erros:**
  - `401` — Credenciais inválidas (email não existe ou senha incorreta)

## Alunos

### GET /alunos

Lista todos os alunos cadastrados no sistema.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "cidade": "Salinas",
    "frase": "Aqui começa o futuro.",
    "planosFuturos": "Cursar Ciência da Computação na UFMG",
    "fotoUrl": "https://exemplo.com/fotos/maria.jpg",
    "role": "USER",
    "criadoEm": "2026-04-03T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "João Costa",
    "email": "joao@email.com",
    "cidade": "Belo Horizonte",
    "frase": "Determinação é tudo.",
    "planosFuturos": "Trabalhar com inteligência artificial",
    "fotoUrl": "https://exemplo.com/fotos/joao.jpg",
    "role": "USER",
    "criadoEm": "2026-04-02T14:20:00.000Z"
  }
]
```

- **Erros:**
  - `500` — Erro interno do servidor

### GET /alunos/:id

Retorna os dados de um aluno específico.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": "https://exemplo.com/fotos/maria.jpg",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

### POST /alunos

Cria um novo aluno no sistema (apenas administradores).

- **Autenticação:** Bearer token (admin)
- **Body:**

```json
{
  "nome": "Pedro Santos",
  "email": "pedro@email.com",
  "senha": "senha456",
  "cidade": "São Paulo",
  "frase": "Nunca parar de aprender.",
  "planosFuturos": "Criar minha própria startup",
  "fotoUrl": "https://exemplo.com/fotos/pedro.jpg"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 3,
  "nome": "Pedro Santos",
  "email": "pedro@email.com",
  "cidade": "São Paulo",
  "frase": "Nunca parar de aprender.",
  "planosFuturos": "Criar minha própria startup",
  "fotoUrl": "https://exemplo.com/fotos/pedro.jpg",
  "role": "USER",
  "criadoEm": "2026-04-04T11:00:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão de administrador
  - `409` — Email já cadastrado
  - `500` — Erro interno do servidor

### PUT /alunos/:id

Atualiza os dados de um aluno existente.

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "nome": "Maria Silva Santos",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro brilhante.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG e se especializar em IA",
  "fotoUrl": "https://exemplo.com/fotos/maria-nova.jpg"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva Santos",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro brilhante.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG e se especializar em IA",
  "fotoUrl": "https://exemplo.com/fotos/maria-nova.jpg",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Dados inválidos
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão para atualizar este aluno
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

### DELETE /alunos/:id

Remove um aluno do sistema (apenas administradores).

- **Autenticação:** Bearer token (admin)
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "mensagem": "Aluno removido com sucesso"
}
```

- **Erros:**
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão de administrador
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

  # API do Yearbook — Documentação de Endpoints

Base URL (produção): `https://yearbook-backend.vercel.app`

## Convenções

- Todas as respostas são em JSON
- Rotas protegidas exigem header `Authorization: Bearer <token>`
- O campo `senhaHash` nunca é retornado em nenhuma resposta
- Erros seguem o formato `{ "erro": "mensagem descritiva" }`

## Auth

### POST /auth/register

Cria uma nova conta de aluno.

- **Autenticação:** Não
- **Body:**

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "minhasenha123",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `409` — Email já cadastrado

### POST /auth/login

Autentica um aluno e retorna um token JWT.

- **Autenticação:** Não
- **Body:**

```json
{
  "email": "maria@email.com",
  "senha": "minhasenha123"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Erros:**
  - `401` — Credenciais inválidas (email não existe ou senha incorreta)

## Alunos

### GET /alunos

Lista todos os alunos cadastrados no sistema.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "cidade": "Salinas",
    "frase": "Aqui começa o futuro.",
    "planosFuturos": "Cursar Ciência da Computação na UFMG",
    "fotoUrl": "https://exemplo.com/fotos/maria.jpg",
    "role": "USER",
    "criadoEm": "2026-04-03T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "João Costa",
    "email": "joao@email.com",
    "cidade": "Belo Horizonte",
    "frase": "Determinação é tudo.",
    "planosFuturos": "Trabalhar com inteligência artificial",
    "fotoUrl": "https://exemplo.com/fotos/joao.jpg",
    "role": "USER",
    "criadoEm": "2026-04-02T14:20:00.000Z"
  }
]
```

- **Erros:**
  - `500` — Erro interno do servidor

### GET /alunos/:id

Retorna os dados de um aluno específico.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": "https://exemplo.com/fotos/maria.jpg",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

### POST /alunos

Cria um novo aluno no sistema (apenas administradores).

- **Autenticação:** Bearer token (admin)
- **Body:**

```json
{
  "nome": "Pedro Santos",
  "email": "pedro@email.com",
  "senha": "senha456",
  "cidade": "São Paulo",
  "frase": "Nunca parar de aprender.",
  "planosFuturos": "Criar minha própria startup",
  "fotoUrl": "https://exemplo.com/fotos/pedro.jpg"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 3,
  "nome": "Pedro Santos",
  "email": "pedro@email.com",
  "cidade": "São Paulo",
  "frase": "Nunca parar de aprender.",
  "planosFuturos": "Criar minha própria startup",
  "fotoUrl": "https://exemplo.com/fotos/pedro.jpg",
  "role": "USER",
  "criadoEm": "2026-04-04T11:00:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão de administrador
  - `409` — Email já cadastrado
  - `500` — Erro interno do servidor

### PUT /alunos/:id

Atualiza os dados de um aluno existente.

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "nome": "Maria Silva Santos",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro brilhante.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG e se especializar em IA",
  "fotoUrl": "https://exemplo.com/fotos/maria-nova.jpg"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva Santos",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro brilhante.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG e se especializar em IA",
  "fotoUrl": "https://exemplo.com/fotos/maria-nova.jpg",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Dados inválidos
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão para atualizar este aluno
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

### DELETE /alunos/:id

Remove um aluno do sistema (apenas administradores).

- **Autenticação:** Bearer token (admin)
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "mensagem": "Aluno removido com sucesso"
}
```

- **Erros:**
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão de administrador
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

## Mensagens

### GET /mensagens

Lista todas as mensagens do mural, ordenadas da mais recente para a mais antiga.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "texto": "Parabéns a todos pela formatura! Foi uma jornada incrível!",
    "autorId": 1,
    "destinatarioId": null,
    "criadoEm": "2026-04-05T15:30:00.000Z",
    "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": "https://exemplo.com/fotos/maria.jpg"
    }
  },
  {
    "id": 2,
    "texto": "João, você foi um grande amigo durante todo o curso. Sucesso!",
    "autorId": 1,
    "destinatarioId": 2,
    "criadoEm": "2026-04-05T14:20:00.000Z",
    "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": "https://exemplo.com/fotos/maria.jpg"
    }
  }
]
```

- **Erros:**
  - `500` — Erro interno do servidor

### POST /mensagens

Cria uma nova mensagem no mural (requer autenticação).

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "texto": "Que turma especial! Vou sentir saudades de todos vocês.",
  "destinatarioId": null
}
```
- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 3,
  "texto": "Que turma especial! Vou sentir saudades de todos vocês.",
  "autorId": 2,
  "destinatarioId": null,
  "criadoEm": "2026-04-05T16:00:00.000Z"
}
```

- **Erros:**
  - `400` — Campo `texto` obrigatório ausente
  - `401` — Token não fornecido ou inválido
  - `404` — Destinatário não encontrado (quando `destinatarioId` é fornecido)
  - `500` — Erro interno do servidor

### DELETE /mensagens/:id

Remove uma mensagem do mural (apenas o autor ou administrador).

- **Autenticação:** Bearer token
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "mensagem": "Mensagem removida com sucesso"
}
```

- **Erros:**
  - `401` — Token não fornecido ou inválido
  - `403` — Usuário não tem permissão para deletar esta mensagem
  - `404` — Mensagem não encontrada
  - `500` — Erro interno do servidor