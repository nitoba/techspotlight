# Guia oral — Better Auth / Auth V2 / MFA

## Objetivo da fala

Explicar que a entrega moderniza a autenticação do AgroTrace com Better Auth, melhora segurança e organização interna, mas preserva compatibilidade com os fluxos existentes, principalmente Mobile.

Mensagem principal:

> A autenticação deixou de ser só login e senha. Ela passou a ter uma base mais moderna para sessão, MFA, reset de senha e evolução futura, sem quebrar Web, CMS ou Mobile.

---

## Roteiro completo — 6 minutos

### 1. Abertura — contexto

"Essa entrega trata de uma das áreas mais sensíveis do sistema: autenticação. A gente precisava modernizar login, sessão, MFA e reset de senha, mas sem fazer uma quebra grande nos clientes que já existem. Então o desafio não era só colocar uma biblioteca nova. Era fazer isso preservando os contratos que Web, CMS e Mobile já usam hoje."

### 2. Problema anterior

"Antes, boa parte da autenticação estava concentrada em poucos pontos grandes do backend. Login, MFA, cookies, refresh token, reset de senha e regras legadas acabavam misturados. Isso tornava qualquer mudança mais arriscada, porque mexer em autenticação pode impactar várias plataformas ao mesmo tempo."

"Além disso, o JWT legado era a base principal para praticamente todos os fluxos, e os componentes de MFA estavam duplicados entre Web e CMS. Então havia um custo alto de manutenção e maior risco de comportamento diferente entre plataformas."

### 3. Decisão técnica

"A decisão foi trazer o Better Auth como base moderna da autenticação. Mas isso foi feito de forma incremental: primeiro como Auth V2 isolado e depois consolidado dentro do módulo principal de autenticação."

"Para não quebrar o que já existia, foram criadas bridges entre o fluxo novo e os contratos antigos. Isso permite que Web e CMS evoluam para sessão Better Auth por cookie, enquanto o Mobile continua recebendo tokens no JSON, como já esperava."

### 4. Token parcial e MFA

"O ponto técnico mais importante aqui é o token parcial. Ele separa dois momentos: primeiro, o usuário informou credenciais válidas; segundo, ele realmente concluiu a verificação de MFA."

"Se o usuário precisa de MFA, o sistema não entrega acesso completo logo após validar a senha. Ele emite apenas um token parcial, com o estado mínimo necessário para concluir o desafio. Só depois da validação do MFA o fluxo libera o acesso completo."

"Esse fluxo cobre MFA por email e TOTP, incluindo Google Authenticator. Também foram adicionados QR Code, backup codes e melhorias na experiência dos componentes de MFA."

### 5. Sessão, legado e compatibilidade

"Para Web e CMS, a base nova permite trabalhar com sessão Better Auth persistida e cookies configurados por ambiente, incluindo domínio e trusted origins. Isso melhora o controle de sessão, logout e reset de senha."

"Ao mesmo tempo, o Mobile foi preservado. Ele continua usando os mesmos endpoints principais, como login, MFA e get-full-access, e continua recebendo accessToken e refreshToken no body da resposta. Ou seja, o app não precisa passar a depender de cookie jar agora."

### 6. Ganhos

"O ganho principal é segurança e organização. A gente evita liberar acesso completo antes do MFA, centraliza melhor a lógica, reduz duplicação entre Web e CMS e prepara o módulo de autenticação para evoluções futuras."

"Também houve uma reorganização interna importante: services, guards, decorators, extractors, controllers e infraestrutura Better Auth ficaram mais separados por responsabilidade. Isso torna o fluxo mais fácil de testar, debugar e alterar."

### 7. Fechamento

"Então, resumindo: essa entrega moderniza a autenticação com Better Auth, melhora MFA e sessão, preserva JWT legado onde ainda é necessário e mantém Mobile compatível. O ponto mais importante é que a migração não foi um big bang: ela cria uma base nova sem quebrar os contratos atuais."

---

## Cola rápida para apresentar

- Área sensível: autenticação impacta Web, CMS e Mobile.
- Objetivo: modernizar login, sessão, MFA e reset sem quebrar contratos existentes.
- Antes: lógica concentrada, JWT legado como base principal, MFA duplicado e fluxo difícil de alterar.
- Decisão: Better Auth como base moderna, primeiro isolado como Auth V2 e depois consolidado no módulo principal.
- Bridges mantêm compatibilidade com endpoints e respostas antigas.
- Web/CMS evoluem para sessão Better Auth por cookie.
- Mobile segue compatível com tokens no JSON e sem dependência de cookie jar.
- Token parcial separa senha válida de acesso completo.
- MFA por email e TOTP/Google Authenticator conclui o desafio antes do acesso final.
- Ganhos: mais segurança, menos duplicação, melhor organização e base pronta para evolução.

---

## Frases boas para transição

- "O ponto aqui não é só trocar a tecnologia, é reduzir risco em uma área crítica."
- "A senha válida não significa acesso completo; ainda existe a etapa de MFA."
- "Web e CMS avançam para uma sessão mais moderna, mas Mobile continua no contrato atual."
- "A bridge foi importante porque permitiu evoluir sem fazer uma quebra pública."
- "Essa refatoração prepara a autenticação para evoluir com menos acoplamento."

---

## Pontos para não esquecer

- Citar explicitamente que Mobile não foi quebrado.
- Explicar que Better Auth é a base moderna, mas JWT legado ainda existe para compatibilidade.
- Evitar dizer que tudo virou cookie: isso vale principalmente para Web/CMS.
- Evitar tratar Google e TOTP como coisas totalmente separadas; Google Authenticator usa TOTP.
- Reforçar que token parcial tem acesso limitado e existe para concluir MFA.

---

## Fechamento curto

"A entrega deixa a autenticação mais segura e preparada para evolução. Web e CMS ganham uma base moderna com Better Auth e sessão por cookie, enquanto o Mobile continua compatível com o fluxo atual de tokens. O token parcial é o mecanismo que garante que o usuário só receba acesso completo depois de concluir o MFA."
