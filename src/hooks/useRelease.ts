import { useEffect, useState } from "react";
export const installerFallbackUrl =
  "https://github.com/Hug00x/PaperGraph/releases/download/v0.1.0/PaperGraph-Setup-0.1.0.exe";
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
          release.assets.find((asset) => /\.exe$/i.test(asset.name ?? ""));
        const candidate = installer && installer.browser_download_url;
        if (
          typeof candidate === "string" &&
          candidate.startsWith(
            "https://github.com/Hug00x/PaperGraph/releases/download/",
          )
        )
          setUrl(candidate);
      } catch {
        /* Keep the original installer when the API is unavailable. */
      }
    }
    void resolve();
    return () => controller.abort();
  }, []);
  return url;
}
