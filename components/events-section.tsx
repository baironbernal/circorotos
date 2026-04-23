"use client"

import Link from "next/link"
import { Calendar, MapPin, Clock, Ticket } from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn, StaggerChildren, itemVariants } from "@/components/motion-section"

const events = [
  {
    id: "1",
    day: "15", month: "MAY", year: "2025",
    title: "Gran Gala de Verano",
    description: "Una noche inolvidable con acrobacias aéreas, malabares de fuego y comedia en vivo.",
    time: "20:00 hs",
    location: "Plaza Mayor, Bogotá",
    category: "GALA",
    price: "Desde $35.000",
    badge: "Próximamente",
    badgeCls: "border-primary/40 text-primary bg-primary/10",
  },
  {
    id: "2",
    day: "22", month: "MAY", year: "2025",
    title: "Circo en el Parque",
    description: "Espectáculo familiar al aire libre con payasos, malabaristas y equilibristas.",
    time: "16:00 hs",
    location: "Parque Simón Bolívar, Bogotá",
    category: "FAMILIAR",
    price: "Entrada libre",
    badge: "Gratis",
    badgeCls: "border-emerald-400/40 text-emerald-400 bg-emerald-400/10",
  },
  {
    id: "3",
    day: "05", month: "JUN", year: "2025",
    title: "Noche de Fuego",
    description: "Espectáculo nocturno de pirofagia y danza con fuego que dejará sin aliento.",
    time: "21:00 hs",
    location: "Teatro Metropolitano, Medellín",
    category: "ESPECIAL",
    price: "Desde $55.000",
    badge: "Últimas entradas",
    badgeCls: "border-amber-400/40 text-amber-400 bg-amber-400/10",
  },
  {
    id: "4",
    day: "20", month: "JUN", year: "2025",
    title: "Festival de Artes Circenses",
    description: "Tres días de magia con artistas nacionales e internacionales en escenarios múltiples.",
    time: "Todo el día",
    location: "Centro Cultural, Cali",
    category: "FESTIVAL",
    price: "Desde $25.000",
    badge: "Festival",
    badgeCls: "border-violet-400/40 text-violet-400 bg-violet-400/10",
  },
]

export function EventsSection() {
  return (
    <section id="programacion" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-35 pointer-events-none" />
      <div className="orb-purple w-[500px] h-[350px] top-1/2 -translate-y-1/2 right-0 translate-x-1/3 opacity-45" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <FadeIn>
            <div className="label-badge mb-5">— Agenda —</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              Próximas{" "}
              <span className="text-gold-shimmer">Funciones</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link href="/#contacto" className="btn-outline-gold px-6 py-3 rounded-full text-[0.72rem] self-start sm:self-auto">
              Ver todas
            </Link>
          </FadeIn>
        </div>

        {/* Event list */}
        <StaggerChildren className="space-y-4">
          {events.map((ev) => (
            <motion.div key={ev.id} variants={itemVariants} className="card-glass group overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 lg:p-7">

                {/* Date */}
                <div className="flex-shrink-0 w-[68px] text-center">
                  <p className="font-serif text-[2.5rem] leading-none text-gold">{ev.day}</p>
                  <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mt-1">{ev.month}</p>
                </div>

                {/* Vertical divider */}
                <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-transparent via-primary/25 to-transparent" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-3 mb-2.5">
                    <span className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-white/35">{ev.category}</span>
                    <span className={`font-sans text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full border ${ev.badgeCls}`}>
                      {ev.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-primary transition-colors duration-300 mb-2">
                    {ev.title}
                  </h3>
                  <p className="font-sans text-[0.83rem] text-white/40 line-clamp-1 mb-3">{ev.description}</p>
                  <div className="flex flex-wrap gap-5">
                    <span className="inline-flex items-center gap-1.5 font-sans text-[0.78rem] text-white/40">
                      <Clock className="h-3.5 w-3.5 text-primary/60" /> {ev.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[0.78rem] text-white/40">
                      <MapPin className="h-3.5 w-3.5 text-primary/60" /> {ev.location}
                    </span>
                  </div>
                </div>

                {/* Price + actions */}
                <div className="flex-shrink-0 flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                  <p className="font-sans text-sm font-semibold text-white/80">{ev.price}</p>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link href="/#contacto" className="btn-outline-gold flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-[0.68rem]">
                      Detalles
                    </Link>
                    <Link href="/tienda" className="btn-gold flex-1 sm:flex-initial gap-1.5 px-5 py-2.5 rounded-xl text-[0.68rem]">
                      <Ticket className="h-3.5 w-3.5" />
                      Entradas
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>

      <div className="absolute bottom-0 inset-x-0 divider-gold" />
    </section>
  )
}
