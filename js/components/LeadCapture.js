/**
 * Componente: LeadCapture
 * Formulário de alta conversão pós-resultado para captura de contato
 */
const LeadCapture = {
  renderHtml() {
    return `
      <div class="lead-capture-card" aria-label="Formulário para receber a prévia">
        <div class="capture-header">
          <span class="capture-pill">💌 Conteúdo Exclusivo</span>
          <h2 class="capture-title">Quer receber uma prévia exclusiva da coleção feita pro seu perfil?</h2>
          <p class="capture-subtitle">
            Me manda seu nome e WhatsApp (ou e-mail) que eu te envio fotos reais das peças e novidades em primeira mão.
          </p>
        </div>

        <form id="lead-form" class="lead-form" novalidate>
          <div class="form-group">
            <label for="lead-name" class="form-label">Nome</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input 
                type="text" 
                id="lead-name" 
                name="name" 
                class="form-input" 
                placeholder="Seu nome" 
                autocomplete="name" 
                required
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label for="lead-contact" class="form-label">Contato</label>
              <span class="contact-type-tag" id="contact-type-badge" style="display: none;"></span>
            </div>
            <div class="input-wrapper">
              <span class="input-icon" id="contact-icon">📱</span>
              <input 
                type="text" 
                id="lead-contact" 
                name="contact" 
                class="form-input" 
                placeholder="Seu WhatsApp ou e-mail" 
                autocomplete="tel" 
                required
              />
            </div>
          </div>

          <div class="form-feedback" id="form-feedback" role="alert" style="display: none;"></div>

          <button type="submit" class="btn btn-primary btn-large btn-capture" id="btn-submit-lead">
            <span class="btn-text">Quero Ver a Prévia</span>
            <span class="btn-icon">💌</span>
          </button>

          <p class="capture-no-spam">
            Sem spam, só coisa bonita de bordado 🧵
          </p>

          <div class="lgpd-consent">
            <label class="consent-label">
              <span class="consent-text">
                Ao continuar, você concorda em receber novidades e conteúdos do Ateliê dos Fios pelo contato informado. Você pode sair da lista quando quiser.
              </span>
            </label>
          </div>
        </form>
      </div>
    `;
  },

  attachEvents(container, onSubmit) {
    const form = container.querySelector('#lead-form');
    const nameInput = container.querySelector('#lead-name');
    const contactInput = container.querySelector('#lead-contact');
    const contactBadge = container.querySelector('#contact-type-badge');
    const contactIcon = container.querySelector('#contact-icon');
    const feedback = container.querySelector('#form-feedback');
    const submitBtn = container.querySelector('#btn-submit-lead');

    if (!form) return;

    // Detecção dinâmica de tipo de contato em tempo real
    contactInput.addEventListener('input', () => {
      const val = contactInput.value.trim();
      const detected = window.validationLib.detectContactType(val);

      if (detected === 'email') {
        contactBadge.style.display = 'inline-flex';
        contactBadge.className = 'contact-type-tag tag-email';
        contactBadge.textContent = 'E-mail detectado ✉️';
        contactIcon.textContent = '✉️';
      } else if (detected === 'whatsapp') {
        contactBadge.style.display = 'inline-flex';
        contactBadge.className = 'contact-type-tag tag-whatsapp';
        contactBadge.textContent = 'WhatsApp detectado 💬';
        contactIcon.textContent = '💬';

        // Auto-formatação amigável se forem dígitos
        const digits = val.replace(/\D/g, '');
        if (digits.length >= 10 && !val.includes('(')) {
          contactInput.value = window.validationLib.formatPhone(val);
        }
      } else {
        contactBadge.style.display = 'none';
        contactIcon.textContent = '📱';
      }

      // Limpar erro ao digitar
      feedback.style.display = 'none';
      feedback.textContent = '';
      contactInput.classList.remove('input-error');
    });

    nameInput.addEventListener('input', () => {
      feedback.style.display = 'none';
      feedback.textContent = '';
      nameInput.classList.remove('input-error');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validar Nome
      const nameValidation = window.validationLib.validateName(nameInput.value);
      if (!nameValidation.valid) {
        feedback.textContent = nameValidation.message;
        feedback.style.display = 'block';
        nameInput.classList.add('input-error');
        nameInput.focus();
        return;
      }

      // Validar Contato
      const contactValidation = window.validationLib.validateContact(contactInput.value);
      if (!contactValidation.valid) {
        feedback.textContent = contactValidation.message;
        feedback.style.display = 'block';
        contactInput.classList.add('input-error');
        contactInput.focus();
        return;
      }

      // Estado de envio
      submitBtn.disabled = true;
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'Preparando sua prévia... ✨';

      try {
        await onSubmit({
          name: nameValidation.value,
          contact: contactValidation.value,
          contactType: contactValidation.type,
          consent: true
        });
      } catch (err) {
        feedback.textContent = 'Ops! Ocorreu um probleminha ao conectar. Tente novamente em alguns instantes. 💛';
        feedback.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
      }
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LeadCapture;
}
if (typeof window !== 'undefined') {
  window.LeadCapture = LeadCapture;
}
