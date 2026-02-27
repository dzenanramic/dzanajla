import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getProducts } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { Plus, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin – Proizvodi",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: { deleted?: string };
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const products = await getProducts();
  const wasDeleted = searchParams.deleted === "1";

  return (
    <div className="min-h-screen py-12 bg-cream-100">
      <Container size="md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-mocha-800">
              Svi proizvodi
            </h1>
            <p className="font-sans text-sm text-mocha-400 mt-1">
              {products.length}{" "}
              {products.length === 1 ? "proizvod" : "proizvoda"}
            </p>
          </div>
          <Link href="/admin/add-product" className="btn-primary gap-2">
            <Plus size={16} />
            Dodaj novi
          </Link>
        </div>

        {wasDeleted && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <CheckCircle2 size={20} className="text-green-600 shrink-0" />
            <p className="font-sans text-sm text-green-700">
              Proizvod je uspješno obrisan.
            </p>
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-cream-300 p-16 text-center">
            <p className="font-serif text-xl text-mocha-400">Nema proizvoda.</p>
            <Link
              href="/admin/add-product"
              className="btn-primary mt-6 inline-flex"
            >
              Dodaj prvi proizvod
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-cream-300 p-4 flex items-center gap-4 shadow-soft"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      🎁
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base text-mocha-800 truncate">
                    {product.title}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="font-sans text-xs text-mocha-400">
                      {product.category}
                    </span>
                    <span className="font-sans text-xs font-semibold text-mocha-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/product/${product.id}`}
                    className="font-sans text-xs text-mocha-400 hover:text-mocha-700 px-3 py-1.5 rounded-lg hover:bg-cream-100 transition-colors"
                    target="_blank"
                  >
                    Pregledaj
                  </Link>
                  <DeleteConfirmModal
                    productId={product.id}
                    productTitle={product.title}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
