# Image Optimization Guide

This project includes a simple image optimization script that converts images in `public/projects` into WebP and AVIF at multiple widths for responsive delivery.

## How it works
- The script scans `public/projects` for `.png`, `.jpg`, `.jpeg` files.
- For each image it generates resized versions at widths: `400`, `800`, `1200`.
- It outputs WebP and AVIF files to: `public/optimized/projects/` with names like `othello-400.webp` and `othello-400.avif`.

## Usage
1. Add your high-resolution originals into `public/projects/` (for example `public/projects/othello.png`).
2. Run the optimizer:

```bash
bun run optimize-images
# which runs: node scripts/optimize-images.cjs
```

3. The optimized files will be available under `public/optimized/projects/` and will be included in the next build.

## Integrating in components
- Project cards use a plain `<img>` with `loading="lazy"` by default (fallback if optimized files are not present).
- You can replace `<img>` with the `OptimizedImage` component for automatic `<picture>` support:

```tsx
import { OptimizedImage } from '../shared/components/OptimizedImage';

<OptimizedImage src="/projects/othello.png" alt="Othello" />
```

The `OptimizedImage` component will attempt to use `/optimized/projects/othello-<width>.<format>` sources (AVIF/WebP) if present — browsers will fall back to the `img` `src` if not.

## Notes & best practices
- Keep original images large and high-quality; the optimizer will create responsive versions.
- Use descriptive filenames and avoid spaces.
- Consider running `bun run optimize-images` as part of your build or CI pipeline when you add images.

## Troubleshooting
- If the script prints `Source directory ... does not exist`, ensure you have created `public/projects` and added images.
- If output images are missing, check filesystem permissions and available disk space.

