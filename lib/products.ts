import productsData from "@/public/products.json"

export interface Product {
  id: string
  name: string
  price: number
  priceFormatted: string
  category: string
  categories: string[]
  image: string
  slug: string
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10)
}

export const products: Product[] = productsData.map((raw) => {
  const slug = toSlug(raw.name)
  return {
    id: slug,
    slug,
    name: raw.name,
    price: parsePrice(raw.price),
    priceFormatted: raw.price.trim(),
    category: raw.category.split(",")[0].trim(),
    categories: raw.category.split(",").map((c) => c.trim()).filter(Boolean),
    image: `/images/products/${raw.image}`,
  }
})

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getAllCategories(): string[] {
  const cats = new Set<string>()
  products.forEach((p) => p.categories.forEach((c) => {
    if (c !== "Todos los productos" && c !== "Uncategorized") cats.add(c)
  }))
  return ["Todos", ...Array.from(cats).sort()]
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price)
}
