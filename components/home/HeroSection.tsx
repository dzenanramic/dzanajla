import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-200 via-cream-100 to-blush-50 py-24 md:py-32">
      {/* Background geometric pattern */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a882' fill-opacity='0.06'%3E%3Cpath d='M40 0C17.909 0 0 17.909 0 40s17.909 40 40 40 40-17.909 40-40S62.091 0 40 0zm0 4c19.882 0 36 16.118 36 36S59.882 76 40 76 4 59.882 4 40 20.118 4 40 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blush-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold-200/30 blur-3xl" />

      <Container size="lg" className="relative">
        <div className="text-center max-w-2xl mx-auto">
          {/* Arabic Basmala */}
          <p className="font-sans text-xl text-gold-500 mb-6 opacity-80">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Decorative ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300" />
            <span className="text-gold-400 text-sm">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300" />
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-mocha-800 leading-tight tracking-tight">
            DžanAjla
            <br />
            <span className="text-blush-500">Studio</span>
          </h1>

          <p className="mt-6 font-sans text-lg md:text-xl text-mocha-500 leading-relaxed">
            Svaki predmet nosi dušu. Ručni radovi nastali s ljubavlju,
            strpljenjem i tradicijom – od kutija do kaligrafije.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#featured"
              className="btn-primary text-base px-8 py-3.5"
            >
              Pogledaj proizvode
            </Link>
            <Link
              href="/#about"
              className="btn-secondary text-base px-8 py-3.5"
            >
              Naša priča
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
