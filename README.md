# Sistema de Conversas

    Esse documento foi produzido levando em consideração o modelo de Readme do github. Ele descreve sobre o sistema de mensagens aqui desenvolvido, informando os requerimentos para executa-lo e o como i# Sistema de Conversas

    Esse documento foi produzido levando em consideração o modelo de Readme do github. Ele descreve sobre o sistema de mensagens aqui desenvolvido, informando os requerimentos para executa-lo e o como iniciar o projeto

# Requerimentos

* Node: >= 10.19.0 ou superior

# Como iniciar

Abrir o prompt na pasta do projeto e executar ```npm start``` 

# End Points

Existem 24 End points validos no projeto, sendo 19 do tipo GET, 3 do tipo POST e 2 do tipo DELETE.

- ```GET```
 
        /
        /lobby/newMail
        /lobby/answer
        /lobby/forward
        /lobby/listMail/received
        /lobby/listMail/sent
        /lobby/listMail/reading
        /users
        /user/:id
        /mail
        /mail/received/:user_id
        /mail/sent/:user_id
        /mail/:user_id/:mail_id
        /mail/forward/:user_id/:mail_id
        /mail/answer/:user_id/:mail_id
        /default.css
        /default.js
        /home.css
        /favicon.ico

- ```POST```

        /user
        /mail
        /answerMail

- ```DELETE```

        /user/:id
        /mail/:user_id/:mail_id

Obs.: Os caminhos que tem dois pontos iniciando eles demonstram uma variável. Dessa forma o caminho, quando usuario, deverá ter o nome marcado com dois pontos substituido por um valor:

        GET /user/1
        GET /mail/1/2

É possivel categorizar eles de acordo com o que eles gerenciam.

## Gerenciadores de interface

Os seguintes endpoints fazem o gerenciamento de interface, de forma que todos são do tipo GET, não recebem nada, e retornam para o usuario o front-end da aplicação.

- Que retornam paginas:
    - ```/```
    - ```/lobby/newMail```
        - Tem campo de querry no seguinte formato: ```?id=:id```
    - ```/lobby/answer```
        - Tem campo de querry no seguinte formato: ```?id=:id&&mail=:mail```
    - ```/lobby/forward```
        - Tem campo de querry no seguinte formato: ```?id=:id&&mail=:mail```
    - ```/lobby/listMail/received```
        - Tem campo de querry no seguinte formato: ```?id=:id```
    - ```/lobby/listMail/sent```
        - Tem campo de querry no seguinte formato: ```?id=:id```
    - ```/lobby/listMail/reading```
        - Tem campo de querry no seguinte formato: ```?id=:id&&mail=:mail```
- Que retornam scripts:
    - ```/default.js```
- Que retornam styles:
    - ```/default.css```
    - ```/home.css```
    - ```/favicon.ico```

## Gerenciadores de usuario

Os seguintes endpoints fazem o gerenciamento dos usuarios do sistema:

- ```GET```
    - ```/users``` -> Devolve todos os usuarios do banco
        - Entrada: nada
        - Retorno: uma lista de objetos no seguinte formato:
        
                {
                    name, 
                    id
                }
    - ```/users/:id``` -> Devolve um usuario especifico do banco
        - Entrada: nada
        - Retorno: um objeto usuario no formato descrito acima tal qual o id desse usuario corresponde ao id recebido no end point
- ```POST```
    - ```/user``` -> Recebe um nome e cria um novo usuario no banco caso o mesmo seja valido
        - Entrada: recebe um objeto contendo 
        
                {
                    user_name
                }
        - Retorno: 
            - caso o nome de usuario já esteja sendo usada, retorna um objeto 
                
                    {
                        error, 
                        message
                    } 
            - caso contrario, retorna um objeto 

                    {
                        message
                    } 
- ```DELETE```
    - ```/users/:id``` -> Deleta o usuario indicado do banco, verificando os emails que o mesmo participa para não deixar emails fantasma (mensagens que existem no banco mas não podem ser acessadas porque os dois participantes foram excluidos do banco)
        - Entrada: nada
        - Retorno: um objeto informando que a operação foi bem sucedida contendo
        
                {
                    message
                }

## Gerenciadores de mensagem

Os seguintes endpoints fazem o gerenciamento das mensagens do sistema:

- ```GET```
    - ```/mail``` -> Retorna a lista de todos os emails do banco de dados
        - Entrada: nada 
        - Retorno: uma lista de objetos no seguinte formato: 
        
                {
                    id, 
                    destinatario, 
                    remetente, 
                    assunto, 
                    corpo, 
                    visited, 
                    date
                }
    - ```/mail/received/:user_id``` -> Retorna todos os emails no qual o usuario é o destinatario
        - Entrada: nada 
        - Retorno: uma lista de objetos no seguinte formato:

                {
                    id, 
                    destinatario, 
                    remetente, 
                    assunto, 
                    visited, 
                    date, 
                    remetente_name
                }
    - ```/mail/sent/:user_id``` -> Retorna todos os emails no qual o usuario é o remetente
        - Entrada: nada 
        - Retorno: uma lista de objetos no seguinte formato:

                {
                    id, 
                    destinatario, 
                    remetente, 
                    assunto, 
                    visited, 
                    date, 
                    destinatario_name
                }
    - ```/mail/:user_id/:mail_id``` -> Retorna um email especifico de um usuario
        - Entrada: nada
        - Retorno:
            - caso a mensagem não exista ou o usuario não tenha permissão para acessar a mensagem, retorna um objeto contendo:
            
                    {
                        error,
                        message
                    }
            - caso contrario retorna um objeto contendo:

                    {
                        id, 
                        assunto, 
                        corpo, 
                        date, 
                        destinatario, 
                        remetente, 
                        remetente_name, 
                        destinatario_name
                    }
    - ```/mail/forward/:user_id/:mail_id``` -> Retorna um corpo de mensagem composto pela mensagem anterior para que o mesmo possa ser repassado para outro usuario
        - Entrada: Nada
        - Retorno: 
            - caso a mensagem não exista ou o usuario não tenha permissão para acessar a mensagem, retorna um objeto contendo:
            
                    {
                        error,
                        message
                    }
            - caso contrario retorna um objeto contendo:

                    {
                        forwardCorpo
                    }
    - ```/mail/answer/:user_id/:mail_id``` -> Retorna um corpo de mensagem composto pela mensagem anterior, junto com o usuario que está sendo respondido
        - Entrada: Nada
        - Retorno: 
            - caso a mensagem não exista ou o usuario não tenha permissão para acessar a mensagem, retorna um objeto contendo:
            
                    {
                        error,
                        message
                    }
            - caso contrario retorna um objeto contendo:

                    {
                        body, 
                        destinatario_name, 
                        destinatario, 
                        assunto
                    }
- ```POST```
    - ```/mail``` -> Faz a recepção de uma nova mensagem e salva ela no banco de dados
        - Entrada: Recebe um objeto contendo:
        
                {
                    destinatario, 
                    remetente, 
                    assunto, 
                    corpo, 
                    data_envio
                }
        - Retorno: 
            - caso o remetente ou o destinatario não exista, retorna um objeto contendo:
            
                    {
                        error,
                        message
                    }
            - caso contrario retorna um objeto contendo:

                    {
                        message
                    }
    - ```/answerMail``` -> Funciona como um metodo UPDATE, no sentido que ele modifica um email já existente de forma a trocar o corpo da mensagem, e inverter o destinatario e o remetente
        - Entrada: Recebe um objeto:
        
                {
                    mail_id, 
                    answering_user, 
                    corpo, 
                    data_envio
                }
        - Retorno:
            - caso o usuario não tenha permissão de acesso a mensagem, retorna um objeto contendo:
            
                    {
                        error,
                        message
                    }
            - caso contrario retorna um objeto contendo:

                    {
                        message
                    }
- ```DELETE```
    - ```/mail/:user_id/:mail_id``` -> Deleta a mensagem indicada do banco
        - Entrada: nada
        - Retorno:
            - caso o usuario não tenha permissão de acesso a mensagem ou a mensagem não exista, retorna um objeto contendo:
            
                    {
                        error,
                        message
                    }
            - caso contrario retorna um objeto contendo:

                    {
                        message
                    }

# Objetivo Principal do trabalho
Utilizando WebServices no modelo REST, desenvolva um servidor de email simplificado. Ele deve implementar, pelo menos, as seguintes funcionalidades:

- Enviar mensagem
- Listar mensagens
- Apagar mensagens
- Abrir mensagem
- Encaminhar mensagem
- Responder Mensagem

Desenvolva também um cliente que utilize o servidor através de chamadas às funcionalidades implementadas. Ao conectar, o usuário deve informar seu nome. Esta será a forma de identificação. Não é necessário preocupar-se com autenticação. As mensagens podem ser armazenadas em um simples arquivo texto. Cada mensagem deve conter, pelo menos, os seguintes campos:
- Remetente
- Destinatário
- Assunto
- Corpo

Observações:

1. As aplicações cliente e servidor devem executar facilmente em um computador, sem a necessidade de instalação de grandes pacotes de desenvolvimento. Não serão aceitas aplicações executando na web.

2. Deve ser anexado juntamente com o código, um documento em modo texto(README) contendo as informações necessárias para a instalação e testes da aplicação.

3. Utilize os métodos HTTP de acordo com o que é especificado pelo modelo REST.

4. Não devem ser utilizadas frameworks no desenvolvimento do servidor que ocultem detalhes do modelo REST. Afinal, a proposta principal é que vocês entendam como esse modelo funciona. Utilize uma biblioteca semelhante a apresentada na videoaula(JAX-WS).

5. No desenvolvimento do cliente, podem ser utilizadas quaisquer ferramentas e frameworks disponíveis.# WebService-Email
