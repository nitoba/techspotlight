# Tech Spotlight #09 — Roteiro de condução

Período coberto: **08/09/2026–18/09/2026**  
Apresentação prevista: **25/09/2026**, pela cadência de três semanas da edição anterior  
Apresentadores: **Ronaldo, Bruno e Thielson**

## Tese

**Regra explícita. Execução rastreável.** O período atravessou Agrotrace/Agrotrace Web e Check-Tenders: regras de produto chegaram a rankings e cadastros, integrações ganharam limites e contexto, e os fluxos de atendimento passaram a preservar resposta, anexo e histórico.

## Escopo, consulta e reconciliação Azure

- Consulta WIQL em `AGROTRACE`, área `AGROTRACE\Web`, `ChangedDate >= 2026-09-08` e `< 2026-09-19`: **26** cards, dos quais **9 já foram apresentados na edição 08** (#12826, #13223, #13230, #13231, #13234, #13242, #13281, #13293, #13311) e só tiveram `ChangedDate` em 08/09 16:34 por atualização em lote; eles ficam fora desta edição, restando **17**.
- IDs únicos citados nos standups: **24**. Treze não apareceram na consulta por área/data; doze foram buscados por ID e um (#12735) não foi localizado pelo `az boards work-item show`.
- Ledger resultante: **30 IDs** — 29 com dados Azure recuperados e #12735 mantido por evidência de standup/edição anterior.
- Consulta ao projeto `CHECK-TENDERS`, sem filtro de área, para a mesma janela: **0 work items**. O standup descreve trabalho de produto/infra sem IDs de cards; esses tópicos aparecem como evidência de standup, sem inventar cards.
- Projetos mencionados: `AGROTRACE` (inclui os repos Agrotrace e `agrotrace-v3`) e `CHECK-TENDERS`.

Entre os 29 cards recuperados: **16 `Done`, 9 `Test QA` e 4 `New`**. Para a apresentação, `Done` e `Test QA` contam como concluídos, e QA permanece visível como **CONCLUÍDO · QA**. O #12735 consta como In Progress no standup, mas não pôde ser buscado no Azure; ele aparece como evidência de standup, não entra no saldo de assignees atuais.

Tipos Azure nos 29 cards recuperados: **16 Enhancements**, **5 Regression Bugs**, **4 Production Issues**, **2 Requests** e **2 User Stories**. `Request` e `User Story` foram mantidos com seus nomes originais porque o protocolo não define conversão para MELHORIA/BUG/INCIDENTE. O tipo atual do #12735 não foi recuperado; a edição anterior registrava Enhancement.

Assignees Azure nos 29 cards recuperados (`System.AssignedTo.displayName`): **Thielson 13**, **ronaldo.pereira 10**, **bruno.alves biosistemico.com.br 5**, **Não atribuído 1**. No deck, os dois nomes de conta são apresentados como Ronaldo e Bruno para leitura; a contagem continua agrupada pelo valor de Azure. O #12735 tem responsável atual não verificado.

Cards encontrados por ID fora da consulta: alguns estavam fora de `AGROTRACE\Web` (#13372, #13382, #13388, #13392, #13393, #13396, #13419); outros tiveram `ChangedDate` posterior ao fim do período (#13432, #13438, #13445, #13458, #13463). Foram incluídos porque seus IDs aparecem nos standups. Os dados de `edition-09/azure_cards.json` preservam área, data, estado, tipo, assignee e fonte.

### Divergências que não devem ser apagadas

- **#13403:** standup descreve como Done; Azure mostra `New`, atribuído a Thielson. Contar como aberto até confirmação.
- **#13341, #13368, #13373, #13392, #13393, #13419 e #13445:** standups usam linguagem de concluído; Azure mostra `Test QA`. A regra do time conta QA como concluído, mantendo esse estado visível.
- **#12735:** standup informa In Progress; consulta direta falhou com “não existe ou sem permissão”. A edition-08 registrava Enhancement/New/Bruno, mas esses dados não são atuais.
- **#13355 e #13474:** standup relata andamento; Azure mostra `New`. Ambos seguem abertos.
- **#13146:** standup anterior o deixou em andamento; Azure alterou para `Done` em 17/09.

## Timebox — 30 minutos

| Tempo | Slide | Responsável |
|---|---|---|
| 0:00–3:00 | README, runtime e cards-balance | Ronaldo |
| 3:00–7:00 | Score e filtros do Citros | Ronaldo |
| 7:00–9:00 | CPF e bordas de cálculo | Ronaldo |
| 9:00–11:00 | Validade CAF → painel SICAR | Ronaldo + Bruno |
| 11:00–14:00 | API keys, OTP e auditoria | Bruno |
| 14:00–15:00 | Licenças CREA/CRMV/CFTA | Bruno |
| 15:00–18:00 | Check-Tenders: captura e deploy | Bruno |
| 18:00–19:00 | Landing localizada e documentação | Bruno |
| 19:00–22:00 | Pipeline de análise IA | Thielson |
| 22:00–23:00 | Regras PEC | Thielson |
| 23:00–25:00 | Sincronizado_em | Thielson |
| 25:00–26:00 | Overview Thielson: passagem rápida pelos quatro cards | Thielson |
| 26:00–27:00 | Lightning: idempotência | Thielson |
| 27:00–28:00 | Engineering Wins | Ronaldo |
| 28:00–30:00 | Próximos passos e perguntas | Time Web |

## Abertura e ledger — Ronaldo (3 min)

“Consultamos a área Web no Azure e ficamos com 17 cards do período (outros 9 já tinham sido apresentados na edição 08), somamos 12 cards encontrados por IDs de standup e mantivemos um ID que o Azure não localizou. São 30 IDs: 25 concluídos pela regra Done + Test QA, quatro em New e um reportado em andamento no standup sem confirmação atual. O trabalho também passou por Check-Tenders; ali há atividades nos standups, mas nenhuma work item retornou na janela consultada.”

Mostrar filtros por estado, tipo e assignee. Destacar que os cards #13355/#13358/#13403/#13474 estão em New; o #12735 não foi recuperado. Os dois tipos Request e os dois User Story ficam com o rótulo Azure original.

## Spotlight — Score e filtros do Citros (Ronaldo, 4 min)

**Cards:** #13146, #13397, #13408 e #13396; todos `Done` no Azure.

**Problema:** o ranking precisava seguir a metodologia oficial da Defesa Agropecuária de SP, e perguntas condicionais não deveriam inflar pendências. Gestores também precisavam localizar produtores, filtrar viveiros e exportar o mesmo recorte exibido no painel.

**Decisão/implementação:** pesos oficiais, peso dobrado nas condições previstas e score por propriedade; filtros de certificação, baixa incidência e produtor; filtro aplicado à exportação; indicador de expiração e atualização manual do cache. O filtro Viveiros (#13146) foi concluído em 17/09. #13396 ajustou `getFormDinamicoResposta` com `data_atendimento` e removeu a coluna GEDAVE do produtor do relatório.

**Resultado/evidência:** ranking, mapa e exportação compartilham os critérios e filtros relatados. O Governo de SP esclareceu a condição da variedade lima/limão; Iohan participou da validação. Não há métrica de impacto ou latência nos standups.

**Demo:** dashboard Citros → ranking → filtro de produtor/viveiros → exportação; mostrar a indicação de cache.

## Spotlight — CPF e cálculo defensivo (Ronaldo, 2 min)

**Cards:** #13317 e #13382, `Done`.

**Problema:** documento duplicado podia passar sem contexto para o operador; uma divisão por zero podia quebrar o cálculo de desempenho em qualquer agrupamento.

**Decisão/implementação:** ao sair do campo CPF/CNPJ, consultar a certificadora e listar registros ativos com atendimentos/formulários; permitir abrir ou continuar sem bloquear o cadastro. Na procedure `getRankingPorImportancia`, proteger os modos de agrupamento com `NULLIF`/`IFNULL` e retornar 100% quando o divisor é zero.

**Resultado/evidência:** aviso não bloqueante com opções claras e cálculo definido nos casos sem denominador. O card #13317 está Done no Azure. O teste do cálculo deve ser em ambiente seguro, sem fabricar cadastros reais.

**Contexto adicional:** #13372 incluiu proprietários na contagem de produtores da Home. #13388 corrigiu colunas/breadcrumbs/scroll em várias listagens, #13463 limitou o nome de certificadora no menu e #13458 removeu validação fixa MASTER/ADMIN dos endpoints dos painéis Abates/JBS. Não há métricas registradas para esses ajustes.

## Spotlight — CAF do cadastro ao SICAR (Ronaldo + Bruno, 2 min)

**Cards:** #13432 (`Done`) e #13474 (`New`, sem assignee). #13474 foi descrito em andamento no standup.

**Problema:** sem validade persistida, o painel não consegue separar CAF vencido, perto do vencimento e regular.

**Decisão/implementação:** #13432 adiciona campo de validade, migration, trigger, entidades e PrimeNG datepicker. #13474 classifica seis situações (vencida, perto, médio prazo, regular, sem validade, sem CAF), organiza KPIs e gráficos e reutiliza o modal de investigação.

**Resultado honesto:** campo concluído; a aba nova segue em aberto no Azure e sem assignee. Apresentar como trabalho compartilhado descrito nos standups, não como entrega final do painel.

## Spotlight — API keys, OTP e auditoria (Bruno, 3 min)

**Cards:** #13393 e #13419 em `Test QA`; #12735 segue sem registro localizado no Azure.

**Problema:** integrações precisam autenticar uma pessoa sem sessão interativa e as chaves globais devem respeitar certificadoras autorizadas.

**Decisão/implementação:** endpoint por e-mail com filtro de certificadora e interceptor para escopos de API key; OTP com estado de desafio, fila, rate limit, serviço de auditoria, guards globais, validação DTO e filtros de integração. A auditoria adiciona IP, User Agent, sistema/navegador e eventos no CMS.

**Resultado honesto:** #13393 e #13419 estão em Test QA, portanto contam como concluídos pela regra da edição. #12735 aparece em andamento no standup, mas não pôde ser localizado; não declarar conclusão nem assignee atual.

**Colaboração:** standups citam Elias, Carlos e Ronaldo em endpoint, validação e PR.

## Spotlight — Licenças profissionais (Bruno, 1 min)

**Card:** #13445, `Test QA` no Azure; Done no standup.

Entidade, serviço, módulo, migration, permissões e triggers para tipo de licença; formatação CRMV/CFTA com Value Accessor; componentes migrados para `web-common` e integrados ao cadastro de pessoa, incluindo traduções PT/EN/ES. Demonstrar seleção, formatação e idioma. Atribuição Azure: Bruno.

## Spotlight — Check-Tenders (Bruno, 3 min · standup-only)

**Azure:** a consulta ao projeto CHECK-TENDERS retornou zero cards no período; o standup não fornece IDs.

**Problema:** obtenção de fontes/documentos e pipelines precisavam de falhas observáveis e execução repetível durante a migração de nome e infraestrutura.

**Decisão/implementação:** validação binária e throttling de downloads; resolução de URLs UID e fallback a bot walls; migração npm → bun, Node.js 24, Kubernetes e caminhos de deploy; `pgcrypto` e permissões de migration/seed; pipeline fail-fast e diagnósticos. UI ganhou BrandLogo com tema, SEO, guards de sessão, página not-found e estados de análise mais claros.

**Resultado honesto:** esses itens foram relatados nos standups de 08–10/09 como concluídos ou em andamento; sem work items Azure na janela não há estado por card nem métrica consolidada.

## Spotlight — Landing localizada e documentação (Bruno, 1 min · standup-only)

`localizedAsset` seleciona variantes em inglês; carrosséis e hero aceitam vídeo PT/EN com preload por idioma e skeleton de carregamento. Em paralelo, READMEs foram adicionados aos frontends e diagramas/contexto de funcionalidades core foram atualizados. Mais de 20 fluxos receberam diagramas HTML/JSON e arquivos visual-check em 15/09. A documentação core ainda estava em progresso no standup.

## Spotlight — Pipeline de análise IA (Thielson, 3 min)

**Card:** #13403, `New` no Azure; standup descreve a melhoria como Done.

**Problema:** resultado sem fotografia de fontes, status e custo é difícil de conferir ou reaproveitar no atendimento.

**Decisão/implementação:** dossiê com questionários, formulários, PEC, horticultura e anexos; manifesto de arquivos, execução manual ou por filtros, fila assíncrona e histórico. CMS exibe resumo separado da narrativa, fontes, status, duração, modelo, tokens, falhas e custo calculado pelo pricing. Dados foram expostos na `atendimento_view` com sufixo `_ia`.

**Resultado honesto:** funcionalidades aparecem descritas como entregues, mas o card Azure ainda está New. Confirmar com Thielson antes de declarar fechado. Não há medida de acurácia do modelo.

## Spotlight — Regras PEC (Thielson, 1 min)

**Cards:** #13254 Test QA; #13313 Regression Bug/Test QA; #13341 Test QA; #13392 Test QA.

Categorias e tipo de criação controlam características de lote; as regras por certificadora/programa restringem reprodutores e estoque de sêmen. Mostrar a regra contextual no CMS. Os quatro cards estão em Test QA e contam como concluídos pela regra da edição, mantendo o estado original visível.

## Spotlight — Sincronizado_em (Thielson, 2 min)

**Card:** #13355, `New` e atribuído a Thielson.

Organizar migrations por lotes, criar `BaseEntityTimesStampsWithSync` e subscribers para sincronização/auditoria; PEC, Formulários Dinâmicos, changelog, propriedades, notificações e questionários aparecem como etapas já alteradas.

**Resultado honesto:** a história permanece aberta no Azure; não afirmar cobertura completa das tabelas.

## Overview — Thielson (1 min)

**Cards:** #13368, #13371, #13373 e #13438.

Fazer uma passagem rápida pelos quatro cards, mostrando badge, ID e título. Este slide é apenas um overview; seguir sem desenvolver narrativa técnica.

## Lightning — Escrita idempotente (Thielson, 1 min)

#13373: o mesmo payload não cria outra resposta e a edição devolve o UUID estável. Mostrar primeiro envio, reenvio igual e edição no formulário. Não apresentar pseudocódigo como implementação literal.

## Engineering Wins (Ronaldo, 1 min)

1. **Regra oficial aplicada — Ronaldo.** #13146, #13397 e #13408 levam pontuação, filtro e exportação a uma leitura coerente; Iohan e o Governo de SP ajudaram a validar critérios.
2. **Integração com identidade — Bruno.** #13393, #13419 e #13445 avançam chave global, OTP e licença profissional; Check-Tenders também ganhou pipeline e estados de erro mais claros. Reconhecer Elias, Carlos, Iohan e Brenda pelas validações citadas.
3. **Evidência preservada — Thielson.** #13260, #13280, #13368, #13371, #13373 e #13438 cobrem relatórios, respostas, anexos e vínculo entre produtor e técnico; Ronaldo, Thayse e Elias participaram da investigação das respostas e anexos.

**Leitura honesta:** 25 concluídos pela regra Done + QA; quatro cards Azure permanecem New e #12735 requer localização. #13403 tem divergência New/Done.

## Próximos passos

- [ ] Sincronização — completar a inclusão de `sincronizado_em` por etapas.
- [ ] Relatórios PDF do CAF — exportar do painel CAF listas em PDF (vencidos, sem data de validade, perto de vencer). Na fala: o PDF sai do sistema para imprimir e enviar a quem precisa regularizar apenas aqueles CAFs.
- [ ] Cache Redis — organizar o cache por dashboard no Redis: dados prontos ao abrir e opção de forçar a atualização quando preciso.
- [ ] Dashboards por projeto — expandir os dashboards exclusivos de cada projeto para apoiar a tomada de decisão.
- [ ] JBS — avançar no grau de relacionamento entre os produtores.

## Fecho

“Seguimos a regra até o dado e a execução. Quando o status diverge, mostramos a evidência e confirmamos o próximo passo. Obrigado — perguntas?”
