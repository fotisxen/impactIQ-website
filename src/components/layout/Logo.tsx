import Image from "next/image";
import { SITE_NAME } from "@/lib/content/site";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-[22%] shadow-[0_0_0_1px_var(--border-strong)]"
      />
      <span className="text-lg font-bold tracking-tight text-foreground">{SITE_NAME}</span>
    </span>
  );
}
