# Dockerfile

# Etapa 1: Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Etapa 2: Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Etapa 3: Copie os arquivos de dependências
COPY backend/package*.json ./

# Etapa 4: Instale as dependências da aplicação
RUN npm install

# Etapa 5: Copie o restante do código-fonte do backend
COPY backend/ .

# Etapa 6: Exponha a porta em que a API vai rodar
EXPOSE 3001

# Etapa 7: Comando para iniciar a aplicação
CMD [ "npm", "run", "dev" ]