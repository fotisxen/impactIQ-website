// Fetches the latest Windows/macOS installer links straight from GitHub
// Releases on the app repo — no token needed (public unauthenticated
// requests are rate-limited but plenty for a once-an-hour cached fetch).
// Returns null fields until a real release has actually been tagged
// (`git tag v0.1.0 && git push origin v0.1.0` in the app repo, which the
// repo's own GitHub Actions workflow turns into a published release with
// these assets attached) — callers must render a "coming soon" state for
// that case rather than assume a link always exists.

const RELEASES_API_URL =
  "https://api.github.com/repos/fotisxen/ImpactIQ/releases/latest";

export type PlatformDownload = {
  url: string;
  sizeMb: number;
};

export type LatestRelease = {
  version: string;
  publishedAt: string;
  windows: PlatformDownload | null;
  mac: PlatformDownload | null;
};

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: GitHubReleaseAsset[];
}

function toDownload(asset: GitHubReleaseAsset | undefined): PlatformDownload | null {
  if (!asset) return null;
  return { url: asset.browser_download_url, sizeMb: Math.round(asset.size / 1024 / 1024) };
}

/** null when there's no published release yet (a fresh repo, or before the first `v*` tag is pushed). */
export async function getLatestRelease(): Promise<LatestRelease | null> {
  let res: Response;
  try {
    res = await fetch(RELEASES_API_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
  } catch {
    return null; // offline at build time, GitHub down, etc. — fail soft
  }
  if (!res.ok) return null; // 404 = no releases published yet

  const release = (await res.json()) as GitHubRelease;
  const windowsAsset = release.assets.find((a) => a.name.endsWith(".exe"));
  const macAsset = release.assets.find((a) => a.name.endsWith(".dmg"));

  return {
    version: release.tag_name,
    publishedAt: release.published_at,
    windows: toDownload(windowsAsset),
    mac: toDownload(macAsset),
  };
}
