/**
 * Componente: AnswerCard
 * Cartão de alternativa tátil, suave, com suporte a texto principal e subtítulo/descrição
 */
const AnswerCard = {
  render(option, isSelected = false) {
    const hasDesc = Boolean(option.desc);

    return `
      <div 
        class="answer-card ${isSelected ? 'selected' : ''} ${hasDesc ? 'has-desc' : ''}" 
        role="button" 
        tabindex="0" 
        data-letter="${option.letter}"
        data-tag="${option.tag}"
        aria-pressed="${isSelected}"
      >
        <div class="answer-badge">
          <span class="answer-letter">${option.letter}</span>
        </div>
        <div class="answer-content">
          <span class="answer-text">${option.text}</span>
          ${hasDesc ? `<span class="answer-desc">${option.desc}</span>` : ''}
        </div>
        <div class="answer-selection-check" aria-hidden="true">
          <span class="check-icon">✓</span>
        </div>
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnswerCard;
}
if (typeof window !== 'undefined') {
  window.AnswerCard = AnswerCard;
}
