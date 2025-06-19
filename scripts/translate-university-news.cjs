// Script to auto-translate university news in Resources.json using Google Translate API
// Usage: node scripts/translate-university-news.cjs

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY; // Set your API key in env
const TARGET_LANG = 'fil'; // Filipino
const RESOURCE_PATH = path.join(__dirname, '../public/data/marsu-resources/Resources.json');

async function translateText(text, targetLang) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  const body = {
    q: text,
    target: targetLang,
    format: 'text',
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data && data.data && data.data.translations && data.data.translations[0]) {
    return data.data.translations[0].translatedText;
  }
  throw new Error('Translation failed');
}

async function main() {
  const resource = JSON.parse(fs.readFileSync(RESOURCE_PATH, 'utf-8'));
  let changed = false;
  if (Array.isArray(resource.news)) {
    for (const news of resource.news) {
      for (const field of ['title', 'description', 'content']) {
        if (news[field] && typeof news[field] === 'object' && !news[field][TARGET_LANG]) {
          const original = news[field].en || news[field].en || '';
          if (original) {
            console.log(`Translating ${field} for news id ${news.id}...`);
            try {
              const translated = await translateText(original, TARGET_LANG);
              news[field][TARGET_LANG] = translated;
              changed = true;
            } catch (e) {
              console.error(`Failed to translate ${field} for news id ${news.id}:`, e.message);
            }
          }
        }
      }
    }
  }
  if (changed) {
    fs.writeFileSync(RESOURCE_PATH, JSON.stringify(resource, null, 2), 'utf-8');
    console.log('Translations added and file updated.');
  } else {
    console.log('No missing translations found.');
  }
}

main();
