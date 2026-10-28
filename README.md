# 🚀 Minicurso: Internet das Coisas com JavaScript e Arduino

Este repositório contém o material prático e os códigos-fonte desenvolvidos para o minicurso de **Internet das Coisas (IoT)** utilizando **Node.js**, a biblioteca **Johnny-Five** e **Arduino**.

O objetivo do curso é demonstrar como controlar componentes eletrônicos (como LEDs) a partir de uma aplicação web desenvolvida em JavaScript.

---

## 📁 Estrutura do Repositório

```text
mini-curso-javascript-arduino/
├── MINI_CURSO_CHARLES.pdf    # Slides e apresentação de apoio do minicurso
├── Prj_Inicial/              # Versão inicial da aplicação (servidor Node.js + Johnny-Five)
│   ├── app.js                # Ficheiro principal do servidor
│   ├── package.json          # Dependências do projeto inicial
│   └── view/
│       └── index.html        # Página HTML simples
├── Prj_Aprimorado/           # Versão expandida com interface interativa
│   ├── app.js                # Servidor Node.js integrado
│   ├── package.json          # Dependências do projeto aprimorado
│   └── view/
│       ├── index.html        # Estrutura da interface web
│       ├── index.js          # Lógica do lado do cliente (fetch/requisições)
│       └── styles.css        # Estilização da interface
└── .gitignore                # Ficheiros ignorados pelo Git (node_modules, etc.)
```

---

## 🛠️ Pré-requisitos

### Hardware Necessário
* **1x** Placa Arduino (ex: Arduino UNO)
* **1x** Cabo USB para conexão ao computador
* **1x** LED (qualquer cor)
* **1x** Resistor de **300 Ω** (ou 220 Ω / 330 Ω)
* **1x** Protoboard e fios Jumpers

### Software Necessário
* [Node.js](https://nodejs.org/) (Versão LTS recomendada)
* [Arduino IDE](https://www.arduino.cc/en/software) (Apenas para gravar o firmware *StandardFirmata*)
* Navegador Web (Chrome, Firefox, Edge, etc.)

---

## ⚡ Passo 1: Configuração do Arduino (StandardFirmata)

Para que o Node.js consiga se comunicar com o Arduino através da porta serial/USB, é necessário gravar o firmware **StandardFirmata** na placa:

1. Conecte o Arduino ao computador via cabo USB.
2. Abra a **Arduino IDE**.
3. No menu, vá em: **Ficheiro** > **Exemplos** > **Firmata** > **StandardFirmata**.
4. Selecione a placa correta e a porta COM associada em **Ferramentas**.
5. Clique em **Carregar (Upload)** e aguarde a conclusão da gravação.

> ⚠️ **Nota:** Mantenha a porta serial livre (feche o Monitor Serial da Arduino IDE) antes de rodar a aplicação Node.js.

---

## 🔌 Esquema do Circuito Eletrônico

* **LED (Ânodo / Perna longa):** Conectado ao pino digital (ex: Pino 4 ou 13) através do resistor de 300 Ω.
* **LED (Cátodo / Perna curta):** Conectado ao pino **GND** do Arduino.

---

## 🚀 Passo 2: Executando os Projetos

### 🔹 Projeto Inicial (`Prj_Inicial`)
Versão básica para testar a comunicação entre o Node.js, Johnny-Five e o Arduino.

1. Abra o terminal na pasta do projeto:
   ```bash
   cd Prj_Inicial
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a aplicação:
   ```bash
   node app.js
   ```

---

### 🌟 Projeto Aprimorado (`Prj_Aprimorado`)
Versão completa com servidor web Express e interface estilizada para ligar/desligar o LED via botões no navegador.

1. Navegue até a pasta do projeto aprimorado:
   ```bash
   cd Prj_Aprimorado
   ```
2. Instale as dependências necessárias:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node app.js
   ```
4. Abra o navegador e acesse:
   ```text
   http://localhost:3000
   ```

---

## 🧰 Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/)** — Ambiente de execução JavaScript no backend.
* **[Johnny-Five](https://johnny-five.io/)** — Framework de Robótica e IoT para JavaScript.
* **[Express](https://expressjs.com/)** — Framework web para criação das rotas e servidor HTTP.
* **HTML5 / CSS3 / JavaScript Vanilla** — Construção e estilização da interface frontend.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no âmbito do Minicurso de JavaScript + Arduino.