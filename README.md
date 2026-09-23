# PaperGraph Download

Página de download em React 19, TypeScript estrito, Vite, Tailwind CSS v4 e Anime.js v4.
Preserva os logótipos, a paleta azul-escuro/ciano, a stack tipográfica, a copy e o instalador da página original.

## Desenvolvimento

Node.js 22.12+ recomendado.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Abrir `/PaperGraph-Download/` no servidor indicado. Em PowerShell com scripts bloqueados, usar `npm.cmd`.

## Motion

- `src/animations/useMotion.ts`: timeline de entrada, hero → workflow, linha de progresso, sequência sticky e CTA final. Usa `onScroll({ sync: true })`: o scroll nativo controla diretamente a progressão e a reversão.
- `src/animations/animationConfig.ts`: durações, easing e stagger partilhados.
- `src/animations/pointer.ts`: um único loop de interpolação, ativo apenas até estabilizar, para parallax e CTAs magnéticos. A área clicável permanece fixa.
- TEX → PDF → MAP: o código dá lugar à página compilada, o documento reduz de escala e quatro nós surgem ligados por SVG. A sequência integra o showcase, evitando uma secção adicional redundante.
- Movimento reduzido desativa as timelines/parallax e apresenta o mapa final sem a longa zona sticky. A preferência é observada em tempo real.
- Não há estado React atualizado por scroll/pointer. Scopes, observadores, listeners e frames têm cleanup; touch desativa parallax e mobile encurta as sequências.

## Conteúdo e download

Componentes em `src/components/`; tokens e estilos em `src/styles/globals.css`.
Os assets originais continuam em `assets/`. Os antigos `styles.css` e `app.js` ficam como referência e não são carregados no build.

`src/hooks/useRelease.ts` procura o primeiro `.exe` da release pública mais recente em `Hug00x/PaperGraph`.
Todos os CTAs partilham o mesmo URL. Se a API falhar, não tiver instalador ou atingir o limite de pedidos, mantém-se o URL original:
`https://github.com/Hug00x/PaperGraph/releases/download/v0.1.0/PaperGraph-Setup-0.1.0.exe`.
O texto “Descarregar para Windows” permanece consistente. O HTML inclui uma alternativa de download sem JavaScript.

Não existiam screenshots da aplicação: o showcase é uma representação abstrata, identificada como “Representação do workflow”, com documento e referências ilustrativos. Pode ser substituído por capturas reais quando existirem.

## Verificação

```sh
npx playwright install chromium
npm run build
npm test
```

Os testes usam o build real e cobrem resolução/fallback do download, reversão e pausa do scroll, movimento reduzido, assets, teclado, âncoras e overflow nas larguras 375, 430, 768, 1024, 1440 e 1920 px.

## GitHub Pages

`vite.config.ts` define `base: '/PaperGraph-Download/'`, correspondente ao repositório existente.
O workflow `.github/workflows/deploy.yml` executa `npm ci`, lint e build e publica apenas `dist/`.
`public/404.html` e `.nojekyll` são incluídos na saída. A página usa âncoras nativas e não precisa de router.
Em Settings → Pages, a origem deve continuar a ser GitHub Actions. Fazer push para `main` aciona o deployment; a implementação local não publica automaticamente.
