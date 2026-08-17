# Tech Spotlight #07 — Roteiro de condução

Período: **27/07/2026–12/08/2026**  
Apresentação: **14/08/2026**  
Time: Ronaldo, Bruno e Thielson

## Tese

**Do dado disperso ao fluxo operável.** A edição mostra quatro movimentos concretos e
um aprendizado estrutural: o painel de Citros ganha velocidade, respostas ganham
geometria, uma planilha ganha pipeline, um onboarding ganha caminho e o monorepo ganha
autonomia por aplicação.

## Timebox — 30 minutos

| Tempo | Slide | Dono |
|---|---|---|
| 0:00–3:00 | README + runtime + cards-balance | Ronaldo |
| 3:00–9:00 | Performance do Citros | Ronaldo |
| 9:00–14:00 | Geometria no formulário | Bruno |
| 14:00–21:00 | Thielson: Cargill, diagnósticos, mapas e integridade | Thielson |
| 18:00–22:00 | Onboarding do agrônomo | Bruno |
| 22:00–26:00 | Lightning: monorepo independente | Ronaldo/time |
| 26:00–27:00 | Engineering Wins | Ronaldo/time |
| 27:00–29:00 | Próximos passos | Ronaldo/time |
| 29:00–30:00 | Encerramento + perguntas | Ronaldo |

## Abertura

Fala: “O recorte tem 34 cards alterados no Azure DevOps: 29 concluídos e 5 ainda
abertos. Estamos considerando QA como concluído para o balanço da apresentação. São
26 melhorias, 6 bugs regressivos e 2 incidentes de produção. O quadro
permite filtrar por tipo, estado e responsável — depois seguimos quatro histórias
para entender o impacto técnico por trás desses números.”

No slide `cards-balance.md`, mostrar rapidamente os filtros. O recorte considera cards
do time WEB alterados entre 27/07 e 12/08. O responsável exibido é a atribuição atual
no Azure DevOps; colaborações registradas nos standups entram na fala, mas não alteram
a contagem por responsável.

Ronaldo agora tem quatro mensagens no período, cobrindo cinco cards: #12960, #12965,
#12973, #12976 e #12996. A história escolhida é a otimização do Citros; os demais
entram como contexto. Thielson foi separado em quatro páginas consecutivas para
mostrar a amplitude do trabalho sem comprimir temas diferentes em um único slide.

## Spotlight — Performance do Dashboard de Citros (Ronaldo, 6 min)

**Problema:** respostas dinâmicas, joins pesados e buscas repetidas deixavam o painel
sanitário caro de consultar e pouco previsível na interação.

**Solução:** `getFormDinamicoResposta` passou a receber parâmetros e usar
`STRAIGHT_JOIN`; foram criados índices em `form_resposta` e
`form_volume_ton_minerva`; FactIndexes reduziram buscas repetidas em inspeção,
evidências, matriz e prioridades. O produto recebeu filtro por variedade, estado de
loading na exportação e exclusão de propriedades desativadas.

**Resultado:** base de consulta mais previsível, comparativos visuais e exportação
protegida contra requisições simultâneas. Não inventar uma métrica de milissegundos:
os standups registram a otimização, mas não registram um antes/depois numérico.

## Spotlight — Geometria no formulário (Bruno, 5 min)

**Problema:** o formulário dinâmico não capturava respostas espaciais com desenho,
edição, persistência e validação contextual.

**Solução:** suporte a múltiplas geometrias, mapa baseado em OpenStreetMap, marcadores e
modos de desenho, transformadores long/lat, tabelas/migrations/DTOs no MySQL, duplicação
entre safras, lazy loading e `requestAnimationFrame`.

**Resultado honesto:** nova capacidade de resposta espacial em construção; o card ainda
está em progresso. Mostrar o fluxo técnico do slide e não anunciar como entrega final.

## Spotlight — Thielson em quatro páginas (7 min)

### 14:00–17:00 — `cargill.pipeline.sql`

**Problema:** a planilha Cargill precisava reunir abas diferentes sem perder regras,
contexto ou rastreabilidade.

**Solução:** mapeamento de Perfil Status, Laudo Produtivo, MON/HRDD e Treinamento;
DTOs, helpers, service, endpoint, procedure `getRelResultadoCargill` e validação dos
campos Status Final, Motivo Macro/Micro e espaçamento do cacau.

**Resultado:** quatro abas passaram a compartilhar uma mesma regra de exportação,
com dados brutos e respostas tratados no mesmo contexto.

### 17:00–19:00 — `diagnosticos-relatorios.sql`

Clonagem de diagnóstico por protocolo, safra e propriedades de origem/destino;
correções de ranking por pontuação; filtros para respostas pendentes de auditoria;
e novo escore persistido no diagnóstico pecuário e nos formulários IATF.

**Mensagem:** a regra de negócio foi centralizada em procedures e reaproveitada por
clonagem, ranking, evolução e diagnóstico.

### 19:00–20:00 — `mapas-exportacoes.ts`

Mostrar o agrupamento de camadas na exportação KML, os parâmetros dos relatórios PEC,
o marcador atualizado do croqui e o carregamento conjunto de Blob URL, metadados e
anexos de respostas auditadas.

### 20:00–21:00 — `integridade-dados.api.ts`

Fechar com as bordas de entrada: importação de filial, gênero e CAR; relação de
formulário com grupo/filial; e endpoint que rejeita respostas duplicadas.

**Resultado:** validar, relacionar e rejeitar duplicatas antes que o dado contamine
relatórios, telas ou integrações.

## Spotlight — Onboarding do agrônomo (Bruno, 5 min)

**Problema:** cadastro, agenda, comunicação e landing page estavam separados; o primeiro
contato dependia de intervenção manual.

**Solução:** formulário multi-etapas com React Form + Zod, persistência transacional,
criação automática de certificadora, eventos, Google Calendar/Meet, janelas de
disponibilidade, e-mails, QR code e layout responsivo.

**Resultado honesto:** o fluxo está em progresso. A narrativa é a integração da jornada,
não uma promessa de conclusão.

## Lightning — Monorepo independente (4 min)

**Problema:** um único `package.json` fazia aplicações e bibliotecas compartilharem
versões, dificultando atualizar um app sem mover o monorepo inteiro.

**Mudança:** cada app e lib passou a ter seu próprio `package.json`, com o
`pnpm-workspace` controlando os pacotes instalados e os vínculos entre eles.

**Efeito:** imagens Docker menores porque cada app instala apenas o que usa; upgrades
mais independentes; e uma estrutura de monorepo que permite evoluir aplicações sem
ficar presa à versão comum de uma biblioteca.

Fala: “A melhoria não aparece como uma tela nova, mas reduz o custo de toda próxima
entrega. O monorepo deixou de ser um pacote único e passou a ser uma coleção de
aplicações que compartilham código com autonomia.”

## Wins e roadmap

Wins: Ronaldo deixou o Citros mais acionável; Thielson tornou a plataforma mais
portátil entre Excel, Cargill, diagnósticos, mapas e relatórios; Bruno e Thielson
fortaleceram as bordas de autenticação, geometria, anexos e unicidade.

Reconhecer também a colaboração: validações em DEV/QA, conflitos de merge, deploy,
Jasper, DevOps, Mobile, Checkmilk e Biodiesel apareceram como trabalho compartilhado.
O balanço é **29 concluídos e 5 em aberto**; QA entra como concluído no resumo, enquanto
Committed e New viram a direção da próxima sprint.

## Próximos passos (2 min)

No slide `next-steps.todo`, apresentar a direção em quatro movimentos:

1. avançar nas traduções (i18n) do Agrotrace;
2. publicar a landing page do Agrotrace (deploy);
3. criar libs reutilizáveis de recursos, componentes e lógicas para ampliar o uso do
   monorepo — hoje a base compartilhada é `web-common`;
4. publicar o app EditalFit.

Mensagem: “A próxima sprint transforma a fundação em alcance: mais idiomas, mais
experiências publicadas e mais reuso entre aplicações.”

Se o tempo apertar, cortar detalhes de implementação. Preservar o problema, a decisão e
o resultado de cada história.
