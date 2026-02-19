"use client";

import Link from "next/link";

export function OrderCardLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className="absolute inset-0 z-10" aria-label={label} />
  );
}
