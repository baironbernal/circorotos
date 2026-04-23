"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

const galleryItems = [
  { src: "/images/products/472771220_4003680029904599_2467877947508113755_n.webp", type: "image", span: "col-span-2 row-span-2" },
  { src: "/images/products/Rola-Bola-4.webp",     type: "image", span: "" },
  { src: "/images/products/slider-1.webp",         type: "video", span: "" },
  { src: "/images/products/portada-web-1024x415.webp", type: "image", span: "col-span-2" },
  { src: "/images/products/Diabolo-Grande-Pro-2.webp", type: "image", span: "" },
]

export function GallerySection() {
  return (
    <section id="galeria" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none" />
      <div className="orb-purple w-[500px] h-[350px] bottom-0 left-1/4 opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="label-badge mb-5">— Galería —</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              Galería{" "}
              <span className="text-gold-shimmer">&amp; Videos</span>
            </h2>
          </div>
          <Link
            href="#"
            className="btn-outline-gold px-6 py-3 rounded-full text-[0.72rem] self-start sm:self-auto"
          >
            Ver todo
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`card-glass group relative overflow-hidden cursor-pointer ${item.span}`}
            >
              <Image
                src={item.src}
                alt={`Galería ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[rgba(10,3,24,0)] group-hover:bg-[rgba(10,3,24,0.55)] transition-all duration-400 flex items-center justify-center">
                {item.type === "video" ? (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_24px_rgba(245,200,66,0.6)]">
                    <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground ml-1" />
                  </div>
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 label-badge">
                    Ver foto
                  </div>
                )}
              </div>
              {/* Gold top line on hover */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/60 to-transparent transition-all duration-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 divider-gold" />
    </section>
  )
}
