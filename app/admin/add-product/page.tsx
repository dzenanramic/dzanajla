import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CATEGORIES } from "@/lib/categories";
import { addProductAction } from "./actions";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin – Dodaj proizvod",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: { success?: string };
}

export default function AdminAddProductPage({ searchParams }: PageProps) {
  const wasSuccessful = searchParams.success === "1";

  return (
    <div className="min-h-screen py-12 bg-cream-100">
      <Container size="sm">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-mocha-800">Admin Panel</h1>
          <p className="font-sans text-sm text-mocha-400 mt-2">
            Dodaj novi proizvod
          </p>
        </div>

        {wasSuccessful && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <CheckCircle2 size={20} className="text-green-600 shrink-0" />
            <p className="font-sans text-sm text-green-700">
              Proizvod je uspješno dodan u prodavnicu!
            </p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-card border border-cream-300 p-8">
          <form
            action={addProductAction}
            encType="multipart/form-data"
            className="flex flex-col gap-5"
          >
            {/* Admin password */}
            <div className="pb-5 mb-1 border-b border-cream-300">
              <label className="form-label" htmlFor="admin_password">
                Administratorska lozinka{" "}
                <span className="text-blush-400">*</span>
              </label>
              <input
                id="admin_password"
                name="admin_password"
                type="password"
                required
                placeholder="••••••••"
                className="input-field mt-1.5"
              />
            </div>

            {/* Title */}
            <div>
              <label className="form-label" htmlFor="title">
                Naziv proizvoda <span className="text-blush-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Dekorativna kutija..."
                className="input-field mt-1.5"
              />
            </div>

            {/* Description */}
            <div>
              <label className="form-label" htmlFor="description">
                Opis <span className="text-blush-400">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                placeholder="Opišite proizvod detaljno..."
                className="input-field mt-1.5 resize-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="form-label" htmlFor="price">
                Cijena (BAM) <span className="text-blush-400">*</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.50"
                required
                placeholder="35.00"
                className="input-field mt-1.5"
              />
            </div>

            {/* Category */}
            <div>
              <label className="form-label" htmlFor="category">
                Kategorija <span className="text-blush-400">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                className="input-field mt-1.5"
              >
                <option value="">Odaberi kategoriju...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image upload */}
            <div>
              <label className="form-label" htmlFor="image">
                Slika proizvoda
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="mt-1.5 block w-full font-sans text-sm text-mocha-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-medium file:bg-blush-100 file:text-blush-600 hover:file:bg-blush-200 cursor-pointer"
              />
              <p className="mt-1 font-sans text-xs text-mocha-300">
                JPG, PNG ili WebP. Preporučena veličina: 800×800px.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2 py-3.5 text-base"
            >
              Dodaj proizvod
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
