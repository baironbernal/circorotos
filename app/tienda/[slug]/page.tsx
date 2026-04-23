import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Tag, Package } from "lucide-react"
import { Navbar }           from "@/components/navbar"
import { CartModal }        from "@/components/cart-modal"
import { Footer }           from "@/components/footer"
import { ProductImage }     from "@/components/product-image"
import { AddToCartButton }  from "@/components/add-to-cart-button"
import { products, getProductBySlug } from "@/lib/products"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Navbar />
      <CartModal />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="pt-28 pb-4 border-b border-white/[0.06]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="flex items-center gap-2 font-sans text-[0.72rem] text-white/30 tracking-wide">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/tienda" className="hover:text-primary transition-colors">Tienda</Link>
              <span>/</span>
              <span className="text-white/55 line-clamp-1">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product */}
        <section className="py-14">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 font-sans text-[0.72rem] tracking-widest uppercase text-white/30 hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver
            </Link>

            <div className="grid lg:grid-cols-2 gap-14 items-start">
              {/* Image */}
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary/20 via-transparent to-accent/15 blur-xl pointer-events-none" />
                <div className="relative aspect-square rounded-[24px] overflow-hidden border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-7">
                <span className="inline-flex items-center gap-2 label-badge">
                  <Tag className="h-3 w-3" />
                  {product.category}
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
                  {product.name}
                </h1>

                <div className="py-5 border-y border-white/[0.07]">
                  <p className="font-sans font-bold text-4xl text-primary">{product.priceFormatted}</p>
                  <p className="font-sans text-[0.72rem] text-white/30 mt-1.5 tracking-wide">Precio en COP · IVA incluido</p>
                </div>

                <div>
                  <p className="font-sans text-[0.65rem] uppercase tracking-widest text-white/30 mb-3">Descripción</p>
                  <p className="font-sans text-white/50 leading-relaxed text-[0.95rem]">
                    Producto de calidad profesional de la categoría{" "}
                    <span className="text-white/75 font-medium">{product.category}</span>.
                    Diseñado para artistas circenses que buscan rendimiento y durabilidad en cada
                    actuación. Ideal tanto para principiantes como para artistas con experiencia.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.categories
                    .filter((c) => c !== "Todos los productos" && c !== "Uncategorized")
                    .map((cat) => (
                      <span key={cat} className="font-sans text-[0.68rem] bg-white/[0.04] text-white/35 px-3 py-1 rounded-full border border-white/[0.07]">
                        {cat}
                      </span>
                    ))}
                </div>

                {/* Shipping */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                  <Package className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="font-sans text-sm">
                    <p className="font-medium text-white/75">Envío a toda Colombia</p>
                    <p className="text-white/35 text-xs mt-0.5">Tiempo estimado: 3–7 días hábiles</p>
                  </div>
                </div>

                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 border-t border-white/[0.06]">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
              <div className="label-badge mb-4">— También te puede gustar —</div>
              <h2 className="font-serif text-3xl text-white mb-10">
                Productos <span className="text-gold-shimmer">relacionados</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {related.map((p) => (
                  <Link key={p.id} href={`/tienda/${p.slug}`} className="card-glass group overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3.5 border-t border-white/[0.06]">
                      <h3 className="font-serif text-[0.82rem] text-white/85 line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="font-sans font-bold text-primary text-sm">{p.priceFormatted}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
