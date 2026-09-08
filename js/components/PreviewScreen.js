/**
 * Componente: PreviewScreen
 * Tela final acolhedora e personalizada pós-captura com a prévia da coleção
 */
const PreviewScreen = {
  render(container, leadData, profileData, onRestart) {
    const { name, contactType, offer } = leadData;
    const { shortTitle, badge, description, images } = profileData;
    const channelName = contactType === 'whatsapp' ? 'seu WhatsApp' : (contactType === 'email' ? 'seu e-mail' : 'seu contato');
    const kitText = offer ? `${offer.kitName} (${offer.price})` : shortTitle;

    container.innerHTML = `
      <section class="quiz-card preview-card fade-in" aria-label="Prévia personalizada da coleção">
        <div class="preview-success-badge">
          <span class="success-icon">✨</span>
          <span>${offer ? 'Pedido Confirmado com Sucesso!' : 'Prévia liberada com carinho'}</span>
        </div>

        <h1 class="preview-title">
          Prontinho, ${name}! Aqui está sua seleção pensada para o seu perfil 👇
        </h1>

        <div class="preview-profile-tag">
          <span class="profile-icon">🧵</span>
          <span>${offer ? 'Kit Escolhido:' : 'Estilo Selecionado:'} <strong>${kitText}</strong></span>
        </div>

        <p class="preview-intro-text">
          Cada risco e cada aula do Ateliê dos Fios foram pensados para você bordar com calma, encanto e perfeição:
        </p>

        <div class="preview-gallery-grid">
          ${images.map((img, i) => `
            <div class="preview-card-item">
              <div class="preview-img-box">
                <img 
                  src="${img.src}" 
                  alt="${img.alt}" 
                  class="preview-img"
                  loading="lazy"
                  onerror="this.src='/assets/images/about-texture.jpg'"
                />
              </div>
              <div class="preview-item-info">
                <span class="preview-item-pill">Modelo ${i + 1}</span>
                <p class="preview-item-desc">${img.caption}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="preview-notice-box">
          <div class="notice-icon">💌</div>
          <div class="notice-content">
            <h4 class="notice-title">${offer ? 'Acesso e materiais a caminho!' : `Fique atenta ao ${channelName}!`}</h4>
            <p class="notice-text">
              ${offer ? `Enviamos as instruções e o link de acesso aos materiais digitais e bônus diretamente para ${channelName}. Qualquer dúvida, estamos à disposição no suporte! 💛` : `Em breve você recebe um convite especial no ${channelName} pra conhecer a coleção completa e os detalhes artesanais de cada criação. Fica de olho! 💛`}
            </p>
          </div>
        </div>

        <div class="preview-footer-actions">
          <button type="button" class="btn btn-secondary btn-restart" id="btn-restart-quiz">
            <span>Refazer o teste</span>
            <span>↺</span>
          </button>
        </div>
      </section>
    `;

    const restartBtn = container.querySelector('#btn-restart-quiz');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        onRestart();
      });
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PreviewScreen;
}
if (typeof window !== 'undefined') {
  window.PreviewScreen = PreviewScreen;
}
