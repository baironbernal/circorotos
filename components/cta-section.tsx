"use client"

import Link from "next/link"
import { Sparkles, Ticket } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative py-36 overflow-hidden">
      {/* Purple radial from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,_rgba(91,33,182,0.45)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-stars opacity-50 pointer-events-none" />
      <div className="orb-gold w-[400px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 animate-glow-pulse" />

      <div className="absolute top-0 inset-x-0 divider-gold" />
      <div className="absolute bottom-0 inset-x-0 divider-gold" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="label-badge mb-8 mx-auto w-fit">
          <Sparkles className="h-3.5 w-3.5" />
          No te quedes fuera
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Compra tus entradas y{" "}
          <span className="text-gold-shimmer">vive la experiencia</span>{" "}
          del circo
        </h2>

        <p className="font-sans text-white/45 text-base lg:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Cada función es única e irrepetible. El circo te espera — asegura tu lugar antes de que se agoten.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#programacion"
            className="btn-gold gap-2.5 px-10 py-4 rounded-full text-[0.78rem] w-full sm:w-auto justify-center"
          >
            <Ticket className="h-4 w-4" />
            Explorar Eventos
          </Link>
          <Link
            href="/tienda"
            className="btn-outline-gold gap-2.5 px-10 py-4 rounded-full text-[0.78rem] w-full sm:w-auto justify-center"
          >
            <Sparkles className="h-4 w-4" />
            Ver Tienda
          </Link>
        </div>
      </div>
    </section>
  )
}
