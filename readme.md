## 📡 Endpoints da API

### 1️⃣ Cadastro de Clientes
- **Cadastrar Cliente**

  **Endpoint:**
  ```
  POST localhost:8888/api/clientes/cadastro
  ```

  **JSON de Requisição:**
  ```json
  {
    "nome": "Henrique Teixeira Gil",
    "email": "henrique12345@gmail.com",
    "senha": "12345aH@",
    "celular": "+5511953846254"
  }
  ```

---

### 2️⃣ Cadastro de Agendamento
- **Criar Agendamento**

  **Endpoint:**
  ```
  POST localhost:8888/api/agendamento/cadastro
  ```

  **JSON de Requisição:**
  ```json
  {
    "client_id": 1,
    "barber_id": 1,
    "service_id": 2,
    "data_agend": "2025-04-07",
    "inicio_agend": "14:30"
  }
  ```

### 3 Listagem de Agendamento
- **Listar Agendamento Clientes**

  **Endpoint:**
  ```
  POST localhost:8888/api/agendamento/cliente/id
  ```
- **Listar Agendamento Barbeiro**

  **Endpoint:**
  ```
  POST localhost:8888/api/agendamento/barbeiro/id
  ```

### 4 Delete de Agendamento
- **Deletar Agendamento**

  **Endpoint:**
  ```
  DELETE localhost:8888/api/agendamento/id
<<<<<<< HEAD
=======
  ```

### 5 Cadastrar Servicos
- **Cadastrar Servicos**
  
  **Endpoint:**
  ```
  POST localhost:8888/api/servicos/cadastro
  ```

  **JSON de Requisição:**
  ```json
    {
    "nome": "Corte Tradicional",
    "descricao": "Corte padrão com tesoura e máquina.",
    "preco": 50.0,
    "duracao_minutos": 30
    }
  ```

### 6 Listagem Servicos
- **Listar todos os Servicos**
  
  **Endpoint:**
  ```
  GET localhost:8888/api/servicos
  ```

### 7 Editar Servico
- **Editar  Servico**
  
  **Endpoint:**
  ```
  PUT localhost:8888/api/servicos/{id_servico}
  ```
  **JSON de Requisição:**
  ```json
    {
    "nome": "Corte Tradicional",
    "descricao": "Corte padrão com tesoura e máquina.",
    "preco": 50.0,
    "duracao_minutos": 30
    }
  ```

### 8 Excluir Servicos
- **Listar todos os Servicos**
  
  **Endpoint:**
  ```
  DELETE localhost:8888/api/servicos/{id_servico}
>>>>>>> fff97ad (feature/servicos)
  ```