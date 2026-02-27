import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CATEGORIES } from "@/lib/categories";

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold-500 font-medium mb-3">
            Naše kategorije
          </p>
          <h2 className="section-title">Šta nudimo</h2>
          <p className="section-subtitle mt-3 max-w-lg mx-auto">
            Svaka kategorija donosi jedinstven dar – izrađen rukom, s pažnjom i
            ljubavlju.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-cream-300 bg-cream-50 p-6 hover:border-blush-300 hover:bg-blush-50 transition-all duration-300 hover:shadow-card"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Hover decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blush-100/50 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3 className="font-serif text-lg font-medium text-mocha-800 group-hover:text-mocha-600 transition-colors">
                  {cat.label}
                </h3>
                <p className="mt-1.5 font-sans text-xs text-mocha-400 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-3 inline-block font-sans text-xs text-blush-500 font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-200">
                  Pogledaj →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
