/**
 * Componente: CheckoutModal
 * Modal ágil e delicado para registrar o contato e confirmar a escolha do kit
 */
const CheckoutModal = {
  render(container, selectedOffer, onConfirmOrder) {
    const modalEl = document.createElement('div');
    modalEl.id = 'checkout-modal-overlay';
    modalEl.className = 'modal-backdrop fade-in';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Confirmação do Pedido');

    modalEl.innerHTML = `
      <div class="modal-card modal-checkout-card slide-up">
        <button type="button" class="modal-close-btn" id="checkout-close-x" aria-label="Fechar">✕</button>

        <div class="checkout-header">
          <div class="checkout-pill">🧵 ATELIÊ DOS FIOS • ACESSO IMEDIATO</div>
          <h3 class="checkout-title">Para onde enviamos seu acesso?</h3>
          <p class="checkout-subtitle">
            Você está garantindo o <strong>${selectedOffer.kitName}</strong> por apenas <strong>${selectedOffer.price}</strong>.
          </p>
        </div>

        <form id="checkout-form" class="checkout-form" novalidate>
          <div class="form-group">
            <label for="order-name" class="form-label">Seu Nome</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input 
                type="text" 
                id="order-name" 
                name="name" 
                class="form-input" 
                placeholder="Como podemos te chamar?" 
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="order-contact" class="form-label">WhatsApp ou E-mail</label>
              <span class="contact-type-tag" id="order-contact-tag" style="display: none;"></span>
            </div>
            <div class="input-wrapper">
              <span class="input-icon" id="order-contact-icon">📱</span>
              <input 
                type="text" 
                id="order-contact" 
                name="contact" 
                class="form-input" 
                placeholder="Seu WhatsApp com DDD ou e-mail" 
                required 
              />
            </div>
          </div>

          <div class="form-feedback" id="order-feedback" style="display: none;"></div>

          <div class="order-summary-box">
            <div class="summary-row">
              <span>Item selecionado:</span>
              <strong>${selectedOffer.kitName}</strong>
            </div>
            <div class="summary-row total-row">
              <span>Total a pagar:</span>
              <strong class="total-price">${selectedOffer.price}</strong>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-large btn-finish-order" id="btn-finish-order">
            <span class="btn-text">Continuar para o Pagamento Seguro</span>
            <span class="btn-arrow">→</span>
          </button>

          <p class="checkout-security-note">
            🔒 Ambiente seguro • Acesso liberado imediatamente após a confirmação
          </p>
        </form>
      </div>
    `;

    container.appendChild(modalEl);

    const closeModal = () => {
      modalEl.classList.remove('fade-in');
      modalEl.classList.add('fade-out');
      setTimeout(() => {
        if (modalEl.parentNode) modalEl.parentNode.removeChild(modalEl);
      }, 200);
    };

    modalEl.querySelector('#checkout-close-x').addEventListener('click', closeModal);

    const contactInput = modalEl.querySelector('#order-contact');
    const contactTag = modalEl.querySelector('#order-contact-tag');
    const contactIcon = modalEl.querySelector('#order-contact-icon');
    const nameInput = modalEl.querySelector('#order-name');
    const feedback = modalEl.querySelector('#order-feedback');
    const form = modalEl.querySelector('#checkout-form');
    const finishBtn = modalEl.querySelector('#btn-finish-order');

    contactInput.addEventListener('input', () => {
      const val = contactInput.value.trim();
      const detected = window.validationLib.detectContactType(val);

      if (detected === 'email') {
        contactTag.style.display = 'inline-flex';
        contactTag.className = 'contact-type-tag tag-email';
        contactTag.textContent = 'E-mail detectado ✉️';
        contactIcon.textContent = '✉️';
      } else if (detected === 'whatsapp') {
        contactTag.style.display = 'inline-flex';
        contactTag.className = 'contact-type-tag tag-whatsapp';
        contactTag.textContent = 'WhatsApp detectado 💬';
        contactIcon.textContent = '💬';

        const digits = val.replace(/\D/g, '');
        if (digits.length >= 10 && !val.includes('(')) {
          contactInput.value = window.validationLib.formatPhone(val);
        }
      } else {
        contactTag.style.display = 'none';
        contactIcon.textContent = '📱';
      }

      feedback.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameVal = window.validationLib.validateName(nameInput.value);
      if (!nameVal.valid) {
        feedback.textContent = nameVal.message;
        feedback.style.display = 'block';
        nameInput.focus();
        return;
      }

      const contactVal = window.validationLib.validateContact(contactInput.value);
      if (!contactVal.valid) {
        feedback.textContent = contactVal.message;
        feedback.style.display = 'block';
        contactInput.focus();
        return;
      }

      finishBtn.disabled = true;
      finishBtn.querySelector('.btn-text').textContent = 'Gerando seu acesso seguro... ✨';

      try {
        await onConfirmOrder({
          name: nameVal.value,
          contact: contactVal.value,
          contactType: contactVal.type,
          offer: selectedOffer
        });
        closeModal();
      } catch (err) {
        feedback.textContent = 'Ocorreu um erro ao processar. Tente novamente em alguns segundos. 💛';
        feedback.style.display = 'block';
        finishBtn.disabled = false;
        finishBtn.querySelector('.btn-text').textContent = 'Continuar para o Pagamento Seguro';
      }
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CheckoutModal;
}
if (typeof window !== 'undefined') {
  window.CheckoutModal = CheckoutModal;
}
