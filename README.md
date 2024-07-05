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
  <a href="#questions">Perguntas</a> •
  <a href="#about">Sobre</a> •
  <a href="#features">Características</a> •
  <a href="#technologies">Tecnologias</a> •
  <a href="#enviroment">Ambiente</a> •
  <a href="#run">Como Rodar?</a>
</div>

## <span id="questions">❓ Perguntas do Desafio</span>

### A maior dificuldade que enfrentei ao realizar o teste

Acredito que encontrei duas grandes dificuldades, que impediram que eu entregasse a minha melhor versão do projeto.

Primeiramente, planejei este projeto, para ser além de um menu. Basicamente queria fazer uma plataforma integrada, onde os clientes também pudesse fazer o pedido através da plataforma. A cozinha receberia os pedidos, e poderia marcar como pedido em andamento, pedido cancelado e pedido pronto para retirada. É possível ver isto, através de algumas rotas a mais, dentro da apicação, que não estão sendo utilizadas no front end.

O primeiro desafio que encontrei, foi tentar tirar todo o proveito das server actions e server components do next 14. Já havia utilizado algumas vezes o método de fecth nativo, que no next 14 traz muitos benefícios como caching automático de dados e refetching. Contudo ao utilizá-lo perde-se muita interatividade no site, e eu acabo prezando bastante pela experiência do usuário na aplicação, e não consegui relizar um resultado satisfatório utilizando o fetch. Com isso, acabei perdendo cerca de 2 dias, sem produzir, apenas realizando tentativas e estudando mais sobre.

O segundo desafio foi a mudança repentina de banco de dados. Minha pergunta sobre qual banco de dados poderia ser utilizado só foi respondida após eu finalizar o servidor, e como eu não tinha uma experiência muito profunda com o mongodb, acabei perdendo um bom tempo configurando o ambiente na minha máquina, para migrar o banco utilizado, e mais um tempo fazendo o deploy do banco (pois demorei para entender que o mongodb atlas necessita de autorização de IP nas requisições ao banco de dados). Mas a maneira que construí a aplicação me poupou **muito** tempo, pois precisei somente mudar a tipagem em alguns lugares, e gerar dados diferentes para o id nos testes.

No final, acabei entregando o projeto um pouco depois do prazo, mas acredito que consegui cumprir os requisitos pedidos. Após perceber qual caminho eu poderia seguir, construí mais da metade do front em basicamente um dia. O único arrependimento que tenho, é de não entregar algo tão bom quanto eu sei que poderia ter entregue, sem esses erros bobos.

### Como me vejo daqui a cinco anos

Me vejo sendo alguém que tenha um bom conhecimento sobre o projeto, por inteiro. Entendendo as funcionalidades de cada pessoa para o projeto.

Quero ter um profundo conhecimento sobre as tecnologias que utilizar no meu ambiente de trabalho. Mas não somente sobre as tecologias, mas tabem sobre a infraestrutura e boas práticas, pois são conhecimentos transferíveis, independente da tecnologia utilizada.

E mais importante, ser uma referência para aqueles que trabalham comigo, alguém que possa ajudar e treinar a pessoas que estão ingressando na equipe, ou iniciando na área.

---

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
npm i
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
