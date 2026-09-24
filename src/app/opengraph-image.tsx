import { buildOgImage, OG_SIZE } from "@/lib/content/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "HoopStruct: basketball analytics nobody else provides";

export default function Image() {
  return buildOgImage(
    "Basketball analytics nobody else provides",
    "We analyze basketball like no one else does."
  );
}
