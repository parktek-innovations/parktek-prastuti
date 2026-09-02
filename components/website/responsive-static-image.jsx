/* eslint-disable @next/next/no-img-element -- pre-generated responsive sources support static export */

function derivativePath(src, width) {
  return src.replace(/\.[^.]+$/, `-${width}.webp`);
}

export function ResponsiveStaticImage({
  alt,
  className,
  height,
  pictureClassName,
  sizes,
  src,
  width,
  widths,
}) {
  const srcSet = widths.map((candidate) => `${derivativePath(src, candidate)} ${candidate}w`).join(", ");

  return (
    <picture className={pictureClassName}>
      <source sizes={sizes} srcSet={srcSet} type="image/webp" />
      <img
        alt={alt}
        className={className}
        decoding="async"
        height={height}
        loading="lazy"
        src={src}
        width={width}
      />
    </picture>
  );
}
