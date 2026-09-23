import { buildOgImage, OG_SIZE } from "@/lib/content/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "HoopStruct Product — advanced stats, insights, and charts";

export default function Image() {
  return buildOgImage(
    "Product",
    "Everything HoopStruct computes — and why nobody else computes it this deeply."
  );
}
