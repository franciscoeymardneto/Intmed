![logo medicar](https://i.postimg.cc/DZNPJSxk/Logo.png "logo medicar")
# Desafio Medicar  [ FullStack ]
Descrição: Teste prático

Autor: Eymard Neto ( [linkedin](https://www.linkedin.com/in/eymard-neto-216254207) )

# Tecnologias

- Frontend
    - Angular 18.1.3
    - Angular Material 18.1.3
    - Sass
- Backend
    - Python 3.12.4
    - Django 5.0.7
- Database
    - PostgresSql 16

# Pré-requisitos para Setup

- Git
- Docker
- Docker Compose

# Setup

- [Setup Backend](https://github.com/franciscoeymardneto/Intmed?tab=readme-ov-file#setup-backend)
- [Setup Frontend](https://github.com/franciscoeymardneto/Intmed?tab=readme-ov-file#setup-frontend)

## Setup Backend
Este guia irá ajudá-lo a configurar e executar a aplicação backend em um ambiente Docker.

### 1. Clonar o repositório e atualizar arquivo de ambiente
Clone o repositório e navegue até a pasta `backend`:

```bash
git clone <https://github.com/franciscoeymardneto/Intmed.git>
cd backend
```

Entre na pasta *app* e atualize o arquivo .env conforme necessário:

```bash
cd app
```

### 2. Levantar Containers
Volte para a raiz da pasta backend e execute o comando para iniciar os containers:

```bash
cd ..
docker compose up -d --build
```

Espere até que o build seja concluído e todos os containers estejam em execução.

### 3. Executar Migrações
Após os containers estarem ativos, execute as migrações do banco de dados:

```bash
docker compose exec api python manage.py makemigrations
docker compose exec api python manage.py migrate
```

### 4. Executar Testes
Para garantir que tudo esteja funcionando corretamente, execute os testes:

```bash
docker compose exec api python manage.py test intmed_api.tests
```

Neste ponto, a aplicação já estará rodando e funcional.

### 5. Criação do Superusuário
Agora, crie o superusuário do Django com as credenciais desejadas, ele será necessário para acessar o menu
de Admin do django para cadastrar Medicos, Agendas e os dados necessários para a aplicação:

```bash
docker compose exec api python manage.py createsuperuser
```

### 6. Acessos

- Acesse o painel de administração do Django através do endereço: http://localhost:8000/admin
- Acesse a documentação Swagger dos endpoints através do endereço: http://localhost:8000/swagger

## Setup Frontend

### 1. Clonar o repositório e atualizar arquivo de ambiente
**Caso não tenha clonado antes**, Clone o repositório e navegue até a pasta `frontend`:

```bash
git clone <https://github.com/franciscoeymardneto/Intmed.git>
cd frontend
```

Entre na pasta /src/environments e atualize o arquivo environment.prod conforme necessário:

```bash
cd src/environments
```

### 2. Instalando dependencias
Volte para a raiz da pasta frontend e execute o comando para instalar as dependências do projeto:

```bash
cd ..
npm install
```

### 3. Execute a aplicação
Execute a aplicação para poder ter acesso ao sistema

```bash
npm start
```
### 4. Acessos

- Acesse a aplicação através do endereço: http://localhost:4200/

Agora basta só criar sua conta e testar a aplicação!!

OBS: Lembre de popular o banco através do menu Admin do Django para que o frontend tenha o que
consumir