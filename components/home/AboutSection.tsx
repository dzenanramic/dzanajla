import Link from "next/link";
import { Container } from "@/components/layout/Container";

const artists = [
  {
    name: "Džana",
    role: "Kutije, torbe, šivenje & pletenje",
    bio: "Džana voli kreirati s rukama. Svaka kutija koju napravi priča priču o strpljenju i preciznosti – ukrašena s pažnjom, izrađena s ljubavlju. Njene torbe i šiveni radovi nose osobnost i toplinu.",
    initials: "DŽ",
    accentColor: "bg-blush-100 text-blush-600",
  },
  {
    name: "Ajla",
    role: "Buketi, islamska kaligrafija (levhe), slike prirode",
    bio: "Ajla spaja vještinu i duhovnost. Njeni vječni buketi nikad ne venu, a levhe donose mir svakome domu. Kroz slike prirode, ona oslikava ljepotu Allahovog stvaranja – pažljivo, potez po potez.",
    initials: "AJ",
    accentColor: "bg-gold-100 text-gold-600",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

      <Container size="lg">
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold-500 font-medium mb-3">
            Naša priča
          </p>
          <h2 className="section-title max-w-xl mx-auto">
            Dvije ruke, jedna duša, bezbrojna remek-djela
          </h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            DžanAjla Studio je više od radionice – to je prostor gdje se
            tradicija susreće s kreativnošću, a svaki predmet nastaje s namjerom
            i posvećenošću.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="rounded-3xl border border-cream-300 bg-cream-50 p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-xl font-semibold ${artist.accentColor}`}
                >
                  {artist.initials}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-mocha-800">
                    {artist.name}
                  </h3>
                  <p className="font-sans text-xs text-mocha-400 mt-0.5">
                    {artist.role}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-cream-300 to-transparent" />
              <p className="font-sans text-sm text-mocha-500 leading-relaxed">
                {artist.bio}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-5 bg-gradient-to-br from-cream-100 to-blush-50 rounded-3xl border border-cream-300 px-10 py-8 max-w-lg">
            <p className="font-serif text-xl text-mocha-700 text-balance">
              Svaki predmet je jedinstven. Naručite vaš danas.
            </p>
            <Link href="#featured" className="btn-primary">
              Pregledaj proizvode
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
