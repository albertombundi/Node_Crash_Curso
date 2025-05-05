const http = require ('http');

// Criar um servidor objeto
http.createServer((req, res) => {
    // escrever a resposta
    res.write('Hello, World!');
    res.end()
    
}).listen(5000, () => console.log('Server running...'));
