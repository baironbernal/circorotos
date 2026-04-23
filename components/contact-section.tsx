"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send, CheckCircle2, Instagram, Facebook } from "lucide-react"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setForm({ nombre: "", email: "", mensaje: "" })
  }

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl font-sans text-sm text-white placeholder:text-white/25 " +
    "bg-white/[0.05] border border-white/[0.08] focus:outline-none focus:border-primary/55 " +
    "focus:ring-1 focus:ring-primary/25 transition-all duration-200"

  return (
    <section id="contacto" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-30 pointer-events-none" />
      <div className="orb-purple w-[500px] h-[400px] bottom-0 right-0 translate-x-1/3 opacity-45" />
      <div className="absolute top-0 inset-x-0 divider-gold" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="label-badge mb-5">— Escríbenos —</div>
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-14">
          ¿Tienes alguna{" "}
          <span className="text-gold-shimmer">pregunta?</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Info ── */}
          <div className="space-y-10">
            <p className="font-sans text-white/45 leading-relaxed text-[0.95rem]">
              Estamos aquí para ayudarte con reservas, información de espectáculos,
              colaboraciones artísticas o simplemente para hablar de circo.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Ubicación",  value: "Bogotá, Colombia",      sub: "Disponibles en todo el país" },
                { icon: Phone,  label: "WhatsApp",   value: "+57 300 000 0000",      sub: "Lun – Sáb · 9am – 7pm" },
                { icon: Mail,   label: "Email",      value: "hola@circorotos.com",   sub: "Respuesta en < 24 horas" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-sans text-[0.65rem] uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
                    <p className="font-sans font-medium text-white/85 text-sm">{value}</p>
                    <p className="font-sans text-[0.75rem] text-white/35 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="font-sans text-[0.65rem] uppercase tracking-widest text-white/30 mb-4">Síguenos</p>
              <div className="flex gap-3 flex-wrap">
                {[{ icon: Instagram, l: "Instagram" }, { icon: Facebook, l: "Facebook" }].map(({ icon: Icon, l }) => (
                  <a key={l} href="#" aria-label={l}
                    className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/40 transition-all duration-200">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
                {["TikTok", "YouTube"].map((s) => (
                  <a key={s} href="#"
                    className="px-4 py-2 rounded-xl border border-white/[0.08] font-sans text-xs text-white/35 hover:text-primary hover:border-primary/40 transition-all duration-200 tracking-wide">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="card-glass p-8">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-5 py-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-white">¡Mensaje enviado!</h3>
                <p className="font-sans text-white/45 text-sm">Gracias por escribirnos. Te responderemos pronto.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-gold px-6 py-2.5 rounded-xl text-[0.72rem] mt-2"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="nombre" className="block font-sans text-[0.65rem] uppercase tracking-widest text-white/35 mb-2">
                    Nombre completo *
                  </label>
                  <input id="nombre" name="nombre" type="text" required
                    value={form.nombre} onChange={handleChange} placeholder="Tu nombre" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="email" className="block font-sans text-[0.65rem] uppercase tracking-widest text-white/35 mb-2">
                    Correo electrónico *
                  </label>
                  <input id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange} placeholder="tu@correo.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block font-sans text-[0.65rem] uppercase tracking-widest text-white/35 mb-2">
                    Mensaje *
                  </label>
                  <textarea id="mensaje" name="mensaje" required rows={5}
                    value={form.mensaje} onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    className={`${inputCls} resize-none`} />
                </div>
                <button type="submit"
                  className="btn-gold w-full gap-2 py-4 rounded-xl text-[0.78rem]">
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 divider-gold" />
    </section>
  )
}
