const releaseState = document.querySelector("[data-release-state]");
const downloadLink = document.querySelector("[data-download-link]");
const latestReleaseUrl = "https://github.com/Hug00x/PaperGraph/releases/latest";

async function loadLatestRelease() {
  try {
    const response = await fetch("https://api.github.com/repos/Hug00x/PaperGraph/releases/latest", {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error("release unavailable");
    }

    const release = await response.json();
    const installer = Array.isArray(release.assets)
      ? release.assets.find((asset) => /\.exe$/i.test(asset.name))
      : null;

    if (installer?.browser_download_url) {
      downloadLink.href = installer.browser_download_url;
      downloadLink.textContent = `Download ${release.tag_name ?? "PaperGraph"}`;
      releaseState.textContent = `Última versão: ${release.tag_name ?? "disponível"}`;
      return;
    }

    downloadLink.href = release.html_url || latestReleaseUrl;
    releaseState.textContent = "A última release ainda não tem instalador Windows.";
  } catch {
    downloadLink.href = latestReleaseUrl;
    releaseState.textContent = "Quando a primeira release estiver pronta, o botão aponta para o instalador.";
  }
}

void loadLatestRelease();
