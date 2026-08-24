const fs = require('fs');
const html = fs.readFileSync('C:/Users/Lenovo/.gemini/antigravity-ide/brain/30c3bb35-61bd-4917-801b-b3ed02bd5e78/.system_generated/steps/41/content.md', 'utf8');

// Extract Edge bullets
const edgeIdx = html.indexOf('ThinkNEXT Edge');
if (edgeIdx !== -1) {
  const edgeChunk = html.substring(edgeIdx, edgeIdx + 4000);
  const lis = [...edgeChunk.matchAll(/<li[^>]*>(.*?)<\/li>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('=== THINKNEXT EDGE POINTS ===');
  console.log(lis);
}

// Extract Why ThinkNEXT bullets
const whyIdx = html.indexOf('Why ThinkNEXT');
if (whyIdx !== -1) {
  const whyChunk = html.substring(whyIdx, whyIdx + 6000);
  const lis = [...whyChunk.matchAll(/<li[^>]*>(.*?)<\/li>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('=== WHY THINKNEXT POINTS ===');
  console.log(lis);
}

// Extract Stream Courses
const streamIdx = html.indexOf('Computer / IT / MCA / CSE / B.Tech (CSE)');
if (streamIdx !== -1) {
  const streamChunk = html.substring(streamIdx - 500, streamIdx + 10000);
  const courseLinks = [...streamChunk.matchAll(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gis)].map(m => ({
    href: m[1],
    text: m[2].replace(/<[^>]+>/g, '').trim()
  })).filter(c => c.text.length > 2);
  console.log('=== STREAM COURSES ===');
  console.log(courseLinks.slice(0, 40));
}
