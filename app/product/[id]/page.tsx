import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { OrderButton } from "@/components/products/OrderButton";
import { getProductById } from "@/lib/supabase";
import { formatPrice, categoryToSlug } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | DžanAjla Studio`,
      description: product.description,
      images: product.image_url
        ? [{ url: product.image_url, alt: product.title }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  const categorySlug = categoryToSlug(product.category);
  const formattedDate = new Intl.DateTimeFormat("bs-BA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(product.created_at));

  return (
    <div className="min-h-screen py-10 md:py-16">
      <Container size="lg">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-sans text-xs text-mocha-400">
          <Link href="/" className="hover:text-mocha-600 transition-colors">
            Početna
          </Link>
          <span>/</span>
          <Link
            href={`/category/${categorySlug}`}
            className="hover:text-mocha-600 transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-mocha-600 line-clamp-1 max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-100 shadow-card">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-30">🎁</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <Badge
              href={`/category/${categorySlug}`}
              label={product.category}
              variant="cream"
            />

            <h1 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-mocha-800 leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-semibold text-mocha-700">
                {formatPrice(product.price)}
              </span>
              <span className="font-sans text-xs text-mocha-300 lowercase">
                cijena je informativna
              </span>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-cream-300 to-transparent" />

            {/* Description */}
            <div className="flex-1">
              <h2 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-gold-500 mb-3">
                Opis proizvoda
              </h2>
              <p className="font-sans text-base text-mocha-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Handmade notice */}
            <div className="mt-6 rounded-2xl bg-blush-50 border border-blush-200 px-5 py-4">
              <p className="font-sans text-sm text-blush-700 leading-relaxed">
                ✦ Svaki predmet je <strong>ručni rad</strong> i jedinstven je.
                Manje varijacije u izgledu su dio ljepote.
              </p>
            </div>

            {/* Order CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <OrderButton product={product} />
              <Link
                href={`/category/${categorySlug}`}
                className="btn-secondary text-base px-8 py-4"
              >
                Pogledaj više
              </Link>
            </div>

            {/* Meta */}
            <div className="mt-8 pt-6 border-t border-cream-300 flex items-center gap-2 text-xs font-sans text-mocha-300">
              <Calendar size={12} />
              <span>Dodano: {formattedDate}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
