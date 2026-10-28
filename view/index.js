function atualizarUmidade() {
    fetch('/api/umidade')
        .then(response => response.json())
        .then(data => {
            document.getElementById('umidade').innerText = data.umidade;
        })
        .catch(erro => console.error('Erro ao buscar dados do sensor:', erro));
}

// Atualiza imediatamente ao carregar a página
atualizarUmidade();

// Executa a função a cada 2000 ms (2 segundos)
setInterval(atualizarUmidade, 2000);