## B.O ChatBot

![bobot](https://hackfestbobot.herokuapp.com/Img/banner.jpg)

B.O. bot é um ChatBot/Robô criado durante o hackfest 2017 capaz de receber denúncias  sobre casos de violências. Com essas informações criamos um mapa da violência que pode ser visto no site https://www.bobot.com.br e dispomos esses dados através de um webservice. Os dados são abertos e podem ser utilizados por qualquer pessoa.

https://www.facebook.com/hackfestbobot/

## Instalação
* Criar uma conta no WIT.AI
* Criar uma aplicação no Facebook https://developers.facebook.com/apps
* Baixar e importar o projeto no WIT.AI [Download](https://api.wit.ai/export/AbnsKj0LhNoF5Fgb63VOHIIPOfqhfeSPS7B8omeXQEHRkWQaSZgBaypeDccc8J6bJ3zAQLghUXhKa5MsTUQRoJB7g60uVwnX3PfGbt9kFBqIaw)
* Instalar o ambiente Ruby on Rails [RoR](https://gorails.com/setup/ubuntu/16.04)
* Clonar o repositório 
```
git clone git@github.com:g13ydson/bo_bot.git
```
* dentro da pasta */bo_bot* Instalar as dependências e criar o banco de dados
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
* https://www.bobot.com.br/messenger/webhook - webhook utilizado na integração com o facebook
* https://www.bobot.com.br/messenger/get_violence - retorna todas as violências
* https://www.bobot.com.br/messenger/get_violence_by_type/assalto - retorna todas as violências por tipo como parâmetro

## Contato
* tavares.gleydson@gmail.com

## Licença

GNU GENERAL PUBLIC LICENSE
 Version 3, 29 June 2007