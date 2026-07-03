# Tech Spotlight #05 - Roteiro de conducao

Periodo: 01/06/2026 - 02/07/2026  
Apresentacao: 03/07/2026  
Time: Ronaldo, Bruno, Thielson  
Objetivo: 30 min planejados; limite pratico de 40 min.

## Diretriz da edicao

Esta edicao nao deve ser apresentada como leitura de backlog.

A ideia central e:

> 42 cards dao escala, mas 3 historias explicam o trabalho do periodo.

As 3 historias escolhidas:

- Ronaldo: importacao generica de produtores/propriedades - de ~27min para ~5s.
- Bruno: Better-Auth / Auth V2 / MFA - base nova de autenticacao.
- Thielson: reaproveitamento de respostas entre diagnosticos - menos retrabalho operacional.

Regra de fala: para cada spotlight, seguir sempre `problema -> decisao tecnica -> resultado -> demo/print`.

## Timebox atual do deck

| Bloco | Tempo | Dono | Como conduzir |
|---|---:|---|---|
| Capa / abertura | 1 min | Ronaldo | Apresentar o formato enxuto: 3 historias, 30 minutos |
| Plano de 30 minutos | 1 min | Ronaldo | Reforcar que nao havera leitura card a card |
| Metricas com leitura | 3 min | Ronaldo | Mostrar numeros, mas transformar em leitura do periodo |
| Spotlight Ronaldo | 6 min | Ronaldo | Importacao generica + performance + prints se necessario |
| Spotlight Bruno | 6 min | Bruno | Better-Auth/Auth V2/MFA |
| Spotlight Thielson | 6 min | Thielson | Reaproveitamento de respostas |
| Roadmap | 6 min | Ronaldo/time | Proximas frentes como time Web |
| Fechamento | 1 min | Ronaldo | Reforcar sintese e abrir para perguntas |

Total planejado: 30 min.

Se atrasar: cortar detalhes internos e manter apenas impacto.

## Slide 1 - Capa: `README.md`

Tela atual: capa com terminal de release.

Mensagem principal:

> "Nesta edicao a gente vai fazer diferente: nao vamos passar card por card. O periodo teve 42 cards, mas a ideia e usar 3 historias para explicar o tipo de trabalho que aconteceu."

Fala sugerida:

"Hoje a proposta e manter o Tech Spotlight mais enxuto. O periodo teve 42 cards analisados, mas a gente selecionou uma historia por pessoa para explicar melhor o impacto tecnico. A ideia e ficar dentro de 30 minutos e, se alguma demo ao vivo falhar, temos prints preparados como fallback."

Pontos para mencionar:

- 42 cards dao escala.
- 3 historias explicam melhor o trabalho.
- Foco: performance, seguranca e reducao de retrabalho.
- Demos ao vivo podem ser usadas, mas prints estao preparados.

Evitar:

- Explicar todos os sistemas ja na capa.
- Falar dos 42 cards como resultado principal.

## Slide 2 - Plano de 30 minutos: `runtime-budget.ts`

Tela atual: pipeline `boot -> ronaldo -> bruno -> thielson -> roadmap`.

Mensagem principal:

> "O nosso combinado e usar o tempo para explicar historias completas, nao para navegar no backlog."

Fala sugerida:

"O roteiro esta dividido em cinco partes. Primeiro uma leitura rapida do periodo, depois uma historia minha, uma do Bruno e uma do Thielson. No final, fechamos com o roadmap do proximo ciclo. A regra aqui e simples: se alguma parte comecar a alongar, a gente corta detalhe tecnico e mantem problema, decisao e impacto."

Tempos:

- 00:00 - 05:00: abertura + leitura.
- 05:00 - 11:00: Ronaldo.
- 11:00 - 17:00: Bruno.
- 17:00 - 23:00: Thielson.
- 23:00 - 30:00: roadmap.

## Slide 3 - Metricas com leitura: `work-profile.json`

Tela atual: cards por tipo, cards por dev, sistemas/trilhas e leitura do periodo.

Numeros base:

- 42 cards unicos.
- 29 features.
- 8 bugs corrigidos.
- 1 refactor/migracao.
- 4 outros.
- Ronaldo: 14 cards.
- Bruno: 5 cards.
- Thielson: 23 cards.

Mensagem principal:

> "A quantidade ajuda a entender escala, mas o que importa aqui e o perfil do trabalho."

Fala sugerida:

"Aqui ainda mantemos os numeros, porque eles ajudam a dar escala. Mas a leitura nao e 'quem fez mais card' ou 'quantos cards foram feitos'. O periodo teve algumas linhas bem claras: plataforma e automacao, menos retrabalho operacional e uma base tecnica mais forte para os proximos ciclos."

Leitura para o filtro "Todos":

- Plataforma e automacao: importacao generica, relatorios, ranking e formulario dinamico caminharam para componentes configuraveis.
- Menos retrabalho operacional: reaproveitamento de respostas, comunicacao e rotinas de diagnostico reduziram passos manuais.
- Base tecnica mais forte: Auth V2/MFA, procedures, permissoes e integracoes sustentam os proximos ciclos.

Se clicar em Ronaldo:

- Performance com padronizacao.
- Formulario e relatorios.
- Indicadores e acompanhamento.

Se clicar em Bruno:

- Seguranca e autenticacao.
- Procedimentos e automacao.
- Ajustes de fluxo.

Se clicar em Thielson:

- Reaproveitamento de respostas.
- Comunicacao com produtores.
- Diagnostico e processos.

Evitar:

- Comparar com a edicao anterior.
- Dizer que 42 cards foi pouco ou muito.
- Entrar na lista completa dos cards.

## Spotlight 1 - Ronaldo: `importacao-generica.service.ts`

Tema: importacao generica de produtores/propriedades.  
Card principal: #12529.  
Tempo: 6 min.

Mensagem principal:

> "O ganho nao foi so deixar a tela mais generica. Foi transformar um fluxo lento e especifico em um motor configuravel, rastreavel e rapido."

### Problema

Fala sugerida:

"Antes, a importacao de produtores e propriedades tendia a virar um fluxo especifico. Cada planilha nova puxava regra propria, normalizacao no servico e pouca rastreabilidade do que aconteceu em cada linha. Alem disso, em um caso real o processamento chegava perto de 27 minutos."

### Decisao tecnica

Fala sugerida:

"A decisao foi tratar importacao como motor configuravel. A configuracao define campos, parametros e categoria. A planilha entra em staging, e a normalizacao pesada vai para o banco via procedure. Com isso, o servico deixa de carregar regra especifica demais e passa a orquestrar o processo."

Pontos tecnicos:

- Configuracao de campos e parametros.
- Download de modelo.
- Upload com parametros dinamicos.
- Staging para linhas brutas.
- Procedure para normalizacao.
- Historico de execucao.
- Permissao por certificadora/perfil.

### Resultado

Fala sugerida:

"O resultado mais forte e performance: o processamento caiu de aproximadamente 27 minutos para cerca de 5 segundos. Alem disso, ficou mais facil criar novas importacoes sem duplicar fluxo especifico."

### Demo / fallback

Demo ao vivo ideal:

1. Abrir menu da importacao.
2. Mostrar configuracao da importacao.
3. Mostrar configuracao de campos e parametros.
4. Abrir fluxo de download/upload no Agrotrace.
5. Mostrar resultado importado/historico.

Fallback:

- Usar o botao `abrir prints da demo`.
- Prints em `edition-05/assets/ronaldo-importacao`.

Ordem dos prints:

1. `01-menu.png`
2. `02-config-importacao.png`
3. `03-config-campos.png`
4. `04-config-parametros.png`
5. `05-agro-menu.png`
6. `06-agro-download-importacao.png`
7. `07-agro-importado.png`

Se o tempo apertar:

- Mostrar apenas configuracao, download/upload e resultado.
- Nao abrir detalhes internos da procedure.

## Spotlight 2 - Bruno: `better-auth.guard.ts`

Tema: Better-Auth / Auth V2 / MFA.  
Card principal: #11404.  
Tempo: 6 min.

Mensagem principal:

> "A autenticacao deixou de ser so login e senha; ela virou uma base mais preparada para seguranca, MFA e evolucao dos fluxos."

### Problema

Fala sugerida:

"A autenticacao precisava evoluir sem quebrar os fluxos existentes. O desafio era suportar MFA, token parcial, ativacao de conta e compatibilidade com o que ja estava em producao."

### Decisao tecnica

Fala sugerida:

"O Bruno trabalhou numa base Auth V2 usando Better-Auth, com tabelas core, guards, decorators, tokens parciais e etapas de MFA. A ideia e separar melhor o momento em que o usuario esta parcialmente autenticado do momento em que ele realmente concluiu a validacao."

Pontos tecnicos:

- Better-Auth.
- Auth V2.
- Token parcial.
- MFA por email/Google/TOTP.
- Guards e decorators.
- Locks/controle transacional quando necessario.
- Base para evolucao futura do login.

### Resultado

Fala sugerida:

"O resultado e uma base de autenticacao mais segura, mais testavel e mais preparada para novos fluxos, sem depender de remendos no fluxo antigo."

### Demo / fallback

Demo ideal:

1. Mostrar fluxo de login.
2. Mostrar etapa de MFA.
3. Explicar token parcial ate finalizar MFA.

Fallback recomendado:

- Print da tela de login/MFA.
- Print ou diagrama simples do fluxo: `credentials -> partial token -> MFA -> access token`.

Se o tempo apertar:

- Explicar apenas o conceito de token parcial e MFA.

## Spotlight 3 - Thielson: `reaproveitamento-respostas.sql`

Tema: reaproveitamento de respostas entre diagnosticos.  
Card principal: #12677.  
Tempo: 6 min.

Mensagem principal:

> "O foco foi reduzir redigitacao entre diagnosticos sem perder regra, origem e rastreabilidade."

### Problema

Fala sugerida:

"Em varios fluxos, respostas validas ja existiam em diagnosticos ou safras anteriores. O problema era reaproveitar isso sem copiar informacao errada, sem duplicar resposta e sem perder rastreabilidade."

### Decisao tecnica

Fala sugerida:

"A solucao foi criar um processo controlado: configuracao no CMS, tela em Operacoes > Diagnostico, endpoint e procedure para aplicar regras de elegibilidade. O reaproveitamento nao e uma copia cega; ele precisa saber o que pode ser reaproveitado, o que deve ser ignorado e por qual motivo."

Pontos tecnicos:

- Configuracao no CMS.
- Tela em Operacoes > Diagnostico.
- Endpoint dedicado.
- Procedure/migration.
- Regras de elegibilidade.
- Motivos de respostas ignoradas.
- Ajustes de status/ranking/performance.

### Resultado

Fala sugerida:

"O resultado e menos retrabalho operacional e mais consistencia. O usuario nao precisa redigitar tudo, e o sistema ganha uma trilha mais clara do que foi reaproveitado e do que foi ignorado."

### Demo / fallback

Demo ideal:

1. Mostrar configuracao.
2. Mostrar origem/destino.
3. Executar ou simular reaproveitamento.
4. Mostrar respostas reaproveitadas/ignoradas.

Fallback recomendado:

- Prints da tela de configuracao.
- Prints do resultado.
- Se nao houver print, usar o pseudo-SQL do slide para explicar a regra.

Se o tempo apertar:

- Focar na diferenca entre "copiar resposta" e "reaproveitar com regra".

## Roadmap: `roadmap.todo`

Tempo: 7 min, incluindo fechamento.

Mensagem principal:

> "O roadmap nao e promessa fechada; e a direcao do proximo ciclo do time Web."

Itens atuais:

1. #12685 - Integracao SharePoint Cargill.
2. #12412 - Relatorio de evolucao Agroplus.
3. #12330 / #12644 - Ranking com Acompanhamento.
4. Formulario Dinamico - exportar/importar estrutura.
5. Internacionalizacao - ampliar cobertura.

Como conduzir:

"Para o proximo ciclo, a leitura e que essas frentes continuam na mesma linha: menos trabalho manual e mais plataforma. Temos integracao com SharePoint da Cargill, finalizacao do relatorio de evolucao Agroplus, ranking considerando acompanhamento, exportacao/importacao da estrutura do formulario dinamico e continuidade da internacionalizacao."

Detalhe por item:

### #12685 - Integracao SharePoint Cargill

Fala:

"Aqui a ideia e manter a coleta de campo que ja existe, mas alimentar automaticamente uma planilha Excel no SharePoint da Cargill via CRON. Isso reduz retrabalho e atende o formato que o cliente precisa consumir."

### #12412 - Relatorio de evolucao Agroplus

Fala:

"Esse relatorio ja foi iniciado, mas ainda precisa ser finalizado. Ele conecta pontuacao, ranking e evolucao de desempenho da unidade produtiva."

### #12330 / #12644 - Ranking com Acompanhamento

Fala:

"Hoje precisamos evoluir os graficos e indicadores para considerar tambem os acompanhamentos, nao so diagnostico. Isso envolve procedures e reflexo nos relatorios."

### Formulario Dinamico - exportar/importar estrutura

Fala:

"Essa e uma frente importante de reaproveitamento. Queremos levar para o Formulario Dinamico o mesmo padrao que ja usamos no Diagnostico: exportar a estrutura para Excel e importar novamente para outro cliente ou banco. O Thielson deve estar bem envolvido porque trabalhou bastante nesse processo no Diagnostico, mas a frente e do time Web."

### Internacionalizacao

Fala:

"A internacionalizacao ja existe em algumas telas principais, com portugues, ingles e espanhol. O proximo passo e ampliar para fluxos internos, cadastros e componentes reutilizaveis."

Fechamento sugerido:

"Entao a sintese desta edicao e: a gente reduziu tempo em fluxo critico, fortaleceu autenticacao e diminuiu retrabalho operacional. O proximo ciclo continua nessa direcao: integracoes, relatorios, ranking, i18n e ferramentas de migracao."

## Plano de demo e fallback

Recomendacao geral:

- Tentar demo ao vivo apenas se o sistema ja estiver aberto antes da apresentacao.
- Nao gastar tempo subindo ambiente durante o Spotlight.
- Se a demo falhar, usar prints imediatamente.

Ronaldo:

- Prints ja adicionados em `edition-05/assets/ronaldo-importacao`.
- Botao no slide: `abrir prints da demo`.

Bruno:

- Ideal preparar 2 ou 3 prints: login, MFA, fluxo/token parcial.
- Se nao houver print, explicar pelo fluxo do slide.

Thielson:

- Ideal preparar 3 ou 4 prints: configuracao, origem/destino, execucao, resultado.
- Se nao houver print, explicar pelo pseudo-SQL.

## Frases de transicao

Da abertura para metricas:

"Antes de entrar nas historias, vou passar rapidamente pela leitura do periodo."

Das metricas para Ronaldo:

"Com essa leitura, a primeira historia mostra bem a parte de plataforma e performance."

De Ronaldo para Bruno:

"Saindo de performance e padronizacao, o Bruno entra numa fundacao importante: autenticacao."

De Bruno para Thielson:

"Depois de seguranca, a terceira historia olha para operacao: como reduzir retrabalho nos diagnosticos."

De Thielson para roadmap:

"Essas tres historias ajudam a explicar a direcao do roadmap: continuar transformando fluxo manual em plataforma."

## O que evitar

- Ler todos os cards.
- Comparar com a edicao anterior.
- Falar "fizemos 42 cards" como principal mensagem.
- Tentar subir sistema durante a apresentacao.
- Entrar em SQL/procedure por muito tempo.
- Explicar detalhes de permissao, migration ou entidade se nao forem essenciais para o impacto.

## Checklist antes de apresentar

- Abrir `edition-05/spotlight.html`.
- Testar navegacao com setas.
- Testar botao de prints do Ronaldo.
- Deixar sistema aberto nas telas de demo, se for usar demo ao vivo.
- Confirmar se Bruno e Thielson terao prints ou demo ao vivo.
- Pressionar `T` apenas se quiser usar cronometro.
- Manter a fala de cada spotlight em ate 6 minutos.
