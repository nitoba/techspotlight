# Tech Spotlight #08 — Roteiro de condução

Período: **17/08/2026–02/09/2026**  
Apresentação: **04/09/2026**  
Time: Ronaldo, Bruno e Thielson

## Tese

**Contexto que vira decisão.** O ciclo levou dados de diagnóstico, solo, talhão,
autenticação e atendimento para painéis, contratos e relatórios que explicam o
próximo passo.

## Timebox — 30 minutos

| Tempo | Slide | Dono |
|---|---|---|
| 0:00–3:00 | README + runtime + cards-balance | Ronaldo |
| 3:00–8:00 | Dashboard analítico JBS | Ronaldo |
| 8:00–12:00 | Solo & Nutrição | Ronaldo |
| 12:00–16:00 | Pergunta Talhão | Bruno |
| 16:00–19:00 | Auditoria de autenticação | Bruno |
| 19:00–21:00 | Lightning: escopos reutilizáveis | Bruno |
| 21:00–24:00 | Integridade de relatórios | Thielson |
| 24:00–26:00 | PEC, protocolo e identificadores | Thielson |
| 26:00–28:00 | Contexto para análise IA | Thielson |
| 28:00–30:00 | Engineering Wins + próximos passos + perguntas | Ronaldo/time |

## Abertura

Fala: “O recorte tem **34 cards**. São **27 concluídos** quando `Done` e `Test QA`
entram no balanço, e **7 em aberto**. O Azure mostra **25 melhorias, 4 bugs e 5
incidentes**. Há 30 cards no recorte de área e quatro IDs preservados por evidência
de standup: #12735, #13223, #13240 e #13263.”

No slide `cards-balance.md`, mostrar os filtros por estado, tipo e responsável.
O responsável é a atribuição atual do Azure; colaborações dos standups entram na
narrativa, não na contagem.

### Reconciliação importante

- #13223 foi mantido por evidência de standup; a alteração do Azure ocorreu em
  03/09, depois do fim do período, e está em `Test QA`.
- #13240 e #13263 foram mantidos por evidência de standup; estão na área
  `AGROTRACE`, não em `AGROTRACE\\Web`.
- #12735 foi citado no standup como em andamento, embora a alteração seja anterior
  ao intervalo consultado; continua `New`.
- #13216 aparece como `Done` no Azure, mas o standup diz que os campos de PEC-lote
  foram desfeitos após revisão de negócio. Apresentar como rework, não como entrega
  final.

## Spotlight — Dashboard analítico de diagnósticos JBS (Ronaldo, 5 min)

**Problema:** dados de atendimento, questionário, tema, pergunta, anexos e pontuação
estavam dispersos; o negócio precisava de uma leitura comparável e priorizada.

**Decisão/implementação:** procedure `getRespostasDiagnosticoAgrupadas`, endpoints de
resumo e detalhe com cache, paginação e restrição à certificadora JBS; filtros, cards
executivos, indicadores de maturidade, oportunidades por pontos perdidos, comparação
entre safras, visão territorial e fila com score explicável. O relatório ganhou capa,
medalhas, evidências fotográficas, extratos individuais e jobs assíncronos com
progresso.

**Resultado:** painel e relatório executivo passam a contar a mesma história do
diagnóstico. Pesos da priorização e exportação CSV/XLSX ainda estavam em validação.

**Evidência:** #13154. O standup registra entregas, mas o estado atual no Azure é
`New`; não anunciar como encerrado.

## Spotlight — Solo & Nutrição (Ronaldo, 4 min)

**Problema:** o laudo do laboratório precisava virar recomendação explicável, com
rastreabilidade, escopo por certificadora e uma saída que o produtor pudesse abrir.

**Decisão/implementação:** importação de PDF multi-amostra via IA com checksum e
prompts protegidos; CRUD de laboratórios e orçamentos; formulário em abas; semáforo;
calagem calcítica/dolomítica, gessagem complementar, fontes NPK e memória de cálculo;
PDF espelhado; dashboard com custo, funil e mapa; página pública com URL dinâmica e
restrição por certificadora.

**Resultado:** a capacidade chegou a `Test QA` nos cards #13242 e #13293. Não há
métrica de acurácia ou publicação final registrada.

## Spotlight — Pergunta Talhão (Bruno, 4 min)

**Problema:** o formulário dinâmico precisava vincular ou cadastrar talhões sem
consultas repetidas, perda de `propriedadeId` ou croqui fora de contexto.

**Decisão/implementação:** procedure de carregamento, criação rápida, persistência do
croqui, componente read-only de validação, formatação de área com `DecimalPipe`,
layout de abas sem overflow e limpeza do acesso ao formulário.

**Resultado:** #13223 está em `Test QA`. O card foi buscado diretamente porque mudou
depois da janela de `ChangedDate`; a fonte está marcada no ledger.

## Spotlight — Auditoria de autenticação (Bruno, 3 min)

**Problema:** login, MFA e contexto de sessão foram reforçados, mas ainda faltava uma
trilha consultável de quem fez o quê e como o request chegou ao sistema.

**Decisão/implementação:** repositório de auditoria Better Auth, sanitização, limpeza
por cron, enriquecimento com identidade legada, IP, User Agent, Request ID e contexto
de plataforma, além de painel CMS e templates Angular atualizados.

**Resultado honesto:** #12735 continua `New` e em andamento. O foco é a decisão de
observabilidade, não uma entrega encerrada.

## Lightning — Escopos reutilizáveis (Bruno, 2 min)

Uma regra de certificadora não deve ser copiada em cada métrica e exportação. O
trabalho criou catálogo e pivot por migration, predicados normalizados, endpoints/DTOs,
contratos no `web-common`, formulário master-detail no CMS e fixtures para validação.

Duas correções extras também foram feitas:

1. Procedure `getProjectMetrics`: passou a contar produtores e propriedades únicos,
   ativos e válidos; somar áreas uma vez; usar certificadoras válidas; relacionar
   estados a atendimentos e vínculos válidos; contabilizar atendimentos ativos; e tratar
   áreas vazias ou erros.
2. Relatório **TOTAIS DO SISTEMA - ATENDIMENTOS**: mantém o detalhe por certificadora,
   mas calcula um total geral independente, sem somar vínculos repetidos ou duplicar
   produtores, propriedades, áreas e estados; os critérios ficam alinhados à métrica
   global.

Fala: “Se é regra de negócio, ganha nome, contrato e teste. O mesmo escopo pode servir
à métrica, à exportação e à tela de configuração.” O tema vem do standup e não possui
um ID explícito no recorte; não somar um card novo.

## Spotlight — Integridade dos relatórios (Thielson, 3 min)

**Problema:** blocos repetíveis sem resposta e imagens internas desapareciam dos
relatórios; filtros booleanos também escondiam contas no CMS.

**Decisão/implementação:** preservar blocos vazios no relatório de respostas, coletar
imagens aninhadas no relatório de imagens e normalizar parâmetros booleanos na
listagem administrativa.

**Resultado:** #13260 e #13280 estão `Done`; #13281 está em `Test QA`. As saídas
respeitam a estrutura real do atendimento.

## Spotlight — PEC, protocolo e identificadores (Thielson, 2 min)

Características dinâmicas de animais e lotes passaram a considerar atividade, tipo de
criação, categoria e certificadora (#13254, `Test QA`). O nome do protocolo entrou nas
telas de atendimento (#13234), e identificadores externos GEDAVE foram adicionados à
exportação XLSX do Citros (#13230). #13216 está `Done` no Azure, mas o standup registra
que seus campos foram desfeitos depois da revisão de negócio; preservar essa diferença.

## Spotlight — Contexto para análise IA (Thielson, 2 min)

**Problema:** uma análise útil precisa saber de quais fontes veio o dossiê e permitir
reexecução explicável.

**Decisão/implementação:** documentação funcional no CMS, agente local que identifica
features e propõe atualizações via PR controlado, contratos/prompts para Questionário,
Formulário Dinâmico e PEC, fotografia do dossiê, persistência de execução, fila
assíncrona idempotente, retentativas, status, duração, modelo, tokens e histórico por
seção.

**Resultado honesto:** a base de rastreabilidade está em progresso; o standup não
registra métrica de qualidade do modelo.

## Engineering Wins

1. **Decisão com evidência — Ronaldo:** JBS e Solo & Nutrição transformaram dados
   brutos em painéis, recomendações, relatórios e links públicos (#13154, #13242,
   #13293).
2. **Contexto reutilizável — Bruno + Thielson:** talhão, escopo, protocolo e
   identificador externo atravessam telas e exportações (#13223, #13230, #13234,
   #13254).
3. **Bordas confiáveis — time Web:** persistência de login, Blob, relatórios com
   blocos repetíveis e filtros administrativos foram tratados (#13142, #13209, #13260,
   #13280, #13281).

Reconhecer a colaboração de Brenda, Carlos, Gustavo, Iohan, Matheus, Ricardo, Sartori
e Thayse em testes, regras de negócio, PRs, validações e deploys.

## Próximos passos

Apresentar como direção, não promessa:

1. validar pesos e exportação do painel JBS — @ronaldo / #13154;
2. concluir dashboards de Abates ATER e filtro de Viveiros — @ronaldo / #13231,
   #13146;
3. fechar auditoria de autenticação e pendências do Talhão — @bruno / #12735,
   #13223;
4. transformar contexto em produto: análise IA, documentação e escopos reutilizáveis
   — @thielson + @bruno.

Os sete cards abertos no fechamento são #12735, #12983, #13146, #13154, #13198,
#13231 e #13311.

Se o tempo apertar, cortar detalhes de implementação. Preservar sempre problema,
decisão, resultado e estado honesto de cada história.
