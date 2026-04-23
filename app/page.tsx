import { Navbar }             from "@/components/navbar"
import { HeroSection }        from "@/components/hero-section"
import { AboutSection }       from "@/components/about-section"
import { EventsSection }      from "@/components/events-section"
import { ShopPreviewSection } from "@/components/shop-preview-section"
import { GallerySection }     from "@/components/gallery-section"
import { CtaSection }         from "@/components/cta-section"
import { ContactSection }     from "@/components/contact-section"
import { Footer }             from "@/components/footer"
import { CartModal }          from "@/components/cart-modal"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ShopPreviewSection />
      <GallerySection />
      <CtaSection />
      <ContactSection />
      <Footer />
      <CartModal />
    </main>
  )
}
