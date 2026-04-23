"use client"

import Link from "next/link"
import { ArrowRight, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { products } from "@/lib/products"
import { ProductImage } from "@/components/product-image"
import { FadeIn, StaggerChildren, itemVariants } from "@/components/motion-section"

const featuredProducts = products.slice(0, 6)

export function ShopPreviewSection() {
  return (
    <section id="tienda-preview" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none" />
      <div className="orb-gold w-[500px] h-[350px] top-1/2 -translate-y-1/2 right-0 translate-x-1/3 opacity-55"
        style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <FadeIn>
            <div className="label-badge mb-5">— Equipamiento —</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              Tienda{" "}
              <span className="text-gold-shimmer">Circense</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 font-sans text-[0.78rem] tracking-wide text-primary hover:text-secondary transition-colors group"
            >
              Ver catálogo completo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Grid — 3 columns, taller images */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link href={`/tienda/${product.slug}`} className="card-glass group overflow-hidden block h-full">
                {/* Image — taller aspect */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay with view icon */}
                  <div className="absolute inset-0 bg-[rgba(10,3,24,0)] group-hover:bg-[rgba(10,3,24,0.5)] transition-all duration-350 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                      <Eye className="h-5 w-5" />
                    </div>
                  </div>
                  {/* Category tag */}
                  <span className="absolute top-3 left-3 font-sans text-[0.6rem] uppercase tracking-wider bg-[rgba(10,3,24,0.7)] backdrop-blur-sm text-white/50 px-2.5 py-1 rounded-full border border-white/[0.08]">
                    {product.category}
                  </span>
                  {/* Gold line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5 border-t border-white/[0.06]">
                  <h3 className="font-serif text-[0.92rem] text-white/90 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans font-bold text-primary text-sm">{product.priceFormatted}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeIn delay={0.1} className="mt-14 text-center">
          <Link
            href="/tienda"
            className="btn-outline-gold gap-3 px-10 py-4 rounded-full text-[0.78rem]"
          >
            Ver tienda completa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 inset-x-0 divider-gold" />
    </section>
  )
}
