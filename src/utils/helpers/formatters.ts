export function titlecase(str: string): string {
  return str
    .split(' ')
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase())
    .join(' ');
}

export function decimal(str: string): string {
  return (+str).toFixed(2);
}
