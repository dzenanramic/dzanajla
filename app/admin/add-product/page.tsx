import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AddProductForm } from "@/components/admin/AddProductForm";
import { LayoutList } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin – Dodaj proizvod",
  robots: { index: false, follow: false },
};

export default function AdminAddProductPage() {
  return (
    <div className="min-h-screen py-12 bg-cream-100">
      <Container size="sm">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-mocha-800">Admin Panel</h1>
          <p className="font-sans text-sm text-mocha-400 mt-2">
            Dodaj novi proizvod
          </p>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 mt-4 font-sans text-sm text-blush-500 hover:text-blush-600 transition-colors"
          >
            <LayoutList size={15} />
            Pregledaj i briši proizvode →
          </Link>
        </div>

        <AddProductForm />
      </Container>
    </div>
  );
}
