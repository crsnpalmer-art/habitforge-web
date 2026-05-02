import Image from "next/image";
import Link from "next/link";

export default function BrandMark({ dark = false, withWordmark = true, size = 44 }: { dark?: boolean; withWordmark?: boolean; size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="HabitForge"
        width={size}
        height={size}
        className="rounded-xl object-cover shadow-[0_12px_30px_rgba(23,23,23,0.14)]"
        priority
      />
      {withWordmark && (
        <span className={`text-sm font-medium tracking-[0.08em] ${dark ? "text-white/92" : "text-[#171717]"}`}>
          HabitForge
        </span>
      )}
    </Link>
  );
}
