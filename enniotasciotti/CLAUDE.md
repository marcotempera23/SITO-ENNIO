@AGENTS.md

# Note di progetto (stile HLP)

- Lo stile, la scena 3D di particelle e le animazioni GSAP sono ripresi dal sito dello Human Longevity Program (progetto separato in `~/Desktop/human-longevity-program`, Vite). I due siti sono legati solo da link: qui `HLP_URL` in `lib/links.ts`.
- Il sito è incentrato sul Prof. Tasciotti e NON deve copiare l'impostazione dell'HLP (niente Misurare/Capire/Integrare/Intervenire). Forme della scena: 0 cellula, 1 gemello digitale, 2 Multistage Vector (disco poroso a nido d'ape che rilascia nanoparticelle), 3 scaffold di fibre a nodo, 4 globo con Pisa/Houston/Pechino/Roma. Home: apertura con nome e ritratto ad arco, citazione che emerge dalla sfocatura, percorso orizzontale fissato sul globo (`.hx-journey`), schede di ricerca che si impilano (`.stack-card`, su telefono scorrono), portfolio a indice.
- Non indicare il numero di brevetti: scrivere "svariati brevetti".
- `components/hlp/experience.tsx`: schermata d'ingresso, barra di lettura, scena (`components/hlp/scene.ts`, Three.js r160) e animazioni. Le pagine le attivano con attributi (`data-scene`, `data-stage-fade`, `data-reveal`, `data-scrub`, `data-count`, `.hx-step`). Con `?test` nell'URL GSAP non rallenta (screenshot headless).
- `styles/hlp.css`: stile in `@layer components` (le classi Tailwind delle pagine interne prevalgono). Variabili `--serif`/`--sans` definite su `.site`, perché i font di next/font esistono solo lì. Non chiamare `--muted` una variabile: la usa shadcn.
- Solo tema scuro (`data-theme="dark"` su `<html>`). Testi nuovi della home nel namespace `hx` di `messages/it.json` e `messages/en.json`.
- Controllare sempre su telefono a 390 px.
