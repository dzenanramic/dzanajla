import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mocha-800 text-cream-200">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blush-400 via-gold-400 to-blush-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl font-semibold text-cream-100">
                DžanAjla
              </span>
              <span className="ml-2 font-sans text-xs tracking-[0.25em] uppercase text-gold-300">
                Studio
              </span>
            </div>
            <p className="font-sans text-sm text-mocha-300 leading-relaxed max-w-xs">
              Svaki predmet nastaje s ljubavlju, strpljenjem i vještinom. Ručni
              radovi Džane i Ajle – darovi koji traju.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg text-cream-100 mb-4">
              Kategorije
            </h3>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="font-sans text-sm text-mocha-300 hover:text-cream-100 transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-cream-100 mb-4">Kontakt</h3>
            <p className="font-sans text-sm text-mocha-300 leading-relaxed">
              Za narudžbe i upite koristite formu na stranici proizvoda.
              Odgovorimo u najkraćem roku.
            </p>
            <div className="mt-5 pt-5 border-t border-mocha-700">
              <p className="font-sans text-xs text-mocha-400 tracking-wide">
                Rukotvorine s ljubavlju ✦ Bosna i Hercegovina
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-mocha-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-mocha-400">
            © {currentYear} DžanAjla Studio. Sva prava zadržana.
          </p>
          <p className="font-sans text-xs text-mocha-500 italic">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>
      </div>
    </footer>
  );
}
