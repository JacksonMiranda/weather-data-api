# Projeto de API de Dados Climáticos

Este projeto consiste em uma API RESTful desenvolvida em Node.js com Express, que realiza a extração de dados climáticos da API OpenWeather, os armazena em um banco de dados PostgreSQL e os expõe através de seus próprios endpoints. A aplicação e o banco de dados são totalmente conteinerizados com Docker para garantir a portabilidade e facilidade de execução.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** PostgreSQL
- **API Externa:** OpenWeather
- **Conteinerização:** Docker, Docker Compose
- **Documentação da API:** Swagger (OpenAPI)

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados na sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)
- Uma chave de API (API Key) válida da [OpenWeather](https://openweathermap.org/appid).

## Configuração do Ambiente

Siga os passos abaixo para configurar e executar o projeto localmente.

**1. Clone o Repositório**
```bash
git clone [https://github.com/JacksonMiranda/weather-data-api]
cd [cadastro-dev-app]
```

**2. Configure as Variáveis de Ambiente**
Na pasta raiz do projeto, crie um arquivo chamado `.env`. Este arquivo conterá as variáveis necessárias para a execução da aplicação.

Copie o conteúdo abaixo para o seu novo arquivo `.env` e substitua o valor de `OPENWEATHER_API_KEY` pela sua chave real.

```
# Arquivo: .env

# Chave da API obtida no site da OpenWeather
OPENWEATHER_API_KEY=SUA_CHAVE_REAL_DA_OPENWEATHER_VEM_AQUI

# Credenciais para o banco de dados PostgreSQL
DB_USER=dev_user
DB_PASSWORD=dev_password
DB_HOST=db
DB_PORT=5432
DB_DATABASE=weather_db

# Porta onde a nossa API irá rodar
PORT=3001
```

## Execução da Aplicação

Com o Docker em execução na sua máquina, e já dentro da pasta raiz do projeto, execute o seguinte comando no seu terminal:

```bash
docker-compose up --build
```

Este comando irá:
- Construir a imagem Docker para a API Node.js a partir do `Dockerfile`.
- Baixar a imagem do PostgreSQL.
- Iniciar os contêineres para a API e para o banco de dados.
- Instalar as dependências do Node.js e iniciar o servidor com `nodemon`.

Aguarde até que os logs se estabilizem. Você verá mensagens indicando que o banco de dados está pronto para aceitar conexões e que o servidor da API está rodando na porta 3001.

## Como Usar a API

### Documentação Interativa (Swagger)

A forma mais fácil e recomendada para testar a API é através da documentação interativa do Swagger, que estará disponível no seu navegador no seguinte endereço:

**[http://localhost:3001/api-docs](http://localhost:3001/api-docs)**

Na interface do Swagger, você poderá ver todos os detalhes dos endpoints, seus parâmetros e respostas, além de poder executá-los diretamente pelo navegador.

### Exemplos de Uso via `curl`

Você também pode interagir com a API usando a linha de comando com ferramentas como o `curl`.

#### `POST /weather/{city}`
Busca os dados climáticos da cidade especificada, salva no banco e retorna o registro que foi salvo.

```bash
curl -X POST http://localhost:3001/weather/Salvador
```
**Resposta de Sucesso (201 Created):**
```json
{
    "id": 1,
    "city": "salvador",
    "temperature": "26.05",
    "feels_like": "27.01",
    "humidity": 78,
    "description": "nuvens dispersas",
    "timestamp": "2025-06-12T00:31:00.123Z"
}
```

#### `GET /weather`
Retorna todos os registros de buscas climáticas que estão armazenados no banco de dados, ordenados do mais recente para o mais antigo.

```bash
curl http://localhost:3001/weather
```
**Resposta de Sucesso (200 OK):**
```json
[
    {
        "id": 1,
        "city": "salvador",
        "temperature": "26.05",
        "feels_like": "27.01",
        "humidity": 78,
        "description": "nuvens dispersas",
        "timestamp": "2025-06-12T00:31:00.123Z"
    }
]
```
