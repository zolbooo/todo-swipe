export function generateRandomID() {
  return Array(4)
    .fill(null)
    .map(() => Math.floor(Math.random() * 0xfffffffffffff).toString(16))
    .join('');
}
