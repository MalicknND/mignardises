"use client";

import Link from "next/link";

export function OrderRowLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="text-primary text-sm font-medium hover:underline"
    >
      Détails
    </Link>
  );
}
