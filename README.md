## B.O ChatBot

É um ChatBot/Robô para Facebook que servirá para colher informaçes sobre alguns tipos de violência e com isso gerar
um mapa da violência de diversos lugares.

Com o B.O Bot o usuário não precisará acessar um site ou baixar um aplicativo para poder informar a violência. 
O B.O Bot torna o acesso mais simples e natural já que basta conversar com o Bot no aplicativo do Facebook como se estivesse
conversando com um humano.

https://www.facebook.com/hackfestbobot/

## Instalação
* Baixar e importar o projeto no WIT.AI [Download](https://api.wit.ai/export/AbnsKj0LhNoF5Fgb63VOHIIPOfqhfeSPS7B8omeXQEHRkWQaSZgBaypeDccc8J6bJ3zAQLghUXhKa5MsTUQRoJB7g60uVwnX3PfGbt9kFBqIaw)
* Instalar o ambiente Ruby on Rails [RoR](https://gorails.com/setup/ubuntu/16.04)
* Clonar o repositório 
```
git clone git@github.com:g13ydson/bo_bot.git
```
* dentro da pasta */bobot* Instalar as dependências e criar o banco de dados
```
bundle install
rake db:create db:migrate
```
* configurar as variáveis de configuração:
```
ENV['WIT_TOKEN'] =  'TOKEN DA APLICAÇÃO WIT.AI
ENV['FACEBOOK_PAGE_TOKEN'] = 'TOKEN DA PÁGINA DO FACEBOOK'
```


## Métodos
* https://hackfestbobot.herokuapp.com/messenger/webhook - webhook utilizado na integração com o facebook
* https://hackfestbobot.herokuapp.com/messenger/get_violence - retorna todas as violências 


## Licença

GNU GENERAL PUBLIC LICENSE
 Version 3, 29 June 2007
