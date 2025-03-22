export default function toSnakeCase(rows: string[]): string[] {
  return rows.map((row) => {
    return row.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  });
}
