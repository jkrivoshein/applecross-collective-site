/**
 * Utility function to conditionally join classNames together.
 * Filters out falsy values like undefined, null, false.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
