# BAG IT UP
Bag It Up é um aplicativo que auxilia o usuário a montar a sua mala para viagens de forma otimizada. O aplicativo oferece uma interface intuitiva e fácil de usar, com recursos para economizar espaço e sugestões de itens a serem levados de acordo com o destino e clima. O aplicativo é voltado para viajantes experientes e iniciantes que buscam praticidade na hora de montar suas malas. O objetivo é garantir que o usuário não esqueça nenhum item essencial e possa viajar com tranquilidade.

## COMO UTILIZAR:
- Clone o projeto em sua máquina
- Certifique-se de que possui o Python instalado

### API:
- Pelo terminal, navegue até a pasta /apps/api
- Execute o comando `pip install -r requirements.txt`
- Para rodar a API localmente: `uvicorn main:app --reload `

Isso iniciará o servidor de desenvolvimento do Uvicorn e deixará a API disponível em http://localhost:8000.
Para acessar a documentação da API (Swagger UI), abra um navegador e navegue até http://localhost:8000/docs. Lá você pode explorar os endpoints da API, enviar solicitações de teste e visualizar as respostas.

### FRONT
- Pelo terminal, navegue até a pasta /apps/app
- Execute o comando `npm install` para instalar as dependências do projeto
- Para rodar o front-end localmente: `npm start`

Isso iniciará o servidor de desenvolvimento. A aplicação será automaticamente aberta em http://localhost:3000.
Já que o foco do site no momento é para dispositivos mobile, é recomendado que ao acessar o site, acesse as ferramentas de desenvolvedor do navegador e altere o dispositivo de visualização para um dispositivo mobile.

### Data Base
![Diagrama do Banco](https://i.imgur.com/A10Awm2.png)
