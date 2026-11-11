# II Seminário de Enfrentamento às Organizações Criminosas

Site de divulgação do **II Seminário de Enfrentamento às Organizações Criminosas — Integração e ação contra o crime organizado**, realizado pelo MPSC, GAECO e CEAF (Centro de Estudos e Aperfeiçoamento Funcional).

- **Data:** 4 de dezembro de 2026, das 8h às 17h20
- **Local:** Auditório – Edifício Sede do MPSC — Rua Bocaiúva, n. 1792, Centro, Florianópolis/SC
- **Inscrições:** https://ead.mpsc.mp.br/course/view.php?id=1338
- **Dúvidas (WhatsApp – Gerência de Capacitação):** +55 48 3229-9394

Site estático (HTML/CSS/JS puro, sem build), pronto para o GitHub Pages.

## Estrutura

```
index.html                      página única
css/style.css                    estilos (paleta do cartaz: grafite + verde #84ff4b)
js/script.js                     menu mobile, abas, contagem regressiva, calendário e .ics
assets/img/hero.jpg              imagem do cartaz
assets/img/hex-bg.jpg            textura hexagonal do cartaz
assets/img/stripes.png           faixas verdes do cartaz
assets/img/qrcode-inscricao.png  QR code → link de inscrição
assets/img/logos/                MPSC, GAECO e CEAF (versões para fundo escuro)
```

## Funcionalidades

- Contagem regressiva (dias, horas, minutos, segundos) até 04/12/2026 às 8h (horário de Brasília) e calendário de dezembro com o dia do evento destacado.
- Botões "Google Agenda" e "Outlook / iCal (.ics)" para salvar o evento.
- Link e QR code de inscrição (com botão para baixar o QR code).
- Botão flutuante e seção de WhatsApp com mensagem pronta para a Gerência de Capacitação.

## Publicar no GitHub Pages

1. Crie um repositório e envie estes arquivos.
2. Em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
