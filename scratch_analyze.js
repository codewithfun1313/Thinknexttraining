const fs = require('fs');
const html = fs.readFileSync('C:/Users/Lenovo/.gemini/antigravity-ide/brain/30c3bb35-61bd-4917-801b-b3ed02bd5e78/.system_generated/steps/41/content.md', 'utf8');

// Find all headings and their following paragraph/list text
const sections = [];
const headingRegex = /<(h[1-5])[^>]*>(.*?)<\/\1>/gi;
let match;
const matches = [];
while ((match = headingRegex.exec(html)) !== null) {
  matches.push({ tag: match[1], title: match[2].replace(/<[^>]+>/g, '').trim(), index: match.index });
}

console.log('Total headings found:', matches.length);
matches.forEach((m, i) => {
  const nextIndex = matches[i + 1] ? matches[i + 1].index : m.index + 1000;
  const chunk = html.substring(m.index, Math.min(html.length, nextIndex)).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`[${m.tag.toUpperCase()}] ${m.title}`);
  console.log(chunk.substring(0, 180) + '...\n');
});
