"use client"

import Image from "next/image"
import Link from "next/link"
import { Sparkles, Ticket } from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.13, ease: [0.25, 0.46, 0.45, 0.94] } }),
}

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/472771220_4003680029904599_2467877947508113755_n.webp"
          alt="Espectáculo Circorotos"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay — heavier */}
        <div className="absolute inset-0 bg-[rgba(10,3,24,0.86)]" />
        {/* Radial vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(10,3,24,0.2) 0%, rgba(10,3,24,0.55) 60%, rgba(10,3,24,0.92) 100%)" }}
        />
      </div>

      {/* Starfield */}
      <div className="absolute inset-0 bg-stars opacity-50 pointer-events-none" />

      {/* Top purple glow */}
      <div className="absolute top-0 inset-x-0 h-[50vh] glow-top-purple pointer-events-none" />

      {/* Ambient orbs */}
      <div className="orb-purple w-[600px] h-[400px] top-1/4 -left-48 opacity-35" />
      <div className="orb-gold w-[350px] h-[350px] bottom-1/3 right-0 translate-x-1/4 opacity-30"
        style={{ animationDelay: "2s" }} />

      {/* Gold top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Centered content */}
      <div className="relative z-10 mx-auto max-w-[860px] px-6 lg:px-10 text-center">
        <motion.h1
          className="font-serif leading-[1.06] tracking-wide mb-8"
          variants={fadeUp} initial="hidden" animate="show" custom={1}
        >
          <span className="block text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            Bienvenido al
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gold-shimmer mt-2">
            Mundo del Circo
          </span>
        </motion.h1>

        <motion.p
          className="font-sans text-white/60 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-12 font-light"
          variants={fadeUp} initial="hidden" animate="show" custom={2}
        >
          Vive la magia, el arte y la emoción en cada espectáculo. Una experiencia
          única que mezcla tradición circense con una estética contemporánea.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp} initial="hidden" animate="show" custom={3}
        >
          <Link href="/#programacion" className="btn-gold gap-2.5 px-10 py-4 rounded-full text-[0.78rem]">
            <Ticket className="h-4 w-4" />
            Ver Programación
          </Link>
          <Link href="/tienda" className="btn-outline-gold gap-2.5 px-10 py-4 rounded-full text-[0.78rem]">
            <Sparkles className="h-4 w-4" />
            Explorar Tienda
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-12 mt-16 pt-10 border-t border-white/[0.10]"
          variants={fadeUp} initial="hidden" animate="show" custom={4}
        >
          {[
            { n: "10+",  l: "Años" },
            { n: "200+", l: "Funciones" },
            { n: "50+",  l: "Artistas" },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <p className="font-serif text-3xl text-gold">{n}</p>
              <p className="font-sans text-[0.68rem] tracking-widest uppercase text-white/40 mt-1">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35"
        initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  )
}
