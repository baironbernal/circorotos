"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ShoppingCart, Ticket } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useCartStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const allLinks = [
  { href: "/#inicio",    label: "Inicio" },
  { href: "/tienda",     label: "Tienda" },
  { href: "/#noticias",  label: "Noticias" },
  { href: "/#contacto",  label: "Contacto" },
]

const leftLinks  = allLinks.slice(0, 2)
const rightLinks = allLinks.slice(2)

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems    = useCartStore((s) => s.totalItems())
  const setIsCartOpen = useCartStore((s) => s.setIsCartOpen)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const linkCls =
    "relative font-sans text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/65 hover:text-primary transition-colors duration-200 " +
    "after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary " +
    "after:transition-[width] after:duration-300 hover:after:w-full"

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[rgba(10,3,24,0.82)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex h-[72px] items-center justify-between gap-6">

            {/* ── Left links (desktop) ── */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {leftLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>
              ))}
            </div>

            {/* ── Logo — left on mobile, center on desktop ── */}
            <Link href="/" className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <Image
                src="/images/products/Logo-Circorotos-scaled.png"
                alt="Circorotos"
                width={140}
                height={70}
                className="h-[46px] w-auto brightness-110 drop-shadow-[0_0_14px_rgba(245,200,66,0.45)]"
                priority
              />
            </Link>

            {/* ── Right links + CTA (desktop) ── */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {rightLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>
              ))}
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
              <Link href="/#programacion" className="btn-gold gap-2 px-5 py-2.5 rounded-full text-[0.7rem]">
                <Ticket className="h-3.5 w-3.5" />
                Comprar Entradas
              </Link>
            </div>

            {/* ── Mobile controls ── */}
            <div className="flex lg:hidden items-center gap-3 ml-auto">
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
                className="text-white/65 hover:text-primary transition-colors p-1"
                aria-label="Menú"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <X className="h-6 w-6" />
                      </motion.span>
                    : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Menu className="h-6 w-6" />
                      </motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {/* Backdrop blur layer */}
            <div className="absolute inset-0 bg-[rgba(10,3,24,0.97)] backdrop-blur-3xl" />

            {/* Gold accent lines */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Ambient orb */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(91,33,182,0.25) 0%, transparent 70%)" }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-8">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-10"
              >
                <Image
                  src="/images/products/Logo-Circorotos-scaled.png"
                  alt="Circorotos"
                  width={120}
                  height={60}
                  className="h-[44px] w-auto brightness-110 drop-shadow-[0_0_16px_rgba(245,200,66,0.5)]"
                />
              </motion.div>

              {/* Nav links */}
              {allLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-center font-serif text-3xl text-white/75 hover:text-primary transition-colors duration-200 py-3"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <motion.div
                className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              />

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link
                  href="/#programacion"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold gap-2 px-8 py-3.5 rounded-full text-[0.78rem]"
                >
                  <Ticket className="h-4 w-4" />
                  Comprar Entradas
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
