const http = require('http');
const fs = require('fs');
const five = require('johnny-five');

// Instancia a placa Arduino conectada via USB
const arduino = new five.Board();

let led4, led5;

// Executado quando o Arduino é reconhecido e está pronto
arduino.on('ready', function() {
    console.log(">> Arduino Conectado e Pronto!");

    // Inicializa os LEDs nos pinos 4 e 5
    led4 = new five.Led(4);
    led5 = new five.Led(5);
});

// Função do Servidor HTTP
function servidor(req, res) {
    const url = req.url;

    if (url === '/') {
        // Retorna a página web
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync('view/index.html'));

    } else if (url === '/led4') {
        // Alterna o estado do LED 4 (Liga/Desliga)
        if (led4) led4.toggle();
        res.writeHead(302, { 'Location': '/' });
        res.end();

    } else if (url === '/led5') {
        // Alterna o estado do LED 5 (Liga/Desliga)
        if (led5) led5.toggle();
        res.writeHead(302, { 'Location': '/' });
        res.end();

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end("<h1>Página não encontrada</h1>");
    }
}

// Inicia o servidor na porta 3000
const server = http.createServer(servidor);
server.listen(3000, function() {
    console.log("Servidor rodando em: http://localhost:3000");
});