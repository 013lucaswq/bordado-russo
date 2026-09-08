/**
 * Analytics e Monitoramento de Funil - Ateliê dos Fios
 */
const quizAnalytics = {
  sessionId: null,

  getSessionId() {
    if (!this.sessionId) {
      let stored = sessionStorage.getItem('atelie_quiz_sid');
      if (!stored) {
        stored = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
        sessionStorage.setItem('atelie_quiz_sid', stored);
      }
      this.sessionId = stored;
    }
    return this.sessionId;
  },

  track(eventName, metadata = {}) {
    const payload = {
      event_name: eventName,
      session_id: this.getSessionId(),
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
    };

    // Log para depuração limpa no console
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[Analytics] ${eventName}:`, payload.metadata);
    }

    // Enviar para o backend de forma assíncrona não-bloqueante
    try {
      if (navigator.sendBeacon && eventName === 'quiz_abandoned') {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/analytics/track', blob);
      } else {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {
          // Falha silenciosa para não atrapalhar a experiência do usuário
        });
      }
    } catch (e) {
      // Ignorar erros de tracking
    }
  },

  initAbandonmentTracking(getCurrentStep) {
    let completed = false;

    window.addEventListener('beforeunload', () => {
      if (!completed) {
        const step = getCurrentStep ? getCurrentStep() : null;
        if (step && step.name !== 'preview' && step.name !== 'intro') {
          this.track('quiz_abandoned', {
            step: step.name,
            question_number: step.questionIndex ? step.questionIndex + 1 : null
          });
        }
      }
    });

    return {
      markCompleted: () => { completed = true; }
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizAnalytics;
}
if (typeof window !== 'undefined') {
  window.quizAnalytics = quizAnalytics;
}
