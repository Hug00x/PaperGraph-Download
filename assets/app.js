const downloadLink = document.querySelector("[data-download-link]");
const installerFallbackUrl =
  "https://github.com/Hug00x/PaperGraph/releases/download/v0.1.0/PaperGraph-Setup-0.1.0.exe";

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
      downloadLink.textContent = `Descarregar ${release.tag_name ?? "PaperGraph"}`;
      return;
    }

    downloadLink.href = installerFallbackUrl;
  } catch {
    downloadLink.href = installerFallbackUrl;
  }
}

void loadLatestRelease();
