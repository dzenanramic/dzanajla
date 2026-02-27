import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, categoryToSlug } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const categorySlug = categoryToSlug(product.category);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group card flex flex-col bg-white animate-fade-in"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-cream-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
            <span className="text-4xl opacity-40">🎁</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-mocha-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Badge href={`/category/${categorySlug}`} label={product.category} />
        <h3 className="mt-2 font-serif text-lg text-mocha-800 leading-snug line-clamp-2 group-hover:text-mocha-600 transition-colors">
          {product.title}
        </h3>
        <p className="mt-1 font-sans text-sm text-mocha-400 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-serif text-xl font-semibold text-mocha-700">
            {formatPrice(product.price)}
          </span>
          <span className="font-sans text-xs text-blush-400 font-medium tracking-wide uppercase">
            Naruči →
          </span>
        </div>
      </div>
    </Link>
  );
}
