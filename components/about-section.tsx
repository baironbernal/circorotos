"use client"

import { Flame, Users, Globe, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn, StaggerChildren, itemVariants } from "@/components/motion-section"

const pillars = [
  { icon: Flame, title: "Tradición",   body: "Más de una década llevando el fuego del circo a comunidades de toda Colombia." },
  { icon: Users, title: "Artistas",    body: "Un colectivo de soñadores que viven y respiran el arte circense cada día." },
  { icon: Globe, title: "Comunidad",   body: "El circo es de todos: plazas, parques y teatros son nuestros escenarios." },
  { icon: Zap,   title: "Excelencia",  body: "Cada función es una obra pulida hasta brillar, sin importar el escenario." },
]

export function AboutSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-40 pointer-events-none" />
      <div className="orb-purple w-[600px] h-[400px] top-0 left-1/2 -translate-x-1/2 opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <FadeIn direction="left">
            <div className="label-badge mb-7">Nuestra Historia</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-tight text-white mb-6">
              El Arte del Circo,{" "}
              <span className="text-gold-shimmer">Nuestra Pasión</span>
            </h2>
            <div className="space-y-4 font-sans text-white/50 leading-relaxed text-[0.95rem]">
              <p>
                Circorotos nació de un sueño compartido: llevar la magia del circo tradicional
                a las calles y comunidades que más lo necesitan.
              </p>
              <p>
                Cada presentación es una celebración de la vida, el arte y la conexión humana.
                Desde acrobacias que desafían la gravedad hasta momentos de comedia que arrancan
                carcajadas, nuestro circo es el espacio donde la magia se hace realidad.
              </p>
              <p>
                Creemos en el poder transformador del arte. Por eso llevamos nuestros espectáculos
                a parques, plazas y barrios — porque el circo debe ser de todos.
              </p>
            </div>
          </FadeIn>

          {/* Right: pillar cards */}
          <StaggerChildren className="grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <motion.div key={p.title} variants={itemVariants} className="card-glass group p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{p.title}</h3>
                <p className="font-sans text-[0.82rem] text-white/45 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 divider-gold" />
    </section>
  )
}
