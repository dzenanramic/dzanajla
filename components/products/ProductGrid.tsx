import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "Nema dostupnih proizvoda.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mb-5">
          <span className="text-3xl opacity-50">🌸</span>
        </div>
        <p className="font-serif text-xl text-mocha-500">{emptyMessage}</p>
        <p className="font-sans text-sm text-mocha-300 mt-2">
          Uskoro dodajemo nove predmete.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
