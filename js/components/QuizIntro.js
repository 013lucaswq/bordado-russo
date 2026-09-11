/**
 * Componente: QuizIntro
 * Página Inicial recriada fielmente no estilo https://bordado-russo.lovable.app/
 * Adaptada com as informações e fotos oficiais do Ateliê dos Fios
 * Paleta: Rosa e Branco
 */
const QuizIntro = {
  render(container, onStart) {
    const reviews = [
      {
        name: "Juliana Nascimento",
        handle: "@jujuuu.nasc08",
        image: "/assets/images/depoimentos/thumb-camila.webp",
        text: "Eu sempre quis fazer artesanato, mas achava tudo muito difícil, até conhecer o bordado russo. Além de ser uma delícia fazer isso, é muito fácil, e ainda por cima, as peças ficam simplesmente LINDAS! Estou amando!!!"
      },
      {
        name: "Camila Almeida",
        handle: "@cami_almeidaa",
        image: "/assets/images/depoimentos/thumb-patricia.webp",
        text: "Eu estava procurando algo pra fazer uma renda extra que fosse de baixo investimento. Quando conheci o bordado russo, vi o grande potencial. Hoje faço mais de 4 mil reais todos os meses vendendo peças!"
      },
      {
        name: "Débora Melo",
        handle: "@deboramelo_",
        image: "/assets/images/depoimentos/thumb-rosangela.webp",
        text: "Eu amo artesanato, faço de tudo. Porém o bordado russo eu tenho uma paixão maior. As peças são únicas e em 1 hora eu já termino. Amo essa velocidade pra ver o resultado final!"
      }
    ];

    container.innerHTML = `
      <section class="intro-lovable-container fade-in" aria-label="Apresentação do Bordado Russo">
        
        <!-- 1. Headline Superior -->
        <div class="intro-lovable-header">
          <p class="intro-lovable-eyebrow">
            A maior tendência do artesanato para acalmar e relaxar o corpo e a mente em 2026:
          </p>
          
          <h1 class="intro-lovable-title" aria-label="Bordado Russo é a maior tendência do artesanato para acalmar e relaxar o corpo e a mente em 2026">
            <span class="intro-lovable-badge">BORDADO RUSSO</span>
          </h1>

          <p class="intro-lovable-description">
            Descubra um jeito simples, <b>barato e fácil</b> de começar a fazer peças lindas de bordado russo de casa, mesmo que nunca tenha feito nada parecido antes, <b>relaxe seu corpo e sua mente</b> e ganhe até <b class="highlight-profit">R$3.420,00 por mês</b> começando ainda hoje
          </p>
        </div>

        <!-- 2. Hero Image Principal -->
        <div class="intro-lovable-hero-wrapper">
          <div class="intro-lovable-hero-card">
            <picture>
              <source type="image/webp" srcset="/assets/images/helena-martins-9-16-400w.webp 400w, /assets/images/helena-martins-9-16.webp 571w" sizes="(max-width: 480px) 100vw, 460px">
              <img 
                src="/assets/images/helena-martins-9-16.webp" 
                alt="Especialista em Bordado Russo segurando bastidor colorido" 
                class="intro-lovable-hero-img" 
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="571"
                height="1024"
              />
            </picture>
          </div>
        </div>

        <!-- 3. Textos de Apoio -->
        <div class="intro-lovable-text-box">
          <p class="intro-lovable-promise">
            E o melhor? Eu vou te ensinar o <b>passo a passo</b> pra você também viver disso. Sem precisar investir muito ou depender dos outros.
          </p>
          <p class="intro-lovable-call">
            Clica no botão abaixo para ter um plano personalizado pra você!
          </p>
        </div>

        <!-- 4. Botão Principal com Animação Pulse -->
        <div class="intro-lovable-cta-wrapper">
          <button type="button" class="btn-lovable-pulse" id="btn-start-quiz">
            <span class="btn-text">Quero personalizar meu plano</span>
          </button>
        </div>

        <!-- 5. Seção de Avaliações / Depoimentos (Carrossel Interativo) -->
        <div class="intro-lovable-social-proof">
          <!-- 5 Estrelas -->
          <div class="intro-lovable-stars" aria-label="Avaliação 5 estrelas">
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
            <span class="star-icon">★</span>
          </div>

          <p class="intro-lovable-social-title">
            QUEM JÁ ESTÁ VIVENDO DE BORDADO RUSSO
          </p>

          <!-- Card de Depoimento com Navegação -->
          <div class="intro-lovable-testimonial-card" id="intro-testimonial-card">
            <div class="testimonial-content" id="intro-testimonial-content">
              <div class="testimonial-avatar-wrapper">
                <img src="${reviews[0].image}" alt="${reviews[0].name}" class="testimonial-avatar" id="testimonial-avatar-img" />
              </div>
              <h3 class="testimonial-name" id="testimonial-name-el">${reviews[0].name}</h3>
              <p class="testimonial-handle" id="testimonial-handle-el">${reviews[0].handle}</p>
              <p class="testimonial-quote" id="testimonial-quote-el">"${reviews[0].text}"</p>
            </div>

            <!-- Controles do Carrossel de Depoimentos -->
            <div class="testimonial-controls">
              <button type="button" class="testimonial-nav-btn prev-btn" id="intro-prev-testimonial" aria-label="Depoimento anterior">‹</button>
              
              <div class="testimonial-dots" id="intro-dots-container">
                ${reviews.map((_, i) => `
                  <span class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
                `).join('')}
              </div>

              <button type="button" class="testimonial-nav-btn next-btn" id="intro-next-testimonial" aria-label="Próximo depoimento">›</button>
            </div>
          </div>
        </div>

      </section>
    `;

    const startBtn = container.querySelector('#btn-start-quiz');
    if (startBtn) {
      const prefetchQuiz = () => {
        if (typeof window.loadChunk === 'function') window.loadChunk('quiz-flow');
      };
      startBtn.addEventListener('pointerenter', prefetchQuiz, { once: true, passive: true });
      startBtn.addEventListener('touchstart', prefetchQuiz, { once: true, passive: true });
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(prefetchQuiz, { timeout: 2500 });
      } else {
        setTimeout(prefetchQuiz, 1800);
      }

      startBtn.addEventListener('click', () => {
        const section = container.querySelector('.intro-lovable-container');
        if (section) {
          section.classList.add('fade-out-down');
        }
        setTimeout(() => {
          onStart();
        }, 220);
      });
    }

    // Carrossel de Depoimentos Interativo
    let currentReview = 0;
    const avatarImg = container.querySelector('#testimonial-avatar-img');
    const nameEl = container.querySelector('#testimonial-name-el');
    const handleEl = container.querySelector('#testimonial-handle-el');
    const quoteEl = container.querySelector('#testimonial-quote-el');
    const contentBox = container.querySelector('#intro-testimonial-content');
    const dots = container.querySelectorAll('.testimonial-dot');

    function updateReview(index) {
      if (index < 0) index = reviews.length - 1;
      if (index >= reviews.length) index = 0;
      currentReview = index;

      if (contentBox) {
        contentBox.style.opacity = '0';
        contentBox.style.transform = 'translateY(6px)';
        setTimeout(() => {
          const item = reviews[currentReview];
          if (avatarImg) {
            avatarImg.src = item.image;
            avatarImg.alt = item.name;
          }
          if (nameEl) nameEl.textContent = item.name;
          if (handleEl) handleEl.textContent = item.handle;
          if (quoteEl) quoteEl.textContent = `"${item.text}"`;

          dots.forEach((dot, i) => {
            if (i === currentReview) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });

          contentBox.style.opacity = '1';
          contentBox.style.transform = 'translateY(0)';
        }, 150);
      }
    }

    const prevBtn = container.querySelector('#intro-prev-testimonial');
    const nextBtn = container.querySelector('#intro-next-testimonial');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => updateReview(currentReview - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => updateReview(currentReview + 1));
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        updateReview(idx);
      });
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizIntro;
}
if (typeof window !== 'undefined') {
  window.QuizIntro = QuizIntro;
}
