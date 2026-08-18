import { buildOgImage, OG_SIZE } from "@/lib/content/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Impact IQ Product — advanced stats, insights, and charts";

export default function Image() {
  return buildOgImage(
    "Product",
    "Everything Impact IQ computes — and why nobody else computes it this deeply."
  );
}
