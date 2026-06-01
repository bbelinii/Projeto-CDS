// ===========================================================
//  CDS GARAGE — Configuração e conteúdo
//  Edite aqui o WhatsApp, preços, textos e área de atendimento.
// ===========================================================

/* ⬇️ AJUSTE: número com 55 (país) + DDD + número, só dígitos. Ex.: 5547999998888 */
export const WHATSAPP = "5500000000000";

export const INSTAGRAM = "https://www.instagram.com/cdsgarage26/";
export const INSTAGRAM_HANDLE = "@cdsgarage26";

/* ⬇️ AJUSTE: cidade/região que você atende (usado no texto e no SEO local) */
export const CIDADE = "sua cidade e região";

/* monta link do WhatsApp com mensagem pronta */
export const wa = (texto = "Olá, CDS Garage!") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

export const STEPS = [
  {
    n: "01",
    icon: "MessageCircle",
    title: "Você chama no WhatsApp",
    text: "Manda o modelo do carro e o seu endereço. A gente responde rápido e já confirma o melhor horário.",
  },
  {
    n: "02",
    icon: "Truck",
    title: "A gente vai até você",
    text: "Chegamos na sua casa ou trabalho com água, energia, equipamento e produtos. Você não se desloca nem enfrenta fila.",
  },
  {
    n: "03",
    icon: "Sparkles",
    title: "Seu carro brilhando",
    text: "Toca a sua vida enquanto cuidamos de tudo. No fim, você recebe o carro limpinho — sem ter saído de casa.",
  },
];

export const SERVICES = [
  {
    icon: "Droplets",
    title: "Lavagem Detalhada",
    desc: "Lavagem externa minuciosa, rodas, frisos e secagem sem marcas. O básico muito bem feito.",
    price: "R$ 80",
    wa: "Olá! Quero um orçamento de Lavagem Detalhada em domicílio.",
  },
  {
    icon: "Armchair",
    title: "Higienização Interna",
    desc: "Bancos, carpetes, teto e plásticos limpos e revitalizados. Tira odor e devolve o cheiro de novo.",
    price: "R$ 150",
    wa: "Olá! Quero um orçamento de Higienização Interna em domicílio.",
  },
  {
    icon: "Star",
    title: "Polimento Técnico",
    desc: "Remove riscos leves, marcas de lavagem e devolve o brilho profundo da pintura.",
    price: "R$ 300",
    wa: "Olá! Quero um orçamento de Polimento Técnico em domicílio.",
  },
  {
    icon: "CloudRain",
    title: "Cristalização de Vidros",
    desc: "Repele a água e melhora a visão na chuva. Mais segurança ao dirigir.",
    price: "R$ 120",
    wa: "Olá! Quero um orçamento de Cristalização de Vidros em domicílio.",
  },
  {
    icon: "ShieldCheck",
    title: "Enceramento & Proteção",
    desc: "Camada que realça a cor, facilita a lavagem e protege a pintura contra o sol.",
    price: "R$ 100",
    wa: "Olá! Quero um orçamento de Enceramento e Proteção em domicílio.",
  },
  {
    icon: "Wind",
    title: "Higienização de Ar",
    desc: "Limpeza do ar-condicionado que elimina fungos e bactérias. Respire ar limpo.",
    price: "R$ 180",
    wa: "Olá! Quero um orçamento de Higienização de Ar-condicionado em domicílio.",
  },
];

export const FEATURES = [
  { icon: "Home", label: "Atendemos em domicílio" },
  { icon: "Clock", label: "Você não perde tempo" },
  { icon: "Hand", label: "Feito à mão, com capricho" },
  { icon: "BadgeCheck", label: "Produtos profissionais" },
];

export const FAQS = [
  {
    q: "Como funciona o atendimento em domicílio?",
    a: "Você agenda pelo WhatsApp e a gente vai até a sua casa ou trabalho com tudo o que precisa — água, equipamento e produtos. Você não precisa sair de casa nem levar o carro a lugar nenhum.",
  },
  {
    q: "Quais regiões vocês atendem?",
    a: "Atendemos toda a região de " + CIDADE + ". Mande seu endereço no WhatsApp que a gente confirma na hora se cobre o seu bairro. (Edite a área de atendimento conforme o seu raio.)",
  },
  {
    q: "Quanto tempo demora cada serviço?",
    a: "Uma lavagem detalhada leva em média de 1 a 2 horas; higienização e polimento podem levar mais. Passamos o tempo certinho no orçamento, antes de começar.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos Pix, cartão e dinheiro, na hora do serviço. (Ajuste conforme o que você aceita.)",
  },
  {
    q: "Preciso ter ponto de água e energia?",
    a: "Trabalhamos preparados para atender com autonomia. Se precisarmos de algo do local, avisamos no agendamento — sem surpresa na hora.",
  },
];

// ===========================================================
//  AGENDAMENTO — expediente, horários e mensagem do WhatsApp
// ===========================================================

/* Duração estimada por serviço (mostrada na tela de agendamento) */
export const DURACOES = {
  "Lavagem Detalhada": "1h – 1h30",
  "Higienização Interna": "2h – 3h",
  "Polimento Técnico": "3h – 5h",
  "Cristalização de Vidros": "40 min",
  "Enceramento & Proteção": "1h – 2h",
  "Higienização de Ar": "1h",
};

/* ⬇️ AJUSTE seu expediente. 0 = Domingo ... 6 = Sábado. null = fechado. */
export const EXPEDIENTE = {
  semana:  { inicio: 8, fim: 18 }, // Seg a Sex (08h às 18h)
  sabado:  { inicio: 8, fim: 13 }, // Sábado (08h às 13h)
  domingo: null,                   // Domingo fechado
};

/* Gera os horários disponíveis (de hora em hora) para uma data */
export function gerarHorarios(date) {
  const d = date.getDay();
  if (d === 0) return [];               // domingo fechado
  const cfg = d === 6 ? EXPEDIENTE.sabado : EXPEDIENTE.semana;
  if (!cfg) return [];
  const slots = [];
  for (let h = cfg.inicio; h < cfg.fim; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

/* Monta a mensagem de agendamento que será enviada no WhatsApp */
export function mensagemAgendamento({ servico, dataLabel, hora, nome, telefone, veiculo, endereco, obs }) {
  const linhas = [
    "Olá, CDS Garage! Quero agendar um serviço em domicílio:",
    "",
    `• Serviço: ${servico || "-"}`,
    `• Data: ${dataLabel || "-"}`,
    `• Horário: ${hora || "-"}`,
    `• Veículo: ${veiculo || "-"}`,
    `• Endereço: ${endereco || "-"}`,
    `• Nome: ${nome || "-"}`,
    `• WhatsApp: ${telefone || "-"}`,
  ];
  if (obs) linhas.push(`• Observações: ${obs}`);
  linhas.push("", "Podem confirmar pra mim, por favor?");
  return linhas.join("\n");
}
