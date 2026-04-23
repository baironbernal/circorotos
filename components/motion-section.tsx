"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right"
}

export function FadeIn({ children, className, delay = 0, direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildren({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}
