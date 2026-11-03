# IDA Telecom

## Sincronização com o site publicado

Em 03/11/2026, os arquivos públicos foram sincronizados com `https://idatele.com/`:
`index.html`, `app.js`, `styles.css`, o logotipo e a imagem de infraestrutura de
Campinas. Os cinco arquivos foram copiados sem modificar seu conteúdo e
conferidos por SHA-256 contra as respostas públicas do site.

Esta versão preserva a página inicial, as páginas institucionais, os menus,
o rodapé e os textos atuais dos 12 artigos listados no Centro de Conhecimento.
As versões anteriores continuam recuperáveis pelo histórico do Git.

Essa sincronização atualiza o código no GitHub; não modifica o site publicado
e não adiciona ainda a aba RFPlanner. Imagens hospedadas por terceiros continuam
usando os endereços originais do site.

O `server.mjs` é somente um visualizador local dos arquivos públicos. O envio
de contatos depende do backend e das credenciais da hospedagem de produção,
que não foram copiados nem são expostos pelos arquivos públicos. O visualizador
retorna erro para chamadas de API, evitando indicar envio de e-mail inexistente.

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
