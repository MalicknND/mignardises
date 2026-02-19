"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Image from "next/image";

export function BrandLogo() {
  const { theme } = useTheme();

  const [logo, setLogo] = useState("/images/logo_light.svg");

  useEffect(() => {
    setLogo(theme === 'dark' ? "/images/logo_light.svg" : "/images/logo_dark.svg");
  }, [theme]);

  return (
    <Image
      src={logo}
      alt="Brand Logo"
      width={110}
      height={40}
    />
  )
}