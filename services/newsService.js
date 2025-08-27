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

class NewsService {
  constructor() {
    this.sources = [
      {
        name: 'NewsAPI',
        fetchFunction: this.fetchFromNewsAPI.bind(this)
      },
      {
        name: 'GoogleNews',
        fetchFunction: this.fetchFromGoogleNews.bind(this)
      }
    ];
  }

  async fetchNews() {
    const allArticles = [];
    
    for (const source of this.sources) {
      try {
        const articles = await source.fetchFunction();
        allArticles.push(...articles);
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error.message);
      }
    }

    const uniqueArticles = this.removeDuplicates(allArticles);
    const sortedArticles = this.sortByDate(uniqueArticles);
    
    return sortedArticles.slice(0, 50);
  }

  async fetchFromNewsAPI() {
    const articles = [];
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      console.log('NewsAPI key not found. Set NEWS_API_KEY in .env file');
      return articles;
    }

    for (const term of SEARCH_TERMS) {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: term,
            sortBy: 'publishedAt',
            language: 'en',
            apiKey: apiKey,
            pageSize: 20
          },
          timeout: 5000
        });

        if (response.data.articles) {
          const formattedArticles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description || article.content || '',
            url: article.url,
            publishedAt: new Date(article.publishedAt),
            source: article.source.name || 'NewsAPI'
          }));
          articles.push(...formattedArticles);
        }
      } catch (error) {
        console.error(`Error fetching ${term} from NewsAPI:`, error.message);
      }
    }

    return articles;
  }

  async fetchFromGoogleNews() {
    const articles = [];
    
    for (const term of SEARCH_TERMS) {
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
          if (index < 10) {
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
        console.error(`Error fetching ${term} from Google News:`, error.message);
      }
    }

    return articles;
  }

  removeDuplicates(articles) {
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

  sortByDate(articles) {
    return articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB - dateA;
    });
  }
}

module.exports = new NewsService();