type TechStackIconProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

/** Small remote tech logos — native img avoids next/image 400s and optimizer overhead. */
export default function TechStackIcon({
  src,
  alt,
  size = 24,
  className = "object-contain",
}: TechStackIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
