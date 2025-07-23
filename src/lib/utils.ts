// Class name utility to merge conditional classes
export function cn(...args: unknown[]): string {
  return args
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}
