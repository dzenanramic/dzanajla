import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('bs-BA', {
    style: 'currency',
    currency: 'BAM',
    minimumFractionDigits: 2,
  }).format(price);
}

export function slugToCategory(slug: string): string {
  const map: Record<string, string> = {
    kutije: 'Kutije',
    torbe: 'Torbe',
    'sivenje-pletenje': 'Šivenje & Pletenje',
    buketi: 'Buketi',
    levhe: 'Levhe',
    'slike-prirode': 'Slike prirode',
  };
  return map[slug] ?? slug;
}

export function categoryToSlug(category: string): string {
  const map: Record<string, string> = {
    Kutije: 'kutije',
    Torbe: 'torbe',
    'Šivenje & Pletenje': 'sivenje-pletenje',
    Buketi: 'buketi',
    Levhe: 'levhe',
    'Slike prirode': 'slike-prirode',
  };
  return map[category] ?? category.toLowerCase().replace(/\s+/g, '-');
}
