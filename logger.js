const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    log(msg) {
        // chamando o evento
        this.emit('message', { id: uuid.v4(), msg });
    }
}

//module.exports = Logger; exportando a função para usar noutros arquivos



const logger = new Logger();

logger.on('message', (data) => console.log('Called Listener:', data));

logger.log('Hello World');
logger.log('Hi');
logger.log('Hello');