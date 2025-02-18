import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { cn } from '@/lib/utils';

const Logo = ({className, size}:{className?:string, size?:number}) => {
  return (
    <Link href="/" className={cn('flex items-center justify-center gap-2 text-4xl',className)}>
            <Image
              src="/icons/logo.svg"
              width={size || 52}
              height={size || 52}
              alt="frank-meet logo"
              className="max-sm:size-10"
            />
            <p className="font-extralight leading-5 text-white max-sm:hidden">
              Frank Meet
            </p>
    </Link>
  )
}

export default Logo