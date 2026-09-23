import { buildOgImage, OG_SIZE } from "@/lib/content/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Contact HoopStruct";

export default function Image() {
  return buildOgImage("Contact", "Talk to a real person, not a form that goes nowhere.");
}
