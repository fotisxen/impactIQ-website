import QRCode from "qrcode";

export async function generateQrSvg(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    margin: 1,
    color: { dark: "#0b0d0f", light: "#ffffff" },
  });
}
