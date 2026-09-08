/**
 * Componente: QuizIntro
 * Nova Página Inicial de Alta Conversão
 * Paleta: Branco, Rosa, Roxo
 */
const QuizIntro = {
  render(container, onStart) {
    container.innerHTML = `
      <section class="quiz-card intro-card-new-palette fade-in-up" aria-label="Apresentação do Bordado Russo">
        
        <!-- 1. Headline Superior -->
        <div class="intro-headline-banner">
          <h2 class="intro-headline-text">
            Bordado Russo é a maior tendência do artesanato de 2026 para acalmar e relaxar o corpo e a mente
          </h2>
        </div>

        <!-- 2. Título: TECNICA DE BORDADO RUSSO (escrita em branco e quadrado rosa de fundo) -->
        <div class="intro-title-box-wrapper">
          <div class="tag-tecnica-rosa">
            <span class="tag-tecnica-text">TÉCNICA DE BORDADO RUSSO</span>
          </div>
        </div>

        <!-- 3. Subtítulo com Destaques Visuais -->
        <p class="intro-main-subtitle-v2">
          Descubra um jeito simples, <span class="highlight-pill highlight-pink">barato e fácil</span> de começar a fazer peças lindas de bordado russo de casa mesmo que nunca tenha feito nada parecido antes, <span class="highlight-pill highlight-purple">relaxe seu corpo e sua mente</span> e ganhe até <span class="highlight-pill highlight-accent">R$3.420,00 por mês</span> começando ainda hoje.
        </p>

        <!-- 4. Mockup de Imagem em 9:16 -->
        <div class="intro-mockup-wrapper">
          <div class="mockup-frame-9-16">
            <img 
              src="/assets/images/helena-martins-9-16.jpg" 
              alt="Helena Martins - Especialista em Bordado Russo" 
              class="mockup-img-9-16" 
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="571"
              height="1024"
            />
          </div>
        </div>

        <!-- 5. Texto Auxiliar e Subtexto Abaixo da Imagem -->
        <div class="intro-aux-text-box">
          <p class="intro-aux-text">
            E o melhor? Eu vou te ensinar o passo a passo pra você também achar paz e refúgio no bordado. Sem precisar investir muito ou depender dos outros.
          </p>
          <p class="intro-subaux-text">
            Clique no botão abaixo para ter um plano personalizado pra você!
          </p>
        </div>

        <!-- 6. CTA Principal -->
        <div class="intro-cta-box-v2">
          <button type="button" class="btn-cta-start-v2" id="btn-start-quiz">
            <span class="btn-sparkle">✨</span>
            <span class="btn-text">QUERO PERSONALIZAR MEU PLANO</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>

      </section>
    `;

    const startBtn = container.querySelector('#btn-start-quiz');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const card = container.querySelector('.quiz-card');
        if (card) {
          card.classList.add('fade-out-down');
        }
        setTimeout(() => {
          onStart();
        }, 180);
      });
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizIntro;
}
if (typeof window !== 'undefined') {
  window.QuizIntro = QuizIntro;
}
