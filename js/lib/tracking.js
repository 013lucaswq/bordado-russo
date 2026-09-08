/**
 * Utilitário de UTM Tracking e Preservação de Origem - Ateliê dos Fios
 */
const tracking = {
  STORAGE_KEY: 'atelie_tracking_params',

  initTracking() {
    const params = this.getParamsFromUrl();
    const stored = this.getStoredParams();

    // Mesclar: novos parâmetros têm prioridade se presentes na URL atual
    const merged = {
      utm_source: params.utm_source || stored.utm_source || '',
      utm_medium: params.utm_medium || stored.utm_medium || '',
      utm_campaign: params.utm_campaign || stored.utm_campaign || '',
      utm_content: params.utm_content || stored.utm_content || '',
      utm_term: params.utm_term || stored.utm_term || '',
      origem: params.origem || params.utm_source || stored.origem || 'organico',
      campanha: params.campanha || params.utm_campaign || stored.campanha || '',
      referrer: document.referrer || stored.referrer || ''
    };

    this.saveParams(merged);
    return merged;
  },

  getParamsFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_content: searchParams.get('utm_content'),
      utm_term: searchParams.get('utm_term'),
      origem: searchParams.get('origem'),
      campanha: searchParams.get('campanha')
    };
  },

  getStoredParams() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveParams(params) {
    try {
      const serialized = JSON.stringify(params);
      localStorage.setItem(this.STORAGE_KEY, serialized);
      sessionStorage.setItem(this.STORAGE_KEY, serialized);
    } catch (e) {
      console.warn('Não foi possível persistir parâmetros de tracking', e);
    }
  },

  getTrackingData() {
    return this.getStoredParams();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = tracking;
}
if (typeof window !== 'undefined') {
  window.trackingLib = tracking;
}
