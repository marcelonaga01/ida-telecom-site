const ida = 'https://idatele.com';

function IdaLink({path, children}: {path: string; children: React.ReactNode}) {
  return <a href={ida + path} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function IdaFooter() {
  return <footer className="ida-site-footer">
    <div className="ida-footer-brand">
      <strong>IDA Telecom</strong>
      <p>Engenharia de conectividade para empresas, provedores e operações críticas.</p>
      <p>Rua Conceição, 233 - sala 1714. CEP: 1310-050 - Campinas SP.</p>
      <p><a href="tel:+551930900125">+55 19 3090-0125</a> | <a href="mailto:vendas@idatele.com">vendas@idatele.com</a></p>
    </div>
    <nav className="ida-footer-nav" aria-label="Navegação complementar">
      <div className="ida-footer-links">
        <strong>Segmentos</strong>
        <IdaLink path="/#segmentos">Indústria</IdaLink>
        <IdaLink path="/#segmentos">Portos &amp; Logística</IdaLink>
        <IdaLink path="/para-provedores">Provedores &amp; Operadores</IdaLink>
        <IdaLink path="/#segmentos">Agronegócio</IdaLink>
        <IdaLink path="/#segmentos">Rodovias &amp; Infraestrutura</IdaLink>
        <IdaLink path="/#segmentos">Condomínios &amp; Complexos</IdaLink>
      </div>
      <div className="ida-footer-links">
        <strong>Conhecimento</strong>
        <IdaLink path="/artigos">Centro de Conhecimento</IdaLink>
      </div>
      <div className="ida-footer-links">
        <strong>Institucional</strong>
        <IdaLink path="/sobre-a-ida">Sobre a IDA</IdaLink>
        <IdaLink path="/#contato">Contato</IdaLink>
      </div>
    </nav>
  </footer>;
}
