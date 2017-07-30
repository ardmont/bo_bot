## B.O ChatBot

B.O. bot é um ChatBot/Robô criado durante o hackfest 2017 para colher informações sobre casos de violências e dispor esses dados para diversos órgãos de segurança. Esses dados podem ser vistos no site do B.O Bot na forma de um mapa da violência.

https://www.facebook.com/hackfestbobot/

## Instalação
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
* https://hackfestbobot.herokuapp.com/messenger/webhook - webhook utilizado na integração com o facebook
* https://hackfestbobot.herokuapp.com/messenger/get_violence - retorna todas as violências
* https://hackfestbobot.herokuapp.com/messenger/get_violence_by_type/assalto - retorna todas as violências por tipo como parâmetro


## Licença

GNU GENERAL PUBLIC LICENSE
 Version 3, 29 June 2007
