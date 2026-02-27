"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  href?: string;
  className?: string;
  variant?: "gold" | "blush" | "cream";
}

const variantMap = {
  gold: "bg-gold-100 text-gold-600 hover:bg-gold-200",
  blush: "bg-blush-100 text-blush-600 hover:bg-blush-200",
  cream: "bg-cream-200 text-mocha-500 hover:bg-cream-300",
};

export function Badge({
  label,
  href,
  className,
  variant = "cream",
}: BadgeProps) {
  const baseClasses = cn(
    "inline-block font-sans text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-full transition-colors",
    variantMap[variant],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </Link>
    );
  }

  return <span className={baseClasses}>{label}</span>;
}
