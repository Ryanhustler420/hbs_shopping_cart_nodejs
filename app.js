const http = require ('http');
const {handler, someText} = require ('./routes');

console.log (someText);

const server = http.createServer (handler);

server.listen (3000);
