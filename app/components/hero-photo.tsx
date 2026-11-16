import { getImageProps } from "next/image";
import { CardContainer } from "./aceternity/3d-card";

const mobileMedia = "(width <= 520px)";
const desktopMedia = "(width > 520px)";
const common = { alt: "Awais faces a mountain ridge at sunset", sizes: "100vw", loading: "eager" } as const;

export function HeroPhoto() {
  const { props: desktop } = getImageProps({
    ...common,
    src: "/images/departure-horizon.webp",
    width: 2400,
    height: 1600,
  });
  const { props: mobile } = getImageProps({
    ...common,
    src: "/images/departure-horizon-mobile.webp",
    width: 1080,
    height: 1052,
  });

  return (
    <>
      <link rel="preload" as="image" media={mobileMedia} imageSrcSet={mobile.srcSet} imageSizes={mobile.sizes} fetchPriority="high" />
      <link rel="preload" as="image" media={desktopMedia} imageSrcSet={desktop.srcSet} imageSizes={desktop.sizes} fetchPriority="high" />
      <CardContainer className="hero-photo">
        <picture>
          <source media={mobileMedia} srcSet={mobile.srcSet} sizes={mobile.sizes} />
          <img {...desktop} alt={common.alt} />
        </picture>
      </CardContainer>
    </>
  );
}
