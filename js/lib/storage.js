/**
 * Gerenciador de Persistência Local (Session & LocalStorage) - Ateliê dos Fios
 */
const quizStorage = {
  STATE_KEY: 'atelie_quiz_state_v1',

  saveState(state) {
    try {
      const data = JSON.stringify({
        ...state,
        savedAt: Date.now()
      });
      sessionStorage.setItem(this.STATE_KEY, data);
      localStorage.setItem(this.STATE_KEY, data);
    } catch (e) {
      console.warn('Erro ao salvar estado do quiz', e);
    }
  },

  getState() {
    try {
      const raw = sessionStorage.getItem(this.STATE_KEY) || localStorage.getItem(this.STATE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Expirar após 4 horas para não manter estados muito antigos
      if (parsed.savedAt && (Date.now() - parsed.savedAt > 4 * 60 * 60 * 1000)) {
        this.clearState();
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  },

  clearState() {
    try {
      sessionStorage.removeItem(this.STATE_KEY);
      localStorage.removeItem(this.STATE_KEY);
    } catch (e) {
      console.warn('Erro ao limpar estado do quiz', e);
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizStorage;
}
if (typeof window !== 'undefined') {
  window.quizStorage = quizStorage;
}
