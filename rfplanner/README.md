# RFPlanner para o servidor da IDA

Aplicação completa de formulários, estudos por sessão, consulta de andamento,
mapa, exclusão do histórico e exportação KMZ. A navegação do site abre
`/rfplanner/`. A interface e as APIs rodam no servidor da IDA com Node.js 24 e
SQLite persistente. Os cálculos continuam no workflow Windows do repositório
`marcelonaga01/rfplanner-c`; os contatos de exportação são enviados por Resend
para `marcelo.nagashima@idatele.com`, sem banco de contatos.

Esta versão inclui a seleção de antena e MIMO por setor, MapBiomas 2025 e a
altura independente de Mosaico agropecuário, inicialmente 0 m.

## Preparar o servidor

Requisitos: Node.js 24 para execução direta, ou Docker com Compose; proxy HTTPS
existente da IDA; acesso de saída a GitHub e Resend. Não é necessário login de
ChatGPT, conta de usuário na interface ou Cloudflare D1.

1. Copiar `.env.example` para `.env` **no servidor** e preencher:
   - `RF_PUBLIC_ORIGIN`: origem pública exata, por exemplo `https://idatele.com`.
   - `RF_GITHUB_TOKEN`: token restrito ao repositório do motor, Actions: leitura e escrita.
   - `RF_SESSION_SIGNING_KEY` e `RF_EXPORT_SIGNING_KEY`: valores aleatórios diferentes,
     com pelo menos 32 caracteres. Manter os valores entre reinicializações.
   - `RESEND_API_KEY` e `RF_EMAIL_FROM`: credencial e remetente autorizado no Resend.
     Para acesso público, usar um domínio de remetente verificado. O remetente de
     teste `onboarding@resend.dev` limita o destino ao titular da conta Resend.
2. Guardar os valores reais somente no servidor; `.env` é ignorado pelo Git e Docker.
3. Da raiz deste repositório, executar:

   ```sh
   docker compose -f compose.rfplanner.yml up -d --build
   ```

4. Adicionar o bloco de `deploy/nginx-rfplanner.conf` ao `server` HTTPS existente,
   mantendo todas as regras atuais das páginas e do formulário de contato da IDA.
   Conferir com `nginx -t` antes de recarregar a configuração.
5. Conferir `https://idatele.com/rfplanner/api/health/` e abrir a aba RFPlanner.

O Compose publica a porta 5180 somente em loopback. O volume `rfplanner-data`
mantém o histórico dos estudos em SQLite e deve ser incluído no backup do servidor.
Ele não contém um cadastro de leads. Não remover o volume em uma atualização.

## Executar diretamente com Node.js

Dentro de `rfplanner/`:

```sh
npm ci
npm test
npm run build
npm start
```

O servidor inicia em `http://127.0.0.1:5180/rfplanner/`. `RF_DATA_DIR` seleciona
a pasta persistente dos estudos; o padrão é `./data`. Em produção, executar
com um gerenciador de serviços e proxy HTTPS. A instalação real depende das
características e do acesso administrativo ao servidor da IDA.

## Conferir o site integrado localmente

Com RFPlanner iniciado na porta 5180, executar `node server.mjs` na raiz do
repositório e abrir `http://localhost:4173`. A aba RFPlanner usa o proxy local
do próprio visualizador. As páginas e os artigos continuam no mesmo site.
Para esse teste, definir `RF_PUBLIC_ORIGIN=http://localhost:4173` no ambiente
do RFPlanner e usar esse mesmo endereço no navegador.
O formulário institucional `/api/contact` permanece dependente da hospedagem
atual da IDA; o visualizador estático não envia contatos desse formulário.

## Escopo dos dados e da execução

- Cada navegador recebe uma sessão anônima assinada; consultas e exclusões filtram
  o dono da sessão no servidor. Encerrar o navegador pode encerrar a sessão conforme
  a restauração de cookies configurada pelo próprio navegador.
- O SQLite guarda parâmetros e estado dos estudos. Os artefatos permanecem no
  GitHub Actions e seguem os prazos de retenção do workflow.
- As chaves de assinatura devem continuar iguais para preservar acesso às sessões.
- Não se alteram resolução, propagação, potências ou diagramas ao mudar a hospedagem.
- O envio de cálculos exige o motor atualizado e os mapas disponíveis no catálogo
  dele. O MapBiomas instalado atualmente é regional; a disponibilidade é validada
  antes do cálculo. Esta versão não transforma o catálogo em cobertura nacional.
- O código e os arquivos locais do protótipo foram separados por uma lista de
  inclusão. Bancos antigos, resultados, tokens e credenciais DPAPI não fazem parte
  deste repositório.
