/**
 * Componente: QuizQuestion
 * Renderizador de cada pergunta individual (1 a 6)
 */
const QuizQuestion = {
  render(container, question, selectedAnswer, onSelectAnswer, onBack, onGoHome) {
    const isFirstQuestion = question.number === 1;
    const backLabel = isFirstQuestion ? 'Início' : 'Voltar';
    const backAria = isFirstQuestion ? 'Voltar para o início do site' : 'Voltar para a pergunta anterior';
    const currentTag = selectedAnswer ? (selectedAnswer.tag || selectedAnswer) : null;

    container.innerHTML = `
      <section class="quiz-card question-card slide-up" aria-label="Pergunta ${question.number}">
        <div class="question-top-bar">
          <button type="button" class="btn-back ${isFirstQuestion ? 'btn-back-home' : ''}" id="btn-quiz-back" aria-label="${backAria}">
            <span class="back-arrow">←</span>
            <span>${backLabel}</span>
          </button>
          
          <button type="button" class="brand-mini-label btn-link-home" id="btn-quiz-brand-home" aria-label="Voltar para o início do site">
            <span class="thread-dot"></span>
            <span>Ateliê dos Fios</span>
          </button>
        </div>

        ${ProgressBar.render(question.number, 6)}

        <div class="question-body">
          <h2 class="question-title">${question.title}</h2>
          ${question.subtitle ? `<p class="question-subtitle">${question.subtitle}</p>` : ''}

          <div class="answers-grid" role="group" aria-label="Opções de resposta">
            ${question.options.map(opt => {
              const isSelected = currentTag === opt.tag;
              return AnswerCard.render(opt, isSelected);
            }).join('')}
          </div>
        </div>
      </section>
    `;

    // Eventos do botão voltar
    const backBtn = container.querySelector('#btn-quiz-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        onBack();
      });
    }

    // Eventos do logo no topo para ir direto ao início
    const brandHomeBtn = container.querySelector('#btn-quiz-brand-home');
    if (brandHomeBtn) {
      brandHomeBtn.addEventListener('click', () => {
        if (typeof onGoHome === 'function') {
          onGoHome();
        } else {
          onBack();
        }
      });
    }

    // Eventos de seleção de alternativas
    const cards = container.querySelectorAll('.answer-card');
    let isTransitioning = false;

    cards.forEach(card => {
      const handleSelect = () => {
        if (isTransitioning) return;
        isTransitioning = true;

        // Remover seleção anterior e marcar este
        cards.forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-pressed', 'true');

        const letter = card.dataset.letter;
        const tag = card.dataset.tag;
        const chosenOption = question.options.find(o => o.letter === letter);

        // Microdelay agradável de feedback antes de avançar
        setTimeout(() => {
          onSelectAnswer({
            questionId: question.id,
            questionNumber: question.number,
            questionTitle: question.title,
            letter: chosenOption.letter,
            text: chosenOption.text,
            tag: chosenOption.tag
          });
        }, 320);
      };

      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizQuestion;
}
if (typeof window !== 'undefined') {
  window.QuizQuestion = QuizQuestion;
}
