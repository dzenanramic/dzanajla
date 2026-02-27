import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Container size="sm" className="text-center py-16">
        <div className="text-6xl mb-6">🌸</div>
        <h1 className="font-serif text-5xl text-mocha-700 mb-3">404</h1>
        <h2 className="font-serif text-2xl text-mocha-600 mb-4">
          Stranica nije pronađena
        </h2>
        <p className="font-sans text-base text-mocha-400 mb-8 max-w-sm mx-auto">
          Stranica koju tražite ne postoji ili je premještena.
        </p>
        <Link href="/" className="btn-primary">
          Vrati se na početnu
        </Link>
      </Container>
    </div>
  );
}
