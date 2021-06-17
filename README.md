# AlphaPets

## Tecnologias utilizadas
<div>
<img align="center" alt="JavaScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
<img align="center" alt="HTML5" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
<img align="center" alt="React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
<img align="center" alt="Node.js"height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
</div>

# Sobre o projeto

O projeto visa permitir o cadastro e agendamento de serviços para pets, e conta com:
  - Página de login;
  - Página de cadastro de usuário;
  - Página para solicitação de recuperação de senha;
  - Página para alteração de senha;
  - Página para cadastro de pets;
  - Página para listar pets cadastrados;
  - Página para agendar serviço para o pet;
  - Página para listar serviços agendados;
  - Página para visualizar informações da conta.

## A solicitação de recuperação de senha

Quando uma solicitação de recuperação de senha é feita, o código que deve ser usado para recuperar a senha é enviado ao email informado durante o processo. Esse procedimento é realizado pelo servidor do arquivo ***mail.js***. Este servidor precisa de um email, senha, e Client Id, Client Secret e Refresh Token do OAuth2.
O email e senha deverão estar presentes no arquivo ***.env***, situado na raiz do projeto.

```
EMAIL= YOUR_GMAIL
WORD= YOUR_GMAIL_PASSWORD
```

### Configurando o OAuth2

Vá para o [Google Cloud Plataform](https://console.cloud.google.com/home) e crie um novo projeto.
No menu de navegação no canto superior esquerdo, clique em ***APIs & Services*** e em ***OAuth consent screen***. Use o tipo **externo** e na tela seguinte, insira o seu email no campo de email de suporte ao usuário e no campo de endereço de email.  O preenchimento do App domain não é necessário.

Na página seguinte adicione a si próprio como usuário de teste inserindo seu endereço de email. O próximo passo é criar uma credencial para o OAuth client ID.

Defina o tipo de aplicação como ***Web application*** e use <https://developers.google.com/oauthplayground> como Authorized redirect URI.

Copie e cole o Client ID e o Client Secret nos seus respectivos campos no arquivo ***.env*** situado na raiz do projeto
```
OAUTH_CLIENTID= YOUR_CLIENT_ID
OAUTH_CLIENT_SECRET= YOUR_CLIENT_SECRET
```

Ainda é preciso gerar seu Refresh Token. Para isso, vá até [OAuth Playground](https://developers.google.com/oauthplayground/) e clique no ícone de configurações no canto superior direito e em ***Use your own OAuth credentials*** e insira seu Client ID e Client Secret obtidos anteriormente.

Então, do lado esquerdo da sua tela, selecione a ***Gmail API v1*** e ***https://mail.google.com/***. AutOrize a API e no Step 2 clique em ***exchange authorization code for tokens*** para obter seu Refresh Token.

Copie-o e cole em seu respectivo campo no arquivo ***.env***.

```
OAUTH_REFRESH_TOKEN= YOUR_REFRESH_TOKEN
```
# Como você pode testar o projeto

Realizado o procedimento acima, você precisará ter em sua máquina:
  - Git
  - Node.js

```
# clone este repositório
$ git clone https://github.com/anapolima/alphapets

# vá para a pasta do projeto no terminal
$ cd alphapets

# instale as dependências
$ yarn install
```

Antes de iniciar a aplicação vá até o arquivo ```./src/providers/UserProvider.jsx```e altere a constante ***url*** situada na *linha 9*, definindo-a com o valor do seu endereço de IP.
Por exemplo, ```const url = "192.168.0.1";```.

```
# inicie a aplicação em modo de desenvolvimento
$ yarn start

# inicie a fake api utilizada para fazer as requisições do projeto
$ yarn server

# inicie o servidor responsável por enviar os emails de recuperação de senha
$ node mail.js
```

