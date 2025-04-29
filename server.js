const express = require('express');     // Estrutura expressa de servidor web
const cors = require('cors');   // Compartilhamento de Recursos Cross-Origin
const bodyParser = require('body-parser');  //  Middleware para analisar órgãos de solicitação
const package = require('./package.json');  // Informações sobre o pacote

const port = process.env.port || process.env.PORT || 5000;  // Porta para o servidor ouvir
const apiRoot = '/api';     // Caminho raiz da API

const app = express();  // Cria uma instância de Express
//configure app
app.use(bodyParser.urlencoded({ extended: true }));     // Middleware para analisar corpos codificados por URL
app.use(bodyParser.json());     // Middleware para analisar corpos JSON
app.use(cors({ origin: /http:\/\/localhost/ }));    // Ative os CORs para solicitações de localhost
// app.options('*', cors());

//  Nosso banco de dados simples

const db = {   // Banco de dados simples na memória para fins de demonstração
    'roberto': {     // Usuário de exemplo
        'user': 'roberto',  
        'currency': 'EURO', 
        'balance': 100,
        'description': 'Uma conta simples',
        'transactions': []
    }
}

// Configurando rotas 
const router = express.Router();  // Crie uma nova instância do roteador
router.get('/', (req, res) => {   // Root raiz
   res.send(`${package.description} - v${package.version}`);  // Envia a descrição do pacote e versão
});


router.get('/accounts/:users', (req, res) => {  // Rota para obter informações da conta para um usuário
    const user = req.params.users; // Obtém o nome de usuário dos parâmetros da solicitação
    const account = db[user];   // Procura o usuário no banco de dados

    if (!account) {
        return res
            .status(404)
            .json({error: 'User does not exist'});
    }
    return res.json(account);

});


// Registre todas as nossas rotas
app.use(apiRoot, router);   //  Usa o roteador para todas as rotas sob api-root

app.listen(port, () => {    // Inicia o servidor e ouve a porta especificada
    console.log('Server up!!');
});
