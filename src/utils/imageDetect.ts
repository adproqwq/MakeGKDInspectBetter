/**
 * 通过二进制文件头识别 PNG / WebP
 */
export function detectImageMime(buffer: ArrayBuffer): 'image/png' | 'image/webp' | null {
  const u8 = new Uint8Array(buffer);
  if (u8.length < 12) return null;

  // PNG Magic Number: 89 50 4E 47
  if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4E && u8[3] === 0x47) {
    return 'image/png';
  }

  // WebP: RIFF....WEBP
  if (
    u8[0] === 0x52 && u8[1] === 0x49 && u8[2] === 0x46 && u8[3] === 0x46 &&
    u8[8] === 0x57 && u8[9] === 0x45 && u8[10] === 0x42 && u8[11] === 0x50
  ) {
    return 'image/webp';
  }

  return null;
}