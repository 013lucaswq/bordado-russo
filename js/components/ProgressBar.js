/**
 * Componente: ProgressBar
 * Barra de progresso com indicador "1 de 6" e microcopys conversacionais delicadas
 */
const ProgressBar = {
  getMicrocopy(questionNumber) {
    const messages = {
      1: "Vamos começar 💛",
      2: "Descobrindo seu estilo...",
      3: "Cada detalhe conta 🌿",
      4: "Mais da metade do caminho! ✨",
      5: "Mais uma e chegamos ao seu resultado ✨",
      6: "Quase lá! Pergunta bônus 💛"
    };
    return messages[questionNumber] || "Quase lá...";
  },

  render(questionNumber, totalQuestions = 6) {
    const progressPercent = Math.round((questionNumber / totalQuestions) * 100);
    const microcopy = this.getMicrocopy(questionNumber);

    return `
      <div class="progress-container" aria-label="Progresso do quiz">
        <div class="progress-header">
          <span class="progress-step-text">
            <strong>${questionNumber} de ${totalQuestions}</strong>
          </span>
          <span class="progress-microcopy">${microcopy}</span>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProgressBar;
}
if (typeof window !== 'undefined') {
  window.ProgressBar = ProgressBar;
}
