/**
 * Componente: BeliefBreak2
 * Segunda página de quebra de crença pós-quiz:
 * "O material é caro? Nem um pouco!"
 * Paleta: Rosa e Branco
 */
const BeliefBreak2 = {
  render(container, onContinue) {
    container.innerHTML = `
      <section class="quiz-card belief-break-card belief-break-2-card fade-in-up" aria-label="Quebra de Crença 2 - Material Barato">
        
        <!-- 1. Título: O material é caro? -->
        <h2 class="belief-title">
          O <span class="belief-highlight-word">material</span> é caro?
        </h2>

        <!-- 2. Subtítulo explicativo -->
        <p class="belief-subtitle belief-subtitle-2">
          <strong>Nem um pouco!</strong> Na Shopee ou em loja de armarinhos, o kit sai por <strong>R$&nbsp;20,00</strong>. E o melhor, a maior parte das peças de Bordado Russo é vendida em média por <strong>R$&nbsp;160,00</strong>. Ou seja, é um artesanato com <strong>investimento baixo</strong> para começar, e com um <strong>alto potencial de lucro</strong>.
        </p>

        <!-- 3. Mockup de imagem em 16:9 (Shopee screenshot) -->
        <div class="belief-mockup-wrapper">
          <div class="belief-mockup-frame-16-9 belief-mockup-shopee">
            <img 
              src="/assets/images/quebra-crenca-material.jpg" 
              alt="Kit de Bordado Russo na Shopee por R$21,37" 
              class="belief-mockup-img" 
              loading="lazy"
              decoding="async"
              width="1024"
              height="493"
            />
            <div class="belief-floating-badge belief-badge-price">
              <span class="badge-icon">💰</span>
              <span>Kit a partir de R$&nbsp;20,00</span>
            </div>
          </div>
        </div>

        <!-- 4. Texto auxiliar -->
        <div class="belief-aux-wrapper">
          <p class="belief-aux-text">
            ⚡ Além disso, é o artesanato <strong>mais rápido</strong> de se fazer, conseguindo produzir grandes quantidades em <strong>pouquíssimo tempo</strong>!
          </p>
        </div>

        <!-- 5. CTA: CONTINUAR -->
        <div class="belief-cta-wrapper">
          <button type="button" class="btn-belief-continue" id="btn-belief2-continue">
            <span class="btn-text">CONTINUAR</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>

      </section>
    `;

    const continueBtn = container.querySelector('#btn-belief2-continue');
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
  module.exports = BeliefBreak2;
}
if (typeof window !== 'undefined') {
  window.BeliefBreak2 = BeliefBreak2;
}
