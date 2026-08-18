import { generateQrSvg } from "@/lib/qr";

export async function DownloadQr({
  url,
  caption,
}: {
  url: string;
  caption: string;
}) {
  const svg = await generateQrSvg(url);

  return (
    <div className="flex items-center gap-4">
      <div
        className="h-20 w-20 shrink-0 rounded-md bg-white p-1.5 [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="max-w-[10rem] text-xs leading-relaxed text-foreground-muted">
        {caption}
      </p>
    </div>
  );
}
