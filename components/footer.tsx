"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

const navLinks = [
  { href: "/#inicio",   label: "Inicio" },
  { href: "/tienda",    label: "Tienda" },
  { href: "/#galeria",  label: "Galería & Videos" },
  { href: "/#noticias", label: "Noticias" },
  { href: "/#contacto", label: "Contacto" },
]
const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Youtube,   label: "YouTube",   href: "#" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* Purple radial at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-[200px] glow-top-purple opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-stars opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/">
              <Image
                src="/images/products/Logo-Circorotos-scaled.png"
                alt="Circorotos"
                width={130}
                height={65}
                className="h-14 w-auto brightness-125 drop-shadow-[0_0_14px_rgba(245,200,66,0.4)]"
              />
            </Link>
            <p className="font-sans text-[0.83rem] text-white/35 leading-relaxed max-w-[240px]">
              El arte del circo vivo. Espectáculos que transforman, sorprenden y emocionan.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/40 transition-all duration-200">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/30 mb-6 pb-3 border-b border-white/[0.06]">
              Navegación
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="font-sans text-[0.83rem] text-white/40 hover:text-primary transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/30 mb-6 pb-3 border-b border-white/[0.06]">
              Contacto
            </p>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: "Bogotá, Colombia" },
                { icon: Phone,  text: "+57 300 000 0000" },
                { icon: Mail,   text: "hola@circorotos.com" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 font-sans text-[0.83rem] text-white/40">
                  <Icon className="h-3.5 w-3.5 text-primary/55 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/30 mb-6 pb-3 border-b border-white/[0.06]">
              Novedades
            </p>
            <p className="font-sans text-[0.83rem] text-white/35 mb-4 leading-relaxed">
              Sé el primero en saber sobre nuevas funciones y lanzamientos.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] font-sans text-xs text-white/60 placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
              />
              <button className="btn-gold px-4 py-2.5 rounded-xl text-[0.68rem] flex-shrink-0">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gold mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/20">
            © {new Date().getFullYear()} Circorotos · Todos los derechos reservados
          </p>
          <p className="font-sans text-xs text-white/15">Hecho con ♥ para el arte circense</p>
        </div>
      </div>
    </footer>
  )
}
