"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Filter, Eye, Search, ArrowLeft } from "lucide-react"
import { Navbar }        from "@/components/navbar"
import { CartModal }     from "@/components/cart-modal"
import { Footer }        from "@/components/footer"
import { ProductImage }  from "@/components/product-image"
import { products, getAllCategories } from "@/lib/products"

const categories = getAllCategories()

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let list = activeCategory === "Todos"
      ? products
      : products.filter((p) => p.categories.includes(activeCategory))
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }
    return list
  }, [activeCategory, search])

  return (
    <>
      <Navbar />
      <CartModal />

      <main className="min-h-screen w-full">
        {/* Hero */}
        <section className="container relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-stars opacity-50 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[60%] glow-top-purple pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <Link href="/" className="inline-flex items-center gap-2 font-sans text-[0.72rem] tracking-widest uppercase text-white/30 hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-3.5 w-3.5" /> Volver al inicio
            </Link>
            
            <h1 className="font-serif text-5xl sm:text-6xl text-white mb-4">
              Tienda <span className="text-gold-shimmer">Circense</span>
            </h1>
            <p className="font-sans text-white/40 text-base max-w-lg">
              Equipamiento profesional para artistas. Calidad y tradición en cada pieza.
            </p>
          </div>

          <div className="absolute bottom-0 inset-x-0 divider-gold" />
        </section>

        {/* Shop */}
        <section className="py-14">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] font-sans text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <span className="font-sans text-[0.72rem] tracking-wide text-white/30 uppercase">
                {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
              </span>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-10 flex-wrap">
              <Filter className="h-3.5 w-3.5 text-white/25 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans px-4 py-1.5 rounded-full text-[0.68rem] tracking-wide uppercase transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_16px_rgba(245,200,66,0.4)]"
                      : "bg-white/[0.04] text-white/45 border border-white/[0.08] hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid — 3 columns, taller images, no cart buttons */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-white mb-2">Sin resultados</p>
                <p className="font-sans text-white/35 text-sm">Intenta otra búsqueda o categoría.</p>
              </div>
            ) : (
              <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span className="absolute top-3 left-3 font-sans text-[0.6rem] uppercase tracking-wider bg-[rgba(10,3,24,0.7)] backdrop-blur-sm text-white/45 px-2.5 py-1 rounded-full border border-white/[0.08]">
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
