"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/products"

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const addItem  = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.setIsCartOpen)

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }
  function handleBuyNow() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    openCart(true)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAdd}
        className="btn-gold flex-1 gap-2 py-4 rounded-xl text-[0.78rem]"
      >
        {added
          ? <><Check className="h-4 w-4" /> ¡Agregado!</>
          : <><ShoppingCart className="h-4 w-4" /> Agregar al carrito</>}
      </button>
      <button
        onClick={handleBuyNow}
        className="btn-outline-gold flex-1 gap-2 py-4 rounded-xl text-[0.78rem]"
      >
        Comprar ahora
      </button>
    </div>
  )
}
