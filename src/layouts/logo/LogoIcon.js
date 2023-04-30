import React from "react";
import Link from "next/link";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image
        className="ml-2"
        src="/logo.png"
        width={150}
        height={80}
        alt="logo"
      />
    </Link>
  );
};

export default LogoIcon;
