import https from 'https';

https.get('https://meine-assets.pages.dev/ich.webp', (res) => {
  console.log('ich.webp:', res.statusCode);
});
https.get('https://meine-assets.pages.dev/ich.avif', (res) => {
  console.log('ich.avif:', res.statusCode);
});
