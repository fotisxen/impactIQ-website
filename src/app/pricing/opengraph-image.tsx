import { buildOgImage, OG_SIZE } from "@/lib/content/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Impact IQ Pricing";

export default function Image() {
  return buildOgImage("Pricing", "Pay for what actually costs us money.");
}
