/**
 * Componente: CalculatingProfile
 * Tela de transição calculando perfil (2 a 3 segundos) com animação artesanal
 */
const CalculatingProfile = {
  render(container, onComplete) {
    container.innerHTML = `
      <section class="quiz-card calculating-card fade-in" aria-live="polite">
        <div class="calculating-visual">
          <div class="embroidery-hoop-loader">
            <div class="hoop-rim"></div>
            <div class="hoop-fabric">
              <svg class="stitching-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Linha sendo tecida -->
                <path class="stitch-path" d="M 20 60 Q 40 20 60 60 T 100 60" stroke="#C0583E" stroke-width="4" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="200" />
                <!-- Pontos em relevo -->
                <circle class="stitch-dot dot-1" cx="30" cy="45" r="5" fill="#D4A373" />
                <circle class="stitch-dot dot-2" cx="60" cy="60" r="6" fill="#C0583E" />
                <circle class="stitch-dot dot-3" cx="90" cy="45" r="5" fill="#50705E" />
              </svg>
              <div class="needle-pointer">
                <span class="needle-metal">🪡</span>
              </div>
            </div>
          </div>
        </div>

        <h2 class="calculating-title">Calculando seu perfil... ✨</h2>
        <p class="calculating-text">
          Estamos juntando suas respostas para descobrir qual estilo de bordadeira combina mais com você.
        </p>

        <div class="calculating-status-tags">
          <span class="cal-tag active">Analisando estilo de criação...</span>
          <span class="cal-tag">Identificando sua conexão...</span>
          <span class="cal-tag">Preparando seu resultado...</span>
        </div>
      </section>
    `;

    // Ciclo de status sutil
    const tags = container.querySelectorAll('.cal-tag');
    setTimeout(() => {
      if (tags[1]) {
        tags[0].classList.remove('active');
        tags[1].classList.add('active');
      }
    }, 900);
    setTimeout(() => {
      if (tags[2]) {
        tags[1].classList.remove('active');
        tags[2].classList.add('active');
      }
    }, 1800);

    // Conclusão em 2.5 segundos
    setTimeout(() => {
      onComplete();
    }, 2500);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalculatingProfile;
}
if (typeof window !== 'undefined') {
  window.CalculatingProfile = CalculatingProfile;
}
