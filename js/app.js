/**
 * Orquestrador Principal do Quiz - Ateliê dos Fios
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('quiz-app-container');
  if (!container) return;

  // Inicializar UTM tracking
  const trackingParams = window.trackingLib.initTracking();

  // Estado da aplicação
  let state = {
    step: 'intro', // 'intro' | 'question' | 'calculating' | 'result' | 'preview'
    questionIndex: 0,
    answers: {},
    profile: null,
    scores: null,
    lead: null
  };

  // Restaurar estado do storage se houver sessão anterior
  const saved = window.quizStorage.getState();
  if (saved && saved.step) {
    state = { ...state, ...saved };
  }

  // Monitoramento de abandono
  const abandonmentTracker = window.quizAnalytics.initAbandonmentTracking(() => ({
    name: state.step,
    questionIndex: state.questionIndex
  }));

  // Code Splitting / Lazy Loading de Chunks
  const loadedChunks = {};
  function loadChunk(name) {
    if (loadedChunks[name]) return loadedChunks[name];
    if (name === 'quiz-flow' && window.QuizQuestion && window.questionsData) {
      return (loadedChunks[name] = Promise.resolve());
    }
    if (name === 'offer-flow' && window.PostQuizOffer && window.salesData) {
      return (loadedChunks[name] = Promise.resolve());
    }
    loadedChunks[name] = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src*="${name}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', reject);
        return;
      }
      const script = document.createElement('script');
      script.src = `/js/${name}.min.js`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => {
        console.error(`Erro ao carregar chunk ${name}:`, err);
        reject(err);
      };
      document.head.appendChild(script);
    });
    return loadedChunks[name];
  }
  window.loadChunk = loadChunk;

  function persist() {
    window.quizStorage.saveState(state);
  }

  async function render() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Garantir carregamento assíncrono dos chunks da etapa atual
    if (['question', 'calculating', 'belief_break', 'belief_break_2'].includes(state.step)) {
      if (!window.QuizQuestion || !window.questionsData) {
        await loadChunk('quiz-flow');
      }
    } else if (['result', 'preview'].includes(state.step)) {
      if (!window.PostQuizOffer || !window.salesData) {
        await loadChunk('offer-flow');
      }
    }

    switch (state.step) {
      case 'intro':
        window.QuizIntro.render(container, async () => {
          state.step = 'question';
          state.questionIndex = 0;
          persist();
          window.quizAnalytics.track('quiz_started');
          await loadChunk('quiz-flow');
          render();
        });
        break;

      case 'question': {
        // Pré-carregar silenciosamente a oferta enquanto o usuário responde
        if (state.questionIndex >= 3) {
          loadChunk('offer-flow');
        }
        const question = window.questionsData[state.questionIndex];
        const selectedAnswer = state.answers[question.number];

        window.QuizQuestion.render(
          container,
          question,
          selectedAnswer,
          (answer) => {
            // Registrar resposta
            state.answers[question.number] = answer;
            persist();

            // Track do analytics
            window.quizAnalytics.track('question_answered', {
              question_number: question.number,
              answer: answer.text,
              tag: answer.tag
            });

            // Se for a última pergunta (pergunta 6)
            if (state.questionIndex >= window.questionsData.length - 1) {
              // Calcular Perfil
              const calculation = window.calculateProfile(state.answers);
              state.profile = calculation.profile;
              state.scores = calculation.scores;
              state.step = 'calculating';
              persist();

              window.quizAnalytics.track('quiz_completed', {
                profile: state.profile,
                scores: state.scores
              });

              render();
            } else {
              // Avançar para a próxima pergunta
              state.questionIndex++;
              persist();
              render();
            }
          },
          () => {
            // Voltar para pergunta anterior ou para a tela inicial
            if (state.questionIndex > 0) {
              state.questionIndex--;
              persist();
              render();
            } else {
              // Voltar para a tela inicial
              state.step = 'intro';
              state.questionIndex = 0;
              persist();
              render();
            }
          },
          () => {
            // Ir direto para a tela inicial
            state.step = 'intro';
            state.questionIndex = 0;
            persist();
            render();
          }
        );
        break;
      }

      case 'calculating':
        window.CalculatingProfile.render(container, () => {
          state.step = 'belief_break';
          persist();
          render();
        });
        break;

      case 'belief_break':
        window.BeliefBreak.render(container, () => {
          state.step = 'belief_break_2';
          persist();
          render();
        });
        break;

      case 'belief_break_2':
        window.BeliefBreak2.render(container, () => {
          state.step = 'result';
          persist();
          window.quizAnalytics.track('profile_viewed', {
            profile: state.profile,
            scores: state.scores
          });
          window.quizAnalytics.track('lead_form_viewed');
          render();
        });
        break;

      case 'result': {
        const profileData = window.profilesData[state.profile] || window.profilesData.REF;

        if (window.PostQuizOffer) {
          window.PostQuizOffer.render(container, profileData, state.answers, (selectedOffer) => {
            // Track de clique na oferta
            window.quizAnalytics.track('offer_clicked', {
              kit_id: selectedOffer.kitId,
              kit_name: selectedOffer.kitName,
              price: selectedOffer.price
            });

            // Redirecionamento direto para o Checkout da Wiven com parâmetros UTM
            if (selectedOffer.checkoutUrl) {
              // 1. Meta Pixel InitiateCheckout
              if (typeof window.fbq === 'function') {
                try {
                  window.fbq('track', 'InitiateCheckout', {
                    content_name: selectedOffer.kitName,
                    value: selectedOffer.priceNumber || 0,
                    currency: 'BRL'
                  });
                } catch (e) {}
              }

              // 2. Preservar UTMs e parâmetros da URL atual
              let targetUrl = selectedOffer.checkoutUrl;
              try {
                const u = new URL(selectedOffer.checkoutUrl);
                const s = new URLSearchParams(window.location.search);
                s.forEach((v, k) => {
                  if (!u.searchParams.has(k)) u.searchParams.set(k, v);
                });
                targetUrl = u.toString();
              } catch (e) {}

              // 3. Gravar dados das respostas do quiz silenciosamente em background
              try {
                const trackingParams = (window.quizStorage && window.quizStorage.getTrackingParams) ? window.quizStorage.getTrackingParams() : {};
                const payload = {
                  nome: 'Checkout Wiven',
                  contato: 'Wiven Checkout',
                  tipo_contato: 'checkout',
                  perfil: state.profile,
                  kit_escolhido: selectedOffer.kitName,
                  valor_pago: selectedOffer.price,
                  q1_resposta: state.answers[1] ? state.answers[1].text : '',
                  q1_tag: state.answers[1] ? state.answers[1].tag : '',
                  q2_resposta: state.answers[2] ? state.answers[2].text : '',
                  q2_tag: state.answers[2] ? state.answers[2].tag : '',
                  q3_resposta: state.answers[3] ? state.answers[3].text : '',
                  q3_tag: state.answers[3] ? state.answers[3].tag : '',
                  q4_resposta: state.answers[4] ? state.answers[4].text : '',
                  q4_tag: state.answers[4] ? state.answers[4].tag : '',
                  q5_resposta: state.answers[5] ? state.answers[5].text : '',
                  q5_tag: state.answers[5] ? state.answers[5].tag : '',
                  q6_resposta: state.answers[6] ? state.answers[6].text : '',
                  q6_tag: state.answers[6] ? state.answers[6].tag : '',
                  ref_score: state.scores ? state.scores.REF : 0,
                  rend_score: state.scores ? state.scores.REND : 0,
                  pres_score: state.scores ? state.scores.PRES : 0,
                  dec_score: state.scores ? state.scores.DEC : 0,
                  consentimento: true,
                  origem: trackingParams.origem || 'quiz',
                  campanha: trackingParams.campanha || '',
                  utm_source: trackingParams.utm_source || '',
                  utm_medium: trackingParams.utm_medium || '',
                  utm_campaign: trackingParams.utm_campaign || '',
                  utm_content: trackingParams.utm_content || '',
                  referrer: trackingParams.referrer || document.referrer || ''
                };
                if (navigator.sendBeacon) {
                  navigator.sendBeacon('/api/leads', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
                } else {
                  fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    keepalive: true
                  }).catch(() => {});
                }
              } catch (e) {}

              // 4. Redirecionar para o Checkout da Wiven
              window.location.href = targetUrl;
              return;
            }

            // Abrir Modal de Checkout para captura ágil e segura (Fallback)
            window.CheckoutModal.render(document.body, selectedOffer, async (orderData) => {
              state.lead = {
                name: orderData.name,
                contact: orderData.contact,
                contactType: orderData.contactType,
                offer: selectedOffer
              };

              const payload = {
                nome: orderData.name,
                contato: orderData.contact,
                tipo_contato: orderData.contactType,
                perfil: state.profile,
                kit_escolhido: selectedOffer.kitName,
                valor_pago: selectedOffer.price,
                q1_resposta: state.answers[1] ? state.answers[1].text : '',
                q1_tag: state.answers[1] ? state.answers[1].tag : '',
                q2_resposta: state.answers[2] ? state.answers[2].text : '',
                q2_tag: state.answers[2] ? state.answers[2].tag : '',
                q3_resposta: state.answers[3] ? state.answers[3].text : '',
                q3_tag: state.answers[3] ? state.answers[3].tag : '',
                q4_resposta: state.answers[4] ? state.answers[4].text : '',
                q4_tag: state.answers[4] ? state.answers[4].tag : '',
                q5_resposta: state.answers[5] ? state.answers[5].text : '',
                q5_tag: state.answers[5] ? state.answers[5].tag : '',
                q6_resposta: state.answers[6] ? state.answers[6].text : '',
                q6_tag: state.answers[6] ? state.answers[6].tag : '',
                ref_score: state.scores ? state.scores.REF : 0,
                rend_score: state.scores ? state.scores.REND : 0,
                pres_score: state.scores ? state.scores.PRES : 0,
                dec_score: state.scores ? state.scores.DEC : 0,
                consentimento: true,
                origem: trackingParams.origem || 'quiz',
                campanha: trackingParams.campanha || '',
                utm_source: trackingParams.utm_source || '',
                utm_medium: trackingParams.utm_medium || '',
                utm_campaign: trackingParams.utm_campaign || '',
                utm_content: trackingParams.utm_content || '',
                referrer: trackingParams.referrer || document.referrer || ''
              };

              const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });

              if (!res.ok) {
                throw new Error('Falha ao registrar lead');
              }

              // Gravação bem sucedida
              abandonmentTracker.markCompleted();
              window.quizAnalytics.track('lead_submitted', {
                profile: state.profile,
                contact_type: orderData.contactType,
                kit_escolhido: selectedOffer.kitName,
                valor_pago: selectedOffer.price
              });

              // Limpar storage temporário pós-conversão
              window.quizStorage.clearState();

              // Avançar para a tela de confirmação e acesso
              state.step = 'preview';
              render();
            });
          }, () => {
            // Voltar ao início do site / Refazer teste
            state.step = 'intro';
            state.questionIndex = 0;
            state.answers = {};
            state.profile = null;
            state.scores = null;
            persist();
            render();
          });
        } else {
          // Fallback gracioso
          const leadHtml = window.LeadCapture.renderHtml();
          window.ProfileResult.render(container, profileData, leadHtml);

          window.LeadCapture.attachEvents(container, async (formData) => {
            state.lead = formData;

            const payload = {
              nome: formData.name,
              contato: formData.contact,
              tipo_contato: formData.contactType,
              perfil: state.profile,
              q1_resposta: state.answers[1] ? state.answers[1].text : '',
              q1_tag: state.answers[1] ? state.answers[1].tag : '',
              q2_resposta: state.answers[2] ? state.answers[2].text : '',
              q2_tag: state.answers[2] ? state.answers[2].tag : '',
              q3_resposta: state.answers[3] ? state.answers[3].text : '',
              q3_tag: state.answers[3] ? state.answers[3].tag : '',
              q4_resposta: state.answers[4] ? state.answers[4].text : '',
              q4_tag: state.answers[4] ? state.answers[4].tag : '',
              q5_resposta: state.answers[5] ? state.answers[5].text : '',
              q5_tag: state.answers[5] ? state.answers[5].tag : '',
              q6_resposta: state.answers[6] ? state.answers[6].text : '',
              q6_tag: state.answers[6] ? state.answers[6].tag : '',
              ref_score: state.scores ? state.scores.REF : 0,
              rend_score: state.scores ? state.scores.REND : 0,
              pres_score: state.scores ? state.scores.PRES : 0,
              dec_score: state.scores ? state.scores.DEC : 0,
              consentimento: true,
              origem: trackingParams.origem || 'quiz',
              campanha: trackingParams.campanha || '',
              utm_source: trackingParams.utm_source || '',
              utm_medium: trackingParams.utm_medium || '',
              utm_campaign: trackingParams.utm_campaign || '',
              utm_content: trackingParams.utm_content || '',
              referrer: trackingParams.referrer || document.referrer || ''
            };

            const res = await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (!res.ok) {
              throw new Error('Falha ao registrar lead');
            }

            abandonmentTracker.markCompleted();
            window.quizAnalytics.track('lead_submitted', {
              profile: state.profile,
              contact_type: formData.contactType
            });

            window.quizStorage.clearState();
            state.step = 'preview';
            render();
          });
        }
        break;
      }

      case 'preview': {
        const profileData = window.profilesData[state.profile] || window.profilesData.REF;
        const leadData = state.lead || { name: 'Visitante', contactType: 'whatsapp' };

        window.PreviewScreen.render(container, leadData, profileData, () => {
          // Reiniciar quiz
          state = {
            step: 'intro',
            questionIndex: 0,
            answers: {},
            profile: null,
            scores: null,
            lead: null
          };
          window.quizStorage.clearState();
          render();
        });
        break;
      }

      default:
        state.step = 'intro';
        render();
        break;
    }
  }

  // Logo no cabeçalho leva ao início do site a qualquer momento
  const brandLinks = document.querySelectorAll('.header-brand');
  brandLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      state.step = 'intro';
      state.questionIndex = 0;
      persist();
      render();
    });
  });

  // Primeira renderização
  render();
});
