// scripts/check-env.js
const url = process.env.VITE_API_BASE_URL;

if (!url || url.trim() === '') {
  console.error('[check-env] ERROR: VITE_API_BASE_URL is not set.');
  process.exit(1);
}
if (!url.startsWith('https://')) {
  console.error(`[check-env] ERROR: VITE_API_BASE_URL must start with https:// — got: "${url}"`);
  process.exit(1);
}
if (url.includes('localhost')) {
  console.error(`[check-env] ERROR: VITE_API_BASE_URL must not contain localhost in production — got: "${url}"`);
  process.exit(1);
}

console.log(`[check-env] OK — VITE_API_BASE_URL=${url}`);
