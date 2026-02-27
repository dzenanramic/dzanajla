import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/lib/supabase";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  return (
    <section id="featured" className="py-20 bg-cream-100">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold-500 font-medium mb-3">
              Istaknuti proizvodi
            </p>
            <h2 className="section-title">Najnoviji radovi</h2>
          </div>
          <Link
            href="/category/kutije"
            className="font-sans text-sm text-blush-500 hover:text-blush-600 font-medium tracking-wide shrink-0 transition-colors"
          >
            Svi proizvodi →
          </Link>
        </div>

        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
