import Image from "next/image";

export function BrandLogo({ className }: { className: string }) {
  return <Image className={`brand-logo ${className}`} src="/images/awais-logo.png" alt="" width={414} height={267} unoptimized />;
}
