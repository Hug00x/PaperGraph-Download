# PaperGraph Download

Pagina estatica para GitHub Pages com o botao de download da app PaperGraph.

Quando existir uma release publica em `Hug00x/PaperGraph`, o botao tenta apontar
automaticamente para o primeiro asset `.exe` dessa release. Se ainda nao houver
instalador publicado, abre a pagina da ultima release.

## Deploy

1. Cria um repositorio novo no GitHub.
2. Faz push do conteudo desta pasta.
3. Em `Settings > Pages`, escolhe `GitHub Actions`.
4. O workflow `.github/workflows/deploy.yml` publica a pagina.
