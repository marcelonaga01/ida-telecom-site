const app = document.querySelector("#app");
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#siteNav");

const solutions = [
  {
    id: "internet-dedicada",
    title: "Internet Dedicada e XGSPON",
    text: "Conectividade corporativa com SLA, monitoramento, redundância e capacidade para ambientes que não podem depender de links residenciais ou assimétricos.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    items: ["Internet corporativa", "Link dedicado", "SLA", "Monitoramento", "Redundancia", "Escalabilidade"],
  },
  {
    id: "fwa",
    title: "FWA Corporativo",
    text: "Solucoes de acesso fixo sem fio utilizando redes LTE e 5G para acelerar implantacoes e complementar ambientes corporativos.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    items: ["Ativação rápida", "Backup da fibra", "Expansão de cobertura", "Mobilidade"],
  },
  {
    id: "privativas",
    title: "Redes Privativas LTE/5G",
    text: "Projetamos redes móveis privadas para empresas e operações críticas que exigem cobertura dedicada, controle de tráfego e integração com sistemas corporativos.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    items: ["APN privada", "Core LTE/5G", "QoS", "SIM/eSIM", "Cobertura indoor e outdoor", "Integração corporativa"],
  },
  {
    id: "wifi",
    title: "Wi-Fi Corporativo",
    text: "Projetos indoor e outdoor de alta densidade, com segmentação por VLAN, segurança, monitoramento e operação assistida.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    items: ["Indoor", "Outdoor", "Alta densidade", "VLAN", "Seguranca", "Monitoramento"],
  },
  {
    id: "datacenter",
    title: "Data Center e NOC",
    text: "Hosting, colocation, backup, monitoramento e suporte especializado para sustentar a operação de conectividade de ponta a ponta.",
    image: "https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=1200&q=80",
    items: ["Hosting", "Colocation", "Backup", "Monitoramento", "Operação assistida", "Suporte especializado"],
  },
];

const articles = [
  ["redes-privativas-lte", "Redes Privativas", "Redes Privativas LTE: o que são e por que estão transformando a conectividade", "Entenda como redes LTE privativas entregam mobilidade, segurança, cobertura ampla e previsibilidade para operações corporativas críticas."],
  ["redes-privativas-5g", "LTE e 5G", "O que são Redes Privativas 5G?", "Entenda como redes 5G privativas entregam conectividade dedicada, segura, controlada e de alta performance para operações críticas."],
  ["como-funciona-fwa", "FWA", "Como funciona o FWA?", "Acesso fixo sem fio com LTE/5G para empresas, ISPs e operações remotas."],
  ["apn-privada", "Redes Privativas", "O que é APN Privada?", "A separação lógica que permite tráfego móvel corporativo com mais controle e segurança."],
  ["core-lte", "LTE e 5G", "O que é um Core LTE e por que ele é o cérebro de uma rede 4G?", "Entenda como o EPC autentica usuários, gerencia mobilidade, controla sessões e encaminha tráfego em redes 4G."],
  ["core-5g", "LTE e 5G", "Como funciona um Core 5G?", "Arquitetura 5GC, funções de rede e o caminho para ambientes corporativos modernos."],
  ["lte-ou-wifi", "Redes Privativas", "Rede Privativa 4G/5G: por que ela não é apenas um Wi-Fi maior?", "Entenda por que redes privativas LTE e 5G são indicadas para operações críticas, grandes áreas de cobertura, mobilidade e conectividade previsível."],
  ["mimo", "Mercado Telecom", "Como os provedores de internet estão deixando dinheiro na mesa", "Por que ISPs podem criar novas receitas recorrentes ao oferecer redes privativas LTE/5G, FWA corporativo, APN exclusiva, Core e NOC para empresas."],
  ["ofdma", "LTE e 5G", "Como funciona o OFDMA?", "A tecnologia que permite ao 4G e 5G compartilhar o espectro entre milhares de dispositivos."],
  ["qos-lte-5g", "Redes Privativas", "O que é QoS em LTE e 5G?", "Priorização de tráfego para aplicações críticas em redes móveis corporativas."],
  ["areas-remotas", "Mercado Telecom", "Como levar conectividade para áreas remotas?", "Arquiteturas híbridas com fibra, FWA, rádio e redes privativas para operações fora dos grandes centros."],
  ["telecom-2030", "Mercado Telecom", "Tendências do Mercado de Telecom até 2030: o que esperar da próxima década", "O papel das redes privativas, FWA, Edge Computing, IA, IoT e conectividade híbrida na evolução do setor de telecom."],
].map(([slug, category, title, excerpt]) => ({ slug, category, title, excerpt }));

const categories = ["Todos", "Redes Privativas", "LTE e 5G", "FWA", "Mercado Telecom"];

const pageMeta = {
  "/": ["IDA Telecom | Engenharia de Conectividade para Empresas", "Fibra e 4G/5G trabalhando juntos para aumentar a disponibilidade da rede e gerar novas oportunidades de negócio."],
  "/para-provedores": ["IDA Telecom para Provedores | FWA, LTE/5G e NOC", "Aceleramos a expansão de provedores com fibra, FWA, redes privativas LTE/5G, hosting de Core e NOC terceirizado."],
  "/redes-privativas-4g-5g": ["Redes Privativas LTE/5G | IDA Telecom", "Projetos de redes privativas 4G e 5G com APN privada, Core LTE, Core 5G, QoS, SIM/eSIM e cobertura indoor/outdoor."],
  "/fwa-corporativo": ["FWA Corporativo | IDA Telecom", "Acesso fixo sem fio com LTE e 5G para backup de fibra, expansão de cobertura, ISPs e empresas."],
  "/artigos": ["Centro de Conhecimento | IDA Telecom", "Artigos técnicos sobre redes privativas, LTE, 5G, FWA, XGSPON, provedores, Wi-Fi corporativo e engenharia de redes."],
  "/casos-de-sucesso": ["Casos de Sucesso | IDA Telecom", "Exemplos de conectividade corporativa para rodovias, áreas remotas, logística, Wi-Fi corporativo e operações críticas."],
  "/sobre-a-ida": ["Sobre a IDA | Engenharia de Conectividade", "A IDA Telecom projeta, integra e opera infraestruturas de conectividade para empresas, provedores e operacoes distribuidas."],
};

function icon(label) {
  return `<span class="icon-box" aria-hidden="true">${label}</span>`;
}

function lineIcon(name) {
  const icons = {
    coverage: `<path d="M4 17a8 8 0 0 1 16 0"/><path d="M8 17a4 4 0 0 1 8 0"/><path d="M12 17v3"/>`,
    capacity: `<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15l3-4 3 2 4-7"/>`,
    availability: `<path d="M12 21a9 9 0 1 0-9-9"/><path d="M8 12l2.5 2.5L16 9"/>`,
    expansion: `<path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/><path d="M3 3l6 6"/><path d="M21 3l-6 6"/><path d="M3 21l6-6"/><path d="M21 21l-6-6"/>`,
    redundancy: `<path d="M4 7h9a5 5 0 0 1 5 5v1"/><path d="M15 10l3 3 3-3"/><path d="M20 17h-9a5 5 0 0 1-5-5v-1"/><path d="M9 14l-3-3-3 3"/>`,
    mobility: `<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17h2"/><path d="M19 7l2-2"/><path d="M19 17l2 2"/>`,
    operation: `<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/><path d="M7 10h3l2-3 2 6 2-3h1"/>`,
    fiber: `<path d="M4 12c4-6 12-6 16 0"/><path d="M4 12c4 6 12 6 16 0"/><path d="M12 7v10"/>`,
    mobile: `<path d="M5 18a10 10 0 0 1 14 0"/><path d="M8 14a6 6 0 0 1 8 0"/><path d="M11 10a2 2 0 0 1 2 0"/><path d="M12 18v2"/>`,
    fwa: `<path d="M4 18h16"/><path d="M7 18V9l5-4 5 4v9"/><path d="M10 13h4"/><path d="M18 6l3-3"/><path d="M20 9l2-1"/>`,
    private: `<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/><path d="M9 12l2 2 4-5"/>`,
    wifi: `<path d="M5 10a10 10 0 0 1 14 0"/><path d="M8 13a6 6 0 0 1 8 0"/><path d="M11 16a2 2 0 0 1 2 0"/><path d="M12 19h.01"/>`,
    transport: `<path d="M4 7h6"/><path d="M14 7h6"/><path d="M10 7a2 2 0 0 0 4 0"/><path d="M4 17h6"/><path d="M14 17h6"/><path d="M10 17a2 2 0 0 1 4 0"/><path d="M12 9v6"/>`,
    managed: `<path d="M4 5h16v10H4z"/><path d="M8 19h8"/><path d="M12 15v4"/><path d="M8 10h2"/><path d="M12 10h4"/>`,
  };
  return `<span class="line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${icons[name]}</svg></span>`;
}

function list(items) {
  return `<ul class="feature-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function pageHero(title, text, tags = []) {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">IDA Telecom</span>
        <h1>${title}</h1>
        <p>${text}</p>
        ${tags.length ? `<div class="pill-row">${tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}</div>` : ""}
      </div>
    </section>
  `;
}

function homePage() {
  return `
    <section class="hero" id="inicio">
      <div class="hero-content">
        <span class="eyebrow">Engenharia de conectividade</span>
        <h1>Engenharia de conectividade para operações que precisam evoluir.</h1>
        <p class="hero-text">
          Projetamos, integramos e operamos infraestruturas de conectividade combinando diferentes tecnologias conforme os requisitos de cada operação.
        </p>
        <div class="hero-actions">
          <a class="button" href="#contato" data-link>Falar sobre meu projeto</a>
          <a class="hero-link" href="#posicionamento" data-link>Como trabalhamos →</a>
        </div>
      </div>
    </section>

    <section class="section home-positioning" id="posicionamento">
      <div class="container">
        <div class="editorial-statement">
          <span class="eyebrow">Nosso ponto de partida</span>
          <h2>A tecnologia vem depois do desenho de engenharia.</h2>
          <p>
            Primeiro entendemos cobertura, criticidade, mobilidade, capacidade, integração e risco. Depois combinamos as camadas de conectividade que sustentam a operação.
          </p>
        </div>
        <div class="positioning-lines">
          ${[
            ["Requisito", "Levantamento técnico do ambiente, dos sistemas e dos pontos de falha."],
            ["Arquitetura", "Escolha dos meios de acesso, transporte, redundância e segurança."],
            ["Operação", "Implantação, monitoramento, suporte e evolução contínua da rede."],
          ].map(([title, text]) => `
            <article>
              <h3>${title}</h3>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section alt home-problems" id="problemas">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Problemas que resolvemos</span>
            <h2 class="section-title">Antes da solução, existe uma operação que precisa funcionar.</h2>
          </div>
        </div>
        <div class="requirement-grid">
          ${[
            ["coverage", "Cobertura", "Áreas internas, externas, remotas ou distribuídas."],
            ["capacity", "Capacidade", "Tráfego, usuários, aplicações e crescimento."],
            ["availability", "Disponibilidade", "Menos pontos únicos de falha."],
            ["expansion", "Expansão", "Novas unidades, regiões e frentes de trabalho."],
            ["redundancy", "Redundância", "Caminhos alternativos para serviços essenciais."],
            ["mobility", "Mobilidade", "Equipes, veículos, sensores e equipamentos em movimento."],
            ["operation", "Operação", "Monitoramento, sustentação e evolução da rede."],
          ].map(([iconName, title, text]) => `
            <article class="editorial-icon-item">
              ${lineIcon(iconName)}
              <h3>${title}</h3>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section home-technologies" id="solucoes">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Soluções</span>
            <h2 class="section-title">Camadas que podem trabalhar juntas.</h2>
          </div>
        </div>
        <div class="technology-grid">
          ${[
            ["fiber", "Fibra / XGS-PON", "Backbone e acesso de alta capacidade."],
            ["mobile", "4G/5G", "Conectividade móvel para operações distribuídas."],
            ["fwa", "FWA", "Acesso sem fio para expansão, backup e rápida ativação."],
            ["private", "Redes Privativas", "Controle, QoS e políticas dedicadas à operação."],
            ["wifi", "Wi-Fi", "Cobertura indoor e outdoor de alta densidade."],
            ["transport", "Links & Transporte", "Interligação entre unidades, sites e POPs."],
            ["managed", "Operação Gerenciada", "Monitoramento, suporte e evolução da infraestrutura."],
          ].map(([iconName, title, text]) => `
            <article class="editorial-icon-item technology-icon-item">
              ${lineIcon(iconName)}
              <h3>${title}</h3>
              <p>${text}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section alt home-segments" id="segmentos">
      <div class="container segments-editorial">
        <div class="segments-copy">
          <span class="eyebrow">Segmentos e operações</span>
          <h2 class="section-title">O mesmo requisito técnico muda de forma em cada contexto.</h2>
          <p class="lead">Ambientes diferentes podem utilizar as mesmas tecnologias — mas exigem arquiteturas diferentes.</p>
        </div>
        <div class="segment-photo-grid">
          ${[
            ["Indústria", "https://images.unsplash.com/photo-1513257805917-a0da1146eb15?auto=format&fit=crop&w=1200&q=80", "50% center", "Vista aérea de planta industrial com maquinário"],
            ["Portos & Logística", "https://images.unsplash.com/photo-1640529494825-4add7eed660e?auto=format&fit=crop&w=1200&q=80", "50% center", "Vista aérea de terminal portuário com contêineres"],
            ["Provedores & Operadores", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cellular_5G_Equipment_-_Cell_Tower_Antennas.jpg/1280px-Cellular_5G_Equipment_-_Cell_Tower_Antennas.jpg", "34% center", "Equipamentos e antenas setoriais em torre de telecomunicações"],
            ["Agronegócio", "https://images.unsplash.com/photo-1787088767504-5467a145416c?auto=format&fit=crop&w=1200&q=80", "34% 38%", "Colheitadeira trabalhando em lavoura vista do alto"],
            ["Rodovias & Infraestrutura", "https://images.unsplash.com/photo-1764232317908-008813d734af?auto=format&fit=crop&w=1200&q=80", "50% center", "Vista aérea de infraestrutura rodoviária"],
            ["Condomínios & Complexos", "https://images.unsplash.com/photo-1510195888718-b45a09ffc21a?auto=format&fit=crop&w=1200&q=80", "50% center", "Vista aérea de complexo residencial com vias internas"],
          ].map(([title, image, position, alt]) => `
            <article class="segment-photo">
              <img src="${image}" alt="${alt}" style="object-position: ${position};" loading="lazy" />
              <h3>${title}</h3>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section home-practice" id="pratica">
      <div class="container practice-layout">
        <div class="practice-media">
          <img src="/assets/ida-infra-campinas-antena-real.jpeg" alt="Equipamento de telecomunicações instalado em Campinas" loading="lazy" />
        </div>
        <div>
          <span class="eyebrow">Engenharia na prática</span>
          <h2 class="section-title">A rede precisa sair do desenho e sustentar o ambiente real.</h2>
          <p class="lead">Projetos de conectividade dependem de instalação, integração, monitoramento e operação contínua. A evidência técnica aparece no campo, não no slide.</p>
          <ul class="editorial-list">
            <li>Levantamento de requisitos e riscos da operação.</li>
            <li>Definição da arquitetura de acesso e transporte.</li>
            <li>Integração entre tecnologias, fornecedores e ambiente do cliente.</li>
            <li>Operação assistida, suporte e evolução da infraestrutura.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section alt home-knowledge" id="conhecimento">
      <div class="container knowledge-editorial">
        <div class="knowledge-heading">
          <span class="eyebrow">CENTRO DE CONHECIMENTO</span>
          <h2>Entender a tecnologia ajuda a projetar melhor.</h2>
        </div>
        <div class="knowledge-callout">
          <p>Conteúdo técnico sobre redes móveis, conectividade, infraestrutura e arquitetura para apoiar decisões de projeto e operação.</p>
          <a href="/artigos" data-link>Explorar o Centro de Conhecimento →</a>
        </div>
      </div>
    </section>

    ${contactSection()}
  `;
}

function providersPage() {
  return `
    ${pageHero("Aceleramos a expansão de provedores de internet", "Apoiamos ISPs na criação de novas ofertas de conectividade utilizando fibra, FWA e redes privativas LTE/5G.", ["FWA corporativo", "Hosting de Core", "NOC terceirizado", "Engenharia de RF"])}
    <section class="section">
      <div class="container">
        <div class="grid three">
          ${[
            ["EC", "Expansão de cobertura", "Planejamento para entrar em novas regiões com fibra, FWA e arquiteturas híbridas."],
            ["FW", "FWA corporativo", "Ofertas empresariais com LTE/5G para ativacao rapida, redundancia e alcance."],
            ["HC", "Hosting de Core", "Ambiente técnico para sustentar Core LTE, Core 5G e serviços de rede."],
            ["NO", "NOC terceirizado", "Monitoramento, suporte especializado e operação assistida para ISPs."],
            ["5G", "Projetos LTE/5G", "Desenho, implantacao e integracao de redes moveis privadas."],
            ["RF", "Engenharia de RF", "Análise de cobertura, capacidade, interferência e posicionamento de rádios."],
          ].map(([i, t, p]) => `<article class="card padded">${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join("")}
        </div>
      </div>
    </section>
    ${contactSection()}
  `;
}

function privateNetworksPage() {
  return `
    ${pageHero("Redes Privativas LTE/5G para operações críticas", "Projetamos redes móveis privadas com Core LTE, Core 5G, APN privada, QoS, SIM/eSIM e cobertura indoor e outdoor.", ["LTE Privativo", "5G Privativo", "APN Privada", "QoS", "SIM/eSIM"])}
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Arquitetura</span>
            <h2 class="section-title">Controle, cobertura e previsibilidade</h2>
          </div>
          <p>Uma rede privativa permite que a empresa opere conectividade movel dedicada, com politica de trafego, autenticacao, priorizacao e integracao aos sistemas corporativos.</p>
        </div>
        <div class="grid three">
          ${[
            ["OP", "O que e uma rede privativa", "Rede LTE/5G dedicada para uma empresa, unidade operacional, campus, rodovia, fazenda ou area industrial."],
            ["CL", "Core LTE", "EPC responsavel por autenticacao, sessao, roteamento e politicas de rede em ambientes 4G."],
            ["C5", "Core 5G", "Arquitetura moderna para maior densidade, baixa latencia e novos modelos de servico."],
            ["AP", "APN Privada", "Separacao logica de trafego movel para acesso corporativo controlado."],
            ["QS", "QoS", "Priorizacao de aplicacoes criticas, telemetria, voz, video e sistemas de campo."],
            ["SI", "SIM e eSIM", "Gestao de identidade dos dispositivos conectados a rede privativa."],
          ].map(([i, t, p]) => `<article class="card padded">${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Casos de uso</span>
            <h2 class="section-title">Onde redes privativas criam vantagem operacional</h2>
          </div>
          <p>Aplicações de voz, vídeo, telemetria, sensores, operação remota, rastreamento e conectividade de campo dependem de cobertura previsível e gestão técnica.</p>
        </div>
        ${list(["Logística", "Indústria", "Rodovias", "Agronegócio", "Condomínios", "Operações remotas"])}
      </div>
    </section>
    ${contactSection()}
  `;
}

function fwaPage() {
  return `
    ${pageHero("FWA Corporativo", "Acesso fixo sem fio com LTE e 5G para empresas, provedores e operacoes que precisam ativar conectividade com velocidade, redundancia e flexibilidade.", ["Backup da fibra", "FWA para ISPs", "FWA para empresas"])}
    <section class="section">
      <div class="container">
        <div class="grid two">
          ${[
            ["OF", "O que e FWA", "Fixed Wireless Access conecta um ponto fixo usando rede sem fio LTE ou 5G, substituindo ou complementando o acesso cabeado."],
            ["CF", "Como funciona", "CPEs, antenas, radio bases e Core trabalham para entregar conectividade corporativa monitorada."],
            ["BF", "Backup da fibra", "Quando a fibra falha, o FWA pode assumir como caminho alternativo para reduzir indisponibilidade."],
            ["PI", "FWA para ISPs", "Provedores podem criar ofertas empresariais, expandir cobertura e antecipar receita em regioes sem fibra pronta."],
            ["PE", "FWA para empresas", "Empresas ganham ativacao rapida, mobilidade operacional e conectividade para areas temporarias ou remotas."],
            ["EX", "Expansão de cobertura", "Ideal para pátios logísticos, filiais, obras, áreas rurais, condomínios e operações distribuídas."],
          ].map(([i, t, p]) => `<article class="card padded">${icon(i)}<h3>${t}</h3><p>${p}</p></article>`).join("")}
        </div>
      </div>
    </section>
    ${contactSection()}
  `;
}

function articlesPage(activeCategory = "Todos") {
  const filtered = activeCategory === "Todos" ? articles : articles.filter((article) => article.category === activeCategory);
  return `
    ${pageHero("Centro de Conhecimento", "Conteúdo técnico para transformar a IDA Telecom em referência em telecomunicações, conectividade corporativa, redes privativas, FWA, XGSPON e engenharia de redes.", categories.slice(1))}
    <section class="section">
      <div class="container">
        <div class="article-toolbar">
          ${categories.map((category) => `<button class="filter-button ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">${category}</button>`).join("")}
        </div>
        <div class="grid three" id="articleGrid">
          ${filtered.map((article) => `
            <article class="card padded article-card">
              <small>${article.category}</small>
              <h3>${article.title}</h3>
              <p>${article.excerpt}</p>
              <a href="/artigos/${article.slug}" data-link>Ler artigo</a>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function coreLteArticlePage() {
  const title = "O que é um Core LTE e por que ele é o cérebro de uma rede 4G?";
  const excerpt = "Quando utilizamos um smartphone, tablet, roteador LTE ou qualquer dispositivo conectado a uma rede 4G, existe uma serie de processos acontecendo nós bastidores para que a comunicação funcione de forma segura, estavel e transparente.";
  return `
    ${pageHero(title, excerpt, ["Core LTE", "EPC", "Redes 4G", "FWA", "Redes corporativas"])}
    <section class="section">
      <article class="container article-page">
        <p>Quando utilizamos um smartphone, tablet, roteador LTE ou qualquer dispositivo conectado a uma rede 4G, existe uma serie de processos acontecendo nós bastidores para que a comunicação funcione de forma segura, estavel e transparente.</p>
        <p>Embora antenas, torres e estações rádio base sejam os elementos mais visiveis, a verdadeira inteligência da rede está concentrada em um componente chamado <strong>Core LTE</strong>, também conhecido como <strong>EPC - Evolved Packet Core</strong>.</p>
        <p>E o Core LTE que autentica usuários, distribui endereços IP, gerencia mobilidade, controla sessões e encaminha o tráfego para à Internet, redes corporativas ou aplicações específicas.</p>

        <h2>Arquitetura simplificada de uma rede LTE</h2>
        <div class="article-diagram">
          <svg width="100%" height="330" viewBox="0 0 1200 330" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="330" fill="#F8FAFC"/>
            <rect x="40" y="115" width="190" height="90" rx="16" fill="#6366F1"/>
            <text x="135" y="150" text-anchor="middle" fill="white" font-size="20" font-weight="700">Dispositivos</text>
            <text x="135" y="178" text-anchor="middle" fill="white" font-size="14">CPE - Tablet - IoT</text>
            <rect x="330" y="115" width="190" height="90" rx="16" fill="#2563EB"/>
            <text x="425" y="153" text-anchor="middle" fill="white" font-size="22" font-weight="700">eNodeB</text>
            <text x="425" y="178" text-anchor="middle" fill="white" font-size="14">Rede de acesso rádio</text>
            <rect x="620" y="75" width="260" height="170" rx="20" fill="#0F172A"/>
            <text x="750" y="112" text-anchor="middle" fill="white" font-size="25" font-weight="700">Core LTE</text>
            <text x="750" y="138" text-anchor="middle" fill="#CBD5E1" font-size="14">EPC</text>
            <rect x="645" y="165" width="58" height="42" rx="8" fill="#334155"/>
            <text x="674" y="191" text-anchor="middle" fill="white" font-size="13">MME</text>
            <rect x="714" y="165" width="58" height="42" rx="8" fill="#334155"/>
            <text x="743" y="191" text-anchor="middle" fill="white" font-size="13">HSS</text>
            <rect x="783" y="165" width="58" height="42" rx="8" fill="#334155"/>
            <text x="812" y="191" text-anchor="middle" fill="white" font-size="13">PGW</text>
            <rect x="980" y="70" width="180" height="75" rx="16" fill="#10B981"/>
            <text x="1070" y="112" text-anchor="middle" fill="white" font-size="18" font-weight="700">Backbone IP</text>
            <rect x="980" y="185" width="180" height="75" rx="16" fill="#0EA5E9"/>
            <text x="1070" y="228" text-anchor="middle" fill="white" font-size="18" font-weight="700">Internet</text>
            <line x1="230" y1="160" x2="330" y2="160" stroke="#334155" stroke-width="4"/>
            <polygon points="322,153 335,160 322,167" fill="#334155"/>
            <line x1="520" y1="160" x2="620" y2="160" stroke="#334155" stroke-width="4"/>
            <polygon points="612,153 625,160 612,167" fill="#334155"/>
            <line x1="880" y1="150" x2="980" y2="108" stroke="#334155" stroke-width="4"/>
            <polygon points="969,107 983,106 974,117" fill="#334155"/>
            <line x1="880" y1="185" x2="980" y2="223" stroke="#334155" stroke-width="4"/>
            <polygon points="970,213 983,224 968,226" fill="#334155"/>
          </svg>
        </div>

        <p>De forma simples, os dispositivos acessam à rede pela eNodeB, que encaminha a comunicação para o Core LTE. A partir dele, o tráfego pode seguir para à Internet, para um backbone IP, para uma rede corporativa ou para serviços específicos do provedor.</p>

        <h2>Onde o Core LTE é utilizado?</h2>
        <p>O Core LTE pode ser utilizado em diferentes tipos de redes 4G, como:</p>
        <ul class="article-list">
          <li>Operadoras móveis;</li>
          <li>Provedores de Internet que oferecem FWA 4G;</li>
          <li>Redes corporativas;</li>
          <li>Indústrias e centros logísticos;</li>
          <li>Utilities, rodovias, portos e mineracao.</li>
        </ul>
        <p>Independentemente do cenário, a funcao principal do Core LTE permanece a mesma: controlar usuários, sessões, mobilidade, endereçamento IP e tráfego.</p>

        <h2>Como um dispositivo se conecta à rede LTE?</h2>
        <p>Quando um dispositivo e ligado, ele procura uma célula LTE disponível, solicita acesso, passa pelo processo de autenticação, recebe um endereço IP e, entao, começa a transmitir dados.</p>
        <div class="article-diagram">
          <svg width="100%" height="230" viewBox="0 0 1200 230" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="230" fill="#F8FAFC"/>
            <rect x="35" y="80" width="170" height="70" rx="14" fill="#6366F1"/>
            <text x="120" y="110" text-anchor="middle" fill="white" font-size="16" font-weight="700">Dispositivo</text>
            <text x="120" y="132" text-anchor="middle" fill="white" font-size="13">e ligado</text>
            <rect x="270" y="80" width="170" height="70" rx="14" fill="#4F46E5"/>
            <text x="355" y="110" text-anchor="middle" fill="white" font-size="16" font-weight="700">Busca LTE</text>
            <text x="355" y="132" text-anchor="middle" fill="white" font-size="13">célula disponível</text>
            <rect x="505" y="80" width="170" height="70" rx="14" fill="#4338CA"/>
            <text x="590" y="110" text-anchor="middle" fill="white" font-size="16" font-weight="700">Autenticacao</text>
            <text x="590" y="132" text-anchor="middle" fill="white" font-size="13">SIM / HSS</text>
            <rect x="740" y="80" width="170" height="70" rx="14" fill="#2563EB"/>
            <text x="825" y="110" text-anchor="middle" fill="white" font-size="16" font-weight="700">Recebe IP</text>
            <text x="825" y="132" text-anchor="middle" fill="white" font-size="13">sessão criada</text>
            <rect x="975" y="80" width="170" height="70" rx="14" fill="#10B981"/>
            <text x="1060" y="110" text-anchor="middle" fill="white" font-size="16" font-weight="700">Conectado</text>
            <text x="1060" y="132" text-anchor="middle" fill="white" font-size="13">dados liberados</text>
            <line x1="205" y1="115" x2="270" y2="115" stroke="#334155" stroke-width="4"/>
            <polygon points="260,108 274,115 260,122" fill="#334155"/>
            <line x1="440" y1="115" x2="505" y2="115" stroke="#334155" stroke-width="4"/>
            <polygon points="495,108 509,115 495,122" fill="#334155"/>
            <line x1="675" y1="115" x2="740" y2="115" stroke="#334155" stroke-width="4"/>
            <polygon points="730,108 744,115 730,122" fill="#334155"/>
            <line x1="910" y1="115" x2="975" y2="115" stroke="#334155" stroke-width="4"/>
            <polygon points="965,108 979,115 965,122" fill="#334155"/>
          </svg>
        </div>

        <h2>Principais componentes do Core LTE</h2>
        <p>O Core LTE é formado por funcoes especializadas. Cada uma possui um papel específico dentro da rede.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="430" viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="430" fill="#F8FAFC"/>
            <rect x="230" y="35" width="440" height="350" rx="24" fill="#0F172A"/>
            <text x="450" y="82" fill="white" text-anchor="middle" font-size="30" font-weight="700">Core LTE</text>
            <text x="450" y="110" fill="#CBD5E1" text-anchor="middle" font-size="15">Evolved Packet Core</text>
            <rect x="285" y="150" width="135" height="80" rx="14" fill="#6366F1"/>
            <text x="352" y="185" fill="white" text-anchor="middle" font-size="20" font-weight="700">MME</text>
            <text x="352" y="208" fill="white" text-anchor="middle" font-size="12">controle</text>
            <rect x="480" y="150" width="135" height="80" rx="14" fill="#4F46E5"/>
            <text x="547" y="185" fill="white" text-anchor="middle" font-size="20" font-weight="700">HSS</text>
            <text x="547" y="208" fill="white" text-anchor="middle" font-size="12">assinantes</text>
            <rect x="285" y="270" width="135" height="80" rx="14" fill="#10B981"/>
            <text x="352" y="305" fill="white" text-anchor="middle" font-size="20" font-weight="700">SGW</text>
            <text x="352" y="328" fill="white" text-anchor="middle" font-size="12">transporte</text>
            <rect x="480" y="270" width="135" height="80" rx="14" fill="#0EA5E9"/>
            <text x="547" y="305" fill="white" text-anchor="middle" font-size="20" font-weight="700">PGW</text>
            <text x="547" y="328" fill="white" text-anchor="middle" font-size="12">saída IP</text>
            <line x1="420" y1="190" x2="480" y2="190" stroke="#CBD5E1" stroke-width="3"/>
            <line x1="352" y1="230" x2="352" y2="270" stroke="#CBD5E1" stroke-width="3"/>
            <line x1="547" y1="230" x2="547" y2="270" stroke="#CBD5E1" stroke-width="3"/>
          </svg>
        </div>

        <h3>MME - Mobility Management Entity</h3>
        <p>O MME e responsável pelo controle da rede. Ele participa do registro dos usuários, da autenticação inicial, do gerenciamento de mobilidade e da criacao das sessões LTE.</p>
        <h3>HSS - Home Subscriber Server</h3>
        <p>O HSS é o banco de dados dos assinantes. Ele armazena informações como IMSI, chaves de autenticação, APNs autorizadas e perfis de acesso.</p>
        <h3>SGW - Serving Gateway</h3>
        <p>O SGW atua como gateway de transporte entre à rede de acesso rádio é o restante da infraestrutura LTE. Ele encaminha pacotes e ajuda a manter sessões durante deslocamentos entre células.</p>
        <h3>PGW - Packet Gateway</h3>
        <p>O PGW é a porta de saída da rede LTE. Ele entrega o endereço IP ao usuário, conecta à rede à Internet ou a serviços específicos e aplica políticas de tráfego.</p>

        <h2>Core LTE para provedores de Internet</h2>
        <p>Para provedores de Internet, o Core LTE pode ser utilizado para oferecer banda larga fixa sem fio, também conhecida como FWA - Fixed Wireless Access.</p>
        <p>Esse modelo e util para complementar à rede de fibra, atender áreas com baixa viabilidade de cabeamento, criar redundância de acesso ou expandir rapidamente a cobertura.</p>
        <div class="article-diagram">
          <svg width="100%" height="300" viewBox="0 0 1300 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="1300" height="300" fill="#F8FAFC"/>
            <rect x="30" y="105" width="175" height="80" rx="15" fill="#6366F1"/>
            <text x="117" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">Clientes LTE</text>
            <text x="117" y="162" fill="white" text-anchor="middle" font-size="13">CPE / roteador</text>
            <rect x="280" y="105" width="175" height="80" rx="15" fill="#2563EB"/>
            <text x="367" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">eNodeB</text>
            <text x="367" y="162" fill="white" text-anchor="middle" font-size="13">acesso rádio</text>
            <rect x="530" y="105" width="175" height="80" rx="15" fill="#0F172A"/>
            <text x="617" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">Core LTE</text>
            <text x="617" y="162" fill="#CBD5E1" text-anchor="middle" font-size="13">EPC</text>
            <rect x="780" y="105" width="175" height="80" rx="15" fill="#10B981"/>
            <text x="867" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">CGNAT</text>
            <text x="867" y="162" fill="white" text-anchor="middle" font-size="13">Firewall</text>
            <rect x="1030" y="55" width="190" height="70" rx="15" fill="#0EA5E9"/>
            <text x="1125" y="97" fill="white" text-anchor="middle" font-size="17" font-weight="700">Backbone IP</text>
            <rect x="1030" y="175" width="190" height="70" rx="15" fill="#0284C7"/>
            <text x="1125" y="217" fill="white" text-anchor="middle" font-size="17" font-weight="700">Internet</text>
            <line x1="205" y1="145" x2="280" y2="145" stroke="#334155" stroke-width="4"/>
            <polygon points="270,138 284,145 270,152" fill="#334155"/>
            <line x1="455" y1="145" x2="530" y2="145" stroke="#334155" stroke-width="4"/>
            <polygon points="520,138 534,145 520,152" fill="#334155"/>
            <line x1="705" y1="145" x2="780" y2="145" stroke="#334155" stroke-width="4"/>
            <polygon points="770,138 784,145 770,152" fill="#334155"/>
            <line x1="955" y1="132" x2="1030" y2="90" stroke="#334155" stroke-width="4"/>
            <polygon points="1019,89 1033,88 1025,100" fill="#334155"/>
            <line x1="955" y1="158" x2="1030" y2="210" stroke="#334155" stroke-width="4"/>
            <polygon points="1020,199 1033,212 1018,212" fill="#334155"/>
          </svg>
        </div>
        <p>Nesse cenário, o provedor utiliza à rede LTE como uma extensao da sua infraestrutura IP, permitindo que clientes acessem à Internet por meio de roteadores ou CPEs 4G.</p>

        <h2>Core LTE em ambientes corporativos e industriais</h2>
        <p>Além do uso por operadoras e ISPs, o Core LTE também pode ser aplicado em redes corporativas, industriais e operacionais.</p>
        <p>Nesses casos, o tráfego pode ser direcionado para sistemas internos, como ERP, SCADA, bancos de dados, aplicações de logistica, vídeomonitoramento ou plataformas de telemetria.</p>
        <div class="article-diagram">
          <svg width="100%" height="300" viewBox="0 0 1300 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="1300" height="300" fill="#F8FAFC"/>
            <rect x="30" y="105" width="175" height="80" rx="15" fill="#6366F1"/>
            <text x="117" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">Dispositivos</text>
            <text x="117" y="162" fill="white" text-anchor="middle" font-size="13">IoT / coletores</text>
            <rect x="280" y="105" width="175" height="80" rx="15" fill="#2563EB"/>
            <text x="367" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">eNodeB LTE</text>
            <text x="367" y="162" fill="white" text-anchor="middle" font-size="13">cobertura móvel</text>
            <rect x="530" y="105" width="175" height="80" rx="15" fill="#0F172A"/>
            <text x="617" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">Core LTE</text>
            <text x="617" y="162" fill="#CBD5E1" text-anchor="middle" font-size="13">controle da rede</text>
            <rect x="780" y="105" width="175" height="80" rx="15" fill="#10B981"/>
            <text x="867" y="138" fill="white" text-anchor="middle" font-size="17" font-weight="700">Firewall</text>
            <text x="867" y="162" fill="white" text-anchor="middle" font-size="13">rede local</text>
            <rect x="1030" y="55" width="190" height="70" rx="15" fill="#0EA5E9"/>
            <text x="1125" y="97" fill="white" text-anchor="middle" font-size="17" font-weight="700">ERP / Sistemas</text>
            <rect x="1030" y="175" width="190" height="70" rx="15" fill="#0284C7"/>
            <text x="1125" y="217" fill="white" text-anchor="middle" font-size="17" font-weight="700">SCADA / IoT</text>
            <line x1="205" y1="145" x2="280" y2="145" stroke="#334155" stroke-width="4"/>
            <polygon points="270,138 284,145 270,152" fill="#334155"/>
            <line x1="455" y1="145" x2="530" y2="145" stroke="#334155" stroke-width="4"/>
            <polygon points="520,138 534,145 520,152" fill="#334155"/>
            <line x1="705" y1="145" x2="780" y2="145" stroke="#334155" stroke-width="4"/>
            <polygon points="770,138 784,145 770,152" fill="#334155"/>
            <line x1="955" y1="132" x2="1030" y2="90" stroke="#334155" stroke-width="4"/>
            <polygon points="1019,89 1033,88 1025,100" fill="#334155"/>
            <line x1="955" y1="158" x2="1030" y2="210" stroke="#334155" stroke-width="4"/>
            <polygon points="1020,199 1033,212 1018,212" fill="#334155"/>
          </svg>
        </div>

        <h2>Por que o Core LTE e tao importante?</h2>
        <p>O Core LTE não serve apenas para "dar acesso à Internet". Ele e responsável por toda a lógica operacional da rede.</p>
        <p>E nele que são definidos:</p>
        <ul class="article-list">
          <li>Quem pode acessar à rede;</li>
          <li>Qual APN cada usuário pode utilizar;</li>
          <li>Qual endereço IP será entregue;</li>
          <li>Como o tráfego será roteado;</li>
          <li>Como seráo aplicadas políticas de QoS;</li>
          <li>Como ocorre a mobilidade entre células;</li>
          <li>Como à rede se integra ao backbone, Internet ou sistemas internos.</li>
        </ul>

        <h2>Conclusão</h2>
        <p>O Core LTE é o elemento central de qualquer rede 4G. Seja em uma operadora móvel, em um provedor de Internet, em uma rede corporativa ou em um ambiente industrial, ele e responsável por transformar a cobertura de rádio em conectividade inteligente.</p>
        <p>Enquanto as antenas e eNodeBs levam o sinal até os dispositivos, o Core LTE garante autenticação, segurança, endereçamento IP, mobilidade, controle de tráfego e integração com os serviços finais.</p>
        <p>Por isso, compreender o funcionamento do Core LTE é essencial para quem deseja implantar, operar ou expandir redes 4G, seja para atendimento residencial, FWA, conectividade corporativa, IoT ou aplicações críticas.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function lteWifiArticlePage() {
  const title = "Rede Privativa 4G/5G: por que ela não é apenas um Wi-Fi maior?";
  const excerpt = "Entenda por que redes privativas LTE e 5G são indicadas para operações críticas, grandes áreas de cobertura, mobilidade e ambientes onde a conectividade precisa ser previsível.";
  return `
    ${pageHero(title, excerpt, ["Redes Privativas", "LTE", "5G", "Wi-Fi Corporativo", "Operações Críticas"])}
    <section class="section">
      <article class="container article-page blog-article">
        <p>${excerpt}</p>

        <h2>Quando o Wi-Fi deixa de ser suficiente</h2>
        <p>Durante muitos anos, o Wi-Fi foi a solução padrão para conectar dispositivos em ambientes corporativos. E ele continua sendo uma excelente tecnologia para escritórios, salas de reunião, áreas administrativas e ambientes internos.</p>
        <p>Porém, quando a conectividade passa a fazer parte da operação do negócio, surgem novos desafios:</p>
        <ul class="article-list">
          <li>Equipamentos em constante movimento;</li>
          <li>Grandes áreas de cobertura;</li>
          <li>Ambientes externos;</li>
          <li>Centenas ou milhares de dispositivos conectados;</li>
          <li>Aplicações críticas que não podem sofrer interrupções.</li>
        </ul>
        <p>E nesse cenário que às redes privativas 4G e 5G começam a se destacar.</p>
        <blockquote>Por que não instalar apenas mais pontos de Wi-Fi?</blockquote>
        <p>A resposta está na forma como cada tecnologia foi projetada para funcionar.</p>

        <h2>O que é uma rede privativa?</h2>
        <p>Uma rede privativa é uma infraestrutura celular exclusiva para uma organização. Ela utiliza os mesmos principios das redes móveis das operadoras, mas de forma dedicada a uma empresa, industria, porto, aeroporto, fazenda, mina, centro logístico ou provedor de internet.</p>
        <p>Uma rede privativa normalmente é composta por:</p>
        <ul class="article-list">
          <li>Estações rádio-base LTE ou 5G;</li>
          <li>Core de rede privativo;</li>
          <li>SIM Cards ou eSIMs corporativos;</li>
          <li>Politicas de segurança e autenticação;</li>
          <li>Gerenciamento centralizado;</li>
          <li>Integração com aplicações corporativas.</li>
        </ul>
        <div class="article-diagram compact">
          <svg width="100%" height="180" viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow-private-network" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/>
              </marker>
            </defs>
            <rect width="800" height="180" fill="#F8FAFC"/>
            <rect x="20" y="55" width="140" height="60" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
            <text x="90" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#1f2937">Dispositivos</text>
            <line x1="160" y1="85" x2="260" y2="85" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-private-network)"/>
            <rect x="260" y="55" width="140" height="60" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
            <text x="330" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#1f2937">Rádio LTE/5G</text>
            <line x1="400" y1="85" x2="500" y2="85" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-private-network)"/>
            <rect x="500" y="55" width="140" height="60" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
            <text x="570" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#1f2937">Core de Rede</text>
            <line x1="640" y1="85" x2="735" y2="85" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-private-network)"/>
            <rect x="735" y="55" width="55" height="60" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
            <text x="762" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#1f2937">Apps</text>
          </svg>
        </div>

        <h2>A diferença começa no acesso ao meio</h2>
        <p>O Wi-Fi funciona como uma conversa em grupo. Antes de transmitir, cada dispositivo verifica se o canal está livre. Se outro equipamento já estiver transmitindo, ele aguarda alguns instantes antes de tentar novamente.</p>
        <p>Essa lógica funciona muito bem em ambientes controlados. Mas quando há muitos dispositivos e muitos pontos de acesso, todos passam a disputar o mesmo meio de comunicação.</p>
        <p>Em uma rede privativa LTE ou 5G, a lógica e diferente. A estação rádio-base organiza a comunicação e define quem transmite, em qual momento, em qual frequência e com qual prioridade.</p>
        <p>Isso torna à rede mais previsível, principalmente em ambientes com alta densidade de dispositivos.</p>

        <h2>O desafio da cobertura: adicionar mais APs nem sempre resolve</h2>
        <p>Quando existem áreas de sombra, a solução mais comum em redes Wi-Fi e adicionar novos pontos de acesso. O problema e que, conforme mais APs são instalados, suas áreas de cobertura começam a se sobrepor.</p>
        <div class="article-diagram compact">
          <svg width="100%" height="220" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
            <rect width="700" height="220" fill="#F8FAFC"/>
            <circle cx="180" cy="110" r="90" fill="#60a5fa" opacity="0.25"/>
            <circle cx="350" cy="110" r="90" fill="#60a5fa" opacity="0.25"/>
            <circle cx="520" cy="110" r="90" fill="#60a5fa" opacity="0.25"/>
            <circle cx="180" cy="110" r="8" fill="#2563eb"/>
            <circle cx="350" cy="110" r="8" fill="#2563eb"/>
            <circle cx="520" cy="110" r="8" fill="#2563eb"/>
            <text x="180" y="95" text-anchor="middle" font-family="Arial" font-size="14">AP 1</text>
            <text x="350" y="95" text-anchor="middle" font-family="Arial" font-size="14">AP 2</text>
            <text x="520" y="95" text-anchor="middle" font-family="Arial" font-size="14">AP 3</text>
            <text x="350" y="185" text-anchor="middle" font-family="Arial" font-size="14" fill="#374151">Sobreposicao de cobertura e aumento de interferência</text>
          </svg>
        </div>
        <p>Por isso, projetos Wi-Fi de grande porte exigem planejamento cuidadoso de canais, controle de potência, ajustes de roaming e gestão constante da interferência.</p>

        <h2>Como uma rede privativa lida com múltiplas células</h2>
        <p>As redes LTE e 5G foram projetadas para operar com diversas células cobrindo uma mesma área. Essa e exatamente a lógica das redes móveis: varias células trabalhando de forma coordenada para manter cobertura, capacidade e mobilidade.</p>
        <div class="article-diagram compact">
          <svg width="100%" height="240" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
            <rect width="700" height="240" fill="#F8FAFC"/>
            <circle cx="220" cy="120" r="95" fill="#34d399" opacity="0.25"/>
            <circle cx="430" cy="120" r="95" fill="#34d399" opacity="0.25"/>
            <rect x="198" y="98" width="44" height="44" rx="6" fill="#059669"/>
            <rect x="408" y="98" width="44" height="44" rx="6" fill="#059669"/>
            <text x="220" y="82" text-anchor="middle" font-family="Arial" font-size="14">Célula A</text>
            <text x="430" y="82" text-anchor="middle" font-family="Arial" font-size="14">Célula B</text>
            <circle cx="325" cy="120" r="10" fill="#dc2626"/>
            <text x="325" y="160" text-anchor="middle" font-family="Arial" font-size="14" fill="#374151">Dispositivo em mobilidade</text>
          </svg>
        </div>
        <p>Ao contrário do Wi-Fi, à rede celular coordena automaticamente os recursos de rádio, a potência de transmissão, a mobilidade entre células é a qualidade da conexão.</p>
        <p>Em redes 5G, recursos como beamforming também permitem direcionar melhor o sinal para onde o dispositivo está, reduzindo interferências e aumentando a eficiência da cobertura.</p>

        <h2>Mobilidade sem interrupções</h2>
        <p>Imagine uma empilhadeira, um veículo autonomo ou um coletor de dados percorrendo uma planta industrial ou centro logístico.</p>
        <p>Durante o trajeto, esse dispositivo atravessa diferentes áreas de cobertura. Em uma rede privativa LTE/5G, a transferência entre células ocorre automaticamente, mantendo a comunicação ativa durante o deslocamento.</p>
        <p>Esse processo é conhecido como handover e é uma das características mais maduras das redes celulares.</p>

        <h2>Segurança baseada em identidade</h2>
        <p>Outro diferencial importante está na autenticação. Enquanto redes Wi-Fi normalmente utilizam senhas, certificados ou controle de acesso tradicional, redes privativas utilizam SIM Cards, eSIMs e perfis autenticados pelo Core da rede.</p>
        <p>Cada equipamento possui uma identidade única dentro da rede. Isso permite maior controle sobre quem pode acessar os recursos corporativos.</p>

        <h2>Onde uma rede privativa faz mais sentido?</h2>
        <div class="use-cases-grid">
          <div><h3>Industria 4.0</h3><p>Maquinas conectadas, IoT industrial, sensores, automação e operação critica.</p></div>
          <div><h3>Logistica</h3><p>Coletores móveis, rastreamento de ativos, empilhadeiras conectadas e centros de distribuição.</p></div>
          <div><h3>Portos e aeroportos</h3><p>Equipamentos em movimento, grandes áreas externas e necessidade de alta disponibilidade.</p></div>
          <div><h3>Mineracao e agronegócio</h3><p>Cobertura extensa, ambientes hostis, operação remota e conectividade em campo.</p></div>
          <div><h3>Provedores de internet</h3><p>FWA, expansao de cobertura, redundância de ultima milha e atendimento B2B.</p></div>
        </div>

        <h2>Wi-Fi e LTE/5G não competem. Eles se complementam.</h2>
        <p>As arquiteturas mais modernas normalmente combinam as duas tecnologias.</p>
        <div class="article-table-wrap">
          <table class="article-table">
            <thead>
              <tr>
                <th>Aplicação</th>
                <th>Wi-Fi</th>
                <th>LTE/5G Privativo</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Escritorios</td><td>Sim</td><td></td></tr>
              <tr><td>Salas de reunião</td><td>Sim</td><td></td></tr>
              <tr><td>Ambientes administrativos</td><td>Sim</td><td></td></tr>
              <tr><td>Grandes áreas externas</td><td></td><td>Sim</td></tr>
              <tr><td>Equipamentos móveis</td><td></td><td>Sim</td></tr>
              <tr><td>Operação crítica</td><td></td><td>Sim</td></tr>
              <tr><td>IoT em larga escala</td><td></td><td>Sim</td></tr>
              <tr><td>Logistica e automação</td><td></td><td>Sim</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Conclusão</h2>
        <p>Uma rede privativa não é simplesmente um Wi-Fi com maior alcance.</p>
        <p>Ela foi projetada para oferecer mobilidade, previsibilidade, segurança e escalabilidade em ambientes onde a conectividade faz parte da operação do negócio.</p>
        <p>Enquanto o Wi-Fi continua sendo uma excelente escolha para ambientes corporativos tradicionais, às redes privativas LTE e 5G permitem expandir a conectividade para aplicações críticas, áreas externas e operações de missao essencial.</p>
        <p>Em resumo: o Wi-Fi conecta usuários. A rede privativa conecta toda a operação.</p>

        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function privateLteArticlePage() {
  const title = "Redes Privativas LTE: o que são e por que estão transformando a conectividade";
  const excerpt = "Em um cenário onde a conectividade tornou-se tão importante quanto energia elétrica para muitas operações, empresas dos setores industrial, logístico, mineração, energia, agronegócio, portos, aeroportos e transporte estão buscando alternativas mais robustas que o Wi-Fi tradicional.";
  return `
    ${pageHero(title, excerpt, ["Redes Privativas LTE", "Core LTE", "QoS", "Handover", "Industria 4.0"])}
    <section class="section">
      <article class="container article-page article-content">
        <p>${excerpt}</p>
        <p>E nesse contexto que surgem as <strong>Redes Privativas LTE</strong>, uma tecnologia que combina a mobilidade das redes celulares com o controle, a segurança e a previsibilidade exigidos por ambientes corporativos críticos.</p>

        <h2>O que é uma Rede Privativa LTE?</h2>
        <p>Uma Rede Privativa LTE é uma rede móvel celular dedicada, construida para atender exclusivamente uma empresa, industria, campus ou operação específica.</p>
        <p>Diferentemente das redes públicas das operadoras, onde milhões de usuários compartilham a mesma infraestrutura, uma rede privativa possui recursos dedicados para atender apenas os dispositivos autorizados pela organização.</p>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>Rede pública</h3>
            <ul class="article-list">
              <li>Infraestrutura compartilhada por muitos usuários;</li>
              <li>Controle da rede pela operadora;</li>
              <li>Desempenho variável conforme a carga;</li>
              <li>Politicas de segurança padronizadas.</li>
            </ul>
          </div>
          <div class="comparison-card">
            <h3>Rede privativa</h3>
            <ul class="article-list">
              <li>Infraestrutura dedicada ao cliente;</li>
              <li>Maior controle operacional;</li>
              <li>Desempenho mais previsível;</li>
              <li>Segurança e QoS personalizáveis;</li>
              <li>Cobertura projetada para a operação.</li>
            </ul>
          </div>
        </div>

        <h2>Como funciona uma Rede LTE Privativa?</h2>
        <p>Uma rede LTE privativa é composta basicamente por três camadas: à rede de acesso, o Core LTE e os dispositivos conectados.</p>
        <h3>1. Rede de Acesso - RAN</h3>
        <p>A RAN, ou <em>Radio Access Network</em>, é responsável pela comunicação sem fio entre os dispositivos e a rede. Ela inclui rádios LTE, eNodeBs, antenas, sincronismo GPS e infraestrutura de transmissão.</p>
        <h3>2. Core LTE - EPC</h3>
        <p>O Core LTE, também conhecido como EPC, é o cérebro da rede. Ele realiza autenticação dos usuários, gerenciamento dos SIM Cards, controle de mobilidade, distribuição de IP, aplicação de políticas de QoS e integração com sistemas corporativos.</p>
        <h3>3. Dispositivos</h3>
        <p>A rede pode conectar smartphones corporativos, tablets, coletores de dados, sensores IoT, câmeras, veículos, drones, AGVs e equipamentos industriais.</p>
        <div class="diagram-box">
          <h3>Arquitetura simplificada</h3>
          <pre>┌─────────────────────────────────────┐
│       Aplicações Corporativas        │
│ ERP | SCADA | Video | IoT | Voz      │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│            Core LTE - EPC            │
│ MME | SGW | PGW | HSS | PCRF         │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│          eNodeB / Rádio LTE          │
└─────────────────────────────────────┘
                  │
           Interface Aerea
                  │
                  ▼
┌─────────────────────────────────────┐
│ Smartphones | IoT | Tablets | AGVs   │
└─────────────────────────────────────┘</pre>
        </div>

        <h2>Por que não utilizar apenas Wi-Fi?</h2>
        <p>O Wi-Fi e excelente para ambientes corporativos convencionais, escritórios, residencias e áreas internas com demanda previsível. Porém, em áreas extensas, ambientes industriais ou aplicações críticas, ele pode apresentar limitacoes de cobertura, mobilidade e previsibilidade.</p>
        <h3>O problema da disputa pelo meio</h3>
        <p>O Wi-Fi utiliza um mecanismo chamado <strong>CSMA/CA</strong>. Antes de transmitir, cada dispositivo precisa "escutar" o canal para verificar se ele está livre. Quando muitos dispositivos tentam transmitir ao mesmo tempo, aumentam as disputas, os tempos de espera e as retransmissoes.</p>
        <p>Já no LTE, o acesso ao meio e controlado pela estação rádio-base. O eNodeB distribui recursos de rádio para cada dispositivo por meio de PRBs, agendamento de uplink e downlink, controle de potência e políticas de QoS.</p>
        <div class="highlight-box">
          <p>Em termos simples: no Wi-Fi, os dispositivos disputam o canal. No LTE, à rede organiza quem transmite, quando transmite e com quais recursos.</p>
        </div>

        <h2>Cobertura: uma das maiores vantagens</h2>
        <p>Uma das principais vantagens das Redes Privativas LTE é a capacidade de cobrir grandes áreas com um número reduzido de estações rádio-base. Dependendo da frequência utilizada e das características do ambiente, uma única célula LTE pode atender desde algumas centenas de metros até dezenas de quilômetros.</p>
        <p>Em comparação com redes Wi-Fi tradicionais, isso permite simplificar a infraestrutura, reduzir a quantidade de equipamentos e proporcionar maior mobilidade aos dispositivos conectados.</p>
        <div class="article-table-wrap">
          <table class="article-table">
            <thead><tr><th>Tecnologia</th><th>Cobertura típica</th></tr></thead>
            <tbody>
              <tr><td>Wi-Fi Indoor</td><td>30 a 50 metros</td></tr>
              <tr><td>Wi-Fi Outdoor</td><td>100 a 600 metros</td></tr>
              <tr><td>LTE 700 MHz</td><td>2 a 20 km</td></tr>
              <tr><td>LTE 900 MHz</td><td>1 a 15 km</td></tr>
              <tr><td>LTE 2600 MHz</td><td>500 metros a 8 km</td></tr>
            </tbody>
          </table>
        </div>
        <div class="highlight-box">
          <p><strong>Importante:</strong> os valores acima representam cenários típicos e podem variar de acordo com a altura da torre, potência do rádio, ganho das antenas, largura de banda utilizada, relevo, vegetação, interferências e densidade de usuários. Um planejamento adequado de RF e fundamental para garantir cobertura e desempenho compativeis com cada aplicação.</p>
        </div>
        <p>Além da frequência utilizada, fatores como topografia, obstruções, nível de interferência e requisitos de capacidade influenciam diretamente o alcance efetivo da célula. Em muitos projetos de Redes Privativas LTE, o objetivo não é apenas maximizar a distância, mas garantir níveis adequados de cobertura, capacidade e disponibilidade para aplicações críticas.</p>

        <h2>Mobilidade real com handover</h2>
        <p>Um dos grandes diferenciais do LTE é o suporte nativo a mobilidade. Quando um dispositivo se desloca entre células, à rede realiza o processo de <strong>handover</strong>, mantendo a conexão ativa durante o deslocamento.</p>
        <p>Isso é essencial para aplicações com empilhadeiras, AGVs, veículos operacionais, trens, caminhoes, equipamentos móveis e equipes em campo.</p>

        <h2>Segurança superior ao Wi-Fi tradicional</h2>
        <p>O LTE foi desenvolvido para redes móveis de larga escala e, por isso, possui mecanismos robustos de autenticação e criptografia.</p>
        <ul class="article-list">
          <li>Autenticacao por SIM Card ou eSIM;</li>
          <li>Credenciais unicas por dispositivo;</li>
          <li>Autenticacao mutua entre rede e terminal;</li>
          <li>Criptografia da interface aérea;</li>
          <li>Controle centralizado de acesso.</li>
        </ul>
        <p>Na prática, apenas dispositivos autorizados conseguem acessar à rede.</p>

        <h2>Qualidade de Servico - QoS</h2>
        <p>Uma das características mais importantes de uma rede LTE privativa é a capacidade de priorizar aplicações. Isso permite que serviços críticos continuem funcionando mesmo em momentos de alta utilização da rede.</p>
        <div class="article-table-wrap">
          <table class="article-table">
            <thead><tr><th>Aplicação</th><th>Prioridade</th></tr></thead>
            <tbody>
              <tr><td>Controle operacional</td><td>Alta</td></tr>
              <tr><td>Voz sobre LTE</td><td>Alta</td></tr>
              <tr><td>Videomonitoramento</td><td>Média</td></tr>
              <tr><td>Sensores IoT</td><td>Média</td></tr>
              <tr><td>Navegacao web</td><td>Baixa</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Aplicações práticas</h2>
        <div class="use-cases-grid">
          <div><h3>Industria 4.0</h3><p>AGVs, robos móveis, sensoriamento industrial e monitoramento em tempo real.</p></div>
          <div><h3>Energia</h3><p>Subestacoes, linhas de transmissão, usinas solares, usinas eolicas e telemetria critica.</p></div>
          <div><h3>Mineracao</h3><p>Equipamentos móveis, vídeo embarcado, telemetria, segurança operacional e operação remota.</p></div>
          <div><h3>Logistica</h3><p>Centros de distribuição, patios, portos, aeroportos e rastreamento de ativos.</p></div>
          <div><h3>Transporte</h3><p>Metros, ferrovias, corredores rodoviarios, terminais de carga e comunicação operacional.</p></div>
        </div>

        <h2>LTE Privativo ou 5G Privativo?</h2>
        <p>Muitas empresas perguntam se devem comecar diretamente com 5G. A resposta depende do caso de uso, orçamento, disponibilidade de dispositivos e nível de automação desejado.</p>
        <div class="comparison-grid">
          <div class="comparison-card">
            <h3>LTE Privativo</h3>
            <ul class="article-list">
              <li>Menor investimento inicial;</li>
              <li>Ecossistema mais maduro;</li>
              <li>Grande disponibilidade de dispositivos;</li>
              <li>Excelente cobertura;</li>
              <li>Ideal para muitos casos de uso atuais.</li>
            </ul>
          </div>
          <div class="comparison-card">
            <h3>5G Privativo</h3>
            <ul class="article-list">
              <li>Menor latência;</li>
              <li>Maior capacidade;</li>
              <li>Network Slicing;</li>
              <li>Casos avançados de automação;</li>
              <li>Maior preparação para aplicações futuras.</li>
            </ul>
          </div>
        </div>
        <p>Em muitos projetos, a melhor estratégia e iniciar com LTE privativo e evoluir gradualmente para 5G conforme a maturidade da operação é a necessidade das aplicações.</p>

        <h2>O papel do Core LTE</h2>
        <p>E comum associar uma rede LTE apenas às antenas e rádios. Porém, o elemento central da rede é o Core LTE.</p>
        <p>O Core LTE gerencia os assinantes, controla os SIM Cards, aplica políticas de segurança, define QoS, integra a rede aos sistemas corporativos, permite APNs privadas e cria segmentacoes de tráfego.</p>
        <div class="highlight-box">
          <p>Sem o Core LTE, à rede não consegue autenticar dispositivos, controlar mobilidade, aplicar políticas de acesso nem entregar uma experiencia corporativa segura e gerenciável.</p>
        </div>

        <h2>Conclusão</h2>
        <p>As Redes Privativas LTE representam um avanco importante para empresas que precisam de conectividade confiável, segura e com ampla cobertura.</p>
        <p>Ao contrário do Wi-Fi tradicional, que foi concebido para ambientes locais de acesso compartilhado, o LTE foi desenvolvido para suportar mobilidade, grandes áreas de cobertura, múltiplos dispositivos simultâneos e aplicações críticas de missao operacional.</p>
        <p>Por isso, organizações dos setores de industria, logistica, energia, mineracao, transporte e infraestrutura estão adotando redes LTE privativas para conectar pessoas, máquinas, sensores e sistemas em uma única plataforma de comunicação.</p>

        <h2>Como a IDA Telecom pode ajudar</h2>
        <p>A IDA Telecom projeta, implementa e opera soluções de conectividade corporativa, incluindo Redes Privativas LTE/5G, Core LTE/5G, conectividade híbrida fibra + 4G/5G, redes Wi-Fi corporativas, IoT e infraestrutura para operações críticas.</p>
        <p>Nossa abordagem combina engenharia de telecomunicações, planejamento de RF, operação especializada e suporte consultivo para entregar redes preparadas para os desafios atuais e futuros dos negócios.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function private5gArticlePage() {
  const title = "O que são Redes Privativas 5G?";
  const excerpt = "As Redes Privativas 5G são infraestruturas de comunicação móvel dedicadas a uma empresa, indústria, condomínio logístico, porto, aeroporto, mineradora, provedor de internet ou qualquer organização que precise de conectividade segura, controlada e de alta performance.";
  return `
    ${pageHero(title, excerpt, ["Redes Privativas 5G", "Core 5G", "Network Slicing", "mmWave", "Edge Computing"])}
    <section class="section">
      <article class="container article-page article-container">
        <p>${excerpt}</p>
        <p>Diferente de uma rede pública de operadora, onde milhares ou milhões de usuários compartilham a mesma infraestrutura, a rede privativa é projetada para atender um ambiente específico, com requisitos próprios de cobertura, capacidade, segurança, mobilidade e qualidade de serviço.</p>

        <h2>Como funciona uma Rede Privativa 5G?</h2>
        <p>Uma Rede Privativa 5G é composta por três blocos principais: os dispositivos conectados, a rede de acesso rádio e o Core 5G, que é o cérebro da rede.</p>
        <div class="article-diagram narrow">
          <svg viewBox="0 0 900 420" width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="420" rx="24" fill="#f6f8fb"/>
            <rect x="60" y="250" width="180" height="90" rx="16" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="150" y="285" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold">Dispositivos</text>
            <text x="150" y="310" text-anchor="middle" font-size="13" font-family="Arial">Sensores, tablets,</text>
            <text x="150" y="330" text-anchor="middle" font-size="13" font-family="Arial">câmeras e máquinas</text>
            <rect x="360" y="170" width="180" height="100" rx="16" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="450" y="210" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold">gNodeB 5G</text>
            <text x="450" y="235" text-anchor="middle" font-size="13" font-family="Arial">Cobertura rádio</text>
            <rect x="660" y="70" width="180" height="110" rx="16" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="750" y="110" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold">Core 5G</text>
            <text x="750" y="135" text-anchor="middle" font-size="13" font-family="Arial">Autenticacao, QoS,</text>
            <text x="750" y="155" text-anchor="middle" font-size="13" font-family="Arial">mobilidade e dados</text>
            <rect x="660" y="260" width="180" height="90" rx="16" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="750" y="295" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold">Aplicações</text>
            <text x="750" y="320" text-anchor="middle" font-size="13" font-family="Arial">ERP, SCADA, IA,</text>
            <text x="750" y="340" text-anchor="middle" font-size="13" font-family="Arial">vídeo e automação</text>
            <line x1="240" y1="295" x2="360" y2="220" stroke="#7a8aa0" stroke-width="3"/>
            <line x1="540" y1="220" x2="660" y2="125" stroke="#7a8aa0" stroke-width="3"/>
            <line x1="750" y1="180" x2="750" y2="260" stroke="#7a8aa0" stroke-width="3"/>
          </svg>
        </div>

        <h2>Principais benefícios das Redes Privativas 5G</h2>
        <ul class="article-list">
          <li><strong>Maior controle:</strong> à rede e dimensionada para a operação do cliente.</li>
          <li><strong>Mais segurança:</strong> acesso por SIM/eSIM e políticas dedicadas.</li>
          <li><strong>Alta capacidade:</strong> suporte a vídeo, automação, IoT e dados críticos.</li>
          <li><strong>Baixa latência:</strong> ideal para aplicações em tempo real.</li>
          <li><strong>Mobilidade nativa:</strong> comunicação continua mesmo com equipamentos em movimento.</li>
          <li><strong>Integração com Edge Computing:</strong> processamento local de dados críticos.</li>
        </ul>

        <h2>Redes Privativas 5G x Redes Privativas 4G</h2>
        <p>O 5G não elimina o 4G. Na prática, muitas redes privativas utilizam as duas tecnologias de forma complementar. O 4G continua sendo excelente para cobertura, mobilidade e aplicações com requisitos moderados de latência. O 5G adiciona mais capacidade, menor latência e maior flexibilidade para aplicações críticas e industriais.</p>
        <div class="article-table-wrap">
          <table class="article-table">
            <thead><tr><th>Caracteristica</th><th>Rede Privativa 4G LTE</th><th>Rede Privativa 5G</th></tr></thead>
            <tbody>
              <tr><td>Mobilidade</td><td>Excelente</td><td>Excelente</td></tr>
              <tr><td>Handover</td><td>Nativo</td><td>Nativo</td></tr>
              <tr><td>Latência</td><td>Baixa</td><td>Muito baixa</td></tr>
              <tr><td>Capacidade</td><td>Alta</td><td>Muito alta</td></tr>
              <tr><td>Segmentacao de serviços</td><td>APNs e QoS</td><td>Network Slicing</td></tr>
              <tr><td>Flexibilidade do rádio</td><td>Menor</td><td>Maior</td></tr>
              <tr><td>Aplicações críticas</td><td>Boa</td><td>Excelente</td></tr>
              <tr><td>Evolucao futura</td><td>LTE-Advanced Pro</td><td>5G Advanced</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Segmentacao de rede: APN no 4G e Slicing no 5G</h2>
        <p>No 4G, é possível separar aplicações usando <strong>APNs</strong>. Por exemplo, uma rede pode ter um APN para câmeras, outro para sensores IoT e outro para acesso corporativo. Cada APN pode possuir políticas diferentes de roteamento, segurança e qualidade de serviço.</p>
        <p>O 5G amplia esse conceito com o <strong>Network Slicing</strong>, permitindo criar redes virtuais mais flexíveis sobre a mesma infraestrutura física. Assim, uma aplicação de automação critica pode ter prioridade e latência diferentes de uma aplicação de vídeo ou de sensores IoT.</p>
        <div class="article-diagram narrow">
          <svg viewBox="0 0 900 360" width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="360" rx="24" fill="#f6f8fb"/>
            <text x="450" y="45" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold">Segmentacao de Serviços</text>
            <rect x="80" y="95" width="300" height="190" rx="18" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="230" y="130" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold">4G LTE</text>
            <text x="230" y="155" text-anchor="middle" font-size="13" font-family="Arial">Separacao por APNs</text>
            <rect x="120" y="185" width="220" height="32" rx="10" fill="#eef2f7"/>
            <text x="230" y="206" text-anchor="middle" font-size="13" font-family="Arial">APN CFTV</text>
            <rect x="120" y="225" width="220" height="32" rx="10" fill="#eef2f7"/>
            <text x="230" y="246" text-anchor="middle" font-size="13" font-family="Arial">APN IoT</text>
            <rect x="120" y="265" width="220" height="32" rx="10" fill="#eef2f7"/>
            <text x="230" y="286" text-anchor="middle" font-size="13" font-family="Arial">APN Corporativo</text>
            <rect x="520" y="95" width="300" height="190" rx="18" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="670" y="130" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold">5G</text>
            <text x="670" y="155" text-anchor="middle" font-size="13" font-family="Arial">Network Slicing</text>
            <rect x="560" y="185" width="220" height="32" rx="10" fill="#eef2f7"/>
            <text x="670" y="206" text-anchor="middle" font-size="13" font-family="Arial">Slice Automação</text>
            <rect x="560" y="225" width="220" height="32" rx="10" fill="#eef2f7"/>
            <text x="670" y="246" text-anchor="middle" font-size="13" font-family="Arial">Slice Video</text>
            <rect x="560" y="265" width="220" height="32" rx="10" fill="#eef2f7"/>
            <text x="670" y="286" text-anchor="middle" font-size="13" font-family="Arial">Slice IoT</text>
          </svg>
        </div>

        <h2>Diferenca simplificada entre RB no 4G e SCS no 5G</h2>
        <p>No 4G LTE, os recursos de rádio são organizados em <strong>Resource Blocks</strong>, ou RBs. Eles funcionam como pequenos blocos de frequência e tempo usados para transportar os dados dos usuários.</p>
        <p>No 5G, além dos blocos de recursos, existe uma flexibilidade maior chamada <strong>SCS</strong>, ou espacamento entre subportadoras. De forma simples, o 5G consegue ajustar melhor a estrutura do rádio conforme o tipo de aplicação, frequência utilizada e necessidade de latência.</p>
        <p>Isso significa que o 5G pode ser configurado para diferentes cenários: maior cobertura, maior capacidade, menor latência ou uso de frequências muito altas, como o mmWave.</p>
        <div class="article-diagram narrow">
          <svg viewBox="0 0 900 400" width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="900" height="400" rx="24" fill="#f6f8fb"/>
            <text x="450" y="45" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold">Estrutura de Rádio: 4G x 5G</text>
            <rect x="70" y="95" width="340" height="230" rx="18" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="240" y="130" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold">4G LTE</text>
            <text x="240" y="155" text-anchor="middle" font-size="13" font-family="Arial">Estrutura mais fixa por RBs</text>
            <rect x="115" y="195" width="50" height="50" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="170" y="195" width="50" height="50" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="225" y="195" width="50" height="50" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="280" y="195" width="50" height="50" fill="#eef2f7" stroke="#c6ceda"/>
            <text x="240" y="275" text-anchor="middle" font-size="13" font-family="Arial">Blocos de recursos</text>
            <rect x="490" y="95" width="340" height="230" rx="18" fill="#ffffff" stroke="#d0d7e2"/>
            <text x="660" y="130" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold">5G NR</text>
            <text x="660" y="155" text-anchor="middle" font-size="13" font-family="Arial">Estrutura mais flexível por SCS</text>
            <rect x="535" y="190" width="35" height="55" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="575" y="190" width="35" height="55" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="615" y="190" width="35" height="55" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="675" y="200" width="60" height="45" fill="#eef2f7" stroke="#c6ceda"/>
            <rect x="740" y="200" width="60" height="45" fill="#eef2f7" stroke="#c6ceda"/>
            <text x="660" y="275" text-anchor="middle" font-size="13" font-family="Arial">Blocos ajustaveis conforme a aplicação</text>
          </svg>
        </div>

        <h2>Faixas de frequência no 5G Privativo</h2>
        <p>A escolha da frequência influencia diretamente a cobertura, a capacidade é o tipo de aplicação atendida. Em redes privativas 5G, as faixas médias é o mmWave tem grande relevancia.</p>
        <div class="article-table-wrap">
          <table class="article-table">
            <thead><tr><th>Faixa</th><th>Cobertura típica</th><th>Uso comum</th></tr></thead>
            <tbody>
              <tr><td>2,6 GHz</td><td>500 m a 8 km</td><td>FWA, áreas abertas e redes corporativas</td></tr>
              <tr><td>3,5 GHz</td><td>200 m a 3 km</td><td>Industria, campus, portos e cidades</td></tr>
              <tr><td>mmWave</td><td>50 m a 500 m</td><td>Altissima capacidade, indoor, arenas e automação avançada</td></tr>
            </tbody>
          </table>
        </div>

        <h2>O que é mmWave?</h2>
        <p>O termo <strong>mmWave</strong> se refere às ondas milimetricas, normalmente utilizadas em frequências acima de 24 GHz. Essas faixas permitem velocidades muito elevadas e grande capacidade de transmissão, porém possuem alcance menor e maior sensibilidade a obstáculos.</p>
        <p>Por isso, o mmWave costuma ser utilizado em ambientes com alta demanda de dados, como fábricas, centros logísticos, estádios, aeroportos, ambientes indoor e aplicações que exigem altíssima capacidade em áreas mais concentradas.</p>

        <h2>Aplicações das Redes Privativas 5G</h2>
        <ul class="article-list">
          <li><strong>Indústria:</strong> automação, robos, AGVs, sensores e manutenção preditiva.</li>
          <li><strong>Portos:</strong> câmeras, guindastes, rastreamento e operação logistica.</li>
          <li><strong>Mineracao:</strong> veículos autonomos, telemetria e segurança operacional.</li>
          <li><strong>Utilities:</strong> subestacoes, smart grid e supervisao remota.</li>
          <li><strong>Aeroportos:</strong> veículos de pista, vídeo, IoT e sistemas críticos.</li>
          <li><strong>Provedores de internet:</strong> FWA, redundância da fibra e conectividade B2B.</li>
        </ul>

        <h2>Conclusão</h2>
        <p>As Redes Privativas 5G representam uma evolução importante das redes privativas 4G. Elas mantêm os benefícios já conhecidos das redes celulares, como cobertura, mobilidade e segurança, mas adicionam maior capacidade, menor latência, segmentacao avançada e flexibilidade no uso do espectro.</p>
        <p>Para empresas que precisam conectar pessoas, máquinas, sensores, veículos, câmeras e sistemas críticos, o 5G Privativo deixa de ser apenas uma tecnologia de conectividade e passa a ser uma plataforma estratégica para automação, digitalizacao e novos modelos de operação.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function fwaArticlePage() {
  const title = "Como funciona o FWA?";
  const excerpt = "O FWA, sigla para Fixed Wireless Access, é uma forma de entregar acesso à Internet em um ponto fixo utilizando redes móveis 4G LTE ou 5G.";
  return `
    ${pageHero(title, excerpt, ["FWA", "4G LTE", "5G", "CPE", "Fibra sem fio"])}
    <section class="section">
      <article class="container article-page article-fwa">
        <p>O <strong>FWA</strong>, sigla para <em>Fixed Wireless Access</em>, é uma forma de entregar acesso à Internet em um ponto fixo utilizando redes móveis <strong>4G LTE</strong> ou <strong>5G</strong>.</p>
        <p>Na prática, o FWA funciona como uma "fibra sem fio": em vez de levar um cabo óptico até a residencia, empresa, fazenda ou filial, o último trecho da conexão e feito por rádio.</p>

        <h2>1. Diferenca entre fibra tradicional e FWA</h2>
        <p>Em uma conexão tradicional por fibra, à Internet chega até o cliente por meio de cabos opticos. No FWA, à fibra pode chegar até uma torre, POP ou estação rádio-base, é a partir dali o acesso final e feito por uma rede 4G ou 5G.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 980 360" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparacao entre fibra e FWA">
            <defs>
              <marker id="arrow-fwa-1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#475569"/>
              </marker>
            </defs>
            <rect width="980" height="360" fill="#F8FAFC"/>
            <text x="140" y="35" font-family="Arial" font-size="22" font-weight="700" fill="#0f172a">Fibra tradicional</text>
            <rect x="40" y="70" width="160" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="80" y="105" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">Internet</text>
            <line x1="200" y1="100" x2="300" y2="100" stroke="#16a34a" stroke-width="4"/>
            <rect x="300" y="70" width="160" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="345" y="105" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">Fibra</text>
            <line x1="460" y1="100" x2="560" y2="100" stroke="#16a34a" stroke-width="4"/>
            <rect x="560" y="70" width="160" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="603" y="105" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">ONU</text>
            <line x1="720" y1="100" x2="820" y2="100" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-1)"/>
            <rect x="820" y="70" width="130" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="860" y="105" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">Wi-Fi</text>
            <text x="160" y="210" font-family="Arial" font-size="22" font-weight="700" fill="#0f172a">FWA 4G/5G</text>
            <rect x="40" y="245" width="150" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="80" y="280" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">Internet</text>
            <line x1="190" y1="275" x2="285" y2="275" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-1)"/>
            <rect x="285" y="245" width="150" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="320" y="280" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">Core</text>
            <line x1="435" y1="275" x2="530" y2="275" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-1)"/>
            <rect x="530" y="245" width="160" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="560" y="280" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">eNB/gNB</text>
            <path d="M690 275 C730 235, 780 235, 820 275" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <path d="M705 292 C740 260, 770 260, 805 292" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <rect x="820" y="245" width="130" height="60" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="855" y="280" font-family="Arial" font-size="15" font-weight="500" fill="#1e293b">CPE</text>
          </svg>
        </div>

        <h2>2. Arquitetura básica de uma rede FWA</h2>
        <p>A arquitetura do FWA é composta por alguns elementos principais: backbone IP, Core LTE ou 5G, estação rádio-base, interface aérea, CPE do cliente e rede interna.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 1000 520" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitetura FWA">
            <defs><marker id="arrow-fwa-2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#475569"/></marker></defs>
            <rect width="1000" height="520" fill="#F8FAFC"/>
            <rect x="410" y="30" width="180" height="65" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="470" y="62" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Internet</text>
            <text x="445" y="82" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Transito IP / PTT</text>
            <line x1="500" y1="95" x2="500" y2="145" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-2)"/>
            <rect x="390" y="145" width="220" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="455" y="178" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Backbone</text>
            <text x="425" y="198" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Fibra, roteadores e POP</text>
            <line x1="500" y1="215" x2="500" y2="265" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-2)"/>
            <rect x="360" y="265" width="280" height="80" rx="14" fill="#eef2ff" stroke="#4338ca" stroke-width="2"/>
            <text x="430" y="300" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Core LTE / 5G</text>
            <text x="390" y="322" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Autenticacao, QoS, APN, políticas</text>
            <line x1="640" y1="305" x2="735" y2="305" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-2)"/>
            <rect x="735" y="265" width="190" height="80" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
            <text x="775" y="300" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">eNB / gNB</text>
            <text x="765" y="322" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Estação rádio-base</text>
            <path d="M735 345 C620 430, 400 430, 285 345" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <path d="M760 365 C640 465, 380 465, 260 365" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <rect x="75" y="265" width="190" height="80" rx="14" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>
            <text x="135" y="300" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">CPE FWA</text>
            <text x="105" y="322" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Indoor ou outdoor</text>
            <line x1="170" y1="345" x2="170" y2="405" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-2)"/>
            <rect x="70" y="405" width="200" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="125" y="438" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Rede local</text>
            <text x="95" y="458" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Wi-Fi, Ethernet, switches</text>
          </svg>
        </div>

        <h2>3. O papel da CPE no FWA</h2>
        <p>A <strong>CPE</strong> é o equipamento instalado no cliente. Ela recebe o sinal 4G ou 5G da estação rádio-base e transforma esse acesso em uma conexão local via Ethernet ou Wi-Fi.</p>
        <p>Existem dois modelos principais:</p>
        <h3>CPE indoor</h3>
        <p>E instalada dentro do imovel. Tem instalacao simples, mas pode sofrer mais com perda de sinal causada por paredes, vidros, lajes e obstáculos.</p>
        <h3>CPE outdoor</h3>
        <p>E instalada externamente, normalmente em parede, mastro ou telhado. Costuma entregar melhor desempenho, pois possui melhor visada para a torre, maior ganho de antena e menor perda por obstáculos.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 900 360" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPE indoor e outdoor">
            <rect width="900" height="360" fill="#F8FAFC"/>
            <line x1="105" y1="90" x2="105" y2="310" stroke="#475569" stroke-width="5"/>
            <line x1="65" y1="310" x2="145" y2="310" stroke="#475569" stroke-width="5"/>
            <line x1="105" y1="110" x2="65" y2="170" stroke="#475569" stroke-width="5"/>
            <line x1="105" y1="110" x2="145" y2="170" stroke="#475569" stroke-width="5"/>
            <text x="55" y="70" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Torre 4G/5G</text>
            <polygon points="520,120 700,120 760,190 460,190" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
            <rect x="485" y="190" width="250" height="130" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="550" y="345" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Cliente FWA</text>
            <rect x="455" y="175" width="70" height="35" rx="12" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>
            <text x="465" y="198" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Outdoor</text>
            <rect x="610" y="240" width="70" height="35" rx="12" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
            <text x="622" y="263" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Indoor</text>
            <path d="M125 110 C240 70, 350 80, 455 188" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <path d="M130 140 C270 110, 410 125, 610 250" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <rect x="240" y="35" width="250" height="55" rx="12" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>
            <text x="265" y="60" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">CPE outdoor</text>
            <text x="265" y="78" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Melhor sinal e estabilidade</text>
            <rect x="610" y="35" width="230" height="55" rx="12" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
            <text x="635" y="60" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">CPE indoor</text>
            <text x="635" y="78" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Instalacao mais simples</text>
          </svg>
        </div>

        <h2>4. Como a capacidade e compartilhada</h2>
        <p>Diferente da fibra dedicada ponto a ponto, no FWA os recursos de rádio da célula são compartilhados entre varios clientes. A estação rádio-base distribui os recursos conforme a qualidade do sinal, demanda de tráfego e políticas de QoS.</p>
        <p>No LTE, essa distribuição ocorre por meio dos <strong>PRBs</strong>. No 5G, ocorre por meio dos <strong>Resource Blocks</strong>, considerando diferentes larguras de banda e espacamentos de subportadora.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 980 400" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compartilhamento de recursos no FWA">
            <rect width="980" height="400" fill="#F8FAFC"/>
            <line x1="120" y1="80" x2="120" y2="320" stroke="#475569" stroke-width="5"/>
            <line x1="75" y1="320" x2="165" y2="320" stroke="#475569" stroke-width="5"/>
            <text x="55" y="55" font-family="Arial" font-size="15" font-weight="600" fill="#0f172a">eNB / gNB</text>
            <rect x="650" y="55" width="210" height="55" rx="12" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="675" y="85" font-family="Arial" font-size="15" font-weight="600" fill="#0f172a">Cliente A - bom sinal</text>
            <rect x="650" y="165" width="210" height="55" rx="12" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="675" y="195" font-family="Arial" font-size="15" font-weight="600" fill="#0f172a">Cliente B - médio sinal</text>
            <rect x="650" y="275" width="210" height="55" rx="12" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="675" y="305" font-family="Arial" font-size="15" font-weight="600" fill="#0f172a">Cliente C - fraco sinal</text>
            <path d="M135 100 C300 30, 480 40, 650 82" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <path d="M135 180 C300 150, 480 155, 650 192" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <path d="M135 260 C310 290, 500 305, 650 302" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <rect x="300" y="340" width="380" height="35" rx="8" fill="#e2e8f0"/>
            <rect x="300" y="340" width="170" height="35" rx="8" fill="#2563eb"/>
            <rect x="475" y="340" width="115" height="35" rx="8" fill="#2563eb" opacity="0.75"/>
            <rect x="595" y="340" width="85" height="35" rx="8" fill="#2563eb" opacity="0.5"/>
            <text x="320" y="363" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Recursos de rádio compartilhados entre clientes</text>
          </svg>
        </div>

        <h2>5. Frequência, cobertura e capacidade</h2>
        <p>A frequência utilizada influencia diretamente a cobertura e a capacidade do FWA. Frequências mais baixas tendem a cobrir áreas maiores. Frequências mais altas tendem a entregar mais capacidade, porém com menor alcance e maior sensibilidade a obstáculos.</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Faixa</th><th>Perfil típico</th><th>Uso comum</th></tr></thead>
            <tbody>
              <tr><td>700 MHz</td><td>Alta cobertura</td><td>Áreas rurais, rodovias e grandes distâncias</td></tr>
              <tr><td>2,6 GHz / n38</td><td>Equilibrio entre cobertura e capacidade</td><td>FWA urbano, ISP, redes privativas e atendimento regional</td></tr>
              <tr><td>3,5 GHz / n78</td><td>Alta capacidade</td><td>5G FWA urbano e empresarial</td></tr>
              <tr><td>mmWave</td><td>Altissima capacidade e menor alcance</td><td>Ambientes densos, curtas distâncias e aplicações específicas</td></tr>
            </tbody>
          </table>
        </div>

        <h2>6. FWA substitui à fibra?</h2>
        <p>O FWA não deve ser visto apenas como substituto da fibra. Em muitos cenários, ele funciona melhor como complemento.</p>
        <p>A fibra continua sendo a melhor alternativa para altíssima capacidade, baixa latência e grande previsibilidade. Já o FWA e muito competitivo quando o custo ou o prazo para levar fibra até o cliente e elevado.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 980 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fibra e FWA como redes complementares">
            <defs><marker id="arrow-fwa-3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#475569"/></marker></defs>
            <rect width="980" height="380" fill="#F8FAFC"/>
            <rect x="390" y="35" width="200" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="440" y="68" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">POP do ISP</text>
            <text x="425" y="88" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Backbone e roteamento</text>
            <line x1="490" y1="105" x2="260" y2="220" stroke="#16a34a" stroke-width="5"/>
            <line x1="490" y1="105" x2="720" y2="220" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-3)"/>
            <rect x="120" y="220" width="220" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="175" y="253" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">FTTH / Fibra</text>
            <text x="155" y="273" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Áreas com rede cabeada</text>
            <rect x="650" y="220" width="220" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="715" y="253" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">FWA 4G/5G</text>
            <text x="680" y="273" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Áreas sem fibra viável</text>
            <path d="M760 220 C710 160, 650 150, 590 105" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <path d="M780 220 C730 145, 660 130, 590 85" stroke="#2563eb" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
            <text x="330" y="340" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Fibra e FWA podem operar juntos na estratégia do provedor</text>
          </svg>
        </div>

        <h2>7. FWA como redundância para empresas</h2>
        <p>Para empresas, o FWA também pode ser utilizado como link secundario. Nesse modelo, à fibra permanece como acesso principal é o FWA entra como contingência em caso de falha.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 900 360" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FWA como redundância empresarial">
            <defs><marker id="arrow-fwa-4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#475569"/></marker></defs>
            <rect width="900" height="360" fill="#F8FAFC"/>
            <rect x="80" y="70" width="210" height="70" rx="14" fill="#ecfdf5" stroke="#16a34a" stroke-width="2"/>
            <text x="130" y="103" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">Fibra principal</text>
            <text x="120" y="123" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Link de maior capacidade</text>
            <rect x="80" y="220" width="210" height="70" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
            <text x="125" y="253" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">FWA 4G/5G</text>
            <text x="110" y="273" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Link de contingência</text>
            <line x1="290" y1="105" x2="420" y2="170" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-4)"/>
            <line x1="290" y1="255" x2="420" y2="205" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-4)"/>
            <rect x="420" y="155" width="180" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="470" y="188" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">SD-WAN</text>
            <text x="450" y="208" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Failover automático</text>
            <line x1="600" y1="190" x2="720" y2="190" stroke="#475569" stroke-width="3" marker-end="url(#arrow-fwa-4)"/>
            <rect x="720" y="155" width="130" height="70" rx="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
            <text x="755" y="188" font-family="Arial" font-size="16" font-weight="600" fill="#0f172a">LAN</text>
            <text x="740" y="208" font-family="Arial" font-size="13" font-weight="500" fill="#334155">Empresa</text>
          </svg>
        </div>

        <h2>8. FWA em redes privativas</h2>
        <p>Em redes LTE ou 5G privativas, o FWA pode conectar câmeras, escritórios remotos, equipamentos industriais, sistemas de automação, Wi-Fi corporativo, sensores e aplicações críticas.</p>
        <p>A grande diferença é que, nesse caso, a empresa ou o operador da rede tem maior controle sobre autenticação, APN, QoS, priorização de tráfego, segurança e gerenciamento dos dispositivos.</p>

        <h2>9. O que o 5G melhora no FWA?</h2>
        <p>O 5G trouxe ganhos relevantes para o FWA, principalmente em capacidade, eficiência espectral e flexibilidade de implantação.</p>
        <ul class="article-list">
          <li><strong>Massive MIMO:</strong> aumenta a capacidade da célula.</li>
          <li><strong>Beamforming:</strong> direciona melhor o sinal para o usuário.</li>
          <li><strong>Maior largura de banda:</strong> permite velocidades mais altas.</li>
          <li><strong>mmWave:</strong> viabiliza altíssima capacidade em curtas distâncias.</li>
          <li><strong>QoS mais flexível:</strong> permite criar serviços com diferentes prioridades.</li>
        </ul>

        <h2>Conclusão</h2>
        <p>O FWA é uma solução estratégica para entregar Internet utilizando redes 4G ou 5G no último trecho de acesso. Ele pode ser usado para atender áreas sem fibra, acelerar a expansao de provedores, conectar empresas, criar redundância e viabilizar redes privativas.</p>
        <p>Seu funcionamento pode ser resumido da seguinte forma:</p>
        <div class="highlight-box">
          <p><strong>Core LTE/5G -> estação rádio-base -> enlace de rádio -> CPE do cliente -> rede local.</strong></p>
        </div>
        <p>Quando bem dimensionado, o FWA não é apenas uma alternativa à fibra. Ele se torna uma peça importante em uma estratégia de conectividade híbrida, combinando fibra, rádio, 4G e 5G para ampliar cobertura, reduzir custo de implantação e aumentar a resiliência da rede.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function remoteAreasArticlePage() {
  const title = "Como levar conectividade para áreas remotas?";
  const excerpt = "Levar conectividade para áreas remotas é um dos maiores desafios das telecomunicações. Rodovias, fazendas, minas, usinas, ferrovias, comunidades rurais e regiões afastadas normalmente possuem pouca infraestrutura disponível, grandes distâncias, dificuldade de acesso físico e, muitas vezes, ausência de energia elétrica confiável.";
  return `
    ${pageHero(title, excerpt, ["Áreas remotas", "Fibra", "Rádio", "LTE/5G", "FWA", "Satélite"])}
    <section class="section">
      <article class="container article-page article-connectivity-remote">
        <p>${excerpt}</p>
        <p>Por isso, o desafio não é apenas "levar internet", mas construir uma solução tecnicamente viável, economicamente sustentável e preparada para operar com estabilidade em ambientes adversos.</p>

        <h2>Por que áreas remotas são mais dificeis de conectar?</h2>
        <p>Em centros urbanos, a infraestrutura de postes, dutos, energia, fibra óptica e torres já está parcialmente disponível. Em áreas remotas, normalmente e necessário construir praticamente tudo do zero.</p>
        <ul class="article-list">
          <li>Grandes distâncias entre os pontos atendidos;</li>
          <li>Baixa densidade de usuários;</li>
          <li>Ausencia de fibra óptica próxima;</li>
          <li>Dificuldade de acesso para instalacao e manutenção;</li>
          <li>Falta de energia elétrica ou energia instavel;</li>
          <li>Necessidade de alta disponibilidade para aplicações críticas.</li>
        </ul>
        <p>Por esse motivo, a conectividade remota exige uma arquitetura combinada, utilizando fibra, rádio, LTE, 5G, FWA, satélite e sistemas de energia autônoma conforme a realidade de cada projeto.</p>

        <h2>Arquitetura híbrida para conectividade remota</h2>
        <p>Na prática, raramente uma única tecnologia resolve todo o problema. O modelo mais eficiente costuma ser híbrido: à fibra chega até um ponto estratégico, o rádio ou o satélite faz o transporte até a região remota, é o acesso final e entregue por LTE, 5G, Wi-Fi ou FWA.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 960 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitetura híbrida para conectividade remota">
            <defs>
              <linearGradient id="remote-g1" x1="0" x2="1"><stop offset="0%" stop-color="#eaf3ff"/><stop offset="100%" stop-color="#f7fbff"/></linearGradient>
              <filter id="remote-shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/></filter>
            </defs>
            <rect width="960" height="520" rx="24" fill="url(#remote-g1)"/>
            <text x="480" y="45" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Arquitetura híbrida para áreas remotas</text>
            <rect x="60" y="115" width="170" height="90" rx="16" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="145" y="145" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#17324d">Data Center</text>
            <text x="145" y="170" text-anchor="middle" font-family="Arial" font-size="13" fill="#4a647a">Internet, Core, NOC</text>
            <rect x="310" y="115" width="170" height="90" rx="16" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="395" y="145" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#17324d">POP</text>
            <text x="395" y="170" text-anchor="middle" font-family="Arial" font-size="13" fill="#4a647a">Ponto de presença</text>
            <rect x="610" y="110" width="210" height="100" rx="16" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="715" y="140" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#17324d">Torre remota</text>
            <text x="715" y="165" text-anchor="middle" font-family="Arial" font-size="13" fill="#4a647a">LTE, 5G, FWA ou rádio</text>
            <line x1="230" y1="160" x2="310" y2="160" stroke="#2374ab" stroke-width="4"/>
            <text x="270" y="145" text-anchor="middle" font-family="Arial" font-size="12" fill="#2374ab">Fibra</text>
            <line x1="480" y1="160" x2="610" y2="160" stroke="#2374ab" stroke-width="4" stroke-dasharray="10 8"/>
            <text x="545" y="145" text-anchor="middle" font-family="Arial" font-size="12" fill="#2374ab">Rádio / Satélite</text>
            <line x1="715" y1="220" x2="715" y2="350" stroke="#17324d" stroke-width="5"/>
            <line x1="680" y1="350" x2="750" y2="350" stroke="#17324d" stroke-width="5"/>
            <line x1="715" y1="240" x2="675" y2="350" stroke="#17324d" stroke-width="3"/>
            <line x1="715" y1="240" x2="755" y2="350" stroke="#17324d" stroke-width="3"/>
            <path d="M690 250 Q715 220 740 250" fill="none" stroke="#2374ab" stroke-width="4"/>
            <path d="M670 235 Q715 190 760 235" fill="none" stroke="#2374ab" stroke-width="3"/>
            <rect x="80" y="360" width="150" height="70" rx="14" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="155" y="390" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#17324d">Fazendas</text>
            <text x="155" y="412" text-anchor="middle" font-family="Arial" font-size="12" fill="#4a647a">IoT e máquinas</text>
            <rect x="300" y="360" width="150" height="70" rx="14" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="375" y="390" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#17324d">Rodovias</text>
            <text x="375" y="412" text-anchor="middle" font-family="Arial" font-size="12" fill="#4a647a">CFTV e operação</text>
            <rect x="520" y="360" width="150" height="70" rx="14" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="595" y="390" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#17324d">Mineracao</text>
            <text x="595" y="412" text-anchor="middle" font-family="Arial" font-size="12" fill="#4a647a">Automação crítica</text>
            <rect x="740" y="360" width="150" height="70" rx="14" fill="#ffffff" filter="url(#remote-shadow)"/>
            <text x="815" y="390" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#17324d">Comunidades</text>
            <text x="815" y="412" text-anchor="middle" font-family="Arial" font-size="12" fill="#4a647a">Internet e serviços</text>
            <line x1="715" y1="300" x2="155" y2="360" stroke="#70a9d6" stroke-width="2" stroke-dasharray="6 6"/>
            <line x1="715" y1="300" x2="375" y2="360" stroke="#70a9d6" stroke-width="2" stroke-dasharray="6 6"/>
            <line x1="715" y1="300" x2="595" y2="360" stroke="#70a9d6" stroke-width="2" stroke-dasharray="6 6"/>
            <line x1="715" y1="300" x2="815" y2="360" stroke="#70a9d6" stroke-width="2" stroke-dasharray="6 6"/>
          </svg>
        </div>

        <h2>Principais tecnologias utilizadas</h2>
        <h3>1. Fibra óptica</h3>
        <p>A fibra óptica continua sendo a melhor tecnologia para transporte de grande capacidade. Quando existe infraestrutura disponível, ela deve ser considerada como primeira opcao para backbone ou backhaul principal.</p>
        <p>Porém, em áreas remotas, o custo de construcao pode ser elevado. Muitas vezes, à fibra chega apenas até um ponto estratégico, como uma cidade, subestacao, base operacional ou ponto de presença. A partir dali, outras tecnologias complementam a cobertura.</p>
        <h3>2. Rádio ponto-a-ponto</h3>
        <p>O rádio ponto-a-ponto é utilizado para transportar tráfego entre dois locais distantes, principalmente quando a passagem de fibra e cara ou demorada.</p>
        <p>Essa solução exige visada direta entre as torres é um bom planejamento de frequência, capacidade e disponibilidade. Em muitos projetos, o rádio é a ponte entre o ponto onde existe fibra é a região onde será entregue a conectividade.</p>
        <h3>3. FWA - Fixed Wireless Access</h3>
        <p>O FWA utiliza redes LTE ou 5G para entregar internet fixa sem fio. Em vez de passar fibra até cada cliente, uma estação rádio-base cobre uma região, é o usuário recebe o sinal por meio de uma CPE externa ou interna.</p>
        <p>E uma solução muito interessante para provedores de internet, fazendas, condominios rurais, empresas isoladas e pequenas comunidades.</p>
        <h3>4. Redes LTE e 5G privativas</h3>
        <p>Quando a conectividade precisa atender uma operação critica, como rodovia, mineracao, porto, industria ou agronegócio, uma rede LTE ou 5G privativa pode ser a melhor alternativa.</p>
        <p>Diferente de uma rede Wi-Fi comum, uma rede celular privativa possui controle de mobilidade, autenticação por SIM/eSIM, priorização de tráfego, maior alcance por célula e melhor previsibilidade operacional.</p>
        <h3>5. Satélite</h3>
        <p>Quando não existe fibra, rádio ou infraestrutura terrestre viável, o satélite pode ser usado como solução principal ou redundante. Com as redes de satélites de baixa órbita, a latência melhorou bastante em comparação com os sistemas geoestacionários tradicionais.</p>
        <p>O satélite é especialmente util para locais temporarios, backup de conectividade, operações emergenciais e regiões extremamente isoladas.</p>

        <h2>Comparativo das tecnologias</h2>
        <div class="article-diagram wide">
          <svg viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparativo de tecnologias para conectividade remota">
            <rect width="960" height="500" rx="24" fill="#f8fbff"/>
            <text x="480" y="45" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Comparativo de tecnologias</text>
            <rect x="60" y="85" width="840" height="55" rx="12" fill="#17324d"/>
            <text x="120" y="120" fill="#ffffff" font-family="Arial" font-size="14" font-weight="700">Tecnologia</text>
            <text x="310" y="120" fill="#ffffff" font-family="Arial" font-size="14" font-weight="700">Melhor uso</text>
            <text x="570" y="120" fill="#ffffff" font-family="Arial" font-size="14" font-weight="700">Ponto forte</text>
            <text x="760" y="120" fill="#ffffff" font-family="Arial" font-size="14" font-weight="700">Atencao</text>
            <rect x="60" y="155" width="840" height="60" rx="12" fill="#ffffff"/>
            <text x="120" y="190" fill="#17324d" font-family="Arial" font-size="14" font-weight="700">Fibra</text>
            <text x="310" y="190" fill="#4a647a" font-family="Arial" font-size="14">Backbone e alta capacidade</text>
            <text x="570" y="190" fill="#4a647a" font-family="Arial" font-size="14">Baixa latência</text>
            <text x="760" y="190" fill="#4a647a" font-family="Arial" font-size="14">Custo de obra</text>
            <rect x="60" y="225" width="840" height="60" rx="12" fill="#edf6ff"/>
            <text x="120" y="260" fill="#17324d" font-family="Arial" font-size="14" font-weight="700">Rádio PTP</text>
            <text x="310" y="260" fill="#4a647a" font-family="Arial" font-size="14">Backhaul remoto</text>
            <text x="570" y="260" fill="#4a647a" font-family="Arial" font-size="14">Implantacao rapida</text>
            <text x="760" y="260" fill="#4a647a" font-family="Arial" font-size="14">Exige visada</text>
            <rect x="60" y="295" width="840" height="60" rx="12" fill="#ffffff"/>
            <text x="120" y="330" fill="#17324d" font-family="Arial" font-size="14" font-weight="700">FWA</text>
            <text x="310" y="330" fill="#4a647a" font-family="Arial" font-size="14">Acesso banda larga</text>
            <text x="570" y="330" fill="#4a647a" font-family="Arial" font-size="14">Escalavel</text>
            <text x="760" y="330" fill="#4a647a" font-family="Arial" font-size="14">Planejamento RF</text>
            <rect x="60" y="365" width="840" height="60" rx="12" fill="#edf6ff"/>
            <text x="120" y="400" fill="#17324d" font-family="Arial" font-size="14" font-weight="700">LTE/5G</text>
            <text x="310" y="400" fill="#4a647a" font-family="Arial" font-size="14">Operação crítica</text>
            <text x="570" y="400" fill="#4a647a" font-family="Arial" font-size="14">Mobilidade e QoS</text>
            <text x="760" y="400" fill="#4a647a" font-family="Arial" font-size="14">Core e espectro</text>
          </svg>
        </div>

        <h2>O papel da energia em áreas remotas</h2>
        <p>Em muitos projetos, a energia e tao critica quanto a própria conectividade. Uma torre pode ter rádio, antena, roteador, switch, sistema de monitoramento e equipamentos de transmissão, mas nada disso funciona sem uma alimentacao estavel.</p>
        <p>Por isso, é comum utilizar sistemas hibridos de energia, combinando rede elétrica, painéis solares, banco de baterias, retificadores, inversores e, em alguns casos, geradores.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 960 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sistema de energia para torre remota">
            <defs><marker id="remote-arrow-energy" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2374ab"/></marker></defs>
            <rect width="960" height="420" rx="24" fill="#f9fcff"/>
            <text x="480" y="45" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Energia para uma torre remota</text>
            <rect x="80" y="120" width="180" height="110" rx="16" fill="#ffffff" stroke="#c9dff2" stroke-width="2"/>
            <text x="170" y="150" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#17324d">Paineis solares</text>
            <line x1="110" y1="175" x2="230" y2="175" stroke="#2374ab" stroke-width="3"/>
            <line x1="110" y1="200" x2="230" y2="200" stroke="#2374ab" stroke-width="3"/>
            <line x1="140" y1="165" x2="140" y2="210" stroke="#2374ab" stroke-width="2"/>
            <line x1="200" y1="165" x2="200" y2="210" stroke="#2374ab" stroke-width="2"/>
            <rect x="350" y="120" width="180" height="110" rx="16" fill="#ffffff" stroke="#c9dff2" stroke-width="2"/>
            <text x="440" y="155" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#17324d">Controlador</text>
            <text x="440" y="185" text-anchor="middle" font-family="Arial" font-size="13" fill="#4a647a">Retificador / Inversor</text>
            <rect x="620" y="120" width="180" height="110" rx="16" fill="#ffffff" stroke="#c9dff2" stroke-width="2"/>
            <text x="710" y="155" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#17324d">Baterias</text>
            <text x="710" y="185" text-anchor="middle" font-family="Arial" font-size="13" fill="#4a647a">Autonomia do site</text>
            <line x1="480" y1="285" x2="480" y2="370" stroke="#17324d" stroke-width="5"/>
            <line x1="445" y1="370" x2="515" y2="370" stroke="#17324d" stroke-width="5"/>
            <path d="M455 305 Q480 275 505 305" fill="none" stroke="#2374ab" stroke-width="4"/>
            <text x="480" y="400" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#17324d">Equipamentos de telecom</text>
            <line x1="260" y1="175" x2="350" y2="175" stroke="#2374ab" stroke-width="4" marker-end="url(#remote-arrow-energy)"/>
            <line x1="530" y1="175" x2="620" y2="175" stroke="#2374ab" stroke-width="4"/>
            <line x1="710" y1="230" x2="480" y2="285" stroke="#2374ab" stroke-width="4" stroke-dasharray="8 6"/>
          </svg>
        </div>

        <h2>Caso prático: conectividade em rodovias</h2>
        <p>Em uma rodovia, a conectividade pode ser usada para câmeras, sensores, comunicação das equipes, sistemas de pedágio, painéis de mensagem variável, telemetria, atendimento operacional e segurança.</p>
        <p>Uma arquitetura eficiente pode combinar fibra nós pontos onde ela já existe, rádio para interligar torres distantes, LTE em 700 MHz para ampla cobertura e satélite como redundância.</p>
        <p>Nesse cenário, a frequência baixa, como 700 MHz, é especialmente interessante porque permite maior alcance por célula e melhor penetracao em áreas abertas, reduzindo a quantidade de sites necessários.</p>

        <h2>Conclusão</h2>
        <p>Levar conectividade para áreas remotas não significa escolher uma única tecnologia. A solução mais eficiente normalmente combina varias camadas: fibra onde faz sentido, rádio onde à fibra não chega, LTE ou 5G para cobertura de acesso, FWA para banda larga fixa e satélite para redundância ou locais extremamente isolados.</p>
        <p>Com uma arquitetura bem planejada, e possível conectar fazendas, rodovias, minas, usinas, comunidades e operações críticas, criando uma infraestrutura preparada para comunicação, automação, segurança e transformação digital.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function core5gArticlePage() {
  const title = "Como funciona um Core 5G?";
  const excerpt = "O Core 5G, também chamado de 5GC ou 5G Core Network, é o cérebro da rede 5G. Ele autentica usuários, cria sessões de dados, aplica políticas de qualidade, controla mobilidade e conecta dispositivos à internet, redes corporativas, nuvem ou Edge Computing.";
  return `
    ${pageHero(title, excerpt, ["Core 5G", "5GC", "SBA", "UPF", "Network Slicing", "Edge Computing"])}
    <section class="section">
      <article class="container article-page">
        <p>O <strong>Core 5G</strong>, também chamado de <strong>5GC</strong> ou <strong>5G Core Network</strong>, é o cérebro da rede 5G. Enquanto a rede de acesso, formada pelas antenas e gNodeBs, faz a comunicação pelo rádio com os dispositivos, o Core 5G é responsável por autenticar usuários, criar sessões de dados, aplicar políticas de qualidade, controlar mobilidade e conectar os dispositivos à internet, redes corporativas, aplicações em nuvem ou ambientes de Edge Computing.</p>
        <p>Em uma explicação simples, a antena 5G entrega o acesso sem fio, mas é o Core 5G que decide se aquele dispositivo pode entrar na rede, qual serviço ele pode utilizar, qual prioridade terá, por onde o tráfego irá passar e quais regras seráo aplicadas.</p>

        <h2>O que mudou em relação ao Core 4G?</h2>
        <p>No 4G, o Core era chamado de <strong>EPC</strong>, ou <strong>Evolved Packet Core</strong>. Ele era composto por elementos como MME, SGW, PGW, HSS e PCRF.</p>
        <p>No 5G, a arquitetura foi redesenhada. Em vez de poucos elementos grandes e mais centralizados, o Core 5G passou a ser dividido em varias funcoes de rede independentes. Essa arquitetura é chamada de <strong>SBA - Service Based Architecture</strong>.</p>
        <p>Na prática, isso significa que o Core 5G se aproxima muito mais de uma arquitetura moderna de software, com serviços independentes, APIs, containers, virtualizacao, Kubernetes e possibilidade de implantação em nuvem, data center local ou edge.</p>

        <h2>Arquitetura simplificada do Core 5G</h2>
        <div class="article-diagram narrow">
          <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitetura simplificada do Core 5G">
            <defs><marker id="core5g-arrow-1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#555"/></marker></defs>
            <rect width="900" height="520" fill="#F8FAFC"/>
            <rect x="40" y="210" width="130" height="70" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="105" y="238" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">UE</text>
            <text x="105" y="260" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Celular / CPE / IoT</text>
            <rect x="230" y="210" width="140" height="70" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="300" y="238" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">gNodeB</text>
            <text x="300" y="260" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Rádio 5G</text>
            <rect x="440" y="55" width="360" height="300" rx="12" fill="#eef6f2" stroke="#2f7d4f" stroke-width="2"/>
            <text x="620" y="90" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">Core 5G</text>
            <rect x="470" y="120" width="100" height="55" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="520" y="153" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">AMF</text>
            <rect x="620" y="120" width="100" height="55" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="670" y="153" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">SMF</text>
            <rect x="470" y="210" width="100" height="55" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="520" y="243" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">AUSF</text>
            <rect x="620" y="210" width="100" height="55" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="670" y="243" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">UDM</text>
            <rect x="545" y="290" width="100" height="45" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="595" y="318" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">NRF</text>
            <rect x="710" y="290" width="70" height="45" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="745" y="318" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">PCF</text>
            <rect x="505" y="405" width="150" height="70" rx="10" fill="#fff7e6" stroke="#d28a00" stroke-width="2"/>
            <text x="580" y="433" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">UPF</text>
            <text x="580" y="455" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Plano de dados</text>
            <rect x="715" y="405" width="135" height="70" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="782" y="433" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">Internet</text>
            <text x="782" y="455" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Cloud / Empresa</text>
            <path d="M170 245 H230" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M370 245 H470" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M570 147 H620" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M670 175 V405" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M655 440 H715" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M520 175 V210" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M570 238 H620" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M595 290 V265" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
            <path d="M645 313 H710" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-1)"/>
          </svg>
        </div>

        <h2>Separacao entre plano de controle e plano de usuário</h2>
        <p>Uma das principais características do Core 5G é a separacao clara entre <strong>plano de controle</strong> e <strong>plano de usuário</strong>.</p>
        <p>O plano de controle decide o que deve acontecer. Ele autentica o dispositivo, controla mobilidade, cria sessões, aplica políticas e define qual caminho será usado. Já o plano de usuário transporta os pacotes de dados propriamente ditos.</p>
        <p>Essa separacao permite que a parte de controle fique em um data center central ou em nuvem, enquanto a <strong>UPF</strong> pode ser posicionada mais próxima do usuário, em um site local ou ambiente de edge, reduzindo latência e melhorando desempenho.</p>

        <h2>Principais funcoes do Core 5G</h2>
        <h3>AMF - Access and Mobility Management Function</h3>
        <p>O <strong>AMF</strong> é a funcao responsável pelo acesso e pela mobilidade. Ele recebe as sinalizacoes vindas da gNodeB, gerencia o registro do dispositivo, participa do processo de autenticação e acompanha a movimentacao do usuário dentro da rede.</p>
        <h3>SMF - Session Management Function</h3>
        <p>O <strong>SMF</strong> gerencia as sessões de dados, chamadas no 5G de <strong>PDU Sessions</strong>. Ele seleciona a UPF, define regras de encaminhamento, controla parâmetros de QoS e participa da atribuição de endereço IP ao dispositivo.</p>
        <h3>UPF - User Plane Function</h3>
        <p>A <strong>UPF</strong> é a funcao que encaminha o tráfego de dados. Ela faz a ligacao entre à rede 5G é à internet, rede corporativa, aplicação local ou ambiente de Edge Computing.</p>
        <p>Em muitos projetos, a UPF é um dos elementos mais estrategicos do Core 5G, porque pode ser posicionada próxima da aplicação para reduzir latência e evitar que todo o tráfego precise ir até um data center distante.</p>
        <h3>UDM - Unified Data Management</h3>
        <p>O <strong>UDM</strong> armazena informações dos assinantes e dispositivos, como perfil de serviço, permissoes, parâmetros de autenticação e dados de assinatura.</p>
        <h3>AUSF - Authentication Server Function</h3>
        <p>O <strong>AUSF</strong> participa do processo de autenticação. Ele trabalha em conjunto com o AMF é o UDM para validar se determinado dispositivo está autorizado a acessar à rede.</p>
        <h3>PCF - Policy Control Function</h3>
        <p>O <strong>PCF</strong> define políticas de rede, como prioridade de tráfego, regras de QoS, controle de banda e tratamento diferenciado para determinados serviços ou aplicações.</p>
        <h3>NRF - Network Repository Function</h3>
        <p>O <strong>NRF</strong> funciona como um catalogo de serviços dentro do Core 5G. As funcoes de rede se registram nele, permitindo que uma funcao encontre outra de forma dinamica.</p>

        <h2>Fluxo simplificado de conexão no 5G</h2>
        <p>Quando um dispositivo se conecta à rede 5G, o processo pode ser simplificado da seguinte forma:</p>
        <div class="article-diagram compact">
          <svg viewBox="0 0 780 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxo simplificado de conexão no Core 5G">
            <defs><marker id="core5g-arrow-2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#555"/></marker></defs>
            <rect width="780" height="560" fill="#F8FAFC"/>
            <rect x="60" y="40" width="140" height="60" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="130" y="68" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">1. UE</text>
            <text x="130" y="88" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Solicita acesso</text>
            <rect x="60" y="140" width="140" height="60" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="130" y="168" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">2. gNodeB</text>
            <text x="130" y="188" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Encaminha sinalizacao</text>
            <rect x="300" y="140" width="140" height="60" rx="10" fill="#eef6f2" stroke="#2f7d4f" stroke-width="2"/>
            <text x="370" y="168" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">3. AMF</text>
            <text x="370" y="188" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Registro e mobilidade</text>
            <rect x="540" y="80" width="140" height="60" rx="10" fill="#eef6f2" stroke="#2f7d4f" stroke-width="2"/>
            <text x="610" y="108" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">4. AUSF</text>
            <text x="610" y="128" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Autenticacao</text>
            <rect x="540" y="190" width="140" height="60" rx="10" fill="#eef6f2" stroke="#2f7d4f" stroke-width="2"/>
            <text x="610" y="218" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">5. UDM</text>
            <text x="610" y="238" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Perfil do assinante</text>
            <rect x="300" y="290" width="140" height="60" rx="10" fill="#eef6f2" stroke="#2f7d4f" stroke-width="2"/>
            <text x="370" y="318" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">6. SMF</text>
            <text x="370" y="338" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Cria PDU Session</text>
            <rect x="300" y="410" width="140" height="60" rx="10" fill="#fff7e6" stroke="#d28a00" stroke-width="2"/>
            <text x="370" y="438" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">7. UPF</text>
            <text x="370" y="458" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Encaminha dados</text>
            <rect x="540" y="410" width="140" height="60" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="610" y="438" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" fill="#1a1a1a">8. Rede</text>
            <text x="610" y="458" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Internet / Empresa</text>
            <path d="M130 100 V140" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M200 170 H300" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M440 160 C480 150 500 125 540 115" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M610 140 V190" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M540 220 C500 220 480 195 440 180" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M370 200 V290" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M370 350 V410" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
            <path d="M440 440 H540" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-2)"/>
          </svg>
        </div>

        <h2>O que é uma PDU Session?</h2>
        <p>No 4G, o conceito principal de conexão de dados era o <strong>EPS Bearer</strong>. No 5G, esse conceito evoluiu para a <strong>PDU Session</strong>.</p>
        <p>A PDU Session representa a conexão lógica entre o dispositivo é uma rede de dados. Essa rede pode ser à internet, uma rede corporativa, um data center, uma aplicação industrial ou uma plataforma de Edge Computing.</p>
        <p>Um mesmo dispositivo pode ter mais de uma PDU Session ativa, cada uma com características próprias. Por exemplo, uma sessão pode ser usada para internet comum, outra para uma aplicação critica e outra para acesso a uma rede privada.</p>

        <h2>Core 5G e Edge Computing</h2>
        <p>Uma das grandes vantagens do Core 5G e permitir que a UPF seja instalada perto do usuário ou da aplicação. Isso é especialmente importante em redes privativas, ambientes industriais, portos, rodovias, mineracao, utilities, logistica e aplicações de vídeo em tempo real.</p>
        <div class="article-diagram narrow">
          <svg viewBox="0 0 880 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Core 5G com UPF em Edge Computing">
            <defs><marker id="core5g-arrow-3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#555"/></marker></defs>
            <rect width="880" height="500" fill="#F8FAFC"/>
            <rect x="60" y="70" width="260" height="145" rx="12" fill="#eef6f2" stroke="#2f7d4f" stroke-width="2"/>
            <text x="190" y="105" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">Core Central</text>
            <text x="190" y="135" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">AMF - SMF - UDM - PCF</text>
            <text x="190" y="165" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Controle, políticas e assinantes</text>
            <rect x="500" y="70" width="280" height="145" rx="12" fill="#fff7e6" stroke="#d28a00" stroke-width="2"/>
            <text x="640" y="105" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">Edge Site</text>
            <text x="640" y="135" text-anchor="middle" font-family="Arial" font-size="16" fill="#1a1a1a">UPF Local</text>
            <text x="640" y="165" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Baixa latência e tráfego local</text>
            <rect x="500" y="300" width="130" height="70" rx="10" fill="#f5f8ff" stroke="#1f4e79" stroke-width="2"/>
            <text x="565" y="330" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">gNodeB</text>
            <text x="565" y="352" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Acesso 5G</text>
            <rect x="680" y="300" width="130" height="70" rx="10" fill="#f7f7f7" stroke="#666" stroke-width="2"/>
            <text x="745" y="330" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">Aplicação</text>
            <text x="745" y="352" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">MEC / Local</text>
            <rect x="120" y="300" width="130" height="70" rx="10" fill="#f7f7f7" stroke="#666" stroke-width="2"/>
            <text x="185" y="330" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#1a1a1a">Nuvem</text>
            <text x="185" y="352" text-anchor="middle" font-family="Arial" font-size="13" fill="#333">Internet / DC</text>
            <path d="M320 142 H500" stroke="#777" stroke-width="2" fill="none" stroke-dasharray="6 5" marker-end="url(#core5g-arrow-3)"/>
            <path d="M640 215 V300" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-3)"/>
            <path d="M630 335 H680" stroke="#555" stroke-width="2" fill="none" marker-end="url(#core5g-arrow-3)"/>
            <path d="M500 160 C390 210 300 270 250 320" stroke="#777" stroke-width="2" fill="none" stroke-dasharray="6 5" marker-end="url(#core5g-arrow-3)"/>
          </svg>
        </div>
        <p>Com a UPF local, o tráfego de uma câmera, sensor, máquina industrial ou aplicação critica pode permanecer dentro do próprio ambiente, sem depender de um caminho longo até a internet. Isso melhora latência, disponibilidade, segurança e previsibilidade.</p>

        <h2>Network Slicing no Core 5G</h2>
        <p>O <strong>Network Slicing</strong> é uma das capacidades mais conhecidas do 5G. Ele permite criar fatias lógicas de rede com características diferentes dentro da mesma infraestrutura física.</p>
        <p>Por exemplo, uma mesma rede 5G pode ter:</p>
        <ul class="article-list">
          <li>um slice para internet comum;</li>
          <li>um slice para FWA;</li>
          <li>um slice para IoT;</li>
          <li>um slice para aplicações industriais;</li>
          <li>um slice para serviços críticos com prioridade elevada.</li>
        </ul>
        <p>Algumas funcoes do Core podem ser compartilhadas entre slices, enquanto outras, como SMF e UPF, podem ser dedicadas para determinado serviço. Isso permite maior controle, isolamento e previsibilidade.</p>

        <h2>O Core 5G em redes privativas</h2>
        <p>Em redes privativas 5G, o Core pode ser implantado de diferentes formas:</p>
        <ul class="article-list">
          <li><strong>Local:</strong> instalado dentro do ambiente do cliente;</li>
          <li><strong>Em nuvem:</strong> hospedado em data center ou cloud;</li>
          <li><strong>Hibrido:</strong> controle centralizado e UPF local no edge.</li>
        </ul>
        <p>A escolha depende dos requisitos do projeto. Para aplicações que exigem baixa latência, continuidade operacional e tráfego local, a arquitetura híbrida ou local costuma ser mais adequada. Para aplicações menos críticas, o Core em nuvem pode reduzir complexidade e custo operacional.</p>

        <h2>Comparacao entre EPC 4G e Core 5G</h2>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Core 4G / EPC</th><th>Core 5G / 5GC</th></tr></thead>
            <tbody>
              <tr><td>Arquitetura baseada em nós</td><td>Arquitetura baseada em serviços</td></tr>
              <tr><td>MME, SGW, PGW, HSS e PCRF</td><td>AMF, SMF, UPF, UDM, AUSF, PCF e NRF</td></tr>
              <tr><td>Interfaces mais rígidas</td><td>Uso de APIs e comunicação entre serviços</td></tr>
              <tr><td>Menor flexibilidade para edge</td><td>UPF pode ser distribuida no edge</td></tr>
              <tr><td>APN como separacao lógica de serviços</td><td>Network Slicing nativo e mais granular</td></tr>
              <tr><td>Escalabilidade mais tradicional</td><td>Arquitetura preparada para cloud-native</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Por que o Core 5G e tao importante?</h2>
        <p>O Core 5G é importante porque ele transforma à rede móvel em uma plataforma de conectividade programável. Não se trata apenas de entregar mais velocidade ao usuário final. O Core 5G permite criar redes com políticas específicas, priorização de tráfego, segmentacao lógica, integração com aplicações locais e distribuição inteligente do plano de dados.</p>
        <p>Para operadoras, ISPs, integradores e empresas que desejam usar 5G em redes privativas, FWA, industria, logistica, utilities ou cidades inteligentes, o Core 5G é o elemento que permite transformar a conectividade em uma solução personalizada para cada caso de uso.</p>

        <h2>Conclusão</h2>
        <p>O Core 5G é a camada responsável por coordenar toda a inteligência da rede. Ele autentica dispositivos, cria sessões, aplica políticas, controla mobilidade, define prioridades, conecta os usuários às redes de dados e permite recursos avançados como Edge Computing e Network Slicing.</p>
        <p>Enquanto a gNodeB entrega o acesso pelo rádio, o Core 5G define como à rede deve se comportar. Por isso, em projetos modernos de conectividade, o Core não deve ser visto apenas como uma peça técnica de infraestrutura, mas como a base para criar serviços mais inteligentes, seguros e flexíveis.</p>
        <p>Para a IDA Telecom, entender o funcionamento do Core 5G é essencial para construir soluções que combinem fibra, 4G, 5G, edge e redes privativas de forma estratégica, levando conectividade de alta qualidade para empresas, provedores e ambientes críticos.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function ispPrivateNetworksArticlePage() {
  const title = "Como os provedores de internet estão deixando dinheiro na mesa";
  const excerpt = "Enquanto a competicao no mercado residencial se intensifica e as margens ficam menores, redes privativas LTE e 5G abrem uma oportunidade de maior valor agregado para provedores de internet.";
  return `
    ${pageHero(title, excerpt, ["Para Provedores", "Redes Privativas", "LTE/5G", "FWA Corporativo", "Receita recorrente"])}
    <section class="section">
      <article class="container article-page">
        <p>Durante muitos anos, os provedores de internet concentraram seus esforços em aumentar a base de assinantes residenciais e expandir a cobertura de fibra óptica. Porém, enquanto a competicao no mercado residencial se intensifica e as margens se tornam cada vez menores, uma oportunidade de maior valor agregado permanece pouco explorada: <strong>as redes privativas LTE e 5G</strong>.</p>
        <p>A pergunta que muitos provedores ainda não estão fazendo é:</p>
        <blockquote><strong>Quanto dinheiro está sendo deixado na mesa ao não atender o mercado corporativo com soluções de conectividade móvel privada?</strong></blockquote>

        <h2>O mercado residencial está cada vez mais comoditizado</h2>
        <p>No segmento residencial, o cenário é conhecido: guerra de precos, alto custo de aquisicao de clientes, elevada taxa de cancelamento, concorrencia crescente e margens cada vez mais pressionadas.</p>
        <p>Muitos provedores investem milhões em expansao de rede para disputar clientes que frequentemente trocam de operadora por pequenas diferencas de preco.</p>
        <p>Enquanto isso, empresas industriais, logisticas, agricolas e de mineracao buscam soluções que vao muito além de uma conexão convencional.</p>
        <p>Essas empresas precisam de:</p>
        <ul class="article-list">
          <li>mobilidade em grandes áreas;</li>
          <li>cobertura externa e indoor dedicada;</li>
          <li>comunicação para equipamentos, sensores e dispositivos IoT;</li>
          <li>redundância da fibra óptica;</li>
          <li>baixa latência para aplicações críticas;</li>
          <li>segurança e isolamento do tráfego;</li>
          <li>continuidade operacional.</li>
        </ul>
        <p>E justamente nesse espaco que às redes privativas LTE e 5G surgem como uma grande oportunidade para os ISPs.</p>

        <h2>O cliente corporativo não quer apenas internet</h2>
        <p>Uma fábrica não procura apenas "300 Mbps de internet". Um centro logístico não está preocupado somente com um "Wi-Fi mais rápido".</p>
        <p>O que essas empresas realmente querem é resolver problemas operacionais:</p>
        <ul class="article-list">
          <li>conectar coletores de dados;</li>
          <li>automatizar processos;</li>
          <li>rastrear ativos;</li>
          <li>garantir mobilidade para equipes;</li>
          <li>integrar AGVs, robos e máquinas;</li>
          <li>conectar câmeras, sensores e sistemas IoT;</li>
          <li>eliminar áreas sem cobertura;</li>
          <li>manter sistemas críticos funcionando mesmo em falhas da rede principal.</li>
        </ul>
        <p>Em outras palavras:</p>
        <blockquote><strong>O cliente compra produtividade, disponibilidade e segurança - não apenas megabits.</strong></blockquote>

        <h2>A maior vantagem dos ISPs já está pronta</h2>
        <p>Muitos provedores imaginam que entrar no mercado de redes privativas exige se transformar em uma operadora móvel nacional. Na prática, o ISP já possui boa parte da infraestrutura necessaria.</p>
        <div class="info-grid">
          <div><h3>Fibra óptica</h3><p>O backhaul é o transporte já estão disponíveis.</p></div>
          <div><h3>Presenca regional</h3><p>O provedor conhece a região, os clientes e possui equipes locais.</p></div>
          <div><h3>NOC e suporte</h3><p>A estrutura operacional já existe e pode ser expandida para novos serviços.</p></div>
          <div><h3>Relacionamento comercial</h3><p>O ISP já atende empresas e possui confianca construida ao longo dos anos.</p></div>
        </div>
        <p>Ou seja: a maior parte dos investimentos já foi realizada. O que falta e adicionar uma nova camada de serviços.</p>

        <h2>O provedor deixa de vender diversas soluções</h2>
        <p>Ao oferecer apenas fibra, muitos ISPs acabam abrindo espaco para que outros fornecedores atendam seus próprios clientes corporativos.</p>
        <p>Isso significa perder oportunidades como:</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Solucao</th><th>Tipo de receita</th></tr></thead>
            <tbody>
              <tr><td>Rede privativa LTE</td><td>Mensal</td></tr>
              <tr><td>Rede privativa 5G</td><td>Mensal</td></tr>
              <tr><td>APN exclusiva</td><td>Mensal</td></tr>
              <tr><td>Core dedicado ou compartilhado</td><td>Mensal</td></tr>
              <tr><td>FWA corporativo</td><td>Mensal</td></tr>
              <tr><td>Backup 4G/5G da fibra</td><td>Mensal</td></tr>
              <tr><td>IoT industrial</td><td>Mensal</td></tr>
              <tr><td>Monitoramento e NOC</td><td>Mensal</td></tr>
              <tr><td>SLA premium</td><td>Mensal</td></tr>
              <tr><td>Projetos especiais</td><td>CAPEX + OPEX</td></tr>
            </tbody>
          </table>
        </div>
        <p>Em muitos casos, um único contrato corporativo pode representar o equivalente a dezenas ou centenas de clientes residenciais.</p>

        <h2>O maior concorrente pode ser a falta de iniciativa</h2>
        <p>Quando o ISP não oferece soluções móveis privadas, o cliente normalmente procura outros fornecedores, como integradores, operadoras tradicionais, empresas de automação, fabricantes de equipamentos ou consultorias especializadas.</p>
        <p>O ponto mais critico e que essas empresas frequentemente dependem da própria fibra fornecida pelo provedor.</p>
        <blockquote><strong>Ou seja: o ISP entrega apenas o transporte, enquanto outro fornecedor captura a maior parte do valor do projeto.</strong></blockquote>

        <h2>O futuro é a convergencia entre fibra e mobilidade</h2>
        <p>A discussão não é mais "fibra ou 5G". A discussão agora é:</p>
        <blockquote><strong>Fibra e 4G/5G trabalhando juntos.</strong></blockquote>
        <p>A fibra continua sendo o alicerce da conectividade. Já à rede privativa leva essa conectividade para onde o cabo não consegue chegar ou onde a mobilidade é essencial.</p>
        <p>Essa combinação permite criar soluções para diferentes setores.</p>

        <h3>Industrias</h3>
        <ul class="article-list"><li>coletores e tablets industriais;</li><li>AGVs;</li><li>sensores IoT;</li><li>câmeras móveis;</li><li>comunicação critica.</li></ul>
        <h3>Logistica</h3>
        <ul class="article-list"><li>centros de distribuição;</li><li>patios de veículos;</li><li>portos;</li><li>armazens.</li></ul>
        <h3>Agronegócio</h3>
        <ul class="article-list"><li>fazendas;</li><li>máquinas agrícolas;</li><li>telemetria;</li><li>sensores remotos.</li></ul>
        <h3>Mineracao e energia</h3>
        <ul class="article-list"><li>áreas remotas;</li><li>subestacoes;</li><li>usinas;</li><li>equipamentos móveis.</li></ul>
        <h3>Grandes condominios e campi corporativos</h3>
        <ul class="article-list"><li>segurança;</li><li>mobilidade;</li><li>cobertura externa;</li><li>backup da fibra.</li></ul>

        <h2>O modelo de negócio e semelhante ao que os ISPs já conhecem</h2>
        <p>Assim como aconteceu com VoIP, Wi-Fi gerenciado, data center e serviços em nuvem, às redes privativas também podem ser oferecidas como serviço.</p>
        <p>O cliente paga pela solução completa:</p>
        <ul class="article-list"><li>infraestrutura;</li><li>operação;</li><li>monitoramento;</li><li>SLA;</li><li>suporte;</li><li>evoluções futuras.</li></ul>
        <p>Isso cria uma receita recorrente, previsível e de maior valor agregado.</p>

        <h2>Quem entrar primeiro terá vantagem</h2>
        <p>O mercado brasileiro de redes privativas LTE e 5G ainda está em fase de amadurecimento. Isso abre uma janela de oportunidade semelhante a vivida pelos provedores regionais quando comecaram a expandir suas redes FTTH.</p>
        <p>Os ISPs que se posicionarem agora poderao:</p>
        <ul class="article-list">
          <li>aumentar o ticket médio corporativo;</li>
          <li>reduzir a dependencia do mercado residencial;</li>
          <li>criar novas fontes de receita recorrente;</li>
          <li>fortalecer o relacionamento com clientes empresariais;</li>
          <li>tornar-se parceiros estrategicos da transformação digital.</li>
        </ul>

        <h2>Conclusão</h2>
        <p>Enquanto muitos provedores continuam disputando clientes residenciais em uma guerra de precos, um novo mercado começa a se consolidar.</p>
        <p>As redes privativas LTE e 5G representam uma evolução natural para os ISPs que desejam deixar de vender apenas conectividade e passar a entregar soluções completas para o mercado corporativo.</p>
        <p>Porque, no fim das contas, a pergunta talvez não seja:</p>
        <blockquote><strong>"Vale a pena entrar no mercado de redes privativas?"</strong></blockquote>
        <p>Mas sim:</p>
        <blockquote><strong>"Quanto dinheiro o seu provedor está deixando na mesa por ainda não ter entrado?"</strong></blockquote>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function qosArticlePage() {
  const title = "O que é QoS em LTE e 5G?";
  const excerpt = "QoS, ou Quality of Service, é o conjunto de mecanismos que permite tratar diferentes tipos de tráfego com prioridades diferentes em redes LTE e 5G.";
  return `
    ${pageHero(title, excerpt, ["QoS", "LTE", "5G", "QCI", "5QI", "Redes Privativas"])}
    <section class="section">
      <article class="container article-page">
        <p>QoS, ou <strong>Quality of Service</strong>, significa Qualidade de Servico. Em redes LTE e 5G, o QoS é o conjunto de mecanismos que permite tratar diferentes tipos de tráfego com prioridades diferentes.</p>
        <p>Uma chamada de voz, uma câmera de segurança, um sensor industrial, um tablet operacional é uma navegação comum na internet não possuem os mesmos requisitos. Alguns serviços precisam de baixa latência, outros precisam de banda garantida, enquanto outros podem funcionar em regime de melhor esforço.</p>
        <p>O QoS existe justamente para organizar esse tráfego e garantir que as aplicações críticas tenham o desempenho necessário, mesmo quando à rede está congestionada.</p>

        <h2>Por que o QoS é importante?</h2>
        <p>Sem QoS, todos os pacotes seriam tratados da mesma forma. Isso significa que uma chamada de voz poderia disputar recurso com um download pesado, uma câmera de segurança poderia perder qualidade durante congestionamentos e aplicações críticas poderiam sofrer atrasos.</p>
        <p>Com QoS, a rede consegue priorizar os serviços mais sensíveis e controlar melhor o uso dos recursos disponíveis.</p>

        <h2>Analogia simples: uma rodovia com faixas prioritárias</h2>
        <div class="article-diagram narrow">
          <svg width="100%" height="260" viewBox="0 0 900 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Analogia de QoS como faixas prioritárias em uma rodovia">
            <rect width="900" height="260" rx="20" fill="#f7f9fc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#1f2937">QoS como uma rodovia inteligente</text>
            <rect x="80" y="70" width="740" height="50" rx="12" fill="#dbeafe"/>
            <text x="105" y="102" font-size="18" font-family="Arial" font-weight="bold" fill="#1e3a8a">Faixa prioritaria</text>
            <text x="310" y="102" font-size="16" font-family="Arial" fill="#1e40af">Voz, controle industrial, emergencia, aplicações críticas</text>
            <rect x="80" y="140" width="740" height="50" rx="12" fill="#e5e7eb"/>
            <text x="105" y="172" font-size="18" font-family="Arial" font-weight="bold" fill="#374151">Faixa comum</text>
            <text x="310" y="172" font-size="16" font-family="Arial" fill="#4b5563">Internet, downloads, redes sociais, navegação comum</text>
            <circle cx="735" cy="95" r="16" fill="#2563eb"/>
            <text x="735" y="101" text-anchor="middle" font-size="15" font-family="Arial" fill="#ffffff">!</text>
            <circle cx="735" cy="165" r="16" fill="#6b7280"/>
            <text x="735" y="171" text-anchor="middle" font-size="15" font-family="Arial" fill="#ffffff">v</text>
          </svg>
        </div>
        <p>Na prática, o QoS funciona como uma rodovia com faixas prioritárias. Serviços críticos recebem prioridade, enquanto tráfegos menos sensíveis continuam funcionando, mas sem a mesma garantia de desempenho.</p>

        <h2>Quais parâmetros o QoS controla?</h2>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Parametro</th><th>Funcao</th></tr></thead>
            <tbody>
              <tr><td>Prioridade</td><td>Define qual tráfego será atendido primeiro.</td></tr>
              <tr><td>Latência</td><td>Controla o tempo de resposta da aplicação.</td></tr>
              <tr><td>Throughput</td><td>Define a taxa de transmissão disponível.</td></tr>
              <tr><td>Perda de pacotes</td><td>Controla o nível aceitavel de falhas na entrega dos pacotes.</td></tr>
              <tr><td>Jitter</td><td>Controla a variacao do atraso entre os pacotes.</td></tr>
              <tr><td>Preempcao</td><td>Permite que serviços críticos tenham prioridade sobre serviços menos importantes.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Como o QoS funciona no LTE?</h2>
        <p>No LTE, o QoS e baseado no conceito de <strong>bearers</strong>. Um bearer é um canal lógico entre o dispositivo do usuário é à rede de dados.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="300" viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxo simplificado de bearer no LTE">
            <defs><marker id="qos-arrow-1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="300" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">Bearer LTE</text>
            <rect x="70" y="115" width="130" height="70" rx="14" fill="#dbeafe"/>
            <text x="135" y="155" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold" fill="#1e3a8a">UE</text>
            <rect x="270" y="115" width="130" height="70" rx="14" fill="#dcfce7"/>
            <text x="335" y="155" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold" fill="#166534">eNodeB</text>
            <rect x="470" y="115" width="130" height="70" rx="14" fill="#fef3c7"/>
            <text x="535" y="155" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold" fill="#92400e">EPC</text>
            <rect x="670" y="115" width="160" height="70" rx="14" fill="#ede9fe"/>
            <text x="750" y="147" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#5b21b6">Internet /</text>
            <text x="750" y="168" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#5b21b6">Rede privada</text>
            <line x1="200" y1="150" x2="270" y2="150" stroke="#64748b" stroke-width="4" marker-end="url(#qos-arrow-1)"/>
            <line x1="400" y1="150" x2="470" y2="150" stroke="#64748b" stroke-width="4" marker-end="url(#qos-arrow-1)"/>
            <line x1="600" y1="150" x2="670" y2="150" stroke="#64748b" stroke-width="4" marker-end="url(#qos-arrow-1)"/>
            <text x="450" y="230" text-anchor="middle" font-size="16" font-family="Arial" fill="#374151">Cada bearer possui uma classe de QoS, como QCI, prioridade, latência e taxa garantida.</text>
          </svg>
        </div>

        <h3>Default Bearer</h3>
        <p>Quando um dispositivo se conecta à rede LTE, e criado automaticamente um <strong>default bearer</strong>. Ele e usado normalmente para tráfego comum, como navegação web, mensagens, e-mails e internet em geral.</p>
        <p>Normalmente, esse tráfego e classificado como <strong>QCI 9</strong>, associado ao modelo de melhor esforço.</p>
        <h3>Dedicated Bearer</h3>
        <p>Quando uma aplicação precisa de tratamento especial, à rede pode criar um <strong>dedicated bearer</strong>. Ele pode ser usado, por exemplo, para voz, vídeo em tempo real ou aplicações críticas.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="330" viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Default bearer e dedicated bearer no LTE">
            <defs><marker id="qos-arrow-2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="330" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">Default Bearer e Dedicated Bearer</text>
            <rect x="80" y="125" width="120" height="70" rx="14" fill="#dbeafe"/>
            <text x="140" y="165" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold" fill="#1e3a8a">UE</text>
            <rect x="700" y="125" width="130" height="70" rx="14" fill="#fef3c7"/>
            <text x="765" y="165" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold" fill="#92400e">EPC</text>
            <path d="M210 125 C360 70, 550 70, 690 125" stroke="#2563eb" stroke-width="5" fill="none" marker-end="url(#qos-arrow-2)"/>
            <text x="450" y="85" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold" fill="#1d4ed8">Dedicated Bearer - QCI 1 / Voz / baixa latência</text>
            <path d="M210 190 C360 250, 550 250, 690 190" stroke="#6b7280" stroke-width="5" fill="none" marker-end="url(#qos-arrow-2)"/>
            <text x="450" y="265" text-anchor="middle" font-size="16" font-family="Arial" font-weight="bold" fill="#374151">Default Bearer - QCI 9 / Internet / melhor esforço</text>
          </svg>
        </div>

        <h2>O papel do QCI no LTE</h2>
        <p>O LTE utiliza o <strong>QCI</strong>, ou <strong>QoS Class Identifier</strong>. O QCI define características como prioridade, atraso máximo esperado e perda de pacotes aceitavel.</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>QCI</th><th>Aplicação típica</th><th>Tipo</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>VoLTE</td><td>GBR</td></tr>
              <tr><td>2</td><td>Vídeo em tempo real</td><td>GBR</td></tr>
              <tr><td>3</td><td>Jogos interativos / aplicações sensíveis</td><td>GBR</td></tr>
              <tr><td>4</td><td>Video com buffering</td><td>GBR</td></tr>
              <tr><td>5</td><td>Sinalização IMS</td><td>Non-GBR</td></tr>
              <tr><td>6 a 9</td><td>Internet, dados corporativos e melhor esforço</td><td>Non-GBR</td></tr>
            </tbody>
          </table>
        </div>

        <h2>GBR e Non-GBR</h2>
        <p>No LTE e no 5G, os fluxos podem ser classificados como <strong>GBR</strong> ou <strong>Non-GBR</strong>.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="300" viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparacao entre GBR e Non-GBR">
            <rect width="900" height="300" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">GBR x Non-GBR</text>
            <rect x="80" y="80" width="330" height="160" rx="18" fill="#dcfce7"/>
            <text x="245" y="115" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#166534">GBR</text>
            <text x="245" y="150" text-anchor="middle" font-size="16" font-family="Arial" fill="#14532d">Taxa garantida</text>
            <text x="245" y="180" text-anchor="middle" font-size="16" font-family="Arial" fill="#14532d">Aplicações críticas</text>
            <text x="245" y="210" text-anchor="middle" font-size="16" font-family="Arial" fill="#14532d">Voz, vídeo em tempo real, controle</text>
            <rect x="490" y="80" width="330" height="160" rx="18" fill="#e5e7eb"/>
            <text x="655" y="115" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#374151">Non-GBR</text>
            <text x="655" y="150" text-anchor="middle" font-size="16" font-family="Arial" fill="#374151">Sem taxa garantida</text>
            <text x="655" y="180" text-anchor="middle" font-size="16" font-family="Arial" fill="#374151">Melhor esforço</text>
            <text x="655" y="210" text-anchor="middle" font-size="16" font-family="Arial" fill="#374151">Internet, e-mail, navegação comum</text>
          </svg>
        </div>

        <h2>Onde o QoS e aplicado no LTE?</h2>
        <p>No LTE, as políticas de QoS passam por diferentes elementos da rede.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="340" viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Elementos de QoS no LTE">
            <defs><marker id="qos-arrow-3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="340" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">QoS no LTE</text>
            <rect x="70" y="120" width="120" height="70" rx="14" fill="#dbeafe"/><text x="130" y="160" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#1e3a8a">UE</text>
            <rect x="240" y="120" width="130" height="70" rx="14" fill="#dcfce7"/><text x="305" y="160" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#166534">eNodeB</text>
            <rect x="420" y="120" width="120" height="70" rx="14" fill="#fef3c7"/><text x="480" y="160" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#92400e">PGW</text>
            <rect x="610" y="120" width="120" height="70" rx="14" fill="#ede9fe"/><text x="670" y="160" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#5b21b6">PCRF</text>
            <line x1="190" y1="155" x2="240" y2="155" stroke="#64748b" stroke-width="4" marker-end="url(#qos-arrow-3)"/>
            <line x1="370" y1="155" x2="420" y2="155" stroke="#64748b" stroke-width="4" marker-end="url(#qos-arrow-3)"/>
            <line x1="540" y1="155" x2="610" y2="155" stroke="#64748b" stroke-width="4" marker-end="url(#qos-arrow-3)"/>
            <text x="305" y="230" text-anchor="middle" font-size="15" font-family="Arial" fill="#166534">Agenda os recursos de rádio</text>
            <text x="480" y="230" text-anchor="middle" font-size="15" font-family="Arial" fill="#92400e">Aplica regras de tráfego</text>
            <text x="670" y="230" text-anchor="middle" font-size="15" font-family="Arial" fill="#5b21b6">Define políticas de QoS</text>
          </svg>
        </div>

        <h2>Como o QoS funciona no 5G?</h2>
        <p>No 5G, o conceito evolui. O QCI do LTE da lugar ao <strong>5QI</strong>, ou <strong>5G QoS Identifier</strong>. Além disso, o 5G trabalha com <strong>QoS Flows</strong> dentro de uma <strong>PDU Session</strong>.</p>
        <p>Isso permite uma granularidade maior. Uma mesma sessão de dados pode conter diferentes fluxos, cada um com uma política de QoS específica.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="360" viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PDU Session com múltiplos QoS Flows no 5G">
            <rect width="900" height="360" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">QoS no 5G: PDU Session e QoS Flows</text>
            <rect x="80" y="90" width="740" height="210" rx="20" fill="#eef2ff" stroke="#6366f1" stroke-width="2"/>
            <text x="450" y="125" text-anchor="middle" font-size="20" font-family="Arial" font-weight="bold" fill="#3730a3">PDU Session</text>
            <rect x="140" y="165" width="180" height="80" rx="16" fill="#dbeafe"/><text x="230" y="195" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#1e3a8a">QoS Flow 1</text><text x="230" y="222" text-anchor="middle" font-size="15" font-family="Arial" fill="#1e40af">Voz / 5QI 1</text>
            <rect x="360" y="165" width="180" height="80" rx="16" fill="#dcfce7"/><text x="450" y="195" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#166534">QoS Flow 2</text><text x="450" y="222" text-anchor="middle" font-size="15" font-family="Arial" fill="#166534">Video / 5QI 2</text>
            <rect x="580" y="165" width="180" height="80" rx="16" fill="#e5e7eb"/><text x="670" y="195" text-anchor="middle" font-size="17" font-family="Arial" font-weight="bold" fill="#374151">QoS Flow 3</text><text x="670" y="222" text-anchor="middle" font-size="15" font-family="Arial" fill="#374151">Internet / 5QI 9</text>
          </svg>
        </div>

        <h2>O papel do 5QI no 5G</h2>
        <p>O <strong>5QI</strong> cumpre no 5G uma funcao semelhante ao QCI no LTE, porém com maior flexibilidade. Ele define parâmetros como prioridade, atraso máximo, perda de pacotes e características do serviço.</p>
        <div class="article-table-wrap"><table class="article-table technical-table"><thead><tr><th>5QI</th><th>Aplicação típica</th></tr></thead><tbody><tr><td>1</td><td>Voz</td></tr><tr><td>2</td><td>Vídeo em tempo real</td></tr><tr><td>5</td><td>Sinalização IMS</td></tr><tr><td>8 ou 9</td><td>Internet e tráfego de melhor esforço</td></tr><tr><td>65</td><td>Comunicação crítica de baixa latência</td></tr><tr><td>82</td><td>Aplicações industriais sensíveis</td></tr></tbody></table></div>

        <h2>QoS em uma rede privativa LTE ou 5G</h2>
        <p>Em redes privativas, o QoS se torna ainda mais importante. Isso porque a mesma infraestrutura pode atender dispositivos com necessidades muito diferentes.</p>
        <div class="article-table-wrap"><table class="article-table technical-table"><thead><tr><th>Aplicação</th><th>Prioridade recomendada</th></tr></thead><tbody><tr><td>Controle industrial</td><td>Muito alta</td></tr><tr><td>AGVs e robôs móveis</td><td>Muito alta</td></tr><tr><td>Câmeras de segurança</td><td>Alta</td></tr><tr><td>Tablets operacionais</td><td>Média</td></tr><tr><td>Internet dos colaboradores</td><td>Baixa</td></tr></tbody></table></div>
        <div class="article-diagram narrow">
          <svg width="100%" height="360" viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exemplo de QoS em rede privativa">
            <rect width="900" height="360" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">Exemplo de QoS em Rede Privativa</text>
            <rect x="100" y="80" width="700" height="45" rx="12" fill="#fecaca"/><text x="125" y="109" font-size="16" font-family="Arial" font-weight="bold" fill="#991b1b">Controle industrial</text><rect x="390" y="93" width="350" height="18" rx="9" fill="#dc2626"/>
            <rect x="100" y="140" width="700" height="45" rx="12" fill="#fed7aa"/><text x="125" y="169" font-size="16" font-family="Arial" font-weight="bold" fill="#9a3412">AGVs / robos móveis</text><rect x="390" y="153" width="300" height="18" rx="9" fill="#ea580c"/>
            <rect x="100" y="200" width="700" height="45" rx="12" fill="#dbeafe"/><text x="125" y="229" font-size="16" font-family="Arial" font-weight="bold" fill="#1e3a8a">Câmeras de segurança</text><rect x="390" y="213" width="240" height="18" rx="9" fill="#2563eb"/>
            <rect x="100" y="260" width="700" height="45" rx="12" fill="#e5e7eb"/><text x="125" y="289" font-size="16" font-family="Arial" font-weight="bold" fill="#374151">Internet comum</text><rect x="390" y="273" width="120" height="18" rx="9" fill="#6b7280"/>
          </svg>
        </div>

        <h2>QoS e Network Slicing são a mesma coisa?</h2>
        <p>Não. Eles são conceitos complementares.</p>
        <p>O <strong>QoS</strong> prioriza fluxos de tráfego dentro da rede. Já o <strong>Network Slicing</strong> cria redes lógicas separadas para diferentes tipos de serviço, cliente ou aplicação.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="330" viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diferenca entre QoS e Network Slicing">
            <rect width="900" height="330" rx="20" fill="#f8fafc"/>
            <text x="450" y="35" text-anchor="middle" font-size="22" font-family="Arial" font-weight="bold" fill="#111827">QoS x Network Slicing</text>
            <rect x="80" y="85" width="330" height="190" rx="18" fill="#dbeafe"/><text x="245" y="120" text-anchor="middle" font-size="20" font-family="Arial" font-weight="bold" fill="#1e3a8a">QoS</text><text x="245" y="155" text-anchor="middle" font-size="15" font-family="Arial" fill="#1e40af">Prioriza serviços dentro da rede</text><text x="245" y="190" text-anchor="middle" font-size="15" font-family="Arial" fill="#1e40af">Voz, vídeo, internet, IoT</text><text x="245" y="225" text-anchor="middle" font-size="15" font-family="Arial" fill="#1e40af">Cada fluxo recebe uma prioridade</text>
            <rect x="490" y="85" width="330" height="190" rx="18" fill="#ede9fe"/><text x="655" y="120" text-anchor="middle" font-size="20" font-family="Arial" font-weight="bold" fill="#5b21b6">Network Slicing</text><text x="655" y="155" text-anchor="middle" font-size="15" font-family="Arial" fill="#5b21b6">Cria redes lógicas separadas</text><text x="655" y="190" text-anchor="middle" font-size="15" font-family="Arial" fill="#5b21b6">Slice industrial, vídeo, corporativo</text><text x="655" y="225" text-anchor="middle" font-size="15" font-family="Arial" fill="#5b21b6">Dentro de cada slice ainda existe QoS</text>
          </svg>
        </div>

        <h2>Quem implementa o QoS no LTE e no 5G?</h2>
        <div class="article-table-wrap"><table class="article-table technical-table"><thead><tr><th>Rede</th><th>Elemento</th><th>Funcao</th></tr></thead><tbody><tr><td>LTE</td><td>PCRF</td><td>Define políticas de QoS.</td></tr><tr><td>LTE</td><td>PGW</td><td>Aplica regras de tráfego.</td></tr><tr><td>LTE</td><td>eNodeB</td><td>Agenda os recursos de rádio.</td></tr><tr><td>5G</td><td>PCF</td><td>Define políticas de controle.</td></tr><tr><td>5G</td><td>SMF</td><td>Controla sessões e regras de QoS.</td></tr><tr><td>5G</td><td>UPF</td><td>Encaminha e aplica o tratamento dos fluxos.</td></tr><tr><td>5G</td><td>gNodeB</td><td>Agenda os recursos de rádio no acesso 5G.</td></tr></tbody></table></div>

        <h2>Conclusão</h2>
        <p>QoS é um dos mecanismos mais importantes das redes LTE e 5G. Ele permite que diferentes aplicações compartilhem a mesma infraestrutura, mas recebam tratamentos diferentes conforme sua criticidade.</p>
        <p>Em uma rede sem QoS, todos os pacotes competem da mesma forma. Em uma rede com QoS, aplicações críticas como voz, vídeo em tempo real, automação industrial, câmeras de segurança e dispositivos operacionais podem receber prioridade.</p>
        <p>No LTE, esse controle e feito por bearers e QCI. No 5G, o conceito evolui para PDU Sessions, QoS Flows e 5QI, permitindo uma arquitetura mais flexível e mais adequada para redes privativas, aplicações industriais e serviços de missao critica.</p>
        <p>Em resumo: <strong>QoS é o que transforma LTE e 5G em redes capazes de atender serviços simples e aplicações críticas na mesma infraestrutura.</strong></p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function privateApnArticlePage() {
  const title = "O que é APN Privada?";
  const excerpt = "APN Privada é uma forma de criar um ambiente de comunicação móvel mais seguro, isolado e controlado para aplicações corporativas, IoT, telemetria, automação industrial e redes privativas LTE/5G.";
  return `
    ${pageHero(title, excerpt, ["APN Privada", "LTE", "5G", "IoT", "Rede Corporativa"])}
    <section class="section">
      <article class="container article-page">
        <p>Quando falamos em redes móveis 4G e 5G, muitas empresas acreditam que todos os dispositivos conectados à operadora utilizam exatamente a mesma infraestrutura e possuem o mesmo nível de segurança. Na prática, isso não é verdade.</p>
        <p>Uma das formas mais utilizadas para criar ambientes de comunicação mais seguros e isolados e atraves da <strong>APN Privada</strong>, recurso amplamente empregado em aplicações corporativas, IoT, telemetria, rastreamento, automação industrial e redes privativas LTE e 5G.</p>

        <h2>O que significa APN?</h2>
        <p>APN significa <em>Access Point Name</em>. E o parâmetro que determina para qual rede de dados um dispositivo móvel será conectado.</p>
        <p>Quando um smartphone, modem, roteador ou equipamento IoT se registra em uma rede 4G ou 5G, ele informa a APN ao nucleo da rede, conhecido como Core. A partir dessa informação, o Core decide:</p>
        <ul class="article-list">
          <li>Qual endereço IP será atribuido ao dispositivo;</li>
          <li>Por qual gateway o tráfego será encaminhado;</li>
          <li>Quais políticas de segurança serão aplicadas;</li>
          <li>Se o tráfego terá acesso à Internet;</li>
          <li>Se havera acesso a uma rede privada corporativa.</li>
        </ul>
        <p>Em outras palavras, a APN funciona como uma <strong>porta de entrada lógica</strong> para os serviços de dados da rede móvel.</p>

        <h2>Como funciona uma APN convencional?</h2>
        <p>Na maioria dos celulares, utiliza-se uma APN pública fornecida pela operadora. Exemplos comuns são APNs voltadas ao acesso à Internet.</p>
        <p>Nesse modelo, o dispositivo acessa à rede móvel, passa pelo Core da operadora e sai para à Internet pública.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="260" viewBox="0 0 900 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxo de APN convencional">
            <defs><marker id="apn-arrow-1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="260" rx="18" fill="#f8fafc"/>
            <rect x="60" y="90" width="150" height="70" rx="14" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <text x="135" y="120" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Dispositivo</text><text x="135" y="143" text-anchor="middle" font-family="Arial" font-size="13" fill="#475569">Celular / Modem</text>
            <rect x="285" y="90" width="150" height="70" rx="14" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
            <text x="360" y="120" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Rede 4G/5G</text><text x="360" y="143" text-anchor="middle" font-family="Arial" font-size="13" fill="#475569">RAN</text>
            <rect x="510" y="90" width="150" height="70" rx="14" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/>
            <text x="585" y="120" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Core</text><text x="585" y="143" text-anchor="middle" font-family="Arial" font-size="13" fill="#475569">Operadora</text>
            <rect x="735" y="90" width="120" height="70" rx="14" fill="#ffffff" stroke="#f97316" stroke-width="2"/>
            <text x="795" y="120" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Internet</text><text x="795" y="143" text-anchor="middle" font-family="Arial" font-size="13" fill="#475569">Publica</text>
            <line x1="210" y1="125" x2="285" y2="125" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-1)"/><line x1="435" y1="125" x2="510" y2="125" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-1)"/><line x1="660" y1="125" x2="735" y2="125" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-1)"/>
          </svg>
        </div>
        <p>Esse modelo atende bem ao uso comum de Internet, mas não oferece uma separação dedicada para aplicações corporativas sensíveis.</p>

        <h2>O que é uma APN Privada?</h2>
        <p>Uma <strong>APN Privada</strong> é uma APN dedicada a uma empresa, aplicação ou grupo específico de dispositivos.</p>
        <p>Ao invés de encaminhar o tráfego diretamente para à Internet pública, o Core da rede direciona os dados para uma rede corporativa privada, como um Data Center, firewall, nuvem privada ou ambiente local da empresa.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="330" viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxo de APN privada">
            <defs><marker id="apn-arrow-2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="330" rx="18" fill="#f8fafc"/>
            <rect x="55" y="70" width="145" height="80" rx="14" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="127" y="102" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Dispositivos</text><text x="127" y="125" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">IoT / Tablets</text>
            <rect x="275" y="70" width="145" height="80" rx="14" fill="#ffffff" stroke="#0f766e" stroke-width="2"/><text x="347" y="102" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Rede 4G/5G</text><text x="347" y="125" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">Cobertura móvel</text>
            <rect x="495" y="70" width="145" height="80" rx="14" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/><text x="567" y="102" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Core LTE/5G</text><text x="567" y="125" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">EPC / 5GC</text>
            <rect x="715" y="70" width="140" height="80" rx="14" fill="#ffffff" stroke="#dc2626" stroke-width="2"/><text x="785" y="102" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Firewall</text><text x="785" y="125" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">Corporativo</text>
            <rect x="305" y="220" width="290" height="70" rx="14" fill="#ecfeff" stroke="#0891b2" stroke-width="2"/><text x="450" y="250" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#164e63">APN Privada</text><text x="450" y="273" text-anchor="middle" font-family="Arial" font-size="13" fill="#475569">Tráfego isolado e controlado</text>
            <rect x="655" y="220" width="200" height="70" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="2"/><text x="755" y="250" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Rede Corporativa</text><text x="755" y="273" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">ERP / SCADA / IoT</text>
            <line x1="200" y1="110" x2="275" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-2)"/><line x1="420" y1="110" x2="495" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-2)"/><line x1="640" y1="110" x2="715" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-2)"/><line x1="567" y1="150" x2="450" y2="220" stroke="#0891b2" stroke-width="3" marker-end="url(#apn-arrow-2)"/><line x1="595" y1="255" x2="655" y2="255" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-2)"/>
          </svg>
        </div>
        <p>Na prática, a APN Privada permite que os dispositivos móveis funcionem como uma extensao da rede corporativa.</p>

        <h2>Como a APN Privada e implementada?</h2>
        <p>Dentro da arquitetura LTE ou 5G, o Core e responsável por autenticar o dispositivo, criar a sessão de dados e definir o caminho do tráfego.</p>
        <p>No LTE, os principais elementos envolvidos são:</p>
        <ul class="article-list"><li><strong>MME:</strong> responsável pelo controle e autenticação;</li><li><strong>SGW:</strong> gateway de serviço;</li><li><strong>PGW:</strong> gateway de dados para Internet ou rede privada.</li></ul>
        <p>No 5G, os principais elementos são:</p>
        <ul class="article-list"><li><strong>AMF:</strong> controle de acesso e mobilidade;</li><li><strong>SMF:</strong> gerenciamento da sessão;</li><li><strong>UPF:</strong> encaminhamento do tráfego de dados.</li></ul>
        <p>Quando o dispositivo informa sua APN, o Core identifica qual política deve ser aplicada e para onde aquele tráfego deve ser encaminhado.</p>

        <h2>Arquitetura típica de uma APN Privada</h2>
        <div class="article-diagram narrow">
          <svg width="100%" height="420" viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitetura típica de APN privada">
            <defs><marker id="apn-arrow-3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="420" rx="18" fill="#f8fafc"/>
            <rect x="60" y="65" width="180" height="90" rx="14" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="150" y="98" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Dispositivos</text><text x="150" y="122" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">Sensores, tablets,</text><text x="150" y="140" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">coletores e modems</text>
            <rect x="350" y="65" width="180" height="90" rx="14" fill="#ffffff" stroke="#0f766e" stroke-width="2"/><text x="440" y="98" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Rede de Rádio</text><text x="440" y="122" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">eNodeB / gNodeB</text>
            <rect x="640" y="65" width="180" height="90" rx="14" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/><text x="730" y="98" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Core LTE/5G</text><text x="730" y="122" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">EPC ou 5GC</text>
            <rect x="640" y="230" width="180" height="70" rx="14" fill="#ecfeff" stroke="#0891b2" stroke-width="2"/><text x="730" y="260" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#164e63">APN Privada</text><text x="730" y="282" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">Rota dedicada</text>
            <rect x="350" y="230" width="180" height="70" rx="14" fill="#ffffff" stroke="#dc2626" stroke-width="2"/><text x="440" y="260" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Firewall</text><text x="440" y="282" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">Segurança</text>
            <rect x="60" y="230" width="180" height="70" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="2"/><text x="150" y="260" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="#1e293b">Data Center</text><text x="150" y="282" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">ERP / Servidores</text>
            <rect x="60" y="340" width="760" height="40" rx="12" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.5"/><text x="440" y="365" text-anchor="middle" font-family="Arial" font-size="14" fill="#312e81">O tráfego permanece controlado dentro do ambiente corporativo</text>
            <line x1="240" y1="110" x2="350" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-3)"/><line x1="530" y1="110" x2="640" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-3)"/><line x1="730" y1="155" x2="730" y2="230" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-3)"/><line x1="640" y1="265" x2="530" y2="265" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-3)"/><line x1="350" y1="265" x2="240" y2="265" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-3)"/>
          </svg>
        </div>

        <h2>APN Privada é a mesma coisa que VPN?</h2>
        <p>Não. Embora ambas sejam utilizadas para aumentar a segurança, elas funcionam de formas diferentes.</p>
        <p>A <strong>VPN</strong> normalmente cria um tunel criptografado sobre à Internet pública. Já a <strong>APN Privada</strong> evita que o tráfego precise sair diretamente para à Internet, pois ele e encaminhado desde o Core para uma rede privada.</p>
        <div class="article-diagram narrow">
          <svg width="100%" height="320" viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparacao entre VPN e APN privada">
            <defs><marker id="apn-arrow-4" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#64748b"/></marker></defs>
            <rect width="900" height="320" rx="18" fill="#f8fafc"/>
            <text x="225" y="45" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#1e293b">VPN</text><text x="675" y="45" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#1e293b">APN Privada</text>
            <rect x="55" y="80" width="150" height="60" rx="12" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="130" y="115" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#1e293b">Dispositivo</text>
            <rect x="275" y="80" width="150" height="60" rx="12" fill="#ffffff" stroke="#f97316" stroke-width="2"/><text x="350" y="115" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#1e293b">Internet</text>
            <rect x="155" y="210" width="150" height="60" rx="12" fill="#ffffff" stroke="#16a34a" stroke-width="2"/><text x="230" y="245" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#1e293b">Rede Empresa</text>
            <line x1="205" y1="110" x2="275" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-4)"/><line x1="350" y1="140" x2="255" y2="210" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-4)"/><text x="300" y="180" font-family="Arial" font-size="13" fill="#475569">Tunel VPN</text>
            <rect x="505" y="80" width="150" height="60" rx="12" fill="#ffffff" stroke="#2563eb" stroke-width="2"/><text x="580" y="115" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#1e293b">Dispositivo</text>
            <rect x="705" y="80" width="150" height="60" rx="12" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/><text x="780" y="115" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#1e293b">Core</text>
            <rect x="595" y="210" width="180" height="60" rx="12" fill="#ecfeff" stroke="#0891b2" stroke-width="2"/><text x="685" y="245" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="#164e63">Rede Privada</text>
            <line x1="655" y1="110" x2="705" y2="110" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-4)"/><line x1="780" y1="140" x2="705" y2="210" stroke="#64748b" stroke-width="3" marker-end="url(#apn-arrow-4)"/><text x="730" y="180" font-family="Arial" font-size="13" fill="#475569">APN</text>
          </svg>
        </div>

        <h2>APN Privada é um Slice de Rede?</h2>
        <p>Essa é uma duvida muito comum. A resposta direta e: <strong>não</strong>.</p>
        <p>Uma APN Privada oferece isolamento lógico de tráfego, principalmente no plano IP. Ela permite separar o caminho dos dados de uma empresa ou aplicação, mas normalmente continua compartilhando os recursos de rádio, transporte e Core com outros usuários.</p>
        <p>Já o <strong>Network Slicing</strong>, no contexto do 5G, é um conceito mais amplo. Ele pode envolver políticas específicas de QoS, separacao de funcoes do Core, UPF dedicado, prioridade de tráfego e SLA personalizado.</p>
        <div class="article-table-wrap"><table class="article-table technical-table"><thead><tr><th>Recurso</th><th>APN Privada</th><th>Network Slicing 5G</th></tr></thead><tbody><tr><td>Isolamento de tráfego</td><td>Sim</td><td>Sim</td></tr><tr><td>QoS dedicada</td><td>Limitada</td><td>Mais avançada</td></tr><tr><td>UPF dedicado</td><td>Opcional</td><td>Pode ser parte da arquitetura</td></tr><tr><td>Recursos de rádio dedicados</td><td>Normalmente não</td><td>Pode haver políticas específicas</td></tr><tr><td>SLA por serviço</td><td>Limitado</td><td>Mais robusto</td></tr></tbody></table></div>

        <h2>Tipos de APN Privada</h2>
        <h3>APN Privada com acesso à Internet</h3><p>Permite que os dispositivos acessem tanto sistemas internos quanto à Internet pública, sempre com políticas de segurança controladas pela empresa.</p>
        <h3>APN Fechada</h3><p>Nesse modelo, os dispositivos não possuem acesso direto à Internet. Eles acessam apenas sistemas internos, como SCADA, servidores, aplicações IoT, ERPs ou plataformas de monitoramento.</p>
        <h3>APN com IP fixo</h3><p>Cada equipamento recebe um endereço IP conhecido, facilitando o gerenciamento, o monitoramento é a criacao de regras de firewall.</p>
        <h3>APN com IP privado</h3><p>Os dispositivos utilizam faixas de endereçamento privado, como 10.x.x.x, 172.16.x.x ou 192.168.x.x, como se estivessem dentro de uma rede corporativa.</p>

        <h2>Principais vantagens da APN Privada</h2>
        <h3>Maior segurança</h3><p>Os dispositivos não precisam ficar expostos diretamente à Internet pública, reduzindo a superfície de ataque.</p>
        <h3>Controle de acesso</h3><p>A empresa pode definir quais dispositivos acessam quais sistemas, com políticas específicas de firewall, roteamento e autenticação.</p>
        <h3>Enderecamento IP controlado</h3><p>E possível usar IP privado, IP fixo e segmentacao por aplicação, facilitando a gestão dos equipamentos conectados.</p>
        <h3>Integração com ambientes corporativos</h3><p>A APN Privada pode ser conectada a Data Centers, nuvens privadas, ambientes Edge, redes MPLS ou firewalls corporativos.</p>
        <h3>Escalabilidade</h3><p>Uma mesma APN pode atender dezenas, centenas ou milhares de dispositivos, principalmente em projetos de IoT, logistica e automação.</p>

        <h2>Aplicações mais comuns</h2>
        <ul class="article-list"><li><strong>Logística:</strong> coletores, tablets, rastreadores e sistemas WMS;</li><li><strong>Indústria:</strong> PLCs, SCADA, sensores e automação;</li><li><strong>Utilities:</strong> medidores inteligentes e telemetria;</li><li><strong>Segurança:</strong> câmeras, alarmes e controle de acesso;</li><li><strong>Agronegócio:</strong> máquinas agrícolas, sensores e irrigação;</li><li><strong>Redes privativas:</strong> separação de serviços dentro da mesma rede LTE ou 5G.</li></ul>

        <h2>APN Privada em redes privativas LTE e 5G</h2>
        <p>Em uma rede privativa LTE ou 5G, a APN pode ser usada para separar aplicações dentro da mesma infraestrutura.</p>
        <div class="article-table-wrap"><table class="article-table technical-table"><thead><tr><th>APN</th><th>Aplicação</th></tr></thead><tbody><tr><td>vídeo.local</td><td>CFTV e câmeras de segurança</td></tr><tr><td>scada.local</td><td>Automação industrial</td></tr><tr><td>iot.local</td><td>Sensores e telemetria</td></tr><tr><td>voz.local</td><td>Voz, push-to-talk ou comunicação operacional</td></tr><tr><td>dados.local</td><td>Aplicações corporativas</td></tr></tbody></table></div>
        <p>Dessa forma, todos os dispositivos utilizam a mesma rede de rádio, mas cada aplicação pode seguir por caminhos diferentes dentro do Core.</p>

        <h2>APN Privada substitui uma rede privativa?</h2>
        <p>Não necessariamente.</p>
        <p>A APN Privada pode ser suficiente quando a cobertura da operadora já atende bem a região e o principal objetivo é conectar dispositivos corporativos com mais segurança.</p>
        <p>Porém, uma rede privativa LTE ou 5G passa a ser mais indicada quando a empresa precisa de:</p>
        <ul class="article-list"><li>Cobertura dedicada;</li><li>Controle da infraestrutura;</li><li>QoS mais previsível;</li><li>Maior disponibilidade;</li><li>Baixa latência;</li><li>Controle sobre rádio, Core e políticas de rede.</li></ul>

        <h2>Conclusão</h2>
        <p>A APN Privada é uma das formas mais eficientes de transformar uma conexão móvel convencional em uma extensao segura da rede corporativa.</p>
        <p>Embora não seja equivalente ao Network Slicing do 5G, ela oferece isolamento lógico, maior controle de tráfego, melhor segurança e integração direta com sistemas internos.</p>
        <p>Para aplicações de IoT, logistica, telemetria, industria e redes privativas LTE/5G, a APN Privada representa um excelente equilibrio entre simplicidade, custo e segurança.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function ofdmaArticlePage() {
  const title = "Como funciona o OFDMA?";
  const excerpt = "A tecnologia que permite ao 4G e 5G compartilhar o espectro entre milhares de dispositivos.";
  return `
    ${pageHero(title, excerpt, ["OFDMA", "LTE", "5G", "Resource Blocks", "Scheduler"])}
    <section class="section">
      <article class="container article-page ida-article">
        <h1>${title}</h1>
        <h2>A tecnologia que permite ao 4G e 5G compartilhar o espectro entre milhares de dispositivos</h2>

        <p>Uma rede LTE ou 5G pode atender simultaneamente smartphones, tablets, sensores IoT, coletores de dados, câmeras, notebooks e diversos outros dispositivos. Mas como todos eles conseguem utilizar a mesma frequência ao mesmo tempo sem "colidirem" entre si?</p>
        <p>A resposta está no <strong>OFDMA</strong>, sigla para <strong>Orthogonal Frequency Division Multiple Access</strong>, ou <strong>Acesso Múltiplo por Divisão Ortogonal de Frequência</strong>.</p>
        <p>O OFDMA é uma das tecnologias fundamentais das redes 4G e 5G. Ele permite que a estação rádio-base compartilhe os recursos disponíveis entre diversos dispositivos de forma dinamica, eficiente e organizada em duas dimensoes principais: <strong>tempo</strong> e <strong>frequência</strong>.</p>

        <h2>O que é OFDMA?</h2>
        <p>O OFDMA é uma técnica de multiplo acesso que permite que varios usuários utilizem simultaneamente a mesma largura de banda.</p>
        <p>Em vez de reservar todo o canal para um único dispositivo, à rede divide os recursos em pequenas partes organizadas em tempo e frequência. Esses recursos são agrupados em <strong>Resource Blocks</strong> e distribuidos dinamicamente entre os usuários pelo <strong>scheduler</strong> da estação rádio-base.</p>

        <div class="article-diagram wide">
          <svg viewBox="0 0 900 360" width="100%" role="img" aria-label="Grade OFDMA em tempo e frequência">
            <rect width="900" height="360" rx="24" fill="#f7f9fc"/>
            <text x="450" y="42" text-anchor="middle" font-size="24" font-weight="700" fill="#1f2937">OFDMA: recursos distribuidos em tempo e frequência</text>
            <line x1="140" y1="290" x2="790" y2="290" stroke="#374151" stroke-width="3"/>
            <line x1="140" y1="290" x2="140" y2="85" stroke="#374151" stroke-width="3"/>
            <text x="800" y="298" font-size="16" fill="#374151">Tempo</text>
            <text x="72" y="90" font-size="16" fill="#374151" transform="rotate(-90 72,90)">Frequência</text>
            <g transform="translate(160 105)">
              <g fill="#dbeafe" stroke="#2563eb" stroke-width="2">
                <rect x="0" y="0" width="95" height="38" rx="6"/>
                <rect x="95" y="0" width="95" height="38" rx="6"/>
                <rect x="190" y="0" width="95" height="38" rx="6"/>
                <rect x="285" y="0" width="95" height="38" rx="6"/>
                <rect x="380" y="0" width="95" height="38" rx="6"/>
                <rect x="475" y="0" width="95" height="38" rx="6"/>
              </g>
              <g fill="#dcfce7" stroke="#16a34a" stroke-width="2">
                <rect x="0" y="38" width="95" height="38" rx="6"/>
                <rect x="95" y="38" width="95" height="38" rx="6"/>
                <rect x="190" y="38" width="95" height="38" rx="6"/>
              </g>
              <g fill="#fef3c7" stroke="#d97706" stroke-width="2">
                <rect x="285" y="38" width="95" height="38" rx="6"/>
                <rect x="380" y="38" width="95" height="38" rx="6"/>
              </g>
              <g fill="#ede9fe" stroke="#7c3aed" stroke-width="2">
                <rect x="475" y="38" width="95" height="38" rx="6"/>
                <rect x="0" y="76" width="95" height="38" rx="6"/>
              </g>
              <g fill="#fee2e2" stroke="#dc2626" stroke-width="2">
                <rect x="95" y="76" width="95" height="38" rx="6"/>
                <rect x="190" y="76" width="95" height="38" rx="6"/>
                <rect x="285" y="76" width="95" height="38" rx="6"/>
              </g>
              <g fill="#e0f2fe" stroke="#0284c7" stroke-width="2">
                <rect x="380" y="76" width="95" height="38" rx="6"/>
                <rect x="475" y="76" width="95" height="38" rx="6"/>
              </g>
              <text x="47" y="25" text-anchor="middle" font-size="14" fill="#1f2937">Video</text>
              <text x="142" y="25" text-anchor="middle" font-size="14" fill="#1f2937">Video</text>
              <text x="237" y="25" text-anchor="middle" font-size="14" fill="#1f2937">Web</text>
              <text x="332" y="25" text-anchor="middle" font-size="14" fill="#1f2937">Web</text>
              <text x="427" y="25" text-anchor="middle" font-size="14" fill="#1f2937">IoT</text>
              <text x="522" y="25" text-anchor="middle" font-size="14" fill="#1f2937">Voz</text>
            </g>
          </svg>
        </div>

        <h2>A evolução das técnicas de multiplo acesso</h2>
        <p>Ao longo das geracoes móveis, diferentes técnicas foram utilizadas para compartilhar o espectro.</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Tecnologia</th><th>Metodo de acesso</th></tr></thead>
            <tbody>
              <tr><td>GSM / 2G</td><td>TDMA + FDMA</td></tr>
              <tr><td>UMTS / 3G</td><td>CDMA</td></tr>
              <tr><td>LTE / 4G</td><td>OFDMA no downlink</td></tr>
              <tr><td>5G NR</td><td>OFDMA no downlink e uplink</td></tr>
            </tbody>
          </table>
        </div>
        <p>A partir do LTE, o OFDMA passou a ser a principal tecnologia responsável pela elevada capacidade das redes móveis modernas.</p>

        <h2>Como o OFDMA organiza os recursos?</h2>
        <p>O espectro e organizado em uma hierarquia técnica:</p>
        ${list(["Subportadoras", "Simbolos OFDM", "Resource Elements", "Resource Blocks", "Grade de recursos em tempo e frequência"])}

        <div class="article-diagram wide">
          <svg viewBox="0 0 900 260" width="100%" role="img" aria-label="Hierarquia de recursos OFDMA">
            <rect width="900" height="260" rx="24" fill="#f7f9fc"/>
            <text x="450" y="40" text-anchor="middle" font-size="24" font-weight="700" fill="#1f2937">Hierarquia dos recursos no OFDMA</text>
            <g font-size="16" font-weight="600" text-anchor="middle">
              <rect x="55" y="95" width="145" height="70" rx="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
              <text x="127" y="125" fill="#1f2937">Subportadoras</text>
              <text x="127" y="148" fill="#1f2937" font-size="13">15 kHz no LTE</text>
              <rect x="230" y="95" width="145" height="70" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
              <text x="302" y="125" fill="#1f2937">Simbolos</text>
              <text x="302" y="148" fill="#1f2937" font-size="13">tempo</text>
              <rect x="405" y="95" width="145" height="70" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
              <text x="477" y="125" fill="#1f2937">Resource</text>
              <text x="477" y="148" fill="#1f2937" font-size="13">Element</text>
              <rect x="580" y="95" width="145" height="70" rx="14" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
              <text x="652" y="125" fill="#1f2937">Resource</text>
              <text x="652" y="148" fill="#1f2937" font-size="13">Block</text>
              <rect x="755" y="95" width="105" height="70" rx="14" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
              <text x="807" y="125" fill="#1f2937">Scheduler</text>
              <text x="807" y="148" fill="#1f2937" font-size="13">alocacao</text>
            </g>
            <g stroke="#6b7280" stroke-width="3" marker-end="url(#ofdma-arrow)">
              <line x1="200" y1="130" x2="230" y2="130"/>
              <line x1="375" y1="130" x2="405" y2="130"/>
              <line x1="550" y1="130" x2="580" y2="130"/>
              <line x1="725" y1="130" x2="755" y2="130"/>
            </g>
            <defs>
              <marker id="ofdma-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#6b7280"/>
              </marker>
            </defs>
          </svg>
        </div>

        <h2>Subportadoras e Resource Blocks</h2>
        <p>A largura de banda e dividida em diversas subportadoras ortogonais igualmente espacadas. No LTE, o espacamento entre subportadoras e fixo em <strong>15 kHz</strong>.</p>
        <p>Porém, na prática, à rede não costuma alocar subportadoras individuais para cada usuário. As subportadoras são agrupadas em unidades chamadas <strong>Resource Blocks</strong>.</p>
        <p>No LTE:</p>
        ${list(["1 Resource Block possui 12 subportadoras;", "Cada subportadora possui 15 kHz;", "Logo, 1 Resource Block ocupa 180 kHz em frequência."])}
        <div class="highlight-box"><p><strong>1 RB = 12 x 15 kHz = 180 kHz</strong></p></div>

        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Largura de banda LTE</th><th>Numero de RBs</th><th>Subportadoras uteis</th></tr></thead>
            <tbody>
              <tr><td>1,4 MHz</td><td>6</td><td>72</td></tr>
              <tr><td>3 MHz</td><td>15</td><td>180</td></tr>
              <tr><td>5 MHz</td><td>25</td><td>300</td></tr>
              <tr><td>10 MHz</td><td>50</td><td>600</td></tr>
              <tr><td>15 MHz</td><td>75</td><td>900</td></tr>
              <tr><td>20 MHz</td><td>100</td><td>1200</td></tr>
            </tbody>
          </table>
        </div>

        <h2>A dimensao do tempo</h2>
        <p>Além da frequência, existe a dimensao temporal. No LTE, a estrutura básica e:</p>
        ${list(["Frame: 10 ms", "Subframe: 1 ms", "Slot: 0,5 ms"])}
        <p>Os Resource Blocks podem ser atribuidos a diferentes usuários ao longo do tempo. Essa é a base da flexibilidade do OFDMA.</p>

        <h2>O scheduler é o cérebro do OFDMA</h2>
        <p>Uma das funcoes mais importantes da eNodeB, no 4G, ou da gNodeB, no 5G, é o <strong>scheduler</strong>.</p>
        <p>Ele decide continuamente:</p>
        ${list(["Qual usuário irá transmitir ou receber dados;", "Quantos Resource Blocks cada usuário recebera;", "Em qual instante os recursos seráo usados;", "Qual modulacao será aplicada;", "Qual prioridade cada serviço terá."])}
        <p>No LTE, essas decisoes normalmente são tomadas a cada <strong>1 ms</strong>. No 5G, os intervalos podem ser ainda menores, dependendo da numerologia utilizada.</p>

        <h2>Exemplo prático de alocacao</h2>
        <p>Considere uma célula contendo um usuário assistindo vídeo, um tablet industrial, um sensor IoT, um smartphone em chamada VoIP é um notebook realizando download.</p>
        <p>O scheduler pode distribuir os recursos de forma diferente para cada aplicação:</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Aplicação</th><th>Quantidade aproximada de RBs</th></tr></thead>
            <tbody>
              <tr><td>Video</td><td>50 RBs</td></tr>
              <tr><td>Download</td><td>25 RBs</td></tr>
              <tr><td>Navegacao web</td><td>10 RBs</td></tr>
              <tr><td>VoIP</td><td>5 RBs</td></tr>
              <tr><td>Sensor IoT</td><td>2 RBs</td></tr>
            </tbody>
          </table>
        </div>
        <p>Essa distribuição muda continuamente conforme a demanda dos dispositivos, as condições de rádio e as regras de QoS da rede.</p>

        <h2>O que significa "ortogonal"?</h2>
        <p>A palavra <strong>ortogonal</strong> é uma das características mais importantes do OFDMA. As subportadoras são posicionadas matematicamente de forma que possam ficar muito proximas, mas ainda assim serem separadas no receptor.</p>
        <p>De forma simplificada, o pico de uma subportadora coincide com os pontos nulos das demais. Isso reduz a interferência interna e permite uma utilização mais eficiente do espectro.</p>

        <div class="article-diagram wide">
          <svg viewBox="0 0 900 330" width="100%" role="img" aria-label="Subportadoras ortogonais">
            <rect width="900" height="330" rx="24" fill="#f7f9fc"/>
            <text x="450" y="42" text-anchor="middle" font-size="24" font-weight="700" fill="#1f2937">Subportadoras ortogonais</text>
            <line x1="95" y1="250" x2="815" y2="250" stroke="#374151" stroke-width="3"/>
            <line x1="95" y1="250" x2="95" y2="80" stroke="#374151" stroke-width="3"/>
            <text x="825" y="257" font-size="16" fill="#374151">Frequência</text>
            <text x="55" y="95" font-size="16" fill="#374151" transform="rotate(-90 55,95)">Amplitude</text>
            <path d="M120 250 C170 70, 220 70, 270 250" fill="none" stroke="#2563eb" stroke-width="4"/>
            <path d="M250 250 C300 70, 350 70, 400 250" fill="none" stroke="#16a34a" stroke-width="4"/>
            <path d="M380 250 C430 70, 480 70, 530 250" fill="none" stroke="#d97706" stroke-width="4"/>
            <path d="M510 250 C560 70, 610 70, 660 250" fill="none" stroke="#7c3aed" stroke-width="4"/>
            <circle cx="195" cy="92" r="5" fill="#2563eb"/>
            <circle cx="325" cy="92" r="5" fill="#16a34a"/>
            <circle cx="455" cy="92" r="5" fill="#d97706"/>
            <circle cx="585" cy="92" r="5" fill="#7c3aed"/>
            <text x="195" y="282" text-anchor="middle" font-size="15" fill="#1f2937">f1</text>
            <text x="325" y="282" text-anchor="middle" font-size="15" fill="#1f2937">f2</text>
            <text x="455" y="282" text-anchor="middle" font-size="15" fill="#1f2937">f3</text>
            <text x="585" y="282" text-anchor="middle" font-size="15" fill="#1f2937">f4</text>
            <text x="450" y="310" text-anchor="middle" font-size="14" fill="#4b5563">O espacamento matematico permite separar as subportadoras no receptor.</text>
          </svg>
        </div>

        <h2>Downlink e uplink</h2>
        <p>No LTE, o OFDMA é utilizado no <strong>downlink</strong>, ou seja, da estação rádio-base para o dispositivo do usuário.</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>Direcao</th><th>Tecnologia no LTE</th></tr></thead>
            <tbody>
              <tr><td>Downlink</td><td>OFDMA</td></tr>
              <tr><td>Uplink</td><td>SC-FDMA</td></tr>
            </tbody>
          </table>
        </div>
        <p>O SC-FDMA foi escolhido para o uplink porque apresenta menor PAPR (<em>Peak-to-Average Power Ratio</em>), reduzindo o consumo de energia do terminal e melhorando a autonomia da bateria.</p>
        <p>No 5G NR, o OFDMA é utilizado tanto no downlink quanto no uplink.</p>

        <h2>OFDMA no 5G</h2>
        <p>O 5G introduziu diferentes numerologias, permitindo variar o espacamento entre subportadoras, também chamado de <strong>SCS</strong> ou <strong>Subcarrier Spacing</strong>.</p>
        <div class="article-table-wrap">
          <table class="article-table technical-table">
            <thead><tr><th>SCS</th><th>Aplicações típicas</th></tr></thead>
            <tbody>
              <tr><td>15 kHz</td><td>Cobertura ampla</td></tr>
              <tr><td>30 kHz</td><td>Bandas médias</td></tr>
              <tr><td>60 kHz</td><td>Baixa latência e bandas mais altas</td></tr>
              <tr><td>120 kHz</td><td>mmWave</td></tr>
              <tr><td>240 kHz</td><td>Casos específicos</td></tr>
            </tbody>
          </table>
        </div>
        <p>Quanto maior o espacamento entre subportadoras, menor é a duracao do simbolo OFDM. Isso pode reduzir a latência e melhorar a robustez em cenários de alta mobilidade, mas também pode impactar a cobertura.</p>

        <h2>OFDMA e MIMO trabalham em conjunto</h2>
        <p>Enquanto o OFDMA organiza os recursos em tempo e frequência, o MIMO adiciona uma terceira dimensao: o espaco.</p>
        <div class="article-diagram wide">
          <svg viewBox="0 0 900 360" width="100%" role="img" aria-label="OFDMA e MIMO em três dimensoes">
            <rect width="900" height="360" rx="24" fill="#f7f9fc"/>
            <text x="450" y="42" text-anchor="middle" font-size="24" font-weight="700" fill="#1f2937">OFDMA + MIMO: tempo, frequência e espaco</text>
            <line x1="210" y1="270" x2="680" y2="270" stroke="#374151" stroke-width="3" marker-end="url(#ofdma-arrow-2)"/>
            <line x1="210" y1="270" x2="210" y2="95" stroke="#374151" stroke-width="3" marker-end="url(#ofdma-arrow-2)"/>
            <line x1="210" y1="270" x2="390" y2="145" stroke="#374151" stroke-width="3" marker-end="url(#ofdma-arrow-2)"/>
            <text x="700" y="278" font-size="16" fill="#374151">Tempo</text>
            <text x="150" y="100" font-size="16" fill="#374151">Frequência</text>
            <text x="405" y="145" font-size="16" fill="#374151">Espaco / MIMO</text>
            <g opacity="0.95">
              <rect x="250" y="175" width="70" height="42" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
              <rect x="320" y="175" width="70" height="42" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
              <rect x="390" y="175" width="70" height="42" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
              <rect x="280" y="145" width="70" height="42" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
              <rect x="350" y="145" width="70" height="42" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
              <rect x="420" y="145" width="70" height="42" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
              <rect x="310" y="115" width="70" height="42" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
              <rect x="380" y="115" width="70" height="42" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
              <rect x="450" y="115" width="70" height="42" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
            </g>
            <text x="450" y="315" text-anchor="middle" font-size="15" fill="#4b5563">OFDMA distribui recursos em tempo e frequência. MIMO adiciona múltiplos caminhos espaciais.</text>
            <defs>
              <marker id="ofdma-arrow-2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#374151"/>
              </marker>
            </defs>
          </svg>
        </div>
        <p>A combinação entre OFDMA, MIMO, modulacao adaptativa, beamforming, carrier aggregation e QoS e responsável pelas elevadas taxas de transmissão e pela alta capacidade das redes LTE e 5G.</p>

        <h2>Vantagens do OFDMA</h2>
        <h3>Alta eficiência espectral</h3>
        <p>Permite compartilhar o espectro entre diversos usuários simultaneamente, aproveitando melhor a largura de banda disponível.</p>
        <h3>Grande capacidade</h3>
        <p>Uma única célula pode atender centenas ou milhares de dispositivos, desde smartphones até sensores IoT de baixo tráfego.</p>
        <h3>Flexibilidade</h3>
        <p>Os recursos são distribuidos dinamicamente conforme a necessidade de cada aplicação.</p>
        <h3>Menor latência</h3>
        <p>Como os recursos podem ser reatribuidos rapidamente, à rede consegue responder em poucos milissegundos.</p>
        <h3>QoS e priorização</h3>
        <p>Aplicações críticas, como voz, vídeo operacional, automação e telemetria, podem receber prioridade sobre tráfegos menos sensíveis.</p>

        <h2>OFDMA em redes privativas e provedores de internet</h2>
        <p>Nas redes LTE e 5G, o OFDMA permite atender simultaneamente:</p>
        ${list(["Smartphones corporativos;", "Tablets industriais;", "Coletores de dados;", "Cameras;", "Sensores IoT;", "AGVs;", "Equipamentos de automação;", "CPEs para acesso FWA."])}
        <p>Para provedores de internet, essa característica é especialmente relevante em soluções de <strong>FWA 4G/5G</strong>, complemento de rede de fibra, atendimento B2B e projetos de conectividade em áreas remotas.</p>
        <p>Mesmo com poucos MHz de espectro disponíveis, e possível compartilhar os Resource Blocks de forma eficiente entre dezenas ou centenas de dispositivos, mantendo baixa latência, controle de QoS e melhor aproveitamento da capacidade da célula.</p>

        <h2>Conclusão</h2>
        <p>O OFDMA é um dos principais pilares das redes LTE e 5G modernas.</p>
        <p>Em vez de simplesmente dividir a banda em "varias frequências", o OFDMA organiza os recursos em uma grade bidimensional de tempo e frequência, agrupando subportadoras em <strong>Resource Blocks</strong> que são distribuidos dinamicamente pelo scheduler da estação rádio-base.</p>
        <p>Essa arquitetura permite que diversos dispositivos compartilhem a mesma célula simultaneamente, viabilizando aplicações como streaming de vídeo, IoT, automação industrial, redes LTE/5G, FWA e serviços de missao critica.</p>
        <p>Combinado com tecnologias como <strong>MIMO</strong>, <strong>beamforming</strong>, <strong>carrier aggregation</strong> e <strong>QoS</strong>, o OFDMA é um dos grandes responsaveis pela capacidade e eficiência das redes 4G e 5G utilizadas atualmente.</p>

        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function telecom2030ArticlePage() {
  const title = "Tendências do Mercado de Telecom até 2030: o que esperar da próxima década";
  const excerpt = "O setor de telecom está deixando de ser apenas conectividade para se tornar infraestrutura digital, serviços gerenciados e plataformas de conectividade inteligente.";
  return `
    ${pageHero(title, excerpt, ["Mercado Telecom", "Redes Privativas", "FWA", "Edge Computing", "IA", "IoT"])}
    <section class="section">
      <article class="container article-page ida-article">
        <h1>${title}</h1>

        <p>Durante muitos anos, o setor de telecomunicações foi visto apenas como um fornecedor de conectividade. Entretanto, a transformação digital das empresas, a industria 4.0, a inteligência artificial é a crescente necessidade de disponibilidade dos serviços estão mudando esse cenário.</p>
        <p>Até 2030, operadoras e provedores de internet deveráo assumir um papel muito mais estratégico, tornando-se fornecedores de infraestrutura digital, serviços gerenciados e plataformas de conectividade inteligente.</p>
        <p>Neste artigo, exploramos as principais tendencias que deveráo moldar o mercado de telecom nós proximos anos.</p>

        <h2>O setor de telecom está mudando</h2>
        <p>No passado, a principal preocupacao era fornecer acesso à internet. Hoje, empresas buscam:</p>
        ${list(["Alta disponibilidade;", "Baixa latência;", "Mobilidade;", "Segurança;", "Conectividade para dispositivos IoT;", "Processamento na borda, conhecido como Edge Computing;", "Inteligência Artificial;", "Serviços gerenciados."])}
        <p>A tendencia e que, até 2030, a conectividade deixe de ser um produto isolado e passe a fazer parte de soluções completas.</p>

        <h2>1. Redes privativas 4G e 5G ganharao espaco</h2>
        <p>Uma das maiores mudanças do mercado será a expansão das redes privativas LTE e 5G. Setores como indústria, mineração, agronegócio, portos, aeroportos, energia, logística, rodovias e condomínios logísticos necessitam de comunicações mais confiáveis do que aquelas oferecidas por redes Wi-Fi convencionais.</p>
        <p>As redes privativas permitem:</p>
        ${list(["Cobertura de quilômetros;", "Mobilidade continua;", "Priorizacao de tráfego;", "Menor latência;", "Maior segurança;", "Controle total da rede."])}
        <p>Até 2030, muitas empresas deveráo possuir sua própria infraestrutura celular, assim como hoje possuem redes Wi-Fi corporativas.</p>

        <h3>Evolucao da conectividade corporativa</h3>
        <div class="article-diagram wide">
          <svg width="100%" viewBox="0 0 900 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Evolucao da conectividade corporativa">
            <style>
              .ida-text { font-family: Arial, sans-serif; font-size: 15px; fill: #333; }
              .ida-box { fill: #f4f7fb; stroke: #0057b8; stroke-width: 2; }
              .ida-arrow { stroke: #0057b8; stroke-width: 3; marker-end: url(#telecom-arrow1); }
            </style>
            <defs>
              <marker id="telecom-arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0,10 3,0 6" fill="#0057b8"/>
              </marker>
            </defs>
            <rect x="20" y="60" width="160" height="60" rx="10" class="ida-box"/>
            <text x="55" y="95" class="ida-text">Fibra + Wi-Fi</text>
            <line x1="180" y1="90" x2="290" y2="90" class="ida-arrow"/>
            <rect x="290" y="60" width="180" height="60" rx="10" class="ida-box"/>
            <text x="315" y="95" class="ida-text">Redes Privativas LTE</text>
            <line x1="470" y1="90" x2="600" y2="90" class="ida-arrow"/>
            <rect x="600" y="60" width="220" height="60" rx="10" class="ida-box"/>
            <text x="645" y="95" class="ida-text">5G + Edge + IA</text>
          </svg>
        </div>

        <h2>2. O crescimento do FWA</h2>
        <p>O FWA, sigla para Fixed Wireless Access, deverá ser uma das tecnologias que mais crescerao até 2030.</p>
        <p>Combinando 4G e 5G, será possível fornecer:</p>
        ${list(["Internet residencial;", "Expansao rapida de cobertura;", "Redundancia para links de fibra;", "Atendimento em áreas remotas;", "Backups de conectividade."])}
        <p>Ao invés de competir com à fibra, a tendencia e que ambas trabalhem de forma complementar.</p>

        <h3>Modelo híbrido de acesso</h3>
        <div class="article-diagram wide">
          <svg width="100%" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modelo híbrido de acesso">
            <style>
              .ida-text2 { font-family: Arial, sans-serif; font-size: 15px; fill: #333; }
              .ida-box2 { fill: #eef5ff; stroke: #0057b8; stroke-width: 2; }
              .ida-arrow2 { stroke: #0057b8; stroke-width: 3; marker-end: url(#telecom-arrow2); }
            </style>
            <defs>
              <marker id="telecom-arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0,10 3,0 6" fill="#0057b8"/>
              </marker>
            </defs>
            <rect x="50" y="40" width="180" height="60" rx="10" class="ida-box2"/>
            <text x="105" y="75" class="ida-text2">Fibra Óptica</text>
            <rect x="50" y="160" width="180" height="60" rx="10" class="ida-box2"/>
            <text x="95" y="195" class="ida-text2">4G / 5G FWA</text>
            <line x1="230" y1="70" x2="430" y2="130" class="ida-arrow2"/>
            <line x1="230" y1="190" x2="430" y2="130" class="ida-arrow2"/>
            <rect x="430" y="100" width="220" height="60" rx="10" class="ida-box2"/>
            <text x="470" y="135" class="ida-text2">Conectividade Híbrida</text>
          </svg>
        </div>

        <h2>3. Edge Computing será cada vez mais importante</h2>
        <p>Atualmente, quase todo processamento e realizado em grandes data centers. Entretanto, aplicações de inteligência artificial, vídeo analitico, industria 4.0, robotica, veículos autonomos e realidade aumentada necessitam de latencias extremamente baixas.</p>
        <p>Por isso, até 2030, veremos mais processamento sendo realizado próximo do usuário. Essa arquitetura e conhecida como Edge Computing.</p>

        <h3>Da nuvem centralizada para a borda</h3>
        <div class="article-diagram wide">
          <svg width="100%" viewBox="0 0 900 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Da nuvem centralizada para a borda">
            <style>
              .ida-text3 { font-family: Arial, sans-serif; font-size: 14px; fill: #333; }
              .ida-box3 { fill: #f4f7fb; stroke: #0057b8; stroke-width: 2; }
              .ida-arrow3 { stroke: #0057b8; stroke-width: 3; marker-end: url(#telecom-arrow3); }
            </style>
            <defs>
              <marker id="telecom-arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0,10 3,0 6" fill="#0057b8"/>
              </marker>
            </defs>
            <rect x="60" y="80" width="180" height="60" rx="10" class="ida-box3"/>
            <text x="95" y="115" class="ida-text3">Usuários e IoT</text>
            <rect x="360" y="80" width="180" height="60" rx="10" class="ida-box3"/>
            <text x="420" y="115" class="ida-text3">Edge</text>
            <rect x="650" y="80" width="180" height="60" rx="10" class="ida-box3"/>
            <text x="690" y="115" class="ida-text3">Cloud</text>
            <line x1="240" y1="110" x2="360" y2="110" class="ida-arrow3"/>
            <line x1="540" y1="110" x2="650" y2="110" class="ida-arrow3"/>
          </svg>
        </div>

        <h2>4. Inteligência Artificial será incorporada às redes</h2>
        <p>A IA deverá se tornar uma das maiores transformacoes do setor. As redes passarão a utilizar inteligência artificial para detectar falhas, antecipar congestionamentos, otimizar parâmetros de rádio, realizar manutenção preditiva, automatizar atendimento ao cliente e melhorar segurança cibernética.</p>
        <p>Em vez de operações reativas, às redes caminham para um modelo autonomo.</p>

        <h2>5. Open RAN continuara amadurecendo</h2>
        <p>O conceito de Open RAN busca tornar as redes celulares mais abertas e interoperáveis. Ao invés de depender de um único fabricante, operadoras poderão combinar equipamentos e softwares de diferentes fornecedores.</p>
        <p>Entre os benefícios estão:</p>
        ${list(["Maior flexibilidade;", "Menor dependencia tecnologica;", "Mais inovacao;", "Reducao do custo total da rede."])}
        <p>Embora ainda exista um longo caminho para maturidade completa, o Open RAN deverá ganhar participação até o final da década.</p>

        <h2>6. IoT em larga escala</h2>
        <p>Até 2030, bilhoes de dispositivos estarao conectados. Entre eles estarao sensores industriais, medidores inteligentes, máquinas agrícolas, câmeras, veículos, dispositivos de rastreamento e equipamentos medicos.</p>
        <p>Esse crescimento impulsionara tecnologias como:</p>
        ${list(["LTE-M;", "NB-IoT;", "5G RedCap;", "Redes privativas."])}
        <p>A conectividade máquina-a-máquina deverá representar uma parcela cada vez maior do mercado.</p>

        <h2>7. Conectividade híbrida será o novo padrão</h2>
        <p>Empresas deixarao de depender de um único meio de acesso. A tendencia e combinar fibra óptica, 4G, 5G, rádio ponto-a-ponto, satélites LEO e Wi-Fi corporativo.</p>
        <p>O objetivo não será escolher uma tecnologia, mas integrar varias delas para maximizar disponibilidade.</p>

        <h3>Infraestrutura convergente</h3>
        <div class="article-diagram wide">
          <svg width="100%" viewBox="0 0 950 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Infraestrutura convergente">
            <style>
              .ida-text4 { font-family: Arial, sans-serif; font-size: 14px; fill: #333; }
              .ida-box4 { fill: #eef5ff; stroke: #0057b8; stroke-width: 2; }
              .ida-arrow4 { stroke: #0057b8; stroke-width: 3; marker-end: url(#telecom-arrow4); }
            </style>
            <defs>
              <marker id="telecom-arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0,10 3,0 6" fill="#0057b8"/>
              </marker>
            </defs>
            <rect x="50" y="40" width="140" height="50" rx="10" class="ida-box4"/>
            <text x="95" y="70" class="ida-text4">Fibra</text>
            <rect x="50" y="110" width="140" height="50" rx="10" class="ida-box4"/>
            <text x="90" y="140" class="ida-text4">4G/5G</text>
            <rect x="50" y="180" width="140" height="50" rx="10" class="ida-box4"/>
            <text x="85" y="210" class="ida-text4">Satélite</text>
            <line x1="190" y1="65" x2="420" y2="130" class="ida-arrow4"/>
            <line x1="190" y1="135" x2="420" y2="130" class="ida-arrow4"/>
            <line x1="190" y1="205" x2="420" y2="130" class="ida-arrow4"/>
            <rect x="420" y="100" width="200" height="60" rx="10" class="ida-box4"/>
            <text x="455" y="135" class="ida-text4">Rede Corporativa</text>
            <line x1="620" y1="130" x2="830" y2="130" class="ida-arrow4"/>
            <rect x="830" y="100" width="90" height="60" rx="10" class="ida-box4"/>
            <text x="850" y="135" class="ida-text4">IA</text>
          </svg>
        </div>

        <h2>8. Provedores deixarao de vender apenas internet</h2>
        <p>Talvez a maior mudanca até 2030 seja no modelo de negócios. Os provedores de internet tendem a evoluir para fornecedores de infraestrutura como serviço.</p>
        <p>Isso inclui:</p>
        ${list(["Redes privativas;", "FWA;", "Wi-Fi gerenciado;", "Data center;", "Backup e disaster recovery;", "Cloud;", "Edge Computing;", "Segurança;", "IoT;", "Inteligência Artificial."])}
        <p>Em outras palavras, a receita deixara de depender apenas do acesso à internet.</p>

        <h2>E o 6G?</h2>
        <p>Embora pesquisas sobre 6G já estejam em andamento, a expectativa é que sua adoção comercial ocorra apenas na próxima década.</p>
        <p>Até 2030, a maior parte dos investimentos continuara concentrada em LTE, 5G Standalone, Edge Computing, Inteligência Artificial, automação de redes e redes privativas.</p>
        <p>Assim, a década atual deverá ser marcada mais pela evolução da infraestrutura existente do que por uma substituição completa das tecnologias atuais.</p>

        <h2>Conclusão</h2>
        <p>Até 2030, o mercado de telecom deverá passar pela maior transformação desde a popularizacao da internet banda larga.</p>
        <p>A conectividade continuara sendo essencial, mas deixara de ser o produto final. O verdadeiro valor estara na integração entre redes, computacao, inteligência artificial e serviços gerenciados.</p>
        <p>Para provedores de internet e integradores, isso representa uma oportunidade histórica. Aqueles que permanecerem focados apenas na venda de banda larga tendem a enfrentar margens cada vez menores. Já os que ampliarem sua atuacao para redes privativas, 5G, Edge Computing, IoT e soluções inteligentes estarao posicionados para capturar novas fontes de receita e se tornarem parceiros estrategicos da transformação digital das empresas.</p>

        <blockquote><strong>Até 2030, as empresas não comprarao apenas internet. Elas comprarao conectividade inteligente.</strong></blockquote>

        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function articlePage(slug) {
  const removedArticles = ["internet-dedicada-vs-banda-larga", "enodeb", "gnodeb"];
  if (removedArticles.includes(slug)) return articlesPage();

  if (slug === "redes-privativas-lte") return privateLteArticlePage();
  if (slug === "redes-privativas-5g") return private5gArticlePage();
  if (slug === "como-funciona-fwa") return fwaArticlePage();
  if (slug === "áreas-remotas") return remoteAreasArticlePage();
  if (slug === "core-5g") return core5gArticlePage();
  if (slug === "mimo") return ispPrivateNetworksArticlePage();
  if (slug === "qos-lte-5g") return qosArticlePage();
  if (slug === "apn-privada") return privateApnArticlePage();
  if (slug === "ofdma") return ofdmaArticlePage();
  if (slug === "telecom-2030") return telecom2030ArticlePage();
  if (slug === "core-lte") return coreLteArticlePage();
  if (slug === "lte-ou-wifi") return lteWifiArticlePage();
  const article = articles.find((item) => item.slug === slug) || articles[0];
  return `
    ${pageHero(article.title, article.excerpt, [article.category, "IDA Telecom", "Engenharia de Redes"])}
    <section class="section">
      <article class="container article-page">
        <p>${article.excerpt} Em projetos corporativos, a decisão correta nasce da combinação entre cobertura, disponibilidade, segurança, capacidade e modelo operacional.</p>
        <h2>Por que isso importa</h2>
        <p>Operações modernas dependem de conectividade para sistemas de gestão, sensores, voz, vídeo, automação, segurança e atendimento. Quando a rede é tratada apenas como acesso à internet, a empresa perde previsibilidade e abre espaco para falhas operacionais.</p>
        <h2>Pontos técnicos de avaliacao</h2>
        <ul class="article-list">
          <li>Disponibilidade esperada e impacto de indisponibilidade no negócio.</li>
          <li>Cobertura indoor, outdoor, remota ou distribuida.</li>
          <li>Separação de tráfego, APN privada, VPN corporativa e políticas de segurança.</li>
          <li>QoS para aplicações sensíveis como voz, vídeo, telemetria e automação.</li>
          <li>Modelo de suporte, monitoramento, NOC e operação assistida.</li>
        </ul>
        <h2>Como a IDA Telecom aborda</h2>
        <p>A IDA combina fibra, 4G, 5G, FWA, Wi-Fi corporativo, LAN-to-LAN, VPN, Data Center e NOC para desenhar arquiteturas ajustadas ao risco operacional de cada cliente.</p>
        <div class="section-actions">
          <a class="button" href="/#contato" data-link>Solicitar Análise Técnica</a>
          <a class="button secondary" href="/artigos" data-link>Voltar aos artigos</a>
        </div>
      </article>
    </section>
  `;
}

function aboutPage() {
  return `
    <section class="about-hero">
      <div class="container about-hero-grid">
        <div class="about-hero-copy">
          <span class="eyebrow">SOBRE A IDA</span>
          <h1>Engenharia para conectar operações onde elas precisam acontecer.</h1>
          <p>A IDA Telecom projeta, integra e opera infraestruturas de conectividade para empresas, provedores e operações distribuídas.</p>
        </div>
        <div class="about-hero-media">
          <img src="https://images.rawpixel.com/image_social_portrait/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJyZW1vdGVfbG9naW5fbWFzdF9yYWRpb18yLWltYWdlLWt5YmN1Z2g0LmpwZw.jpg" alt="Torre de telecomunicações metálica com antenas setoriais contra o céu" />
        </div>
      </div>
    </section>

    <section class="section about-thinking">
      <div class="container about-editorial">
        <span class="eyebrow">NOSSA FORMA DE TRABALHAR</span>
        <h2>Conectividade não começa pela tecnologia. Começa pela operação.</h2>
        <p>Cada ambiente possui requisitos diferentes de cobertura, capacidade, mobilidade, disponibilidade, integração e escala. Por isso, a IDA começa entendendo o que a operação precisa fazer antes de definir a arquitetura e as tecnologias que farão parte dela.</p>
        <div class="method-line" aria-label="Metodo de trabalho da IDA">
          <span>ENTENDER</span>
          <span>DESENHAR</span>
          <span>INTEGRAR</span>
          <span>OPERAR</span>
          <span>EVOLUIR</span>
        </div>
        <p class="about-note">A participação da IDA pode variar conforme o projeto — desde o desenho da arquitetura até a implantação, monitoramento e operação contínua.</p>
      </div>
    </section>

    <section class="section alt about-difference">
      <div class="container">
        <div class="about-section-head">
          <h2>O que diferencia a IDA.</h2>
        </div>
        <div class="principles-grid">
          ${[
            ["ENGENHARIA ANTES DO CATÁLOGO", "A arquitetura nasce dos requisitos da operação."],
            ["TECNOLOGIAS COMPLEMENTARES", "Fibra, rádio, redes móveis, FWA e Wi-Fi podem fazer parte da mesma infraestrutura."],
            ["DO PROJETO À OPERAÇÃO", "A atuação pode continuar depois da implantação, incluindo monitoramento, suporte e evolução."],
            ["INFRAESTRUTURA PREPARADA PARA MUDAR", "Capacidade, cobertura, redundância e expansão são consideradas desde o desenho inicial."],
          ].map(([title, text]) => `
            <div class="principle-item">
              <h3>${title}</h3>
              <p>${text}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section about-evolution">
      <div class="container about-split">
        <div>
          <h2>Da engenharia à operação de conectividade.</h2>
        </div>
        <div>
          <p>A atuação da IDA vem evoluindo da integração de infraestrutura para um modelo mais amplo de conectividade, combinando engenharia, redes fixas e móveis, operação e novos modelos de acesso.</p>
          <p>Essa evolução amplia as possibilidades de arquitetura e permite à IDA participar de diferentes etapas de um projeto — do entendimento do requisito à implantação, operação e evolução da infraestrutura.</p>
        </div>
      </div>
    </section>

    <section class="section alt about-ecosystem">
      <div class="container ecosystem-grid">
        <div class="ecosystem-flow">
          ${[
            ["ENGENHARIA", "Planejamento e arquitetura"],
            ["INTEGRAÇÃO", "Infraestrutura e tecnologias"],
            ["CONECTIVIDADE", "Redes fixas e móveis"],
            ["OPERAÇÃO", "Monitoramento, suporte e evolução"],
          ].map(([title, text]) => `
            <div class="ecosystem-step">
              <h3>${title}</h3>
              <p>${text}</p>
            </div>
          `).join("")}
        </div>
        <div class="about-editorial compact">
          <span class="eyebrow">PAPEL NO ECOSSISTEMA</span>
          <h2>Uma atuação que conecta desenho, implantação e sustentação.</h2>
          <p>O papel da IDA é organizar as decisões técnicas para que infraestrutura e operação trabalhem como partes do mesmo projeto.</p>
        </div>
      </div>
    </section>

    <section class="section about-layers">
      <div class="container">
        <div class="about-section-head">
          <h2>Uma arquitetura pode combinar diferentes camadas.</h2>
        </div>
        <div class="layer-grid">
          ${[
            ["ACESSO", "Fibra • XGS-PON • 4G/5G • FWA • Wi-Fi"],
            ["MOBILIDADE", "Redes móveis • Redes privativas"],
            ["TRANSPORTE", "Fibra • Rádio • Links • Redundância"],
            ["OPERAÇÃO", "NOC • Monitoramento • Suporte • Gestão"],
          ].map(([title, text]) => `
            <div class="layer-item">
              <h3>${title}</h3>
              <p>${text}</p>
            </div>
          `).join("")}
        </div>
        <div class="wireless-graphic" aria-label="Operacao, arquitetura e conectividade">
          <svg viewBox="0 0 900 220" role="img" focusable="false">
            <path d="M150 112 C270 42, 350 42, 450 112 S630 182, 750 112" />
            <path d="M150 112 C275 180, 342 180, 450 112 S625 44, 750 112" />
            <circle cx="150" cy="112" r="8" />
            <circle cx="450" cy="112" r="8" />
            <circle cx="750" cy="112" r="8" />
            <text x="150" y="150" text-anchor="middle">OPERAÇÃO</text>
            <text x="450" y="150" text-anchor="middle">ARQUITETURA</text>
            <text x="750" y="150" text-anchor="middle">CONECTIVIDADE</text>
          </svg>
        </div>
      </div>
    </section>

    <section class="section alt about-origin">
      <div class="container about-split">
        <div>
          <h2>Engenharia próxima da operação.</h2>
        </div>
        <div>
          <p>Com sede em Campinas, a IDA desenvolve projetos de conectividade para diferentes ambientes e regiões, combinando conhecimento técnico, infraestrutura e operação conforme os requisitos de cada projeto.</p>
        </div>
      </div>
    </section>

    <section class="section about-final">
      <div class="container about-final-inner">
        <h2>Toda rede começa com uma pergunta: o que a operação precisa fazer?</h2>
        <p>Conte para a IDA o contexto do projeto. A tecnologia vem depois.</p>
        <a class="button" href="/#contato" data-link>Falar sobre meu projeto</a>
      </div>
    </section>
  `;
}

function casesPage() {
  const cases = [
    ["Cobertura LTE para rodovias", "Conectividade móvel para trechos extensos, bases operacionais, monitoramento e equipes de campo.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"],
    ["FWA para áreas remotas", "Ativação rápida para unidades sem fibra disponível ou com necessidade de redundância.", "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80"],
    ["Wi-Fi corporativo", "Ambientes indoor e outdoor com alta densidade, VLAN, segurança e monitoramento.", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"],
    ["Conectividade para logística", "Pátios, CDs, esteiras operacionais, rastreamento, coletores e sistemas de gestão.", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80"],
    ["Redes privativas para operações críticas", "Arquitetura LTE/5G dedicada com APN privada, QoS e integração corporativa.", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"],
  ];
  return `
    ${pageHero("Casos de Sucesso", "Exemplos de projetos em que arquiteturas híbridas de fibra, FWA, LTE/5G e Wi-Fi corporativo resolvem desafios reais de disponibilidade, cobertura e operação.", ["Rodovias", "Logística", "Áreas remotas", "Operações críticas"])}
    <section class="section">
      <div class="container grid three">
        ${cases.map(([title, text, image]) => `
          <article class="card case-card">
            <img src="${image}" alt="${title}" loading="lazy" />
            <div>
              <h3>${title}</h3>
              <p>${text}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
    ${contactSection()}
  `;
}

function contactSection() {
  return `
    <section class="section" id="contato">
      <div class="container card contact-panel">
        <div>
          <span class="eyebrow">Contato</span>
          <h2 class="section-title">Vamos entender sua operação.</h2>
          <p class="lead">Conte para a IDA o desafio de conectividade. A arquitetura vem depois.</p>
          <div class="contact-details" aria-label="Dados de contato">
            <p><strong>Endereço</strong> Rua Conceição, 233 - sala 1714. CEP: 1310-050 - Campinas SP.</p>
            <p><strong>Telefone</strong> <a href="tel:+551930900125">+55 19 3090-0125</a></p>
            <p><strong>E-mail</strong> <a href="mailto:vendas@idatele.com">vendas@idatele.com</a></p>
          </div>
          <div class="pill-row">
            <span class="pill">Empresas</span>
            <span class="pill">ISPs</span>
            <span class="pill">Indústria</span>
            <span class="pill">Logística</span>
            <span class="pill">Agronegócio</span>
          </div>
        </div>
        <form class="contact-form" id="contactForm" novalidate>
          <label>Nome<input name="name" autocomplete="name" required /></label>
          <label>E-mail corporativo<input type="email" name="email" autocomplete="email" required /></label>
          <label>Empresa<input name="company" autocomplete="organization" /></label>
          <label>Desafio técnico<textarea name="message" placeholder="Ex.: backup da fibra, rede privativa 5G, FWA para filial, NOC terceirizado" required></textarea></label>
          <label class="form-honeypot" aria-hidden="true" tabindex="-1">Site<input name="website" autocomplete="off" tabindex="-1" /></label>
          <p class="contact-status" id="contactStatus" aria-live="polite"></p>
          <button class="button" type="submit">Enviar</button>
        </form>
      </div>
    </section>
  `;
}

function route() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/artigos/")) return articlePage(path.split("/").pop());
  if (path === "/para-provedores") return providersPage();
  if (path === "/redes-privativas-4g-5g") return privateNetworksPage();
  if (path === "/fwa-corporativo") return fwaPage();
  if (path === "/artigos") return articlesPage();
  if (path === "/sobre-a-ida") return aboutPage();
  if (path === "/casos-de-sucesso") return casesPage();
  return homePage();
}

function updateMeta() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const data = pageMeta[path] || (path.startsWith("/artigos/") ? ["Artigo técnico | IDA Telecom", "Conteúdo técnico da IDA Telecom sobre engenharia de conectividade corporativa."] : pageMeta["/"]);
  document.title = data[0];
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", data[1]);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", path);
}

function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const url = new URL(link.href);
    const target = `${url.pathname}${url.hash}`;
    const current = `${window.location.pathname}${window.location.hash}`;
    const active = target === current || (!url.hash && url.pathname !== "/" && path.startsWith(url.pathname));
    link.classList.toggle("active", active);
  });
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function render() {
  app.innerHTML = route();
  const motionState = new URLSearchParams(window.location.search).get("motion");
  document.body.dataset.motionState = ["initial", "middle", "final"].includes(motionState) ? motionState : "";
  updateMeta();
  setActiveNav();
  closeMenu();
  app.focus({ preventScroll: true });

  const hash = window.location.hash;
  if (hash) {
    requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ block: "start" }));
  } else {
    window.scrollTo({ top: 0 });
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");
  if (!link) return;

  const url = new URL(link.href);
  if (url.origin !== window.location.origin) return;

  event.preventDefault();
  window.history.pushState({}, "", `${url.pathname}${url.hash}`);
  render();
});

document.addEventListener("click", (event) => {
  const filter = event.target.closest(".filter-button");
  if (!filter) return;
  app.innerHTML = articlesPage(filter.dataset.category);
});

document.addEventListener("submit", async (event) => {
  if (event.target.id !== "contactForm") return;
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector("button");
  const status = form.querySelector("#contactStatus");

  if (form.dataset.submitting === "true") return;
  if (!form.reportValidity()) return;

  form.dataset.submitting = "true";
  button.textContent = "Enviando...";
  button.disabled = true;
  status.textContent = "";
  status.classList.remove("error", "success");

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.pageUrl = window.location.href;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Contact request failed");

    form.reset();
    status.textContent = "Mensagem enviada. Entraremos em contato.";
    status.classList.add("success");
    button.textContent = "Enviar";
  } catch (error) {
    status.textContent = "Não foi possível enviar sua mensagem. Tente novamente.";
    status.classList.add("error");
    button.textContent = "Enviar";
  } finally {
    delete form.dataset.submitting;
    button.disabled = false;
  }
});

menuToggle?.addEventListener("click", () => {
  const open = !document.body.classList.contains("menu-open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

window.addEventListener("popstate", render);
render();
