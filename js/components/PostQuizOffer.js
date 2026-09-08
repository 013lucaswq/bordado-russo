/**
 * Componente: PostQuizOffer
 * Estrutura Pós-Quiz Completa:
 * 1. Resultado Personalizado (Texto Curto e Direto, sem texto de apoio)
 *    + Carrossel Interativo Pequeno & Responsivo das Peças
 * 2. Depoimentos das Alunas em Carrossel Interativo Pequeno & Responsivo
 *    (Apenas fotos dos trabalhos, Nome e Estado - sem textos de apoio ou estrelas)
 * 3. Bônus Gratuitos ("Participe do curso completo hoje e economize R$197,90")
 * 4. Tabela de Ofertas: Kit Básico (R$ 19,90) vs Kit Completo (R$ 37,90)
 * 5. Pop-up de Upgrade Exclusivo por R$ 27,90 ao tentar comprar o Básico
 */
const PostQuizOffer = {
  render(container, profileData, userAnswers, onSelectOffer, onGoHome) {
    const { testimonials, bonuses, offers } = window.salesData;

    container.innerHTML = `
      <div class="post-quiz-wrapper fade-in">
        
        <!-- ========================================================
             1. RESULTADO PERSONALIZADO (HEADLINE + PARABÉNS + PERFIL)
             ======================================================== -->
        <section class="quiz-card result-hero-card" aria-label="Seu Perfil Personalizado">
          
          <!-- Headline de Urgência -->
          <div class="result-urgency-banner">
            <span class="urgency-icon">⚠️</span>
            <span class="urgency-banner-text">ATENÇÃO! CASO FECHE A PÁGINA, ESSA CONDIÇÃO PODE SUMIR!</span>
          </div>

          <div class="result-header">
            <!-- TITULO: 🎉 Parabéns! -->
            <h1 class="result-congrats-title">🎉 Parabéns!</h1>

            <!-- Subtítulo: Você foi qualificada para participar do treinamento de BORDADO RUSSO -->
            <p class="result-qualify-subtitle">
              Você foi qualificada para participar do treinamento de <span class="highlight-bordado-russo">BORDADO RUSSO</span>
            </p>

            <div class="result-badge-pill">
              <span class="badge-icon">🧵</span>
              <span>${profileData.badge}</span>
            </div>
            <h2 class="result-title">${profileData.title}</h2>
          </div>

          <div class="result-body">
            <!-- Primeiro texto curto e direto (sem texto de apoio secundário) -->
            <p class="result-description-short">${profileData.description}</p>
            
            <!-- Carrossel Interativo Pequeno: O que você vai conseguir criar com facilidade -->
            <div class="result-gallery-carousel-box">
              <h3 class="gallery-title">O que você vai conseguir criar com facilidade:</h3>
              
              <div class="compact-carousel" id="profile-pieces-carousel" aria-roledescription="carrossel de fotos">
                <div class="carousel-viewport">
                  <div class="carousel-track">
                    ${(window.salesData.creationPieces || profileData.images).map((img, idx) => `
                      <div class="carousel-slide" data-index="${idx}">
                        <div class="piece-slide-card">
                          <div class="piece-img-box">
                            <img src="${img.src}" alt="${img.alt}" class="piece-img" loading="lazy" decoding="async" width="400" height="400" />
                          </div>
                          <div class="piece-caption-box">
                            <span class="piece-caption">${img.caption}</span>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Botões de Navegação -->
                <button type="button" class="carousel-nav-btn carousel-btn-prev" aria-label="Foto anterior">‹</button>
                <button type="button" class="carousel-nav-btn carousel-btn-next" aria-label="Próxima foto">›</button>

                <!-- Indicadores de Pontos -->
                <div class="carousel-dots-nav">
                  ${(window.salesData.creationPieces || profileData.images).map((_, idx) => `
                    <button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Ir para foto ${idx + 1}"></button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================
             2. DEPOIMENTOS DAS ALUNAS (CARROSSEL DE FOTOS + NOME & ESTADO)
             ======================================================== -->
        <section class="quiz-card social-proof-section" aria-label="Depoimentos de Alunas">
          <div class="section-badge-center">
            <span class="sub-badge">💛 QUEM JÁ COMEÇOU</span>
          </div>
          <h2 class="section-heading">Veja o que outras alunas estão conquistando:</h2>

          <!-- Carrossel Interativo Pequeno: Depoimentos Reais no WhatsApp -->
          <div class="compact-carousel compact-carousel-whatsapp" id="alunas-testimonials-carousel" aria-roledescription="carrossel de alunas">
            <div class="carousel-viewport">
              <div class="carousel-track">
                ${testimonials.map((t, idx) => `
                  <div class="carousel-slide" data-index="${idx}">
                    <div class="aluna-slide-card testimonial-whatsapp-card">
                      <div class="aluna-img-box testimonial-whatsapp-box">
                        <img src="${t.image}" alt="Depoimento real no WhatsApp de ${t.name}" class="aluna-img testimonial-whatsapp-img" loading="lazy" decoding="async" width="380" height="420" />
                      </div>
                      <div class="aluna-info-box testimonial-whatsapp-info">
                        <div class="whatsapp-badge-pill">
                          <span class="whatsapp-dot">🟢</span>
                          <span>Depoimento Real • WhatsApp</span>
                        </div>
                        <div class="aluna-author-row">
                          <strong class="aluna-name">${t.name}</strong>
                          <span class="aluna-sep">•</span>
                          <span class="aluna-city">${t.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Botões de Navegação -->
            <button type="button" class="carousel-nav-btn carousel-btn-prev" aria-label="Aluna anterior">‹</button>
            <button type="button" class="carousel-nav-btn carousel-btn-next" aria-label="Próxima aluna">›</button>

            <!-- Indicadores de Pontos -->
            <div class="carousel-dots-nav">
              ${testimonials.map((_, idx) => `
                <button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Ir para aluna ${idx + 1}"></button>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- ========================================================
             3. TRANSIÇÃO & BÔNUS EXCLUSIVOS
             ======================================================== -->
        <section class="quiz-card bonuses-section" aria-label="Bônus Gratuitos">
          <div class="bonuses-transition-badge">
            <span>✨ E para deixar seu começo ainda mais completo...</span>
          </div>

          <h2 class="bonuses-headline">${bonuses.headline}</h2>
          <p class="bonuses-subtitle">
            Garantindo seu acesso hoje, você recebe <strong>3 bônus exclusivos</strong> que te acompanham do primeiro ponto à venda das suas peças:
          </p>

          <div class="bonuses-grid">
            ${bonuses.items.map(b => `
              <div class="bonus-card">
                <div class="bonus-header">
                  <span class="bonus-icon">${b.icon}</span>
                  <span class="bonus-free-pill">${b.badge}</span>
                </div>
                <h4 class="bonus-title">${b.title}</h4>
                <p class="bonus-desc">${b.description}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- ========================================================
             4. OFERTAS: KIT BÁSICO vs KIT COMPLETO
             ======================================================== -->
        <section class="quiz-card offers-section" id="tabela-ofertas" aria-label="Kits de Acesso">
          <div class="section-badge-center">
            <span class="sub-badge">🎁 ESCOLHA O SEU KIT</span>
          </div>
          <h2 class="section-heading">Qual dos kits faz mais sentido para o seu momento?</h2>
          <p class="section-subheading">
            Acesso imediato no seu e-mail e WhatsApp logo após a confirmação.
          </p>

          <div class="pricing-comparison-grid">
            
            <!-- OFERTA 1: KIT BÁSICO -->
            <div class="pricing-card card-basico">
              <div class="pricing-header">
                <h3 class="plan-name">${offers.basico.name}</h3>
                <p class="plan-subtitle">${offers.basico.subtitle}</p>
                
                <div class="price-container">
                  <span class="price-old">De ${offers.basico.priceFrom}</span>
                  <div class="price-new-row">
                    <span class="currency">Por apenas</span>
                    <span class="price-val">${offers.basico.priceTo}</span>
                  </div>
                  <span class="price-period">${offers.basico.period}</span>
                </div>
              </div>

              <ul class="plan-features-list">
                ${offers.basico.features.map(f => `
                  <li><span class="feature-icon">✓</span> <span>${f}</span></li>
                `).join('')}
              </ul>

              <div class="pricing-cta-box">
                <button type="button" class="btn btn-secondary btn-large btn-buy-basico" id="btn-buy-basico">
                  <span>${offers.basico.ctaText}</span>
                </button>
              </div>
            </div>

            <!-- OFERTA 2: KIT COMPLETO (RECOMENDADO) -->
            <div class="pricing-card card-completo featured-plan">
              <div class="featured-ribbon">${offers.completo.badge}</div>

              <div class="pricing-header">
                <h3 class="plan-name">${offers.completo.name}</h3>
                <p class="plan-subtitle">${offers.completo.subtitle}</p>
                
                <div class="price-container">
                  <span class="price-old">De ${offers.completo.priceFrom}</span>
                  <div class="price-new-row">
                    <span class="currency">Por apenas</span>
                    <span class="price-val">${offers.completo.priceTo}</span>
                  </div>
                  <span class="price-period">${offers.completo.period}</span>
                </div>
              </div>

              <ul class="plan-features-list">
                ${offers.completo.features.map(f => `
                  <li class="${f.includes('BÔNUS') ? 'feature-bonus' : ''}">
                    <span class="feature-icon">${f.includes('BÔNUS') ? '🎁' : '✓'}</span> 
                    <span><strong>${f}</strong></span>
                  </li>
                `).join('')}
              </ul>

              <div class="pricing-cta-box">
                <button type="button" class="btn btn-primary btn-large btn-buy-completo" id="btn-buy-completo">
                  <span>✨ ${offers.completo.ctaText}</span>
                </button>

                <!-- Aviso de escassez abaixo do CTA da oferta completa -->
                <div class="vagas-scarcity-notice">
                  <span class="vagas-fire">⚡</span>
                  <span class="vagas-notice-text">Corra! Faltam apenas <strong>8 vagas</strong> disponíveis.</span>
                </div>

                <p class="guarantee-microcopy">🛡️ 7 dias de garantia incondicional • Risco zero</p>
              </div>
            </div>

          </div>
        </section>

        <!-- ========================================================
             5. DEPOIMENTOS: Veja o que as alunas estão falando do treinamento
             ======================================================== -->
        <section class="quiz-card training-reviews-section" aria-label="Depoimentos do Treinamento">
          <div class="section-badge-center">
            <span class="sub-badge">💬 DEPOIMENTOS REAIS</span>
          </div>
          <h2 class="section-heading reviews-heading">Veja o que as alunas estão falando do treinamento</h2>
          
          <div class="training-reviews-grid">
            ${(window.salesData.studentReviews || []).map(r => `
              <div class="student-review-card">
                <div class="student-review-header">
                  <div class="student-bubble-icon">💬</div>
                  <div class="student-meta">
                    <strong class="student-name">${r.name}</strong>
                    <span class="student-handle">${r.handle}</span>
                  </div>
                </div>
                <div class="student-quote-box">
                  <p class="student-quote">“${r.text}”</p>
                </div>
                <div class="student-angle-pill">
                  <span class="angle-icon">🎯</span>
                  <span class="angle-text"><strong>Ângulo:</strong> ${r.angle}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Botão de Retorno ao Início / Refazer Quiz -->
        <div class="result-back-home-wrapper">
          <button type="button" class="btn-back-home-ghost" id="btn-postquiz-restart" aria-label="Voltar para a página inicial">
            <span class="back-arrow">↩</span>
            <span>Voltar ao início do site / Refazer quiz</span>
          </button>
        </div>

      </div>
    `;

    // Função de Inicialização dos Carrosséis Interativos
    function setupCarousel(carouselEl) {
      if (!carouselEl) return;
      const track = carouselEl.querySelector('.carousel-track');
      const slides = carouselEl.querySelectorAll('.carousel-slide');
      const prevBtn = carouselEl.querySelector('.carousel-btn-prev');
      const nextBtn = carouselEl.querySelector('.carousel-btn-next');
      const dots = carouselEl.querySelectorAll('.carousel-dot');

      if (!track || slides.length === 0) return;

      let currentIndex = 0;
      const totalSlides = slides.length;

      function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
          dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          goToSlide(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          goToSlide(currentIndex + 1);
        });
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          goToSlide(i);
        });
      });

      // Suporte a swipe no celular e tablet
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchEndX = touchStartX;
      }, { passive: true });

      track.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
      }, { passive: true });

      track.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex - 1);
          }
        }
      });

      goToSlide(0);
    }

    // Inicializar os dois carrosséis
    setupCarousel(container.querySelector('#profile-pieces-carousel'));
    setupCarousel(container.querySelector('#alunas-testimonials-carousel'));

    // Ação: Clicar no Kit Básico -> Disparar Pop-up de Upgrade por R$ 27,90
    const btnBasico = container.querySelector('#btn-buy-basico');
    if (btnBasico) {
      btnBasico.addEventListener('click', () => {
        window.UpgradeModal.render(
          document.body,
          // Aceitou Upgrade para o Completo por R$ 27,90
          () => {
            onSelectOffer({
              kitId: 'upgrade_completo',
              kitName: 'Kit Completo (Upgrade Exclusivo)',
              price: 'R$ 27,90',
              priceNumber: 27.90
            });
          },
          // Preferiu continuar no Básico por R$ 19,90
          () => {
            onSelectOffer({
              kitId: 'kit_basico',
              kitName: 'Kit Básico',
              price: 'R$ 19,90',
              priceNumber: 19.90
            });
          }
        );
      });
    }

    // Ação: Clicar direto no Kit Completo por R$ 37,90
    const btnCompleto = container.querySelector('#btn-buy-completo');
    if (btnCompleto) {
      btnCompleto.addEventListener('click', () => {
        onSelectOffer({
          kitId: 'kit_completo',
          kitName: 'Kit Completo',
          price: 'R$ 37,90',
          priceNumber: 37.90
        });
      });
    }

    // Ação: Botão para voltar ao início do site
    const restartBtn = container.querySelector('#btn-postquiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (typeof onGoHome === 'function') {
          onGoHome();
        }
      });
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PostQuizOffer;
}
if (typeof window !== 'undefined') {
  window.PostQuizOffer = PostQuizOffer;
}
