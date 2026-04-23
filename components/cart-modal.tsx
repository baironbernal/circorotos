"use client"

import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/products"
import { ProductImage } from "@/components/product-image"

export function CartModal() {
  const items      = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty  = useCartStore((s) => s.updateQuantity)
  const clearCart  = useCartStore((s) => s.clearCart)
  const isOpen     = useCartStore((s) => s.isCartOpen)
  const setOpen    = useCartStore((s) => s.setIsCartOpen)
  const total      = useCartStore((s) => s.totalPrice())

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[rgba(10,3,24,0.75)] backdrop-blur-md"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-[420px] flex flex-col bg-[#0E0625] border-l border-white/[0.07] shadow-[−12px_0_80px_rgba(0,0,0,0.7)]">
        {/* Gold top */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-serif text-lg text-white leading-none">Tu Carrito</p>
              <p className="font-sans text-[0.7rem] text-white/35 mt-0.5">
                {items.length} {items.length === 1 ? "producto" : "productos"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-16">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-white/20" />
              </div>
              <div>
                <p className="font-serif text-xl text-white mb-1.5">Carrito vacío</p>
                <p className="font-sans text-sm text-white/35">Agrega productos de nuestra tienda</p>
              </div>
              <button onClick={() => setOpen(false)} className="btn-gold px-6 py-3 rounded-xl text-[0.72rem] mt-2">
                Explorar tienda
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card-glass flex gap-3 p-3">
                <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-white/[0.04] flex-shrink-0">
                  <ProductImage src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-white leading-snug mb-1 line-clamp-2">{item.name}</p>
                  <p className="font-sans font-bold text-primary text-sm mb-2.5">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/40 transition-all"
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </button>
                    <span className="font-sans font-semibold text-sm text-white min-w-[1.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/40 transition-all"
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto w-6 h-6 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.06] px-6 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between font-sans text-sm text-white/40">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-white/30">
                <span>Envío</span>
                <span className="text-emerald-400">Calcular al finalizar</span>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg text-white">Total</span>
              <span className="font-sans font-bold text-primary text-xl">{formatPrice(total)}</span>
            </div>
            <button
              className="btn-gold w-full py-4 rounded-xl text-[0.78rem]"
              onClick={() => alert("¡Función de pago próximamente!")}
            >
              Finalizar compra
            </button>
            <button
              onClick={clearCart}
              className="w-full font-sans text-[0.72rem] text-white/20 hover:text-red-400 transition-colors text-center"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  )
}
