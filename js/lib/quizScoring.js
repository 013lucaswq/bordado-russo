/**
 * Motor de Pontuação e Desempate - Ateliê dos Fios
 * 
 * Estrutura do Quiz (Nova Ordem):
 * - Q1: Experiência ("Você já bordou antes?") -> NÃO pontua
 * - Q2: Atração ("O que mais te atrai no bordado russo?") -> Pontua (+1) e é o CRITÉRIO DE DESEMPATE!
 * - Q3: Rotina ("Como está sua rotina hoje?") -> Pontua (+1)
 * - Q4: Primeiras peças ("Se você pudesse escolher...") -> Pontua (+1)
 * - Q5: Frase de identificação ("Qual dessas frases...") -> Pontua (+1)
 * - Q6: Motivador bônus ("Quando pensa em aprender...") -> NÃO pontua
 * 
 * Perfis: REF, REND, PRES, DEC
 */
function calculateProfile(answers) {
  const scores = {
    REF: 0,
    REND: 0,
    PRES: 0,
    DEC: 0
  };

  const getTag = (qNum) => {
    const ans = answers[qNum];
    if (!ans) return null;
    return typeof ans === 'object' ? ans.tag : ans;
  };

  const tag1 = getTag(1);
  const tag2 = getTag(2);
  const tag3 = getTag(3);
  const tag4 = getTag(4);
  const tag5 = getTag(5);
  // tag6 é bônus

  const experienceTags = ['NUNCA', 'BASICO', 'AVANCADO', 'FREQUENTE'];
  const profileTags = ['REF', 'REND', 'PRES', 'DEC'];

  let scoringTags = [];
  let tieBreakerTag = null;

  // Se Q1 for tag de experiência, estamos na Nova Ordem
  if (experienceTags.includes(tag1)) {
    // Nova ordem: Q2, Q3, Q4, Q5 pontuam; Q2 decide desempate
    scoringTags = [tag2, tag3, tag4, tag5];
    tieBreakerTag = tag2;
  } else {
    // Formato legado: Q1, Q2, Q4, Q5 pontuam; Q1 decide desempate
    scoringTags = [tag1, tag2, tag4, tag5];
    tieBreakerTag = tag1;
  }

  for (const tag of scoringTags) {
    if (tag && scores[tag] !== undefined) {
      scores[tag] += 1;
    }
  }

  // Identificar a maior pontuação
  let maxScore = -1;
  for (const p of profileTags) {
    if (scores[p] > maxScore) {
      maxScore = scores[p];
    }
  }

  // Perfis líderes
  const topProfiles = profileTags.filter(p => scores[p] === maxScore);
  let finalProfile = topProfiles[0] || 'REF';

  // Desempate
  if (topProfiles.length > 1) {
    if (tieBreakerTag && topProfiles.includes(tieBreakerTag)) {
      finalProfile = tieBreakerTag;
    } else if (tieBreakerTag && scores[tieBreakerTag] !== undefined) {
      finalProfile = tieBreakerTag;
    }
  }

  return {
    profile: finalProfile,
    scores: { ...scores }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateProfile };
}
if (typeof window !== 'undefined') {
  window.calculateProfile = calculateProfile;
}
