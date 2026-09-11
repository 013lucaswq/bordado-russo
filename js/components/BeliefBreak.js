/**
 * Componente: BeliefBreak
 * Página pós-quiz para quebra de crença:
 * "Análise concluída / Mas precisa ter experiência com artesanato? NÃO!"
 * Paleta: Rosa e Branco
 */
const BeliefBreak = {
  render(container, onContinue) {
    container.innerHTML = `
      <section class="quiz-card belief-break-card fade-in-up" aria-label="Quebra de Crença - Bordado Russo">
        
        <!-- 1. Headline: Análise concluída -->
        <div class="belief-headline-wrapper">
          <div class="belief-headline-pill">
            <span class="belief-check-icon">✓</span>
            <span class="belief-headline-text">Análise concluída</span>
          </div>
        </div>

        <!-- 2. Título 1 -->
        <h2 class="belief-title">
          Mas precisa ter experiência com artesanato?
        </h2>

        <!-- 3. Título 2: NÃO! (em rosa e letra grande) -->
        <div class="belief-no-wrapper">
          <span class="belief-title-no">NÃO!</span>
        </div>

        <!-- 4. Subtítulo explicativo -->
        <p class="belief-subtitle">
          O método com <strong>moldes</strong> é simples e rápido. Com apenas uma <strong>caneta mágica</strong>, em poucas horas você já cria peças lindas — mesmo que nunca tenha bordado antes.
        </p>

        <!-- 5. Mockup de imagem em 9:16 (Sereia com caneta mágica) -->
        <div class="belief-mockup-wrapper">
          <div class="belief-mockup-frame-9-16">
            <img 
              src="/assets/images/quebra-crenca-sereia-9-16.webp" 
              alt="Peça de bordado russo com caneta mágica feita em poucas horas" 
              class="belief-mockup-img" 
              loading="lazy"
              decoding="async"
              width="576"
              height="1024"
            />
            <div class="belief-floating-badge">
              <span class="badge-icon">🪄</span>
              <span>Feito com a Caneta Mágica</span>
            </div>
          </div>
        </div>

        <!-- 6. Texto auxiliar abaixo da imagem -->
        <div class="belief-aux-wrapper">
          <p class="belief-aux-text">
            ✨ Peças como essa ficam prontas em <strong>poucas horas</strong>.
          </p>
        </div>

        <!-- 7. CTA: CONTINUAR -->
        <div class="belief-cta-wrapper">
          <button type="button" class="btn-belief-continue" id="btn-belief-continue">
            <span class="btn-text">CONTINUAR</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>

      </section>
    `;

    const continueBtn = container.querySelector('#btn-belief-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const card = container.querySelector('.quiz-card');
        if (card) {
          card.classList.add('fade-out-down');
        }
        setTimeout(() => {
          onContinue();
        }, 180);
      });
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BeliefBreak;
}
if (typeof window !== 'undefined') {
  window.BeliefBreak = BeliefBreak;
}
