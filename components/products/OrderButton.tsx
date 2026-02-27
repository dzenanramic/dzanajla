"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { OrderModal } from "@/components/products/OrderModal";

export function OrderButton({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary w-full sm:w-auto text-base px-8 py-4 gap-3"
      >
        <ShoppingBag size={18} />
        Naruči
      </button>
      <OrderModal
        product={product}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
