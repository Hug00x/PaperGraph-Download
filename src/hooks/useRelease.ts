import { useEffect, useState } from "react";
import product from "../product.json" with { type: "json" };
export const currentVersion = product.version;
export const installerFallbackUrl = `${product.repository}/releases/latest`;
type Release = { assets?: { name?: string; browser_download_url?: string }[] };
export function useRelease() {
  const [url, setUrl] = useState(installerFallbackUrl);
  useEffect(() => {
    const controller = new AbortController();
    async function resolve() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Hug00x/PaperGraph/releases/latest",
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );
        if (!response.ok) return;
        const release: Release = await response.json();
        const installer =
          Array.isArray(release.assets) &&
          release.assets.find((asset) => /^PaperGraph-Setup-[\d.]+\.exe$/i.test(asset.name ?? ""));
        const candidate = installer && installer.browser_download_url;
        if (
          typeof candidate === "string" &&
          candidate.startsWith(
            "https://github.com/Hug00x/PaperGraph/releases/download/",
          )
        )
          setUrl(candidate);
      } catch {
        /* Keep the releases page when no verified installer is available. */
      }
    }
    void resolve();
    return () => controller.abort();
  }, []);
  return url;
}
