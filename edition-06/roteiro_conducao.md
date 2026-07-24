# Tech Spotlight #06 — Roteiro de condução (Ronaldo)

Meta: **25 minutos de conteúdo + 5 de folga**. O relógio flutuante do deck ajuda:
verde = ok, **amarelo aos 25 min** = ir para o fechamento, **vermelho aos 30** = estourou.

Regra de ouro da edição: a abertura e o fechamento são "moldura" — se algo precisar
de tempo, ele sai deles, nunca das 3 apresentações.

---

## Mapa de tempo (checkpoints no relógio)

> Atualizado: o Thielson tem **2 slides** (Excel 5 min + ranking por protocolo 3 min).
> O buffer caiu de 5 para 3 min — disciplina de tempo ficou mais importante.

| Relógio | Bloco | Quem |
|---|---|---|
| 0:00 – 3:00 | Abertura (README + runtime-budget + period-summary) | Ronaldo |
| 3:00 – 10:00 | Spotlight Citros | Ronaldo |
| 10:00 – 16:00 | Spotlight Login sem senha | Bruno |
| 16:00 – 21:00 | Formulário em Excel (slide 1) | Thielson |
| 21:00 – 24:00 | Ranking por protocolo (slide 2) | Thielson |
| 24:00 – 27:00 | Wins + Roadmap + fechamento | Ronaldo (+ donos do roadmap) |
| 27:00 – 30:00 | Buffer: perguntas / demo que atrasou | — |

**Checkpoints para olhar o relógio (só nesses momentos):**
- Ao passar o slide para o Bruno: deve marcar **~10:00**
- Ao passar para o Thielson: **~16:00**
- Ao Thielson trocar para o slide de ranking: **~21:00**
- Ao abrir o slide de Wins: **~24:00**

Se um checkpoint estourar em mais de 1 min, a correção acontece no bloco seguinte
(ver "Plano de corte" no fim).

---

## 1. Abertura — 3 min

**Slide 1 · README.md (0:00 – 1:00)**
- Apertar **T** para iniciar o cronômetro ao projetar o primeiro slide.
- Fala: "Nesta edição, as três histórias têm algo em comum: pegar uma complexidade
  que antes ficava espalhada — em dados, configurações ou etapas de acesso — e
  transformar isso em uma experiência mais útil para quem opera o sistema."
- Não explicar a agenda em detalhe; o slide seguinte faz isso sozinho.

**Slide 2 · runtime-budget.ts (1:00 – 1:30)**
- 30 segundos, no máximo. Só apontar: "três histórias, uma por pessoa, um slide cada."
- É o contrato de tempo com a plateia — ajuda a segurar perguntas para o final:
  "perguntas ficam para o bufferzinho do fim."

**Slide 3 · period-summary.json (1:30 – 3:00)**
- Falar os números do quadro: **34 cards — 22 features, 12 fixes** (Ronaldo 14,
  Thielson 11, Bruno 9). *Um* clique demonstrativo no filtro de dev, no máximo —
  não navegar por todos.
- Ler as 4 linhas de trabalho como leitura do período, não como lista:
  inteligência operacional, plataforma configurável, identidade & segurança,
  confiabilidade.
- Transição: "A primeira história mostra onde essas linhas se encontram: dados,
  regras e relatório entregues como uma experiência operacional única."

## 2. Spotlight Ronaldo — Citros · 7 min (3:00 – 10:00)

**No slide (1 min):**
- Mensagem central: "Não são novos dados — é uma nova leitura. Os dados já existiam
  em relatórios; o salto foi parar de entregá-los de forma genérica."
- Apontar os números do slide (7 seções, 14 indicadores, cache 5 min) sem detalhar.

**Demo guiada (5 min)** — ao vivo, ou pela panorâmica com zoom (setas ↓/↑ rolam):
1. Filtros e cards de cobertura da campanha
2. Mapa + agregação regional/municipal + pontos de fiscalização
3. Matriz risco × manejo (explicar os quadrantes — é o "aha" da demo)
4. Painel sanitário e qualidade da coleta *(primeiro corte se atrasar)*
5. Ranking de prioridades e detalhe
6. Exportação / relatório de encerramento em PDF

**Fechamento (1 min):**
- "O principal resultado não é ter mais um dashboard. É conectar cobertura, risco,
  qualidade e fiscalização para indicar onde a operação precisa agir."
- Handoff: "Depois de facilitar a decisão dentro do produto, o Bruno mostra como
  reduzimos o atrito para chegar até ele — sem abrir mão dos controles de segurança."

## 3. Spotlight Bruno — Login sem senha · 6 min (10:00 – 16:00)

- Estrutura para o Bruno: 1 min no slide (fluxo REQUEST → VERIFY → PAIR → CONTROL),
  4 min de demo/telas, 1 min de fechamento.
- Demo: solicitar link/OTP → recebimento e expiração → login concluído →
  painel de sessões com revogação. Screenshots já estão no slide como fallback.
- Cuidado combinado: **não reexplicar Better Auth/MFA da edição #05** — a história
  é a experiência passwordless e o hardening (expiração, rate limit, sessões
  pareadas, revogação Redis+banco).
- Handoff (Ronaldo ou Bruno): "Se a autenticação ficou mais portável entre
  contextos, a próxima história trata de outra portabilidade: levar a estrutura
  de um formulário complexo entre ambientes."

## 4. Spotlight Thielson — 2 slides · 8 min (16:00 – 24:00)

**Slide 1 · Formulário em Excel (16:00 – 21:00, 5 min):**
- 1 min slide, 3 min demo, 1 min fechamento.
- Demo em 4 passos: selecionar certificadora/formulário/safra → gerar XLSX →
  abrir as abas → seguir um mesmo código entre estrutura, agrupador e pergunta.
- Ponto de honestidade (já está no slide): **exportação funcional; importação é
  o próximo passo** — não anunciar como concluída.

**Slide 2 · Ranking por protocolo (21:00 – 24:00, 3 min):**
- Sem demo ao vivo: slide + zoom no screenshot da tela de configuração.
- Mensagem: "a medalha deixou de ser global — a mesma certificadora pode operar
  protocolos com critérios, faixas e nomes de medalha diferentes."
- Um minuto no problema, um na solução (vínculo com protocolo atravessando tela,
  entidade, migrations e procedures), um no efeito para o cliente.
- **Este slide é a válvula de escape do tempo**: se chegar aqui depois de 22:00,
  Thielson faz a versão de 1 min (mensagem + screenshot) e segue.

## 5. Wins + Roadmap + fechamento — 3 min (24:00 – 27:00)

**Wins (1:30):** ~30 s por win, citando nomes/situações reais (ex.: testes
conjuntos do login sem senha e a resolução dos conflitos de merge/migrations).

**Roadmap (1:00):** cada dono fala **uma frase** sobre o seu item:
- Bruno → Onboarding do Agrônomo
- Thielson → concluir importação do Formulário Dinâmico
- Ronaldo → ampliar o padrão de informação rica do Citros
Linguagem de direção, não promessa: "queremos", "planejamos".

**exit.ts (0:30):** "A síntese desta edição: dados viraram decisão, o acesso ficou
mais simples e uma estrutura complexa começou a ganhar portabilidade." → perguntas.

---

## Plano de corte (se o relógio apertar)

Na ordem — cortar sempre narrativa, nunca a demo inteira:

1. Clique no filtro de stats do slide 3 (economiza ~30 s)
2. Slide de ranking do Thielson comprimido para 1 min (mensagem + screenshot)
3. Passo 4 da demo Citros (painel sanitário) — ir do mapa/matriz direto ao ranking
4. Detalhes técnicos de qualquer spotlight (migrations, entidades, procedures)
5. Wins encurtados para uma frase cada
6. Roadmap falado só por Ronaldo, sem passar a palavra

Nunca cortar: a matriz risco × manejo (Citros), a revogação de sessão (Bruno),
o rastreio do código entre abas do Excel (Thielson) — são os momentos "aha" de
cada história.

## O que ensaiar / conferir antes (checklist rápido)

- [ ] Dashboard Citros aberto em aba separada, com dados carregados (cache aquecido)
- [ ] Zoom da panorâmica testado no projetor (setas rolando, textos legíveis)
- [ ] Bruno com e-mail de Magic Link já recebido numa aba (não esperar SMTP ao vivo)
- [ ] Thielson com o XLSX já baixado e aberto (gerar ao vivo só se sobrar tempo)
- [x] Screenshots de fallback do Thielson (formulário dinâmico + ranking) — ok
- [ ] Tela cheia (tecla **F**), notificações do Windows desativadas
- [ ] Cronômetro zerado; iniciar com **T** no primeiro slide

## Perguntas durante a apresentação

Responder em uma frase e devolver: "ótimo ponto — guarda para o final que a gente
volta nele". O buffer de 5 min existe exatamente para isso.
