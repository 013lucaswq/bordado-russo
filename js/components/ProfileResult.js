/**
 * Componente: ProfileResult
 * Exibe o resultado emocional do perfil descoberto com imagens temáticas
 */
const ProfileResult = {
  render(container, profileData, leadCaptureHtml) {
    const { title, description, emotionalMicrocopy, quote, images, badge } = profileData;

    container.innerHTML = `
      <section class="quiz-card result-card fade-in" aria-label="Resultado do seu perfil">
        <div class="result-header">
          <div class="result-badge-pill">
            <span class="badge-icon">🧵</span>
            <span>${badge}</span>
          </div>
          <h1 class="result-title">${title}</h1>
          <p class="result-quote">“${quote}”</p>
        </div>

        <div class="result-body">
          <p class="result-description">${description}</p>
          
          <div class="result-microcopy-box">
            <span class="microcopy-sparkle">✨</span>
            <p class="result-microcopy">${emotionalMicrocopy}</p>
          </div>

          <div class="result-gallery-section">
            <h3 class="gallery-title">Um gostinho do seu universo de bordado:</h3>
            <div class="result-gallery-grid">
              ${images.map((img, idx) => `
                <div class="gallery-card">
                  <div class="gallery-img-wrapper">
                    <img 
                      src="${img.src}" 
                      alt="${img.alt}" 
                      class="gallery-image"
                      loading="lazy"
                      onerror="this.src='/assets/images/about-texture.jpg'"
                    />
                  </div>
                  <span class="gallery-caption">${img.caption}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Bloco de Captura de Lead -->
        <div class="lead-capture-anchor" id="lead-capture-section">
          ${leadCaptureHtml}
        </div>
      </section>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProfileResult;
}
if (typeof window !== 'undefined') {
  window.ProfileResult = ProfileResult;
}
