/**
 * Componente: UpgradeModal
 * Pop-up inteligente de Upgrade para o Kit Completo por R$ 27,90
 */
const UpgradeModal = {
  render(container, onAcceptUpgrade, onKeepBasic, onClose) {
    const modalEl = document.createElement('div');
    modalEl.id = 'upgrade-modal-overlay';
    modalEl.className = 'modal-backdrop fade-in';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Oferta especial de upgrade');

    modalEl.innerHTML = `
      <div class="modal-card modal-upgrade-card slide-up">
        <button type="button" class="modal-close-btn" id="modal-close-x" aria-label="Fechar janela">✕</button>

        <div class="upgrade-header">
          <span class="upgrade-badge-pill">⏳ OPORTUNIDADE ÚNICA</span>
          <h3 class="upgrade-modal-title">Espera! Antes de você continuar…</h3>
          <p class="upgrade-modal-subtitle">
            Você estava prestes a pagar <strong>R$ 19,90</strong> no Kit Básico. Que tal levar o <strong>Kit Completo</strong> por apenas <strong>R$ 8 a mais</strong>?
          </p>
        </div>

        <div class="upgrade-deal-box">
          <div class="deal-badge">UPGRADE EXCLUSIVO LIBERADO</div>
          
          <div class="deal-pricing">
            <span class="deal-old-price">De R$ 129,90</span>
            <div class="deal-current-row">
              <span class="deal-price-label">Por apenas:</span>
              <span class="deal-price-val">R$ 27,90</span>
            </div>
            <span class="deal-difference-tag">Economia total de mais de R$ 100 hoje</span>
          </div>

          <div class="deal-benefits-list">
            <div class="deal-benefit-item">
              <span class="benefit-check">✓</span>
              <span><strong>+2.000 Riscos</strong> em vez de apenas 750</span>
            </div>
            <div class="deal-benefit-item">
              <span class="benefit-check">✓</span>
              <span><strong>Acesso Vitalício</strong> (em vez de 1 ano)</span>
            </div>
            <div class="deal-benefit-item">
              <span class="benefit-check">✓</span>
              <span><strong>Todos os 3 Bônus GRÁTIS</strong> (Vídeos + Guia de Vendas + Comunidade)</span>
            </div>
            <div class="deal-benefit-item">
              <span class="benefit-check">✓</span>
              <span><strong>Atualizações mensais</strong> com novos riscos para sempre</span>
            </div>
          </div>
        </div>

        <div class="upgrade-actions">
          <a href="${(window.salesData && window.salesData.upgradePopup && window.salesData.upgradePopup.checkoutUrl) ? window.salesData.upgradePopup.checkoutUrl : 'https://checkout.wiven.com.br/checkout/cmts2lneu0cc701pxtsli00dr?offer=7VG29WR'}" class="btn btn-primary btn-large btn-upgrade-accept" id="btn-accept-upgrade">
            <span>✨ Sim! Quero o Kit Completo por R$ 27,90</span>
          </a>
          
          <a href="${(window.salesData && window.salesData.offers && window.salesData.offers.basico && window.salesData.offers.basico.checkoutUrl) ? window.salesData.offers.basico.checkoutUrl : 'https://checkout.wiven.com.br/checkout/cmts2lneu0cc701pxtsli00dr?offer=L55LJDK'}" class="btn-upgrade-decline" id="btn-keep-basic">
            Não, obrigado. Prefiro continuar com o Kit Básico por R$ 19,90 →
          </a>
        </div>
      </div>
    `;

    container.appendChild(modalEl);

    // Fechar modal
    const closeModal = () => {
      modalEl.classList.remove('fade-in');
      modalEl.classList.add('fade-out');
      setTimeout(() => {
        if (modalEl.parentNode) {
          modalEl.parentNode.removeChild(modalEl);
        }
        if (onClose) onClose();
      }, 200);
    };

    modalEl.querySelector('#modal-close-x').addEventListener('click', closeModal);
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal();
    });

    // Aceitar upgrade por R$ 27,90
    modalEl.querySelector('#btn-accept-upgrade').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      onAcceptUpgrade();
    });

    // Manter básico por R$ 19,90
    modalEl.querySelector('#btn-keep-basic').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      onKeepBasic();
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UpgradeModal;
}
if (typeof window !== 'undefined') {
  window.UpgradeModal = UpgradeModal;
}
