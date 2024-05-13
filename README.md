# Desafio Academia do Universitário API 🇧🇷

<div align="center">
  <img  style="border-radius: 8px;" src="public/banner.png" width="90%"/>
  <br/>
  <br/>
  <a href="https://desafioau-production.up.railway.app" target=”_blank”><strong>Link do Deploy »</strong></a>
  <br/>
  <br/>
</div>
<div align="center">
  <a href="#about">Sobre</a> •
  <a href="#features">Características</a> •
  <a href="#technologies">Tecnologias</a> •
  <a href="#enviroment">Ambiente</a> •
  <a href="#run">Como Rodar?</a>
</div>

## <span id="about">🌐 Sobre o Projeto</span>

Este projeto é uma API para criação e busca de cardápio, para restaurante, construída usando [Nest.js](https://nestjs.com/). Ela permite criação de um cardápo diurno e um cardápio noturno.

A API é desenvolvida com Nest.js (que faz uso do Node.js) como roteador, sua utilização se deve ao fato de permitir a criação de aplicações escaláveis e de fácil manutenção.

Para realizar a comunicação com o banco de banco de dados foi utlizado o PrismaORM, devido à sua facilidade de integração com o Nest.js, além de automatizar o processo de criação, e troca de banco de dados, além de formação de entitdades, que facilitam a tipagem e identificação de dados na aplicação, e outros fatores.

O banco de dados utilizado foi o MongoDB, com o serviço do MongoDB Atlas.

O projeto segue uma estrutura moderna para manter a base de código organizada e de fácil manutenção.

---

## <span id="features">Características</span>

- Utilização do Nest.js para construção do servidor
- PrismaORM para criação do banco de dados
- Configuração do ambiente de desenvolvimento para criação da API
- Implementação do MongoDB como banco de dados para a API
- Jest e Supertest para realizar os testes unitários, garantindo a qualidade da API.
- Faker para geração de dados falsos e aleatórios.
- Design patterns e architecture patterns.
- Orientação à objetos

</br>

## <span id="technologies">🛠 Tecnologias</span>

Abaixo seguem as ferramentas e frameworks utilizados no projeto: <br/>

<div style="display: inline_block"> 
  <img alt="Gui-Nest" height="30" src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img alt="Gui-Jest" height="30" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
  <img alt="Gui-Prisma" height="30" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  <img alt="Gui-MongoDB" height="30" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
  <img alt="Gui-Ts" height="30" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
</div>

</br>

## <span id="enviroment">🌱 Variáveis de ambiente</span>

Este projeto usa uma variável de ambiente, verifique o arquivo .env.example para ver o exemplo.

---

## <span id="run">⚙️ Como Rodar</span>

1. Clone este repositório

2. Instale as dependências do projeto

```bash
npx prisma generate
```

3. Gere o prisma client (não esqueça de preencher as variáveis de ambiente)

```bash
npx prisma generate
```

4. Para rodar o projeto em desenvolvimento basta executar

```bash
#O ambiente será o sufixo do arquivo .env com as variáveis de ambiente desejadas
#Ex: Possuo os seguintes arquivos
#.env / .env.test / .env.dev
#E quero que rode em desenvolvimento, portanto, colocarei: ENV=dev npm run start:dev. Pois dev é o que vem após o segundo ponto.
#Isso evita rodar testes em ambientes de desenvolvimento e vice versa
ENV=<ambiente> npm run start:dev
```

7. Para executar a versão de produção

```bash
#Não se esqueça de neste caso, colocar a variável de banco de dados no arquivo .env
npm run build

npm run start:prod
```

8. Por último, acesse no seu navegador ou faça uma requisição para http://localhost:<port>/menu para acessar a aplicação

### 🧪 Testes

Para rodar os testes execute o comando

```bash
# testes unitários
$ ENV=<ambiente> npm run test

# cobertura dos testes
$ npm run test:cov
```
