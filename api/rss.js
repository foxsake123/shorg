const RSS = require('rss');
const axios = require('axios');
const cheerio = require('cheerio');

const SEARCH_TERMS = [
  'Epstein', 
  'Epstein List',
  'Epstein client list',
  'Jeffrey Epstein',
  '#EpsteinList',
  '#EpsteinClientList',
  'Diddy', 
  'Diddy List',
  'Diddy lawsuit',
  'Sean Combs', 
  'P Diddy',
  'Puff Daddy',
  '#DiddyList',
  '#DiddyLawsuit',
  '#Diddy',
  'Diddy allegations',
  'Diddy scandal'
];

async function fetchFromGoogleNews() {
  const articles = [];
  
  for (const term of SEARCH_TERMS.slice(0, 5)) { // Limit for performance
    try {
      const searchUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(term)}&hl=en-US&gl=US&ceid=US:en`;
      const response = await axios.get(searchUrl, {
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data, { xmlMode: true });
      
      $('item').each((index, element) => {
        if (index < 5) { // Limit per search term
          const title = $(element).find('title').text();
          const link = $(element).find('link').text();
          const pubDate = $(element).find('pubDate').text();
          const source = $(element).find('source').text() || 'Google News';
          
          articles.push({
            title: title,
            description: title,
            url: link,
            publishedAt: new Date(pubDate),
            source: source
          });
        }
      });
    } catch (error) {
      console.error(`Error fetching ${term}:`, error.message);
    }
  }

  return articles;
}

function removeDuplicates(articles) {
  const seen = new Set();
  return articles.filter(article => {
    const key = article.url || article.title;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function sortByDate(articles) {
  return articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB - dateA;
  });
}

module.exports = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');

    const articles = await fetchFromGoogleNews();
    const uniqueArticles = removeDuplicates(articles);
    const sortedArticles = sortByDate(uniqueArticles).slice(0, 50);

    const feed = new RSS({
      title: 'Epstein & Diddy News Feed',
      description: 'Latest news about Epstein and Diddy',
      feed_url: 'https://shorg.vercel.app/api/rss',
      site_url: 'https://shorg.vercel.app',
      managingEditor: 'editor@list-coin.com',
      webMaster: 'webmaster@list-coin.com',
      copyright: '2025 List-Coin',
      language: 'en',
      pubDate: new Date().toUTCString(),
      ttl: '10'
    });

    sortedArticles.forEach(article => {
      feed.item({
        title: article.title,
        description: article.description,
        url: article.url,
        guid: article.url,
        author: article.source,
        date: article.publishedAt
      });
    });

    res.status(200).send(feed.xml());
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ error: 'Error generating RSS feed' });
  }
};