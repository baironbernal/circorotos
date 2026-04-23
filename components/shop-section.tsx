"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Eye } from "lucide-react"
import { products, getAllCategories } from "@/lib/products"
import { ProductImage } from "@/components/product-image"

const categories = getAllCategories()

export function ShopSection() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filtered = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.categories.includes(activeCategory))

  return (
    <section id="tienda" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none" />
      <div className="orb-purple w-[500px] h-[350px] top-1/2 -translate-y-1/2 -left-32 opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Header */}
        <div className="mb-12">
          <div className="label-badge mb-5">— Catálogo —</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
            Tienda <span className="text-gold-shimmer">Circense</span>
          </h2>
          <p className="font-sans text-white/40 text-[0.95rem] max-w-lg">
            Todo lo que necesitas para brillar en la pista. Envíos a toda Colombia.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-white/25 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans px-4 py-1.5 rounded-full text-[0.7rem] tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_rgba(245,200,66,0.4)]"
                  : "bg-white/[0.04] text-white/45 border border-white/[0.08] hover:border-primary/40 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — 3 columns, taller images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Link key={product.id} href={`/tienda/${product.slug}`} className="card-glass group overflow-hidden block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[rgba(10,3,24,0)] group-hover:bg-[rgba(10,3,24,0.5)] transition-all duration-350 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 font-sans text-[0.6rem] uppercase tracking-wider bg-[rgba(10,3,24,0.7)] backdrop-blur-sm text-white/50 px-2.5 py-1 rounded-full border border-white/[0.08]">
                  {product.category}
                </span>
              </div>

              <div className="p-5 border-t border-white/[0.06]">
                <h3 className="font-serif text-[0.92rem] text-white/90 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans font-bold text-primary text-sm">{product.priceFormatted}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tienda"
            className="btn-outline-gold px-8 py-3.5 rounded-full text-[0.72rem]"
          >
            Ver tienda completa
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 divider-gold" />
    </section>
  )
}
