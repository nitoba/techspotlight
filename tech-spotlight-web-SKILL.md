---
name: tech-spotlight-web
description: >
  Gera o roteiro, resumo e estrutura de slides para o Tech Spotlight da equipe Web.
  Use esta skill sempre que o usuário quiser preparar, resumir ou estruturar a
  apresentação do Tech Spotlight — mesmo que ele diga "me ajuda com a apresentação
  do time", "preciso montar o spotlight", "vamos preparar os slides do web team",
  "quero fazer o resumo das semanas para a apresentação" ou qualquer variação.
  A skill recebe os standups do período (Ronaldo, Bruno e Thielson), extrai os
  destaques técnicos reais, e gera um roteiro estruturado no formato da apresentação
  já estabelecida pelo time Web — com tema visual de IDE/editor de código.
---

# Skill: Tech Spotlight — Web Team

## Contexto

O **Tech Spotlight** é uma apresentação semanal rotativa entre os times de
engenharia (Web → DevOps → Mobile → repete). A **equipe Web** apresenta a cada
**3 semanas**, sempre nas **sextas-feiras**.

- Última apresentação Web: **13/03/2026** (período coberto: 23/02–13/03/2026)
- Próxima: **03/04/2026** | Depois: **24/04/2026**

**Membros do time Web:** Ronaldo (Head), Bruno, Thielson

---

## Estrutura da Apresentação (30 min)

| Bloco | Tempo | Conteúdo |
|-------|-------|----------|
| Abertura | 3 min | Head da engenharia — métricas rápidas do período |
| Spotlight do Time | 15 min | 2–3 destaques técnicos (problema → solução → resultado → demo) |
| Lightning Tech | 5 min | 1 pessoa, 1 dica técnica de no máx. 5 min |
| Engineering Wins | 5 min | 3 reconhecimentos/conquistas |
| Roadmap | 2 min | 3 prioridades da próxima sprint |

---

## Tema Visual: IDE / VS Code

O time adotou um tema de **editor de código** (estilo VS Code) para os slides.
Cada slide simula um arquivo aberto na IDE. As convenções são:

- **Slide de capa**: simula o `README.md` do projeto com `class TechSpotlight extends SprintReview`
- **Slide de stats**: simula um `stats.json` com os números do período
- **Slide de agenda**: simula um `agenda.ts` com array de `AgendaItem[]`
- **Slides de problema**: simulam arquivos `.md`, `.log` ou console de erros
- **Slides de solução**: simulam arquivos `.ts`, `.yaml` com código real
- **Slides de demo**: simulam terminal com `./run_demo.sh --module=X --live`
- **Lightning Tech**: simula arquivo `.sql`, `.ts` ou terminal com o aprendizado
- **Roadmap**: simula `roadmap.todo` com checkboxes
- **Encerramento**: simula `exit.ts` com `console.log("Obrigado pela presença!")`

---

## Como Usar Esta Skill

O usuário fornece os **standups do período** (pode colar diretamente). A skill deve:

1. **Analisar** as atividades de Ronaldo, Bruno e Thielson
2. **Identificar** os 2–3 melhores destaques técnicos (features complexas, soluções de problemas difíceis, arquiteturas novas)
3. **Montar o roteiro** completo da apresentação
4. **Sugerir** o Lightning Tech baseado em aprendizados do período
5. **Extrair** métricas reais (total de atividades, features, fixes, sistemas)
6. **Propor** Engineering Wins com base nos standups
7. **Definir** o Roadmap com base no que está em progresso

---

## Critérios para Escolha dos Spotlights

Priorizar destaques que tenham:
- **Problema claro** antes da solução
- **Resultado mensurável** (performance, tamanho de arquivo, tempo, etc.)
- **Possibilidade de demo** ao vivo ou screenshot
- **Aprendizado técnico** que o time todo pode absorver

Exemplos de bons spotlights (da última apresentação):
- Gestão Reprodutiva Bovina: migração de módulo Checkmilk → Agrotrace
- Dashboard SICAR + Painel do Gestor: dashboards com filtros e camadas de dados
- Lightning: MCP para geração de migrations + SQL com geometria

---

## Template de Roteiro Gerado

```
=== TECH SPOTLIGHT — WEB TEAM ===
Período: DD/MM – DD/MM/AAAA
Apresentadores: Ronaldo, Bruno, Thielson

--- ABERTURA (3 min) — Ronaldo ---
Métricas do período:
  • Total de atividades: XX
  • Features entregues: XX
  • Fixes: XX
  • Sistemas atendidos: [lista]
  • Stack: NestJS, TypeORM, Angular, PostgreSQL/MySQL

Frase de abertura sugerida:
  "[...]"

--- SPOTLIGHT 1 (5 min) — [Nome] ---
Tema: [Nome da feature/sistema]
Arquivo simulado: [nome-do-arquivo.ext]

  PROBLEMA (2 min):
  • [Contexto do problema]
  • [O que estava quebrando ou faltando]

  SOLUÇÃO (3 min):
  • [Abordagem técnica usada]
  • [Código/arquitetura relevante]
  • [Ferramentas/libs envolvidas]

  RESULTADO:
  • [Métrica ou impacto concreto]

  DEMO: [Sim/Não — o que mostrar]

--- SPOTLIGHT 2 (5 min) — [Nome] ---
[mesma estrutura acima]

--- SPOTLIGHT 3 (5 min) — [Nome] — OPCIONAL ---
[mesma estrutura acima]

--- LIGHTNING TECH (5 min) — [Nome] ---
Tema: [Título da dica]
Formato: [ferramenta / dica de performance / lib / comando]
Conteúdo:
  • [Ponto 1]
  • [Ponto 2]
  • [Ponto 3]

--- ENGINEERING WINS (5 min) — Ronaldo ---
🏆 [Conquista do time]
🙌 [Agradecimento / colaboração destacada]
🐛 [Bug difícil resolvido / problema superado]

--- ROADMAP (2 min) — Ronaldo ---
Prioridades da próxima sprint:
  [ ] [Prioridade 1] @[tag]
  [ ] [Prioridade 2] @[tag]
  [ ] [Prioridade 3] @[tag]
```

---

## Métricas — Como Calcular

Ao analisar os standups do período:
- **total_atividades**: contar todos os cards `#XXXXX` únicos mencionados como Done
- **features**: cards que criam algo novo (endpoint, módulo, tela, relatório)
- **fixes**: cards de correção de bugs/erros
- **sistemas_atendidos**: listar os sistemas que apareceram (Agrotrace, Checkmilk, etc.)

---

## Regras de Tom para o Roteiro

- **Técnico e direto** — sem frases genéricas como "trabalhamos muito"
- **Concreto** — sempre com números quando disponíveis
- **Foco no valor** — o que o usuário/sistema ganhou com a entrega
- **Evitar** lista de tickets Azure — contar história de engenharia, não status meeting
- **Demo sempre que possível** — é o ponto mais marcante da apresentação

---

## Exemplo de Output de Spotlight

### Spotlight: Relatório de Evidências — Compressão de Imagens
**Apresentador:** Ronaldo  
**Arquivo simulado:** `image-compress.service.ts`

**PROBLEMA:**
> Relatórios de evidências com imagens chegavam a 367 MB — inviável para download e envio.

**SOLUÇÃO:**
> Após o download de cada imagem do storage, o serviço agora comprime e redimensiona antes de embalar no relatório. Implementado em NestJS com processamento em pipeline.

**RESULTADO:**
> Relatório caiu de **367 MB → 7 MB** — redução de 98%.

**DEMO:** Screenshot do antes/depois no navegador.

---

## Dicas para o Apresentador

- Ensaiar a demo antes — conexão com banco, dados de teste, tela cheia
- Slides no tema VS Code: cada slide = 1 arquivo diferente na IDE
- Lightning Tech: máx. 5 slides, foco em 1 coisa só
- Engineering Wins: mencionar nomes reais, ser específico
- Roadmap: não é promessa, é direção — usar termos como "queremos", "planejamos"
