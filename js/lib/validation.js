/**
 * Biblioteca de Validação e Detecção de Contato - Ateliê dos Fios
 */
const validation = {
  validateName(name) {
    if (!name || typeof name !== 'string') {
      return { valid: false, message: 'Ops! Digite seu nome para continuar. 💛' };
    }
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      return { valid: false, message: 'Por favor, digite seu nome completo ou pelo menos 2 letras. 💛' };
    }
    return { valid: true, value: trimmed };
  },

  detectContactType(contact) {
    if (!contact || typeof contact !== 'string') return null;
    const clean = contact.trim();
    if (clean.includes('@')) {
      return 'email';
    }
    // If has digits and no @, treat as phone/whatsapp
    const digits = clean.replace(/\D/g, '');
    if (digits.length >= 8) {
      return 'whatsapp';
    }
    return null;
  },

  validateContact(contact) {
    if (!contact || typeof contact !== 'string') {
      return { valid: false, message: 'Por favor, informe seu WhatsApp ou e-mail. 💛' };
    }
    const trimmed = contact.trim();
    if (trimmed.length === 0) {
      return { valid: false, message: 'Por favor, informe seu WhatsApp ou e-mail. 💛' };
    }

    const type = this.detectContactType(trimmed);

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(trimmed)) {
        return { valid: false, message: 'Ops! O e-mail informado parece incompleto. Verifique por favor. 💛' };
      }
      return { valid: true, type: 'email', value: trimmed.toLowerCase() };
    }

    if (type === 'whatsapp') {
      const digits = trimmed.replace(/\D/g, '');
      // Brasil: 10 dígitos (DDD + 8 dígitos fixo/móvel antigo) ou 11 dígitos (DDD + 9 + 8 dígitos)
      // Internacional: 11 a 15 dígitos
      if (digits.length < 10 || digits.length > 15) {
        return { valid: false, message: 'Por favor, digite seu WhatsApp com DDD (ex: 11 99999-8888). 💛' };
      }
      return { valid: true, type: 'whatsapp', value: trimmed, digits };
    }

    return { valid: false, message: 'Por favor, informe um número de WhatsApp com DDD ou um e-mail válido. 💛' };
  },

  formatPhone(input) {
    const digits = input.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = validation;
}
if (typeof window !== 'undefined') {
  window.validationLib = validation;
}
