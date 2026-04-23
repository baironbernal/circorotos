"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
}

const FALLBACK = "/placeholder.jpg"

export function ProductImage({ src, alt, fill, className, sizes }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes ?? "(max-width: 768px) 50vw, 300px"}
      onError={() => setImgSrc(FALLBACK)}
    />
  )
}
