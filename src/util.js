export function generateRandomId() {
  const randomHex = Math.random().toString(16).substring(2);
  const timestamp = Date.now().toString(16);
  const randomId = timestamp + randomHex;
  return randomId;
}
