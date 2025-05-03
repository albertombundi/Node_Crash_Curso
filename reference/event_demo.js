const EventEmitter = require('events'); // Importa os módulos do events necessários


class MyEmitter extends EventEmitter {} // Cria uma classe que herda de EventEmitter

const myEmitter = new MyEmitter(); // Cria um objeto da classe MyEmitter

myEmitter.on('event', () => console.log('Event fired!')); // Adiciona um listener(ouvinte) para o evento 'event'

// Inicia o evento 'event' 5 vezes
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
