const http = require('http');
const fs = require('fs');
const five = require('johnny-five');
const { EtherPortClient } = require('etherport-client');

// ==========================================
// VARIÁVEIS GLOBAIS E ESTADO
// ==========================================
let vccSensor;
let sensorUmidade;
let valorUmidade = 0;

let ledRed, ledYellow, ledGreen, led0;

// ==========================================
// CONEXÃO COM ESP8266 (JOHNNY-FIVE)
// ==========================================
const arduino = new five.Board({
    port: new EtherPortClient({
        host: "10.83.202.53", // IP do ESP8266
        port: 3030
    }),
    timeout: 20000
});

arduino.on('error', (err) => {
    console.log(">> Erro na conexão com o ESP8266:", err.message);
});

arduino.on('ready', () => {
    console.log(">> ESP8266 Conectado e Pronto!");

    // Instâncias dos LEDs
    led0 = new five.Led(2);       // LED onboard (GPIO 2)
    ledRed = new five.Led(16);    // Pino D0 (GPIO 16)
    ledYellow = new five.Led(5);   // Pino D1 (GPIO 5)
    ledGreen = new five.Led(4);    // Pino D2 (GPIO 4)

    ledRed.off();
    ledYellow.off();
    ledGreen.off();

    // Alimentação controlada no pino D5 (GPIO 14)
    vccSensor = new five.Pin(14);
    vccSensor.low();

    // Objeto do Sensor Analógico no pino A0
    sensorUmidade = new five.Sensor({
        pin: "A0",
        freq: 100 // Atualiza a leitura interna do Johnny-Five a cada 100ms
    });

    // Ciclo de leitura a cada 2 segundos
    setInterval(fazerLeituraUmidade, 2000);
});

// ==========================================
// LEITURA DO SENSOR E CONTROLE DOS LEDS
// ==========================================
function fazerLeituraUmidade() {
    if (!vccSensor || !sensorUmidade) return;

    // 1. Liga a energia do sensor no pino D5
    vccSensor.high();

    // 2. Aguarda 250ms para estabilizar a tensão e receber o pacote via Wi-Fi
    setTimeout(() => {
        const valorBruto = sensorUmidade.value || 0;

        // 3. Desliga a alimentação para evitar corrosão
        vccSensor.low();

        // FILTRO: Se o valor for menor que 100, é leitura do pino desenergizado. Ignora!
        if (valorBruto < 100) {
            console.log(`>> Leitura de transição ignorada (Valor bruto: ${valorBruto})`);
            return;
        }

        console.log(`>> Valor bruto A0: ${valorBruto}`);

        // CALIBRAÇÃO:
        const maxSeco = 1024;
        const minAgua = 350;

        let calculado = Math.round(((maxSeco - valorBruto) / (maxSeco - minAgua)) * 100);

        // Limita o resultado entre 0% e 100%
        valorUmidade = Math.max(0, Math.min(100, calculado));

        console.log(`>> Umidade Processada: ${valorUmidade}%`);

        // 4. Atualiza os LEDs
        atualizarLeds(valorUmidade);
    }, 250);
}

function atualizarLeds(umidade) {
    if (umidade < 30) {
        ledRed.on();
        ledYellow.off();
        ledGreen.off();
    } else if (umidade <= 60) {
        ledRed.off();
        ledYellow.on();
        ledGreen.off();
    } else {
        ledRed.off();
        ledYellow.off();
        ledGreen.on();
    }
}

// ==========================================
// SERVIDOR HTTP
// ==========================================
function servidor(req, res) {
    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync('view/index.html'));

    } else if (url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(fs.readFileSync('view/styles.css'));

    } else if (url === '/index.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(fs.readFileSync('view/index.js'));

    } else if (url === '/led0') {
        if (led0) led0.toggle();
        res.writeHead(302, { 'Location': '/' });
        res.end();

    } else if (url === '/api/umidade') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ umidade: valorUmidade }));

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end("<h1>Erro 404 - Página não encontrada</h1>");
    }
}

const server = http.createServer(servidor);

server.listen(3000, () => {
    console.log("Servidor On-line! Acesse: http://localhost:3000");
});