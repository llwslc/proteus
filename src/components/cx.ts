/* Join class names, dropping falsy entries. One helper instead of the
   [..., cond && "x", className].filter(Boolean).join(" ") pattern inlined
   at every component. Accepts unknown so a Base UI className (which may be a
   string, a state callback, or undefined) passes through exactly as the old
   inline .filter(Boolean).join(" ") did. */
export function cx(...parts: unknown[]): string {
  return parts.filter(Boolean).join(" ");
}
