const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('C:/Users/Lenovo/.gemini/antigravity-ide/brain/30c3bb35-61bd-4917-801b-b3ed02bd5e78/.system_generated/steps/41/content.md', 'utf8');

const imgs = [...html.matchAll(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
const logoImgs = imgs.filter(src => src.toLowerCase().includes('logo'));
console.log('Logo images found:', logoImgs);

// Let's download the first matching logo
let logoUrl = logoImgs.length > 0 ? logoImgs[0] : 'images/thinknext-logo.png';
if (!logoUrl.startsWith('http')) {
  logoUrl = 'https://www.thinknexttraining.com/' + logoUrl.replace(/^\//, '');
}
console.log('Attempting to download:', logoUrl);

const file = fs.createWriteStream('c:/Users/Lenovo/Desktop/new-think/images/thinknext-logo.png');
https.get(logoUrl, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Logo downloaded successfully!');
  });
}).on('error', function(err) {
  console.error('Error downloading:', err.message);
});
