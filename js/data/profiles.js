const profiles = {
  REF: {
    id: "REF",
    title: "Seu perfil é: 🌿 A do Refúgio",
    shortTitle: "A do Refúgio",
    badge: "Refúgio & Autocuidado 🌿",
    quote: "Pra desacelerar sem culpa e bordar com o coração.",
    description: "Pra você, bordar é um momento só seu: o ritmo relaxante da agulha acalma a mente e traz paz logo nos primeiros pontos.",
    emotionalMicrocopy: "Esse resultado diz muito sobre a forma como você se conecta com o bordado. 💛",
    images: [
      {
        src: "/assets/images/ref/ref-1.webp",
        alt: "Textura macia e acolhedora de bordado russo",
        caption: "Texturas fofas e volumosas para relaxar"
      },
      {
        src: "/assets/images/ref/ref-2.webp",
        alt: "Mãos bordando ponto a ponto com agulha mágica",
        caption: "Um momento só seu a cada ponto"
      },
      {
        src: "/assets/images/ref/ref-3.webp",
        alt: "Ambiente aconchegante com tons naturais e fios",
        caption: "Criações suaves que trazem paz"
      }
    ],
    accentColor: "#50705E", // sage green
    accentBg: "#EBF3EE"
  },
  REND: {
    id: "REND",
    title: "Seu perfil é: 💸 A Empreendedora de Agulha",
    shortTitle: "A Empreendedora de Agulha",
    badge: "Negócio Criativo & Renda Extra 💸",
    quote: "Onde o amor pelo feito à mão encontra a independência financeira.",
    description: "Você une criatividade e visão: o bordado russo encanta pelo relevo único e tem alta procura para encomendas e presentes.",
    emotionalMicrocopy: "Esse resultado diz muito sobre a forma como você se conecta com o bordado. 💛",
    images: [
      {
        src: "/assets/images/rend/rend-1.webp",
        alt: "Peça finalizada de bordado russo com acabamento comercial",
        caption: "Peças de alto valor percebido e procura"
      },
      {
        src: "/assets/images/rend/rend-2.webp",
        alt: "Detalhes de relevo tridimensional em bastidor",
        caption: "Textura 3D exclusiva que encanta clientes"
      },
      {
        src: "/assets/images/rend/rend-3.webp",
        alt: "Mostruário artesanal pronto para encomendas",
        caption: "Criatividade transformada em renda real"
      }
    ],
    accentColor: "#C0583E", // terracotta
    accentBg: "#FDF2EE"
  },
  PRES: {
    id: "PRES",
    title: "Seu perfil é: 🎁 A Presenteadora",
    shortTitle: "A Presenteadora",
    badge: "Carinho & Afeto Feito à Mão 🎁",
    quote: "O carinho que não se compra em loja nenhuma.",
    description: "Você transforma carinho em arte: cada peça feita à mão carrega afeto verdadeiro e se torna uma lembrança inesquecível.",
    emotionalMicrocopy: "Esse resultado diz muito sobre a forma como você se conecta com o bordado. 💛",
    images: [
      {
        src: "/assets/images/pres/pres-1.webp",
        alt: "Bastidor delicado pronto para presentear",
        caption: "Lembranças inesquecíveis feitas ponto a ponto"
      },
      {
        src: "/assets/images/pres/pres-2.webp",
        alt: "Mimo personalizado em bordado russo",
        caption: "Detalhes delicados que emocionam quem recebe"
      },
      {
        src: "/assets/images/pres/pres-3.webp",
        alt: "Carinho artesanal e fofura em cada laçada",
        caption: "Presentes únicos com afeto verdadeiro"
      }
    ],
    accentColor: "#C68B81", // rose
    accentBg: "#F9EFEF"
  },
  DEC: {
    id: "DEC",
    title: "Seu perfil é: 🏡 A Decoradora",
    shortTitle: "A Decoradora",
    badge: "Casa Acolhedora & Design Afetivo 🏡",
    quote: "Cantinhos cheios de bossa, aconchego e personalidade própria.",
    description: "Você tem o dom de transformar ambientes: o bordado russo entrega peças volumosas em 3D que trazem aconchego e personalidade ao seu lar.",
    emotionalMicrocopy: "Esse resultado diz muito sobre a forma como você se conecta com o bordado. 💛",
    images: [
      {
        src: "/assets/images/dec/dec-1.webp",
        alt: "Almofada e quadro decorativo de bordado russo",
        caption: "Seu lar decorado com sua própria arte"
      },
      {
        src: "/assets/images/dec/dec-2.webp",
        alt: "Composição de parede com bastidores de punch needle",
        caption: "Efeito tridimensional e aconchegante"
      },
      {
        src: "/assets/images/dec/dec-3.webp",
        alt: "Cantinho acolhedor com peças feitas à mão",
        caption: "Design artesanal que transforma ambientes"
      }
    ],
    accentColor: "#D4A373", // sand / caramel
    accentBg: "#FDF6EC"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = profiles;
}
if (typeof window !== 'undefined') {
  window.profilesData = profiles;
}
