# CDS Garage — Site + Agendamento

Site da **CDS Garage** — estética automotiva **com atendimento em domicílio**
("a CDS vai até a sua porta"), focado em gerar agendamentos. Inclui uma página
de agendamento dedicada (`/agendar`) com calendário, no estilo das plataformas
profissionais, finalizando no WhatsApp.

**Stack:** Vite + React + Tailwind CSS v4 + Framer Motion + date-fns.

## Rodar localmente
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera a pasta dist/
npm run preview   # testa a build em http://localhost:4317
```

## Páginas
- `index.html` → site principal (one-page).
- `agendar.html` → página de agendamento (4 etapas: serviço → data/hora → dados → confirmar).

## O que editar antes de publicar (tudo em `src/data.js`)
- `WHATSAPP` → seu número (55 + DDD + número, só dígitos).
- `CIDADE` → cidade/região atendida (texto + SEO local).
- `SERVICES` / `DURACOES` → serviços, preços e durações.
- `EXPEDIENTE` → horários de atendimento do calendário.
- `FAQS` → perguntas frequentes.

Outros: telefone/horário em `src/components/Contato.jsx`, sua história em
`Sobre.jsx`, e as **fotos** (troque as de `public/imagens/` pelas suas reais —
`antes.jpg`, `depois.jpg`, `galeria-1..6.jpg`).

## Deploy (Vercel)
Projeto já preparado para a Vercel: framework **Vite**, build `npm run build`,
saída `dist/`. Cada push na branch `main` dispara um novo deploy.

🤖 Feito com Claude Code.
