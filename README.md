# Desafion BackEnd - ClickSoft

## Requisitos

* Node.js >= 14.15.4
* NPM >= 6.0.0
* Postgres >= 12.0.0

## Como Executar 

Clone o repositório

```
$ git clone https://github.com/murilogds/desafio-backend-clicksoft
```

Antes de executar o projeto é necessário configurar um banco de dados postgres localmente e botar suas variáveis em um arquivo .env

Para criar um banco de dados com postgres execute 

``` 
$ psql -U <seu_usuario_do_banco> -c "CREATE DATABASE <nome_desejado>;"
```

Crie um arquivo .env na raíz do repositório e copie todo o conteúdo do arquivo [.env.example](./.env.example) para dentro do seu arquivo, mudando apenas as seguintes variáveis de acordo com seu banco de dados:

```
PG_PORT=<porta_do_seu_banco>
PG_USER=<seu_usuario_do_banco>
PG_PASSWORD=<sua_senha_do_banco>
PG_DB_NAME=<nome_do_banco>
```

Por padrão a porta usada pelo postgres é a **5432**, o usuário e o nome do banco informados devem ser os mesmos usados no comando da criação do banco, caso o usuário usado não precise de senha, o campo PG_PASSWORD deve ser deixado vazio

Com o banco configurado, instale as dependências do projeto:
```
npm install
```
ou
```
yarn
```

Execute as migrações no banco de dados:
```
node ace migration:run
```

Importe as requisições para o insomnia através do arquivo [isomnia_file](insomnia_file.json)

Execute o projeto em ambiente de desenvolvimento:

```
npm run dev
```
ou
```
yarn dev
```

Agora é só testar as requisições a partir do insomnia