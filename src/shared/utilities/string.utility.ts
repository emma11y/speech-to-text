export function isNotNullOrEmpty(value: string | number): boolean {
  return value !== undefined && value !== null && value !== '';
}

export function isNullOrEmpty(value: string | number): boolean {
  return value === undefined || value === null || value === '' || value === 'null';
}
