/**
 * Dados de Vendas, Prova Social, Bônus e Ofertas - Ateliê dos Fios
 */
const salesData = {
  getEmpathyCopy(profileKey, q6Tag, q1Tag) {
    const isBeginner = q1Tag === 'NUNCA' || q1Tag === 'BASICO';

    const motivationMap = {
      RELAXAMENTO: isBeginner 
        ? "Como você está começando agora e busca um tempo só seu para desestressar, o bordado russo é o refúgio perfeito: o movimento ritmado da agulha alivia a mente cansada logo nos primeiros minutos e traz uma sensação deliciosa de paz."
        : "Como você busca um tempo de qualidade para desacelerar e relaxar, o bordado russo oferece exatamente esse momento de reconexão: uma pausa leve na rotina enquanto suas mãos dão vida a peças fofas e acolhedoras.",
      LUCRO: isBeginner
        ? "Como seu objetivo é gerar uma renda extra sem complicação, o bordado russo é uma das técnicas manuais mais lucrativas hoje: peças volumosas e texturizadas chamam atenção imediata e têm alto valor percebido pelos clientes, mesmo para quem nunca bordou antes."
        : "Como você já tem afinidade manual e enxerga no bordado a chance de lucrar, essa é a oportunidade de criar um portfólio irresistível de peças decorativas de alta margem e rápida aceitação no mercado.",
      FACILIDADE: isBeginner
        ? "Se você nunca bordou antes, não se preocupe: a agulha mágica do bordado russo foi feita para ser intuitiva. Não precisa de anos de treino nem pontos difíceis: basta seguir os riscos já prontos e em poucas horas ver sua primeira peça pronta."
        : "Você vai amar a fluidez do bordado russo: os riscos em tamanho real e o passo a passo direto ao ponto economizam horas de trabalho e deixam a sua criação leve e prazerosa.",
      SUPORTE: 
        "Com todo o material estruturado, lista de fios recomendados e riscos prontos para imprimir, você nunca fica com dúvida ou perdida sobre qual agulha, tecido ou linha usar para conseguir o acabamento fofo e impecável de ateliê."
    };

    return motivationMap[q6Tag] || motivationMap.RELAXAMENTO;
  },

  creationPieces: [
    {
      src: "/assets/images/facilidade/facilidade-1-necessaire.jpg",
      alt: "Necessaire artesanal em bordado russo floral com relevo macio",
      caption: "Necessaires e bolsas florais com textura macia"
    },
    {
      src: "/assets/images/facilidade/facilidade-2-paisagem-sol.jpg",
      alt: "Bastidor decorativo de paisagem com sol e colinas em relevo 3D",
      caption: "Quadros e bastidores de paisagens aconchegantes"
    },
    {
      src: "/assets/images/facilidade/facilidade-3-bastidor-floral.jpg",
      alt: "Bastidor clássico de flores volumosas em tons suaves",
      caption: "Composições florais delicadas e volumosas"
    },
    {
      src: "/assets/images/facilidade/facilidade-4-conjunto-mimos.jpg",
      alt: "Conjunto de mimos, chaveiro de coração, porta-copos e cestinha",
      caption: "Mimos rápidos: porta-copos, chaveiros e lembrancinhas"
    },
    {
      src: "/assets/images/facilidade/facilidade-5-almofada-flores.jpg",
      alt: "Almofada decorativa de bordado russo floral de alto valor",
      caption: "Almofadas decorativas volumosas de alto valor"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Patrícia A.",
      city: "São Paulo, SP",
      image: "/assets/images/depoimentos/depoimento-patricia.jpg"
    },
    {
      id: 2,
      name: "Rosângela S.",
      city: "Curitiba, PR",
      image: "/assets/images/depoimentos/depoimento-rosangela.jpg"
    },
    {
      id: 3,
      name: "Camila F.",
      city: "Belo Horizonte, MG",
      image: "/assets/images/depoimentos/depoimento-camila.jpg"
    },
    {
      id: 4,
      name: "Tereza M.",
      city: "Rio de Janeiro, RJ",
      image: "/assets/images/depoimentos/depoimento-tereza.jpg"
    },
    {
      id: 5,
      name: "Aparecida N.",
      city: "Porto Alegre, RS",
      image: "/assets/images/depoimentos/depoimento-aparecida.jpg"
    }
  ],
  studentReviews: [
    {
      id: 1,
      name: "Camila Ferreira",
      handle: "@camila.ferreira_art",
      text: "Eu sempre achei que bordado fosse complicado demais pra mim. Quando comecei a acompanhar as aulas, percebi que era muito mais simples do que imaginava. O passo a passo ajuda bastante e hoje já consigo fazer peças que eu nem acreditava que conseguiria.",
      angle: "medo de começar → facilidade → evolução."
    },
    {
      id: 2,
      name: "Priscila Martins",
      handle: "@priscila.martins_",
      text: "Comecei fazendo uma peça só pra testar e acabei me apaixonando. O mais legal é que você não precisa de um monte de materiais nem passar horas tentando descobrir como fazer. Depois que terminei a primeira peça, já comecei a pensar em quais outras eu poderia fazer.",
      angle: "curiosidade → primeira experiência → desejo de continuar."
    },
    {
      id: 3,
      name: "Juliana Ribeiro",
      handle: "@ju.ribeiro.artesanato",
      text: "O treinamento me ajudou principalmente porque eu conseguia assistir à aula e fazer junto. Antes eu via algumas peças prontas e pensava que seria impossível fazer igual, mas depois que aprendi a técnica tudo ficou muito mais claro. Estou adorando aprender novas peças.",
      angle: "comparação inicial → método → confiança."
    },
    {
      id: 4,
      name: "Larissa Almeida",
      handle: "@larissa.almeida_art",
      text: "Eu queria encontrar alguma coisa que pudesse fazer no meu tempo livre e o bordado russo acabou sendo uma ótima surpresa. Além de ser gostoso de fazer, as peças ficam lindas. Já estou fazendo algumas para presentear e também pensando em começar a aceitar encomendas.",
      angle: "tempo livre → hobby → possibilidade de encomendas."
    }
  ],

  bonuses: {
    headline: "Participe do curso completo hoje e economize R$197,90",
    introText: "E para deixar seu começo ainda mais completo, você ganha acesso imediato a 3 bônus exclusivos:",
    items: [
      {
        icon: "🎥",
        badge: "GRÁTIS",
        title: "Vídeo Aulas Passo a Passo",
        description: "Aprenda visualmente o manuseio correto da agulha de punch needle, o ponto em relevo perfeito, a tensão ideal dos fios e como finalizar com verso limpo e profissional."
      },
      {
        icon: "💰",
        badge: "GRÁTIS",
        title: "Guia Prático de Vendas",
        description: "O método simples para precificar suas peças sem ter prejuízo, tirar fotos encantadoras com seu celular e conquistar suas primeiras clientes pelas redes sociais e WhatsApp."
      },
      {
        icon: "🤝",
        badge: "GRÁTIS",
        title: "Comunidade de Artesanato",
        description: "Um grupo acolhedor e exclusivo para tirar dúvidas, trocar ideias de fios e cores, comemorar suas primeiras peças e se inspirar todos os dias ao lado de outras bordadeiras."
      }
    ]
  },

  offers: {
    basico: {
      id: "kit_basico",
      name: "Kit Básico",
      subtitle: "Para dar os primeiros passos com segurança",
      badge: null,
      priceFrom: "R$ 57,90",
      priceTo: "R$ 19,90",
      priceNumber: 19.90,
      period: "pagamento único • acesso anual",
      features: [
        "+750 Riscos de Bordado Russo em alta definição",
        "Guia Passo a Passo para Bordado",
        "Lista de Materiais para Iniciar no Bordado Russo",
        "Acesso anual com suporte por e-mail"
      ],
      ctaText: "Comprar Kit Básico por R$ 19,90",
      isHighlighted: false
    },
    completo: {
      id: "kit_completo",
      name: "Kit Completo",
      subtitle: "A experiência definitiva do iniciante ao avançado",
      badge: "⭐ O MAIS ESCOLHIDO PELAS ALUNAS",
      priceFrom: "R$ 129,90",
      priceTo: "R$ 37,90",
      priceNumber: 37.90,
      period: "pagamento único • acesso vitalício",
      features: [
        "+2.000 Riscos para Bordado Russo organizados por categorias",
        "Lista de Materiais para Iniciantes",
        "Lista de Materiais para Profissionais (onde comprar barato)",
        "Acesso Vitalício sem mensalidades ou taxas futuras",
        "Atualizações mensais com novas coleções de riscos",
        "🎥 BÔNUS 1: Vídeo Aulas Passo a Passo (GRÁTIS)",
        "💰 BÔNUS 2: Guia Prático de Vendas (GRÁTIS)",
        "🤝 BÔNUS 3: Comunidade de Artesanato (GRÁTIS)"
      ],
      ctaText: "Quero o Kit Completo por R$ 37,90",
      isHighlighted: true
    }
  },

  upgradePopup: {
    headline: "Espera! Antes de você continuar… ⏳",
    tag: "OFERTA EXCLUSIVA DE UPGRADE",
    explanation: "Percebemos que você escolheu o Kit Básico por R$ 19,90. Mas queremos que você tenha a melhor experiência possível com o bordado russo!",
    valuePitch: "Por apenas R$ 8 a mais, você leva o Kit Completo com mais de 2.000 riscos, acesso vitalício e TODOS os 3 bônus exclusivos!",
    priceFrom: "R$ 129,90",
    originalOfferPrice: "R$ 37,90",
    upgradePrice: "R$ 27,90",
    priceDifference: "apenas R$ 8 a mais que o básico",
    benefits: [
      "+2.000 Riscos em vez de apenas 750",
      "Acesso Vitalício em vez de 1 ano",
      "Todos os 3 Bônus Gratuitos (Vídeos + Guia de Vendas + Comunidade)",
      "Atualizações mensais incluídas para sempre"
    ],
    ctaAccept: "✨ Sim! Quero o Kit Completo por apenas R$ 27,90",
    ctaDecline: "Não, obrigado. Prefiro continuar com o Kit Básico por R$ 19,90"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = salesData;
}
if (typeof window !== 'undefined') {
  window.salesData = salesData;
}
