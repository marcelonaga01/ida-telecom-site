# IDA Telecom

## Nova versão: aba RFPlanner

A branch `feature/rfplanner-tab` adiciona a aba **RFPlanner** ao menu e ao rodapé,
preservando as páginas e os textos da versão publicada da IDA. O aplicativo
completo está em `rfplanner/`, preparado para Node.js 24, SQLite e o endereço
`/rfplanner/` no servidor da IDA. Os cálculos continuam no GitHub Actions.

[Instalação e configuração do RFPlanner](rfplanner/README.md).
Esta branch prepara a instalação; não altera o site público automaticamente.

## Sincronização com o site publicado

Em 03/11/2026, os arquivos públicos foram sincronizados com `https://idatele.com/`:
`index.html`, `app.js`, `styles.css`, o logotipo e a imagem de infraestrutura de
Campinas. Os cinco arquivos foram copiados sem modificar seu conteúdo e
conferidos por SHA-256 contra as respostas públicas do site.

Esta versão preserva a página inicial, as páginas institucionais, os menus,
o rodapé e os textos atuais dos 12 artigos listados no Centro de Conhecimento.
As versões anteriores continuam recuperáveis pelo histórico do Git.

Essa sincronização de 03/11 atualizou o código no GitHub sem modificar o site
publicado. A aba RFPlanner foi adicionada depois, nesta branch. Imagens de terceiros continuam
usando os endereços originais do site.

O `server.mjs` é somente um visualizador local dos arquivos públicos. O envio
de contatos depende do backend e das credenciais da hospedagem de produção,
que não foram copiados nem são expostos pelos arquivos públicos. O visualizador
retorna erro para a API institucional de contato, evitando indicar envio de e-mail
inexistente; as APIs do RFPlanner são encaminhadas ao seu servidor local.

Site institucional da IDA Telecom, posicionada como empresa B2B de engenharia de conectividade para operacoes criticas.

## Como rodar

```powershell
node .\server.mjs
```

Abra `http://localhost:4173`.

## Paginas

- `/`
- `/para-provedores`
- `/redes-privativas-4g-5g`
- `/fwa-corporativo`
- `/artigos`
- `/artigos/core-lte`
- `/casos-de-sucesso`

## Temas de SEO

Redes Privativas 4G, Redes Privativas 5G, LTE Privativo, 5G Privativo, FWA Corporativo, Internet Dedicada, XGSPON, APN Privada, Core LTE, Core 5G, Engenharia de Telecom, NOC, Wi-Fi Corporativo, LAN-to-LAN e VPN Corporativa.
