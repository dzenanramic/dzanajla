import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProductsByCategory } from "@/lib/supabase";
import { CATEGORIES } from "@/lib/categories";
import { slugToCategory } from "@/lib/utils";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: category.label,
    description: category.description,
    openGraph: {
      title: `${category.label} | DžanAjla Studio`,
      description: category.description,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryName = slugToCategory(params.slug);
  const products = await getProductsByCategory(categoryName);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-cream-200 to-blush-50 py-16 border-b border-cream-300">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 font-sans text-xs text-mocha-400">
            <Link href="/" className="hover:text-mocha-600 transition-colors">
              Početna
            </Link>
            <span>/</span>
            <span className="text-mocha-600">{category.label}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="font-serif text-4xl font-semibold text-mocha-800">
                {category.label}
              </h1>
              <p className="font-sans text-base text-mocha-400 mt-1">
                {category.description}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Products */}
      <div className="py-14">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <p className="font-sans text-sm text-mocha-400">
              {products.length}{" "}
              {products.length === 1 ? "proizvod" : "proizvoda"}
            </p>
          </div>
          <ProductGrid products={products} />
        </Container>
      </div>
    </div>
  );
}
