'use client';
import {useState} from 'react';

export default function IdaHeader() {
  const [open, setOpen] = useState(false);
  return <header className="ida-site-header">
    <a className="ida-header-brand" href="/" aria-label="IDA Telecom início">
      <img src="/rfplanner/ida-telecom-logo.svg" alt="IDA Telecom" width="82" height="52"/>
    </a>
    <button className="ida-header-toggle" type="button" aria-label={open?'Fechar menu do site':'Abrir menu do site'} aria-expanded={open} aria-controls="idaSiteNav" onClick={()=>setOpen(!open)}>
      <span/><span/><span/>
    </button>
    <nav className={'ida-header-nav'+(open?' open':'')} id="idaSiteNav" aria-label="Navegação principal">
      <a href="/artigos">Centro de Conhecimento</a>
      <a href="/rfplanner/" aria-current="page">RFPlanner</a>
      <a href="/sobre-a-ida">Sobre a IDA</a>
      <a href="/#contato">Contato</a>
      <a className="ida-mobile-cta" href="/#contato">Falar sobre meu projeto</a>
    </nav>
    <a className="ida-header-cta" href="/#contato">Falar sobre meu projeto</a>
  </header>;
}
