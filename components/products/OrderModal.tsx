"use client";

import { useState, useRef, useEffect } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface OrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function OrderModal({ product, isOpen, onClose }: OrderModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      full_name: (
        form.elements.namedItem("full_name") as HTMLInputElement
      ).value.trim(),
      email: (
        form.elements.namedItem("email") as HTMLInputElement
      ).value.trim(),
      phone: (
        form.elements.namedItem("phone") as HTMLInputElement
      ).value.trim(),
      message: (
        form.elements.namedItem("message") as HTMLTextAreaElement
      ).value.trim(),
      product_id: product.id,
      product_title: product.title,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Greška pri slanju narudžbe.");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Došlo je do greške. Pokušajte ponovo.",
      );
    }
  }

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mocha-900/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-hover w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-cream-300 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="font-serif text-xl text-mocha-800">Narudžba</h2>
            <p className="font-sans text-xs text-mocha-400 mt-0.5 line-clamp-1">
              {product.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-mocha-400 hover:bg-cream-100 hover:text-mocha-700 transition-colors"
            aria-label="Zatvori"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {formState === "success" ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-blush-100 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-blush-500" />
              </div>
              <h3 className="font-serif text-2xl text-mocha-800">Hvala!</h3>
              <p className="font-sans text-sm text-mocha-500 leading-relaxed max-w-xs">
                Vaša narudžba za{" "}
                <strong className="text-mocha-700">{product.title}</strong> je
                primljena. Kontaktirat ćemo vas uskoro.
              </p>
              <button onClick={onClose} className="btn-primary mt-2">
                Zatvori
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              <div>
                <label className="form-label" htmlFor="full_name">
                  Ime i prezime <span className="text-blush-400">*</span>
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  placeholder="Amina Hodžić"
                  className="input-field mt-1"
                  disabled={formState === "submitting"}
                />
              </div>

              <div>
                <label className="form-label" htmlFor="email">
                  Email adresa <span className="text-blush-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="amina@primjer.ba"
                  className="input-field mt-1"
                  disabled={formState === "submitting"}
                />
              </div>

              <div>
                <label className="form-label" htmlFor="phone">
                  Broj telefona <span className="text-blush-400">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+387 61 123 456"
                  className="input-field mt-1"
                  disabled={formState === "submitting"}
                />
              </div>

              <div>
                <label className="form-label" htmlFor="message">
                  Poruka{" "}
                  <span className="text-mocha-300 font-normal text-xs">
                    (opcionalno)
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Posebni zahtjevi, napomene..."
                  className="input-field mt-1 resize-none"
                  disabled={formState === "submitting"}
                />
              </div>

              {formState === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="font-sans text-sm text-red-700">
                    {errorMessage}
                  </p>
                </div>
              )}

              <p className="font-sans text-xs text-mocha-300 leading-relaxed">
                Slanjem forme potvrđujete namjeru narudžbe. Plaćanje se dogovara
                direktno s prodavačem.
              </p>

              <button
                type="submit"
                disabled={formState === "submitting"}
                className={cn(
                  "btn-primary w-full mt-1",
                  formState === "submitting" && "opacity-70",
                )}
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Slanje...
                  </>
                ) : (
                  "Pošalji narudžbu"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
