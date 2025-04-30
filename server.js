const express = require('express');  // Estrutura de um servidor Express
const cors = require('cors');   // Compartilhamento de Recursos Cross-Origin
const bodyParser = require('body-parser');  //  Middleware para analisar órgãos de solicitação
const package = require('./package.json');  // Informações sobre o pacote

const port = process.env.port || process.env.PORT || 5000;  // Porta para o servidor ouvir
const apiRoot = '/api';  // Caminho raiz da API

const app = express();  // Cria uma instância de Express
//configure app
app.use(bodyParser.urlencoded({ extended: true }));     // Middleware para analisar corpos codificados por URL
app.use(bodyParser.json());     // Middleware para analisar corpos JSON
app.use(cors({ origin: /http:\/\/localhost/ }));    // Ative os CORs para solicitações de localhost
// app.options('*', cors());

//  Nosso banco de dados simples

const db = {   // Banco de dados simples na memória para fins de demonstração
    'roberto': {     // Usuário de exemplo
        'usuário': 'roberto',  
        'moeda': 'EURO', 
        'balanço': 100,
        'descrição': 'Uma conta simples',
        'transações': []
    }
}

// Configurando rotas 
const router = express.Router();  // Crie uma nova instância do roteador
router.get('/', (req, res) => {   // Root raiz
   res.send(`${package.description} - v${package.version}`) // Envia a descrição do pacote e versão
});


router.get('/accounts/:users', (req, res) => {  // Rota para obter informações da conta para um usuário
    const user = req.params.users; // Obtém o nome de usuário dos parâmetros da solicitação
    const account = db[user];   // Procura o usuário no banco de dados

    if (!account) {
        return res
                .status(404)
                .json({error: 'O usuário não existe'});  // Retorna erro 404 se a conta não for encontrada
    }
    return res.json(account)

});

router.post('/accounts', (req, res) => {  // Rota para criar uma nova conta
    const body = req.body;

    // Validando os valores Solicitados
    if (!body.user || !body.currency) {
        return res
                .status(400)
                .json({error: 'O usuário e a moeda são obrigatórios'});

    }

    // verificando se a conta não existe
    if (db[body.user]) {
        return res
                .status(400)
                .json({error: 'A conta já existe'});
    }

    // balanco 
    let balance = body.balance;
    if (balance && typeof(balance) !== 'number') {
        balance = parseFloat(balance);  // Converte o saldo para um número de ponto flutuante
        if (isNaN(balance)) { // Verifica se o saldo é um número
            return res
                    .status(400)
                    .json({error: 'O saldo deve ser um número'});  // Retorna erro 400 se o saldo não for um número
        }
    }
    // Agora já podemos criar uma nova conta
    const account = {
        user: body.user,
        currency: body.currency, 
        description: body.description || `${body.user}'s account`,
        balance: balance || 0,
        transactions: []
    };

    db[account.user] = account;  // Adiciona a nova conta ao banco de dados

    // Retorna a conta criada
    return res
            .status(201)
            .json(account); 
    
});
// Registre todas as nossas rotas
app.use(apiRoot, router);   //  Usa o roteador para todas as rotas sob api-root

app.listen(port, () => {    // Inicia o servidor e ouve a porta especificada
    console.log('Server up!!');
});
