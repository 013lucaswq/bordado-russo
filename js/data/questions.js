const questions = [
  {
    id: 1,
    number: 1,
    title: "Você já bordou antes?",
    subtitle: "Não existe resposta certa ou errada 💛",
    scores: false,
    isTieBreaker: false,
    options: [
      {
        letter: "A",
        text: "🌱 Nunca bordei",
        desc: "Estou começando agora",
        tag: "NUNCA",
        icon: "🌱"
      },
      {
        letter: "B",
        text: "🧵 Já tentei algumas vezes",
        desc: "Ainda estou aprendendo",
        tag: "BASICO",
        icon: "🧵"
      },
      {
        letter: "C",
        text: "✨ Já tenho experiência",
        desc: "Já faço alguns trabalhos",
        tag: "AVANCADO",
        icon: "✨"
      },
      {
        letter: "D",
        text: "🎨 Bordo com frequência",
        desc: "Já tenho bastante prática",
        tag: "FREQUENTE",
        icon: "🎨"
      }
    ]
  },
  {
    id: 2,
    number: 2,
    title: "O que mais te atrai no bordado russo?",
    subtitle: null,
    scores: true,
    isTieBreaker: true,
    options: [
      {
        letter: "A",
        text: "A textura macia e volumosa das peças",
        tag: "DEC",
        icon: "🧵"
      },
      {
        letter: "B",
        text: "A ideia de transformar isso numa renda extra",
        tag: "REND",
        icon: "✨"
      },
      {
        letter: "C",
        text: "Ter um tempo só meu, pra desestressar",
        tag: "REF",
        icon: "🌿"
      },
      {
        letter: "D",
        text: "Poder presentear pessoas queridas com algo feito à mão",
        tag: "PRES",
        icon: "🎁"
      }
    ]
  },
  {
    id: 3,
    number: 3,
    title: "Como está sua rotina hoje?",
    subtitle: null,
    scores: true,
    isTieBreaker: false,
    options: [
      {
        letter: "A",
        text: "Corrida demais, eu preciso de uma pausa",
        tag: "REF",
        icon: "☕"
      },
      {
        letter: "B",
        text: "Procurando uma forma de ganhar um dinheiro extra",
        tag: "REND",
        icon: "💡"
      },
      {
        letter: "C",
        text: "Tenho tempo livre e adoro deixar minha casa com a minha cara",
        tag: "DEC",
        icon: "🏡"
      },
      {
        letter: "D",
        text: "Sempre penso em mimos pra fazer pra alguém",
        tag: "PRES",
        icon: "💝"
      }
    ]
  },
  {
    id: 4,
    number: 4,
    title: "Se você pudesse escolher, o que faria com suas primeiras peças?",
    subtitle: null,
    scores: true,
    isTieBreaker: false,
    options: [
      {
        letter: "A",
        text: "Guardava pra mim, é o meu momento",
        tag: "REF",
        icon: "🛋️"
      },
      {
        letter: "B",
        text: "Vendia ou usava pra divulgar meu trabalho",
        tag: "REND",
        icon: "🏷️"
      },
      {
        letter: "C",
        text: "Dava de presente pra alguém especial",
        tag: "PRES",
        icon: "🎀"
      },
      {
        letter: "D",
        text: "Colocava pra decorar um cantinho da casa",
        tag: "DEC",
        icon: "🖼️"
      }
    ]
  },
  {
    id: 5,
    number: 5,
    title: "Qual dessas frases mais combina com você?",
    subtitle: null,
    scores: true,
    isTieBreaker: false,
    options: [
      {
        letter: "A",
        text: "Sonho em ter meu próprio negócio criativo",
        tag: "REND",
        icon: "💼"
      },
      {
        letter: "B",
        text: "Preciso de uma pausa da correria do dia a dia",
        tag: "REF",
        icon: "🧘‍♀️"
      },
      {
        letter: "C",
        text: "Amo caprichar na decoração da minha casa",
        tag: "DEC",
        icon: "🪴"
      },
      {
        letter: "D",
        text: "Sou aquela que sempre faz um mimo pra alguém",
        tag: "PRES",
        icon: "💌"
      }
    ]
  },
  {
    id: 6,
    number: 6,
    title: "Quando pensa em aprender bordado russo do zero, o que mais te dá vontade de começar hoje?",
    subtitle: "Essa é uma pergunta bônus. Não muda seu perfil. 💛",
    scores: false,
    isTieBreaker: false,
    options: [
      {
        letter: "A",
        text: "Saber que dá pra fazer mesmo sem experiência",
        tag: "FACILIDADE",
        icon: "✨"
      },
      {
        letter: "B",
        text: "Ter um passo a passo fácil de seguir",
        tag: "SUPORTE",
        icon: "📖"
      },
      {
        letter: "C",
        text: "Poder vender ou lucrar com isso rapidinho",
        tag: "LUCRO",
        icon: "💰"
      },
      {
        letter: "D",
        text: "Ter um hobby relaxante só meu",
        tag: "RELAXAMENTO",
        icon: "🌿"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}
if (typeof window !== 'undefined') {
  window.questionsData = questions;
}
