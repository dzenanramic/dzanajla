"use client";

import { useState, useRef } from "react";
import { Trash2, X, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  productId: string;
  productTitle: string;
}

export function DeleteConfirmModal({
  productId,
  productTitle,
}: DeleteConfirmModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleDelete() {
    const password = passwordRef.current?.value ?? "";
    if (!password) {
      setError("Unesite lozinku.");
      return;
    }

    setIsDeleting(true);
    setError("");

    const formData = new FormData();
    formData.set("product_id", productId);
    formData.set("admin_password", password);

    try {
      const res = await fetch("/api/admin/delete-product", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Greška pri brisanju.");
      }

      // Refresh the page
      window.location.href = "/admin/products?deleted=1";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Greška. Pokušajte ponovo.",
      );
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setError("");
        }}
        className="p-2 rounded-lg text-mocha-300 hover:text-red-500 hover:bg-red-50 transition-colors"
        title="Obriši proizvod"
        type="button"
      >
        <Trash2 size={16} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-mocha-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-hover w-full max-w-sm p-6 animate-slide-up">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-mocha-300 hover:bg-cream-100"
              type="button"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>

            <h3 className="font-serif text-xl text-mocha-800 mb-1">
              Obriši proizvod?
            </h3>
            <p className="font-sans text-sm text-mocha-400 mb-5 leading-relaxed">
              <strong className="text-mocha-700">{productTitle}</strong> će biti
              trajno obrisan, uključujući sliku.
            </p>

            <div className="mb-4">
              <label className="form-label" htmlFor={`pwd-${productId}`}>
                Admin lozinka
              </label>
              <input
                ref={passwordRef}
                id={`pwd-${productId}`}
                type="password"
                placeholder="••••••••"
                className="input-field mt-1.5"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleDelete()}
              />
            </div>

            {error && (
              <p className="font-sans text-sm text-red-600 mb-3">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary flex-1"
                type="button"
                disabled={isDeleting}
              >
                Odustani
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-sans font-medium text-sm transition-colors disabled:opacity-60"
                type="button"
              >
                {isDeleting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
                {isDeleting ? "Briše se..." : "Obriši"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
