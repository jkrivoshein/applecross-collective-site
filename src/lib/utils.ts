import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names conditionally with support for Tailwind's merge rules.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
