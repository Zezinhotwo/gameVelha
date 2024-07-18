const game = (function() {
  const tabuleiro = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const jogadores = ["X", "Y"];
  let jogadorAtual = 0;

  function vencedor(marcar) {
    // Verificação horizontal, vertical e diagonal
    const linhas = marcar.concat(
      [0, 1, 2].map(i => [marcar[0][i], marcar[1][i], marcar[2][i]]),
      [[marcar[0][0], marcar[1][1], marcar[2][2]], [marcar[0][2], marcar[1][1], marcar[2][0]]]
    );

    for (const linha of linhas) {
      if (linha.every(cell => cell === "X")) return "X";
      if (linha.every(cell => cell === "Y")) return "Y";
    }

    // Verificação de empate
    if (marcar.flat().every(cell => cell !== null)) return "empate";

    return null;
  }

  function jogar(linha, coluna) {
    if (tabuleiro[linha][coluna] !== null) {
      console.log("Posição já marcada!");
      return null;
    }

    tabuleiro[linha][coluna] = jogadores[jogadorAtual];
    const resultado = vencedor(tabuleiro);

    jogadorAtual = (jogadorAtual + 1) % 2; // Alterna jogador

    return resultado;
  }

  return { tabuleiro, jogar };
})();

document.getElementById('tabuleiro').addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('item')) {
    const index = target.getAttribute('data-index');
    const [linha, coluna] = index.split(',').map(Number);

    const resultado = game.jogar(linha, coluna);
    if (resultado) {
      alert(`${resultado} ganhou!`);
      location.reload(); // Reinicia o jogo
    } else {
      target.textContent = game.tabuleiro[linha][coluna];
    }
  }
});
