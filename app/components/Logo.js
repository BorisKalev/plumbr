'use client';

import Image from 'next/image';

export default function Logo({ size = 36, inverted = false }) {
  return (
    <Image
      src="/plumbr-logo-inv.png"
      alt="plumbr logo"
      width={size}
      height={size}
      className={inverted ? 'brightness-0 invert' : ''}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
}
