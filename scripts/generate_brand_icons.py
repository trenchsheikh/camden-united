#!/usr/bin/env python3
"""Build browser and mobile crest icons from the club's existing logo.

Never redraws or changes the club artwork; it only removes empty canvas
around it and scales the full visible crest for different favicon sizes.
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "cu-logo.png"
APP = ROOT / "src" / "app"


def content_bounds(image: Image.Image):
    alpha = image.getchannel("A")
    a_min, a_max = alpha.getextrema()
    if a_min < 250:
        return alpha.point(lambda v: 255 if v > 12 else 0).getbbox()

    # Only trim a solid-colour border when all four corners agree.
    rgb = image.convert("RGB")
    w, h = rgb.size
    corners = [rgb.getpixel(p) for p in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    same_background = all(max(abs(a - b) for a, b in zip(corners[0], px)) < 15 for px in corners[1:])
    if same_background:
        background = Image.new("RGB", rgb.size, corners[0])
        difference = ImageChops.difference(rgb, background)
        bbox = difference.convert("L").point(lambda v: 255 if v > 26 else 0).getbbox()
        if bbox:
            return bbox
    return image.getbbox()


def square_icon(art: Image.Image, size: int, inset: float = 0.04):
    result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    max_area = max(1, round(size * (1 - inset * 2)))
    layer = art.copy()
    layer.thumbnail((max_area, max_area), Image.Resampling.LANCZOS)
    x = (size - layer.width) // 2
    y = (size - layer.height) // 2
    result.alpha_composite(layer, (x, y))
    return result


def main():
    with Image.open(SOURCE) as original:
        source = ImageOps.exif_transpose(original).convert("RGBA")
    bounds = content_bounds(source)
    if not bounds:
        raise ValueError("Club crest image is blank")
    art = source.crop(bounds)
    if art.width < 20 or art.height < 20:
        raise ValueError("Detected crest bounds are too small")

    favicon = square_icon(art, 256, inset=0.025)
    favicon.save(APP / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    square_icon(art, 192).save(APP / "icon.png", format="PNG", optimize=True)
    square_icon(art, 180).save(APP / "apple-icon.png", format="PNG", optimize=True)
    print(f"Source: {source.size} / original visible crest bounds: {bounds}")
    print(f"Icon outputs: favicon.ico (16-256 px), icon.png (192 px), apple-icon.png (180 px)")


if __name__ == "__main__":
    main()
