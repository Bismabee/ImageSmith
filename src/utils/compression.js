// utils/imageCompress.js
export async function compressFile(file, settings = {}) {
  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('Invalid image file');
  }

  const { mode = 'percentage', quality = 80, targetSizeKB = 200, maxDimension = 2048 } = settings;

  // Clamp helper
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // Check WebP support (runtime)
  async function supportsWebP() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch {
      return false;
    }
  }

  const preferWebP = file.type === 'image/png';
  const webpOk = await supportsWebP();
  const outputType = preferWebP && webpOk ? 'image/webp' : file.type;

  // Create image bitmap (faster than new Image for big images)
  const blob = file;
  let imgBitmap;
  try {
    imgBitmap = await createImageBitmap(blob);
  } catch {
    // Fallback to Image if createImageBitmap not available
    try {
      imgBitmap = await new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = (e) => rej(new Error('Image fallback failed to load'));
        img.src = URL.createObjectURL(file);
      });
    } catch (err) {
      // Provide a richer error so the caller can show useful diagnostics
      const meta = `name=${file.name || 'unknown'} type=${file.type || 'unknown'} size=${file.size || 0}`;
      throw new Error(`Image decode failed (${meta}): ${err && err.message ? err.message : 'unknown error'}`);
    }
  }

  // Resize to maxDimension to avoid huge canvas
  const naturalWidth = imgBitmap.width || imgBitmap.naturalWidth;
  const naturalHeight = imgBitmap.height || imgBitmap.naturalHeight;
  let targetW = naturalWidth;
  let targetH = naturalHeight;

  const maxD = maxDimension;
  if (Math.max(naturalWidth, naturalHeight) > maxD) {
    if (naturalWidth >= naturalHeight) {
      targetW = maxD;
      targetH = Math.round((naturalHeight / naturalWidth) * maxD);
    } else {
      targetH = maxD;
      targetW = Math.round((naturalWidth / naturalHeight) * maxD);
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgBitmap, 0, 0, targetW, targetH);

  // Helper: convert canvas -> blob + dataUrl
  const canvasToBlob = (type, q) =>
    new Promise((res) => {
      // canvas.toBlob may not accept quality for some types — wrapped for safety
      try {
        canvas.toBlob((b) => res(b), type, typeof q === 'number' ? q : undefined);
      } catch (e) {
        res(null);
      }
    });

  const blobToDataUrl = (b) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(b);
    });

  // Mode: percentage (single-shot)
  if (mode === 'percentage') {
    const q = clamp(quality / 100, 0.01, 1);
    const outBlob = await canvasToBlob(outputType, q);
    if (!outBlob) throw new Error(`Failed to create output blob (type=${outputType})`);
    const dataUrl = await blobToDataUrl(outBlob);
    return {
      blob: outBlob,
      dataUrl,
      compressedSize: outBlob.size,
      width: targetW,
      height: targetH,
      type: outputType,
      quality: q
    };
  }

  // Mode: size (binary search for quality)
  if (mode === 'size') {
    const targetBytes = Math.max(0, Math.round(targetSizeKB * 1024));
    // Edge: if targetBytes >= current full-quality, just return high quality
    const testFull = await canvasToBlob(outputType, 0.95);
    if (testFull.size <= targetBytes) {
      const dataUrl = await blobToDataUrl(testFull);
      return {
        blob: testFull,
        dataUrl,
        compressedSize: testFull.size,
        width: targetW,
        height: targetH,
        type: outputType,
        quality: 0.95
      };
    }

    // Binary search over quality in [0.01, 0.95]
    let min = 0.01;
    let max = 0.95;
    let best = { blob: testFull, size: testFull.size, quality: 0.95 };
    let attempts = 0;
    const maxAttempts = 8;

    while (attempts < maxAttempts && min <= max) {
      const q = (min + max) / 2;
      const out = await canvasToBlob(outputType, q);
      if (!out) {
        // if we failed to produce a blob at this quality, bail with helpful message
        throw new Error(`Canvas toBlob returned null during binary search (type=${outputType}, q=${q})`);
      }
      const size = out.size;

      if (size <= targetBytes) {
        // valid, try increasing quality
        if (size > best.size || best.size > targetBytes) {
          best = { blob: out, size, quality: q };
        }
        min = q + 0.01;
      } else {
        // too big, reduce quality
        max = q - 0.01;
      }
      attempts++;
    }

    // If best is still > target or zero, fallback to smallest we found by scanning extremes
    // Ensure we have a best blob
    if (!best.blob) {
      const lowBlob = await canvasToBlob(outputType, 0.01);
      if (!lowBlob) throw new Error(`Failed to produce low-quality blob (type=${outputType})`);
      best = { blob: lowBlob, size: lowBlob.size, quality: 0.01 };
    }

    const dataUrl = await blobToDataUrl(best.blob);
    return {
      blob: best.blob,
      dataUrl,
      compressedSize: best.size,
      width: targetW,
      height: targetH,
      type: outputType,
      quality: best.quality
    };
  }

  throw new Error('Unknown compression mode');
}
