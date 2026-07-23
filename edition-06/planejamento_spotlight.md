# Tech Spotlight #06 - Planejamento inicial

Periodo analisado: 06/07/2026 - 22/07/2026  
Apresentacao prevista: 24/07/2026  
Time: Ronaldo, Bruno e Thielson  
Status: estrutura inicial; standups de 23 e 24/07 ainda podem alterar metricas e roadmap.

## Diretriz da edicao

Esta edicao pode ser conduzida pela ideia:

> Da coleta ao uso: como o time transformou dados, regras e seguranca em experiencias mais simples para o usuario.

As tres historias recomendadas sao:

1. Ronaldo: Dashboard analitico e relatorio de encerramento da campanha de Sanidade dos Citros (#12900).
2. Bruno: Login sem senha com Magic Link e Email OTP (#12732).
3. Thielson: Exportacao e importacao em Excel da estrutura completa do Formulario Dinamico (#12737).

Regra de fala para todos: `problema -> decisao tecnica -> resultado percebido -> demo`.

O dashboard de Citros deve ser a ancora visual da edicao. A mensagem nao e que os dados
nao existiam: eles ja estavam disponiveis em relatorios e dashboards dinamicos. O salto
foi deixar de entrega-los de forma generica e construir uma leitura especifica do dominio,
transformando dados em informacao rica e acionavel. Essa abordagem pode ser ampliada para
outros projetos.

Regra de ritmo: cada pessoa tera apenas um slide de spotlight. Problema, decisao tecnica,
resultado e demo devem conviver no mesmo slide e na mesma historia.

## Por que estes temas

### Ronaldo - escolha principal

O Dashboard Citros combina valor operacional muito visivel com profundidade tecnica:

- 7 secoes de leitura da campanha;
- mapa interativo com Leaflet;
- 14 indicadores sanitarios;
- matriz risco x manejo;
- ranking de prioridades;
- filtros e agregacao regional/municipal;
- exportacoes CSV/XLSX e relatorio final em PDF;
- cache de 5 minutos;
- tratamento de imagens remotas e geracao de PDFs grandes com Puppeteer/Sharp;
- regras configuraveis, permissoes, auditoria e migrations.

Ele permite contar a historia completa: dados coletados em campo deixam de ser apenas
respostas armazenadas e passam a apoiar fiscalizacao, priorizacao e encerramento da campanha.

### Bruno - recomendacao

Tema: Login sem senha via Magic Link e Email OTP, com prazo de expiracao.

E a melhor opcao concluida porque tem problema claro, risco tecnico real e uma jornada
visual demonstravel. Para nao repetir o spotlight de Better Auth/MFA da edicao #05, a
historia deve ficar centrada na experiencia passwordless e no hardening necessario para
torna-la segura:

- Magic Link e OTP como alternativas a senha;
- expiracao, rate limit por IP/e-mail e validacao de User-Agent;
- persistencia do fluxo apos refresh;
- sessoes pareadas entre aplicacoes;
- sincronizacao de revogacao entre Redis e banco relacional;
- CSRF, contexto do ator e logout consistente;
- impacto visivel: menos atrito para entrar sem enfraquecer a seguranca.

Alternativa para evitar completamente a continuidade do tema de autenticacao:
`EditalFit - ingestao de documentos e oportunidades`. E um assunto novo e interessante,
com filas, blobs, retentativas, canonicalizacao, Azure Storage e Testcontainers. Contudo,
nos standups ele ainda aparece em progresso e sem resultado de negocio ou demo final tao
clara quanto o login sem senha. Deve entrar apenas se Bruno ja tiver um fluxo demonstravel.

### Thielson - recomendacao

Tema: Exportacao e importacao em Excel da estrutura completa do Formulario Dinamico.

E a melhor historia por transformar uma estrutura complexa e muito relacional em um
artefato portavel e compreensivel:

- selecao de certificadora, formulario e safra;
- arquivo XLSX com abas de estrutura, formulario, agrupadores, perguntas, listas,
  itens e dominios;
- codigos estaveis para preservar vinculos;
- remapeamento entre certificadoras;
- base no CMS, contratos compartilhados e endpoints dedicados;
- impacto esperado: replicar estruturas sem recadastro manual e com menos erro.

Como o card ainda aparece em progresso, Thielson deve apresentar a parte efetivamente
funcional: exportacao real do XLSX e estrutura das abas. A importacao pode ser mostrada
como proximo passo, sem ser anunciada como concluida.

Alternativa concluida: `Comunicacao com tecnicos` (#12047). Tem boa historia ponta a
ponta (envio manual/agendado, selecao de destinatarios, alertas, fila e auditoria), mas
exige mais telas para explicar e compete visualmente com o dashboard de Citros.

## Timebox sugerido - 30 minutos

| Bloco | Tempo | Dono | Objetivo |
|---|---:|---|---|
| Capa e tese da edicao | 1 min | Ronaldo | Apresentar a narrativa, sem ler backlog |
| Leitura do periodo | 3 min | Ronaldo | Numeros e linhas de trabalho |
| Dashboard Citros | 7 min | Ronaldo | Um slide + demonstracao guiada |
| Login sem senha | 6 min | Bruno | Um slide + jornada do usuario |
| Formulario portavel em Excel | 6 min | Thielson | Um slide + demo do arquivo |
| Engineering Wins | 3 min | Ronaldo | Reconhecer entregas e colaboracoes |
| Roadmap e fechamento | 3 min | Ronaldo/time | Proximos passos e sintese |

Total: 30 min.

Se o tempo apertar, preservar problema, impacto e demo. Cortar detalhes de migration,
nomes de entidades e implementacoes auxiliares.

## Estrutura inicial dos slides

### 1. `README.md` - capa

Titulo sugerido:

> Tech Spotlight Web #06 - Da coleta ao uso

Subtitulo:

> Dados que viram decisao, estruturas que ganham portabilidade e acesso com menos atrito.

Fala de abertura sugerida:

"Nesta edicao, as tres historias tem algo em comum: pegar uma complexidade que antes
ficava espalhada em dados, configuracoes ou etapas de acesso e transformar isso em uma
experiencia mais util para quem opera o sistema. Vamos mostrar uma campanha inteira em
um painel acionavel, uma entrada sem senha e um caminho para transportar formularios
complexos por Excel."

### 2. `period-summary.json` - leitura do periodo

Nao usar a quantidade de cards como protagonista. Agrupar o trabalho em quatro linhas:

- inteligencia operacional: Citros, evolucao Agroplus e rankings;
- plataforma configuravel: formulario dinamico, importacao e exportacao;
- identidade e seguranca: API Keys, sessoes, passwordless e banimento;
- confiabilidade: procedures, migrations, relatorios e correcoes de autenticacao.

Metricas devem ser recalculadas depois dos standups de 23 e 24/07. Contar somente cards
numerados unicos efetivamente concluidos; nao contar a repeticao do mesmo card em varios dias.

### 3. `citros-dashboard.component.ts` - Spotlight Ronaldo

Mensagem principal:

> Uma campanha que antes exigia cruzar respostas e relatorios agora pode ser lida,
> priorizada e encerrada em uma unica experiencia.

#### Problema

- dados de campo dispersos e dificeis de transformar em decisao;
- necessidade de enxergar cobertura geografica, risco, manejo e pendencias;
- encerramento da campanha exigia consolidacao e evidencias em relatorio.

#### Decisao tecnica

- componente Angular dividido em 7 secoes;
- API agrega 14 indicadores e alimenta mapa, matriz e rankings;
- regras de fiscalizacao configuraveis e auditaveis;
- cache de 5 minutos para reduzir custo sem perder atualidade operacional;
- relatorio PDF dinamico com Handlebars/Puppeteer;
- Sharp, timeout e limite de tamanho para imagens remotas;
- exportacoes CSV/XLSX para analise complementar.

#### Resultado percebido

- visao territorial da campanha;
- identificacao rapida de municipios e propriedades prioritarias;
- acompanhamento de fundiario, sanitario, conformidade e qualidade da coleta;
- relatorio final e dados exportaveis a partir do mesmo contexto.

#### Demo guiada - 5 minutos

Evitar rolar a pagina inteira sem narrativa. Seguir este percurso:

1. filtros e cards de cobertura da campanha;
2. mapa, agregacao regional/municipal e pontos de fiscalizacao;
3. matriz risco x manejo e explicacao dos quadrantes;
4. painel sanitario e qualidade da coleta;
5. ranking de prioridade e acesso ao detalhe;
6. exportacao/relatorio de encerramento.

Usar a imagem panoramica como abertura ou fallback, mas na apresentacao recortar em
3 ou 4 enquadramentos para manter os textos legiveis.

Frase de fechamento:

"O principal resultado nao e ter mais um dashboard. E conectar cobertura, risco,
qualidade e fiscalizacao para indicar onde a operacao precisa agir."

### 4. `passwordless-auth.flow.ts` - Spotlight Bruno (slide unico)

Mensagem principal:

> Remover a senha nao significa remover controles; significa deslocar a seguranca
> para um fluxo mais inteligente e menos friccional.

#### Problema

- senha adiciona atrito e recuperacao de acesso;
- o login acontece entre aplicacoes e precisa sobreviver a refresh e troca de contexto;
- revogacao e estado da sessao precisam permanecer consistentes.

#### Decisao tecnica

- Magic Link e Email OTP com expiracao e rate limit;
- sessao pareada e rastreamento de plataforma;
- Redis como storage secundario para sincronizar revogacoes;
- validacoes de User-Agent, CSRF e contexto do ator;
- hardening de MFA, logout e credenciais legadas.

#### Resultado percebido

- entrada com menos etapas e sem memorizar senha;
- retomada segura do fluxo apos refresh;
- controle administrativo e revogacao coerentes.

#### Demo sugerida

1. solicitar link ou OTP;
2. mostrar recebimento e expiracao;
3. concluir login;
4. abrir painel de sessoes e revogar uma sessao.

### 5. `formulario-dinamico.xlsx` - Spotlight Thielson (slide unico)

Mensagem principal:

> Um formulario dinamico nao e apenas uma lista de perguntas; e uma arvore de vinculos
> que precisa continuar integra quando sai de um ambiente e entra em outro.

#### Problema

- replicar formulario entre certificadoras ou ambientes exige muito recadastro;
- IDs de banco nao sao portaveis;
- agrupadores, perguntas, listas, itens e dominios precisam manter suas relacoes.

#### Decisao tecnica

- workbook com abas especializadas;
- codigos de negocio para reconstruir vinculos;
- contratos compartilhados entre CMS e API;
- exportacao contextual por certificadora, formulario e safra;
- preparacao do remapeamento para a etapa de importacao.

#### Resultado percebido

- estrutura exportada em formato auditavel e familiar;
- base para replicacao com menos trabalho manual;
- menor risco de perder relacionamento entre elementos.

#### Demo sugerida

1. selecionar certificadora, formulario e safra;
2. gerar o XLSX;
3. abrir as abas e seguir um mesmo codigo entre estrutura, agrupador e pergunta;
4. deixar claro o que ja esta pronto e o que pertence a etapa de importacao.

### 6. `engineering-wins.md`

Sugestoes:

- Produto: campanha de Sanidade dos Citros ganhou leitura operacional e relatorio final.
- Plataforma: Formulario Dinamico avancou em relatorio, bloco repetivel e portabilidade.
- Seguranca: autenticacao evoluiu em API Keys, passwordless, sessoes e banimento.
- Colaboracao: destacar testes conjuntos e resolucao dos conflitos/migrations no fluxo de login.

Escolher tres no deck final; manter os demais como apoio de fala.

### 7. `roadmap.todo`

Roadmap inicial, sujeito aos standups finais:

- [ ] Onboarding do Agronomo: landing page, autocadastro e inicio autonomo no Agrotrace;
- [ ] concluir importacao da estrutura do Formulario Dinamico em Excel;
- [ ] ampliar para outros projetos o padrao de informacao rica criado no Citros;
- [ ] consolidar a jornada passwordless e administracao de usuarios;
- [ ] evoluir ingestao e analise de documentos do EditalFit.

No slide, mostrar somente tres prioridades: Onboarding do Agronomo, importacao do
Formulario Dinamico e ampliacao do padrao de informacao rica do Citros.

### 8. `exit.ts` - fechamento

Fala sugerida:

"A sintese desta edicao e que a engenharia aproximou a complexidade do resultado:
os dados de uma campanha viraram decisao, o acesso ficou mais simples sem perder
seguranca e uma estrutura complexa de formulario comecou a ganhar portabilidade."

## Plano de evidencias e assets

Criar as pastas:

- `edition-06/assets/ronaldo-citros/`
- `edition-06/assets/bruno-passwordless/`
- `edition-06/assets/thielson-formulario-excel/`

Ronaldo:

- panoramica completa do dashboard;
- mapa e agregacao regional;
- matriz risco x manejo;
- painel sanitario/qualidade;
- ranking de prioridades;
- relatorio PDF ou tela de exportacao.

Bruno:

- solicitacao de Magic Link/OTP;
- confirmacao de envio;
- callback/login concluido;
- painel de sessoes e revogacao.

Thielson:

- modal de exportacao;
- download concluido;
- workbook com abas;
- exemplo visual dos codigos e vinculos.

## Transicoes sugeridas

Da leitura para Ronaldo:

"A primeira historia mostra onde essas linhas se encontram: dados, regras e relatorio
entregues como uma experiencia operacional unica."

De Ronaldo para Bruno:

"Depois de facilitar a tomada de decisao dentro do produto, o Bruno mostra como tambem
reduzimos o atrito para chegar ate ele, sem abrir mao dos controles de seguranca."

De Bruno para Thielson:

"E se a autenticacao ficou mais portavel entre contextos, a proxima historia trata de
outra portabilidade: levar a estrutura de um formulario complexo entre ambientes."

Para o roadmap:

"As tres historias nao terminam aqui: elas abrem o proximo ciclo de estabilizacao,
importacao e evolucao das novas jornadas."

## Checklist de alinhamento com o time

- [ ] Bruno confirma passwordless como tema ou troca por EditalFit se houver demo completa.
- [ ] Thielson confirma o estado real da exportacao e da importacao.
- [ ] Ronaldo separa a panoramica do Citros em recortes legiveis.
- [ ] Cada apresentador prepara uma demo de no maximo 4 passos.
- [ ] Cada demo tem screenshots de fallback.
- [ ] Atualizar standups de 23 e 24/07 e recalcular metricas.
- [ ] Definir somente tres itens de roadmap.
- [ ] Ensaiar o deck completo em 30 minutos.

## O que evitar

- ler a lista de cards;
- apresentar o dashboard rolando do topo ao fim sem uma pergunta orientadora;
- repetir a explicacao geral de Better Auth da edicao anterior;
- anunciar importacao do formulario como concluida se apenas a exportacao estiver pronta;
- usar detalhes de migration, entidade ou procedure sem conecta-los ao problema;
- depender exclusivamente de demo ao vivo.
