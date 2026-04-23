"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ShoppingCart, Ticket } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const leftLinks  = [
  { href: "/#inicio",   label: "Inicio" },
  { href: "/tienda",    label: "Tienda" },
]
const rightLinks = [
  { href: "/#noticias", label: "Noticias" },
  { href: "/#contacto", label: "Contacto" },
]

export function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const totalItems    = useCartStore((s) => s.totalItems())
  const setIsCartOpen = useCartStore((s) => s.setIsCartOpen)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const linkCls =
    "relative font-sans text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/65 hover:text-primary transition-colors duration-200 " +
    "after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary " +
    "after:transition-[width] after:duration-300 hover:after:w-full"

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[rgba(10,3,24,0.82)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-[76px] items-center justify-between gap-6">

          {/* ── Left links ── */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {leftLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>
            ))}
          </div>

          {/* ── Center logo ── */}
          <Link href="/" className="flex-shrink-0 mx-auto lg:mx-0">
            <Image
              src="/images/products/Logo-Circorotos-scaled.png"
              alt="Circorotos"
              width={140}
              height={70}
              className="h-[52px] w-auto brightness-110 drop-shadow-[0_0_14px_rgba(245,200,66,0.45)]"
              priority
            />
          </Link>

          {/* ── Right links + CTA ── */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {rightLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>
            ))}

            {/* Cart icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Carrito"
              className="relative text-white/55 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Book tickets CTA */}
            <Link
              href="/#programacion"
              className="btn-gold gap-2 px-5 py-2.5 rounded-full text-[0.7rem]"
            >
              <Ticket className="h-3.5 w-3.5" />
              Comprar Entradas
            </Link>
          </div>

          {/* ── Mobile controls ── */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Carrito"
              className="relative text-white/55 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white/65 hover:text-primary transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[rgba(10,3,24,0.95)] backdrop-blur-2xl">
          <div className="flex flex-col px-6 py-6 gap-5">
            {[...leftLinks, ...rightLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm tracking-[0.12em] uppercase font-medium text-white/60 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#programacion"
              className="btn-gold gap-2 px-6 py-3 rounded-full text-xs self-start mt-2"
              onClick={() => setMobileOpen(false)}
            >
              <Ticket className="h-3.5 w-3.5" />
              Comprar Entradas
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
